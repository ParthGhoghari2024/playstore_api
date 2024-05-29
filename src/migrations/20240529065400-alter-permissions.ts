import { QueryInterface, DataTypes, Sequelize } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.addColumn("permissions", "createdAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("permissions", "updatedAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("permissions", "deletedAt", {
      allowNull: true,
      type: "timestamp",
      defaultValue: null,
    });
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.removeColumn("permissions", "createdAt");
    await queryInterface.removeColumn("permissions", "updatedAt");
    await queryInterface.removeColumn("permissions", "deletedAt");
  },
};
