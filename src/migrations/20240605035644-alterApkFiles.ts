import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { logger } from "../utils/pino";
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
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

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint("apkFiles", "unique_apkFiles", {
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
};
