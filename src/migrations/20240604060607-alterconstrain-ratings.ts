import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { logger } from "../utils/pino";
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint("ratings", "foreignkey_userId", {
        transaction,
      });
      await queryInterface.removeConstraint("ratings", "foreignkey_appId", {
        transaction,
      });
      await queryInterface.removeConstraint("ratings", "unique_user_app_pair", {
        transaction,
      });
      await queryInterface.addConstraint("ratings", {
        fields: ["userId", "appId", "deletedAt"],
        type: "unique",
        name: "unique_user_app_pair",
        transaction,
      });

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

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint("ratings", "unique_user_app_pair", {
        transaction,
      });
      await queryInterface.addConstraint("ratings", {
        fields: ["userId", "appId"],
        type: "unique",
        name: "unique_user_app_pair",
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
