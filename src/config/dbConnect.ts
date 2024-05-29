import { Sequelize } from "sequelize";
import { development } from "./config";

let sequelizeConnection: Sequelize = new Sequelize(
  development.database!,
  development.username!,
  development.password!,
  {
    host: development.host!,
    dialect: "mysql",
    port: 3306,
  }
);

export default sequelizeConnection;
