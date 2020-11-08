module.exports = app => {
    const items = require("../controllers/item.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Items
    router.get("/", items.findAll);

    // Create an Item
    router.post("/", items.create);
    
    // Delete all Items
    router.delete("/", items.deleteAll);

    app.use('/api/items', router);
  };