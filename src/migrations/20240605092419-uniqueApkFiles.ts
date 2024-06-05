import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { logger } from "../utils/pino";
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addIndex("apkFiles", ["appId", "versionId"], {
        unique: true,
        name: "uniqueApkFiles",
        where: {
          deletedAt: null,
        },
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeIndex("apkFiles", "uniqueApkFiles");
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
