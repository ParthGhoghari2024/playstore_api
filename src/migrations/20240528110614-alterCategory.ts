import { QueryInterface, DataTypes, Sequelize } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.changeColumn("categories", "createdAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.changeColumn("categories", "updatedAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.changeColumn("categories", "deletedAt", {
      allowNull: true,
      type: "timestamp",
      defaultValue: null,
    });
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.changeColumn("categories", "createdAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.changeColumn("categories", "updatedAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.changeColumn("categories", "deletedAt", {
      allowNull: true,
      type: "timestamp",
      defaultValue: null,
    });
  },
};
