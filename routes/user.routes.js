module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/", users.create);
  router.get("/", users.findAll);
  router.get("/:email", users.findUser);
  router.put("/:id", users.update);
  router.delete("/:id", users.delete);
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);

  app.get("/api/history/:id", users.historyid);
};
