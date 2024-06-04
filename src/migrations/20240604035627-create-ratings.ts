import { DataTypes, QueryInterface, Sequelize } from "sequelize";
import { logger } from "../utils/pino";

export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "ratings",
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
          appId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          comment: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          rating: {
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

      await queryInterface.addConstraint("ratings", {
        fields: ["userId"],
        type: "foreign key",
        name: "foreignkey_userId",
        references: {
          table: "users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        transaction,
      });

      await queryInterface.addConstraint("ratings", {
        fields: ["appId"],
        type: "foreign key",
        name: "foreignkey_appId",
        references: {
          table: "applications",
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
      await queryInterface.dropTable("ratings", { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
