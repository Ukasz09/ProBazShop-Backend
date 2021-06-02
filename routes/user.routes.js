const authMiddleware = require("../utils/auth.middleware");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/", authMiddleware.isLoggedIn, users.create);
  router.get("/", authMiddleware.isLoggedIn, users.findAll);
  router.get("/:email", authMiddleware.isLoggedIn, users.findUser);
  router.put("/:email", authMiddleware.isLoggedIn, users.update);
  router.delete("/:email", authMiddleware.isLoggedIn, users.delete);
  router.delete("/", authMiddleware.isLoggedIn, users.deleteAll);

  app.use("/api/users", router);

  app.get("/api/history/:email", users.historyid);
  app.post("/api/order", users.orderItems);
};
