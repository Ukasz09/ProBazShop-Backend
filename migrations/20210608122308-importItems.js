const { Types } = require("mongoose");
const itemsJsonData = require("../json/items.json");

module.exports = {
  async up(db, client) {
    parseItemsId(itemsJsonData);
    return db.collection("items").insertMany(itemsJsonData);
  },

  async down(db, client) {
    parseItemsId(itemsJsonData);
    const ids = itemsJsonData.map((i) => i._id);
    db.collection("items").deleteMany({
      _id: {
        $in: ids,
      },
    });
  },
};

function parseItemsId(items) {
  items.map((i) => {
    const parsedId = Types.ObjectId(i._id.$oid);
    i._id = parsedId;
  });
}
