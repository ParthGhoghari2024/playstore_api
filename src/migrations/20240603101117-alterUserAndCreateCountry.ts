import { DataTypes, QueryInterface, Sequelize } from "sequelize";
import { logger } from "../utils/pino";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "countries",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          country: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: "timestamp",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          updatedAt: {
            allowNull: false,
            type: "timestamp",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          deletedAt: {
            allowNull: true,
            type: "timestamp",
            defaultValue: null,
          },
        },

        { transaction }
      );

      await queryInterface.bulkInsert("countries", [{ country: "India" }]);

      await queryInterface.addConstraint("countries", {
        fields: ["country"],
        type: "unique",
        name: "unique_country",
      });
      await queryInterface.addColumn(
        "users",
        "countryId",
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("countries", { transaction });
      await queryInterface.removeConstraint("countries", "unique_country");

      await queryInterface.removeColumn("users", "countryId", { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
