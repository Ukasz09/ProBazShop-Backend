const usersJsonData = require("../json/shops.json");

module.exports = {
  async up(db, client) {
    return db.collection("shops").insertMany(usersJsonData);
  },

  async down(db, client) {
    db.collection("users").deleteMany({});
  },
};
