import { DataTypes, QueryInterface, Sequelize } from "sequelize";
import { logger } from "../utils/pino";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint("users", {
        fields: ["countryId"],
        type: "foreign key",
        name: "foreignkey_countryId",
        references: {
          table: "countries",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint("users", "foreignkey_countryId", {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
