import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn("users", "temp", DataTypes.STRING);
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeColumn("users", "temp");
  },
};
