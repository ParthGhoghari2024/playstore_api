import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { logger } from "../utils/pino";
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint("users", {
        fields: ["name"],
        type: "unique",
        name: "unique_name",
        transaction,
      });
      await queryInterface.addConstraint("users", {
        fields: ["email"],
        type: "unique",
        name: "unique_email",
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
      await queryInterface.removeConstraint("users", "unique_name", {
        transaction,
      });

      await queryInterface.removeConstraint("users", "unique_email", {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
