const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;
db.items = require("./item.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.orderedItem = require("./orderedItem.model.js")(mongoose);

module.exports = db;
