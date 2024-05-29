import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { logger } from "../utils/pino";
module.exports = {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint("roles", {
        fields: ["role"],
        type: "unique",
        name: "unique_role",
        transaction,
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
      await queryInterface.removeConstraint("roles", "unique_role", {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
