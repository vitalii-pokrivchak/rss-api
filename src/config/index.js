const { join } = require("path");
require("dotenv").config({
  path: join(__dirname, "..", "..", ".env"),
});

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const NODE_ENV = process.env.NODE_ENV || "development";
const LOG_DIR = process.env.LOG_DIR || "/var/log/rss-api/";
const LOG_FILENAME_DATEPATTERN =
  process.env.LOG_FILENAME_DATEPATTERN || "YYYY-MM-DD";
const PARSER_INTERVAL = process.env.PARSER_INTERVAL || "* * * * *";
const RSS_RESOURCE_URL =
  process.env.RSS_RESOURCE_URL || "https://lifehacker.com/rss";

module.exports = {
  PORT,
  MONGO_URL,
  NODE_ENV,
  PARSER_INTERVAL,
  LOG_DIR,
  LOG_FILENAME_DATEPATTERN,
  RSS_RESOURCE_URL,
};
