import { logger } from "../utils/pino";
import path from "path";
import dotenv from "dotenv";
dotenv.config({});

const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: (log: string) => logger.info(log),
};
const test = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
  logging: (log: string) => logger.info(log),
};
const production = {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
  logging: (log: string) => logger.info(log),
};
const config = {
  development,
  test,
  production,
};
export { development, test, production };
export default config;
