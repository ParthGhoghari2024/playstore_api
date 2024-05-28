import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn("users", "deletedAt", {
      type: Sequelize.DATE,
      defaultValue: null,
    });
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {},
};
