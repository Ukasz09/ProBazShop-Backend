const authMiddleware = require("../utils/auth.middleware");

module.exports = (app) => {
  const items = require("../controllers/item.controller.js");
  var router = require("express").Router();

  // Create a new Item
  router.post("/", authMiddleware.isLoggedIn, items.create);

  // Retrieve all Items
  router.get("/", items.findAll);

  // Retrieve a single Item with id
  router.get("/:id", items.findOne);

  // Update a Item with id
  router.put("/:id", authMiddleware.isLoggedIn, items.update);

  // Delete a Item with id
  router.delete("/:id", authMiddleware.isLoggedIn, items.delete);

  // Delete all Items
  router.delete("/", authMiddleware.isLoggedIn, items.deleteAll);

  app.use("/api/items", router);

  // Get available categories
  app.get("/api/categories", items.categories);
};
