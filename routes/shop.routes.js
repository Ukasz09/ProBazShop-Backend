const shops = require("../controllers/shop.controller.js");
const router = require("express").Router();
module.exports = (app) => {
  router.get("/", shops.all);

  app.use("/api/shops", router);
};
