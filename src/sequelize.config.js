
require('ts-node/register');
const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 3306,
};
