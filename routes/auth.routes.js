require("dotenv").config();
const querystring = require("querystring");
const authMiddleware = require("../utils/auth.middleware");

module.exports = (app) => {
  const router = require("express").Router();

  // ---------------------------------------------------  Facebook authentication  --------------------------------------------------- //

  router.get("/facebook", passport.authenticate("facebook"));

  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/auth/success",
      failureRedirect: "/auth/fail",
    })
  );

  router.get("/success", (req, res) => {
    const email = req.user._json.email;
    const query = querystring.stringify({ email: email });
    const redirectUrl = `${process.env.AUTH_CALLBACK_URL}/?${query}`;
    res.redirect(redirectUrl);
  });

  router.get("/fail", (req, res) => {
    const redirectUrl = `${process.env.AUTH_CALLBACK_URL}`;
    res.redirect(redirectUrl);
  });

  router.get("/logout", authMiddleware.isLoggedIn, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send({ message: "Logout failed" });
        return;
      }
      req.logout();
      res.send({ message: "Successfull logout" });
    });
  });

  router.get("/isAuthenticated", authMiddleware.isLoggedIn, (req, res) => {
    const email = req.user._json.email;
    if (email) {
      res.send({ email: email });
      return;
    }
    res.status(500).send({ message: "Not found user's email" });
  });

  app.use("/auth", router);
};
