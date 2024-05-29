import { QueryInterface, DataTypes, Sequelize } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.addColumn("versions", "createdAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("versions", "updatedAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("versions", "deletedAt", {
      allowNull: true,
      type: "timestamp",
      defaultValue: null,
    });
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.removeColumn("versions", "createdAt");
    await queryInterface.removeColumn("versions", "updatedAt");
    await queryInterface.removeColumn("versions", "deletedAt");
  },
};
