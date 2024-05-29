import { DataTypes, QueryInterface, Sequelize } from "sequelize";
import { logger } from "../utils/pino";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "roles",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          role: {
            type: DataTypes.STRING(30),
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
      await queryInterface.createTable(
        "users",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING(30),
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING(30),
            allowNull: false,
          },
          roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "roles",
              key: "id",
            },
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

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("users", { transaction });
      await queryInterface.dropTable("roles", { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
