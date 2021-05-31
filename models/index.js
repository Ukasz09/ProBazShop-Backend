const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
//db.url = process.env.DB_URL;
db.url = "mongodb://localhost/Probaz";
db.items = require("./item.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);

module.exports = db;
