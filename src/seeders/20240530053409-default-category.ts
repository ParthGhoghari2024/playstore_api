import { DataTypes, QueryInterface } from "sequelize";
import { logger } from "../utils/pino";
export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    try {
      const categories: string[] = ["game", "app"];

      categories.forEach((category) => {
        queryInterface.upsert(
          "categories",
          {
            category,
          },
          {},
          { where: { category: category } }
        );
      });
    } catch (error) {
      logger.error(error);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("categories", {}, {});
  },
};
