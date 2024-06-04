import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { logger } from "../utils/pino";
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
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
      await queryInterface.removeConstraint(
        "installedApps",
        "unique_user_app_pair",
        {
          transaction,
        }
      );
      await queryInterface.addConstraint("installedApps", {
        fields: ["userId", "applicationId", "deletedAt"],
        type: "unique",
        name: "unique_user_app_pair",
        transaction,
      });

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

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        "installedApps",
        "unique_user_app_pair",
        {
          transaction,
        }
      );

      //previous constraint
      await queryInterface.addConstraint("installedApps", {
        fields: ["userId", "applicationId"],
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
