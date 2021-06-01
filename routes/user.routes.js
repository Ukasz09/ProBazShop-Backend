module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/", users.create);
  router.get("/", users.findAll);
  router.get("/:email", users.findUser);
  router.put("/:email", users.update);
  router.delete("/:email", users.delete);
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);

  app.get("/api/history/:email", users.historyid);
  app.post("/api/order", users.orderItems);
};
