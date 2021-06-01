const authMiddleware = require("../utils/auth.middleware");

module.exports = (app) => {
  const items = require("../controllers/item.controller.js");
  var router = require("express").Router();

  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });

  // Create a new Item
  router.post("/", items.create);

  // Retrieve all Items
  router.get("/", authMiddleware.isLoggedIn, items.findAll);

  // Retrieve a single Item with id
  router.get("/:id", items.findOne);

  // Update a Item with id
  router.put("/:id", items.update);

  // Delete a Item with id
  router.delete("/:id", items.delete);

  // Delete all Items
  router.delete("/", items.deleteAll);

  app.use("/api/items", router);

  // Get available categories
  app.get("/api/categories", items.categories);
};
