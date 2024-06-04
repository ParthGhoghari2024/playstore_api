import { DataTypes, QueryInterface } from "sequelize";
import { logger } from "../utils/pino";
import db from "../models";
import { Op } from "sequelize";
import { ICategoryAttributes } from "../models/categoryModel";
export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    try {
      let category_list: string[] = ["game", "app"];

      let categoryObj: ICategoryAttributes[] = [];

      category_list.forEach((category) => {
        categoryObj.push({
          category: category,
        });
      });

      await db.Category.bulkCreate(categoryObj, {
        fields: ["category"],
        updateOnDuplicate: ["category"],
      });
    } catch (error) {
      logger.error(error);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    let category_list: string[] = ["game", "app"];

    await queryInterface.bulkDelete("category", {
      category: category_list,
    });
  },
};
