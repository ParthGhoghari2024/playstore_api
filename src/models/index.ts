import { Sequelize, type SequelizeOptions } from "sequelize-typescript";

import { development } from "../config/config";
import models from "./models";

let sequelize: Sequelize = new Sequelize(
  development.database!,
  development.username!,
  development.password!,
  {
    host: development.host!,
    dialect: "mysql",
    port: 3306,
    // models: [`${__dirname}/`],
  }
);

sequelize.addModels(Object.values(models));

const db = { sequelize, ...models };

export default db;
