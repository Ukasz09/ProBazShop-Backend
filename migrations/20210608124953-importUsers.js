const { Types } = require("mongoose");
const usersJsonData = require("../json/users.json");

module.exports = {
  async up(db, client) {
    parseUsersId(usersJsonData);
    return db.collection("users").insertMany(usersJsonData);
  },

  async down(db, client) {
    parseUsersId(usersJsonData);
    const ids = usersJsonData.map((i) => i._id);
    db.collection("users").deleteMany({
      _id: {
        $in: ids,
      },
    });
  },
};

function parseUsersId(users) {
  users.map((i) => {
    const parsedId = Types.ObjectId(i._id.$oid);
    i._id = parsedId;
  });
}
