module.exports = (app) => {
  var router = require("express").Router();

  // ---------------------------------------------------  Facebook authentication  --------------------------------------------------- //

  router.get("/facebook", passport.authenticate("facebook"));

  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/auth/success",
      failureRedirect: "/auth/fail",
    })
  );

  router.get("/fail", (req, res) => {
    res.send("Failed attempt");
  });

  router.get("/success", (req, res) => {
    res.redirect("http://localhost:4200");
  });

  app.use("/auth", router);
};
