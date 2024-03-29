require("dotenv").config();
const passport = require("passport");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const accessControlMiddleware = require("./utils/access-control.middleware");

var corsOptions = { origin: process.env.FRONTEND_URL };
const PORT = 5000;

// Add headers
app.use(accessControlMiddleware.accessControlSetup);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./routes/item.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/shop.routes.js")(app);
require("./routes/auth.routes.js")(app);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
