require("dotenv").config();
passport = require("passport");
FacebookStrategy = require("passport-facebook").Strategy;

const db = require("../models");
const User = db.users;

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["name", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      const { first_name, last_name, email } = profile._json;
      User.findOne({ email: email }, function (err, data) {
        if (!data) {
          // Save in db
          const user = new User({
            facebookId: profile.id,
            email: email,
            name: first_name,
            surname: last_name,
            type: "CLIENT",
            history: [],
          });
          user.save(user);
        }
      });
      done(null, profile);
    }
  )
);

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
    history: req.body.history,
  });
  User.findOne({ email: req.body.email }, function (err, user1) {
    if (user1) return res.json({ isAuth: false, message: " Account exists, email found" });
    else {
      // Save User in the database
      user
        .save(user)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the User.",
          });
        });
    }
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const email = req.params.email;

  User.findOneAndUpdate({ email: email }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with email=${email}`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating User with email=${email}`,
      });
    });
};

exports.delete = (req, res) => {
  const email = req.params.email;

  User.findOneAndRemove({ email: email })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with email=${email}`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((_) => {
      res.status(500).send({
        message: `Could not delete User with email=${email}`,
      });
    });
};

//delete all users
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

exports.historyid = (req, res) => {
  const email = req.params.email;
  User.findOne({ email: email })
    .distinct("history")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categories. ",
      });
    });
};

exports.findUser = (req, res) => {
  const email = req.params.email;
  User.findOne({ email: email })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User has not been found !`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((_) => {
      res.status(500).send({
        message: "Some error occurred while retrieving user data",
      });
    });
};

exports.orderItems = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const email = req.query.email;
  const cartItems = req.body;

  const filter = { email: email };
  const update = { $push: { history: { $each: cartItems } } };
  User.findOneAndUpdate(filter, update, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find user with email=${email}`,
        });
      } else {
        res.send({ message: "Purchase has been made" });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error - purchase has NOT been made`,
      });
    });
};
