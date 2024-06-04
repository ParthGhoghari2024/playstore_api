import { DataTypes, QueryInterface, Sequelize } from "sequelize";
import { logger } from "../utils/pino";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "installedApps",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },

          applicationId: {
            type: DataTypes.INTEGER,
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

      await queryInterface.addConstraint("installedApps", {
        fields: ["userId"],
        type: "foreign key",
        name: "userId_foreignkey",
        references: {
          table: "users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      });

      await queryInterface.addConstraint("installedApps", {
        fields: ["applicationId"],
        type: "foreign key",
        name: "applicationId_foreignkey",
        references: {
          table: "applications",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
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
      await queryInterface.dropTable("installedApps", { transaction });
      await queryInterface.removeConstraint(
        "installedApps",
        "userId_foreignkey",
        { transaction }
      );
      await queryInterface.removeConstraint(
        "installedApps",
        "applicationId_foreignkey",
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
