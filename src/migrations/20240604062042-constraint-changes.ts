import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { logger } from "../utils/pino";
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint("genres", "unique_genre", {
        transaction,
      });
      await queryInterface.addConstraint("genres", {
        fields: ["genre", "categoryId", "deletedAt"],
        type: "unique",
        name: "unique_genre",
        transaction,
      });

      await queryInterface.removeConstraint("categories", "unique_category", {
        transaction,
      });

      await queryInterface.addConstraint("categories", {
        fields: ["category", "deletedAt"],
        type: "unique",
        name: "unique_category",
        transaction,
      });

      await queryInterface.removeConstraint("roles", "unique_role", {
        transaction,
      });

      await queryInterface.addConstraint("roles", {
        fields: ["role", "deletedAt"],
        type: "unique",
        name: "unique_role",
        transaction,
      });

      await queryInterface.removeConstraint("users", "unique_name", {
        transaction,
      });

      await queryInterface.removeConstraint("users", "unique_email", {
        transaction,
      });

      await queryInterface.addConstraint("users", {
        fields: ["name", "deletedAt"],
        type: "unique",
        name: "unique_name",
        transaction,
      });
      await queryInterface.addConstraint("users", {
        fields: ["email", "deletedAt"],
        type: "unique",
        name: "unique_email",
        transaction,
      });

      await queryInterface.removeConstraint("countries", "unique_country", {
        transaction,
      });

      await queryInterface.addConstraint("countries", {
        fields: ["country", "deletedAt"],
        type: "unique",
        name: "unique_country",
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
      await queryInterface.removeConstraint("genres", "unique_genre", {
        transaction,
      });
      await queryInterface.addConstraint("genres", {
        fields: ["genre", "categoryId"],
        type: "unique",
        name: "unique_genre",
        transaction,
      });
      await queryInterface.removeConstraint("categories", "unique_category", {
        transaction,
      });
      await queryInterface.addConstraint("categories", {
        fields: ["category"],
        type: "unique",
        name: "unique_category",
        transaction,
      });
      await queryInterface.removeConstraint("roles", "unique_role", {
        transaction,
      });
      await queryInterface.addConstraint("roles", {
        fields: ["role"],
        type: "unique",
        name: "unique_role",
        transaction,
      });

      await queryInterface.removeConstraint("users", "unique_name", {
        transaction,
      });

      await queryInterface.removeConstraint("users", "unique_email", {
        transaction,
      });

      await queryInterface.addConstraint("users", {
        fields: ["name"],
        type: "unique",
        name: "unique_name",
        transaction,
      });
      await queryInterface.addConstraint("users", {
        fields: ["email"],
        type: "unique",
        name: "unique_email",
        transaction,
      });

      await queryInterface.removeConstraint("countries", "unique_country", {
        transaction,
      });
      await queryInterface.addConstraint("countries", {
        fields: ["country"],
        type: "unique",
        name: "unique_country",
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
