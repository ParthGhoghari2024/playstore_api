import { DataTypes, QueryInterface, Sequelize } from "sequelize";
import { logger } from "../utils/pino";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "apkFiles",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          appId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          versionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          original_filename: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          new_filename: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          path: {
            type: DataTypes.TEXT,
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

      await queryInterface.addConstraint("apkFiles", {
        fields: ["appId"],
        type: "foreign key",
        name: "apkFiles_foreignkey_appId",
        references: {
          table: "applications",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        transaction,
      });

      await queryInterface.addConstraint("apkFiles", {
        fields: ["versionId"],
        type: "foreign key",
        name: "apkFiles_foreignkey_versionId",
        references: {
          table: "versions",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        transaction,
      });

      await queryInterface.addConstraint("apkFiles", {
        fields: ["appId", "versionId"],
        type: "unique",
        name: "unique_apkFiles",
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
      await queryInterface.dropTable("apkFiles", { transaction });

      await queryInterface.removeConstraint(
        "apkFiles",
        "apkFiles_foreignkey_appId"
      );

      await queryInterface.removeConstraint(
        "apkFiles",
        "apkFiles_foreignkey_versionId",
        { transaction }
      );

      await queryInterface.removeConstraint("apkFiles", "unique_apkFiles", {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
