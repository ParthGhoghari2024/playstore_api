import { Dialect, Sequelize } from "sequelize";

import { logger } from "../utils/pino";
import dotenv from "dotenv";
import { IDbConfigObj } from "../types/config";

dotenv.config();

const DB_DATABASE: string = process.env.DB_DATABASE as string;
const DB_USER: string = process.env.DB_USER as string;
const DB_PASSWORD: string = process.env.DB_PASSWORD as string;

const DB_DIALECT: Dialect = "mysql";
const DB_HOST: string = process.env.DB_HOST as string;
const sequelize: Sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: (log) => logger.info(log),
});

const connectToDatabase = async (): Promise<null> => {
  try {
    // sequelize.sync();
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (error) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};
const db: IDbConfigObj = {
  sequelize: sequelize,
  connectToDatabase: connectToDatabase,
};

export default db;
