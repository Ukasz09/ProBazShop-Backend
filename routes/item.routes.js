module.exports = app => {
    const tutorials = require("../controllers/item.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Items
    router.get("/", tutorials.findAll);
  
    app.use('/api/items', router);
  };