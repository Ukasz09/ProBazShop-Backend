const db = require("../models");
const shop = db.shop;

exports.all = (req, res) => {
  shop
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Data fetching error",
      });
    });
};
