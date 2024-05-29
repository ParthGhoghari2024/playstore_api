import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { logger } from "../utils/pino";
module.exports = {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "permissions",
        "createdAt",
        {
          allowNull: false,
          type: "timestamp",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        {
          transaction,
        }
      );
      await queryInterface.addColumn(
        "permissions",
        "updatedAt",
        {
          allowNull: false,
          type: "timestamp",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        {
          transaction,
        }
      );
      await queryInterface.addColumn(
        "permissions",
        "deletedAt",
        {
          allowNull: true,
          type: "timestamp",
          defaultValue: null,
        },
        {
          transaction,
        }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("permissions", "createdAt", {
        transaction,
      });
      await queryInterface.removeColumn("permissions", "updatedAt", {
        transaction,
      });
      await queryInterface.removeColumn("permissions", "deletedAt", {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
