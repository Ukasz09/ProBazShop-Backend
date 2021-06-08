require("dotenv").config();
const config = {
  mongodb: {
    url: process.env.DB_URL_SHORT,
    databaseName: "",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // connectTimeoutMS: 3600000,
      // socketTimeoutMS: 3600000,
    },
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
};
module.exports = config;
