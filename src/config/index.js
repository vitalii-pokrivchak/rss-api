const { join } = require("path");
require("dotenv").config({
  path: join(__dirname, "..", "..", ".env"),
});

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const NODE_ENV = process.env.NODE_ENV || "development";
const PARSER_INTERVAL = process.env.PARSER_INTERVAL || "0 */6 * * *";

module.exports = {
  PORT,
  MONGO_URL,
  NODE_ENV,
  PARSER_INTERVAL,
};
