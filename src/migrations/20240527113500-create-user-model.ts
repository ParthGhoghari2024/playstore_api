import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("UserModels", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable("UserModels");
  },
};
