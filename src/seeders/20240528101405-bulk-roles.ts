import { DataTypes, QueryInterface } from "sequelize";
import { logger } from "../utils/pino";
export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    try {
      await queryInterface.bulkInsert(
        "roles",
        [
          {
            role: "user",
          },
          {
            role: "admin",
          },
        ],
        {}
      );
    } catch (error) {
      logger.error(error);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("roles", {}, {});
  },
};
