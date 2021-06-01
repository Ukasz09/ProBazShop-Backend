require("dotenv").config();
const querystring = require("querystring");

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
    const query = querystring.stringify({ email: "test@mail.com" });
    const redirectUrl = `${process.env.AUTH_CALLBACK_URL}/?${query}`;
    res.redirect(redirectUrl);
  });

  router.get("/fail", (req, res) => {
    const redirectUrl = `${process.env.AUTH_CALLBACK_URL}`;
    res.redirect(redirectUrl);
  });

  app.use("/auth", router);
};
