import { DataTypes, QueryInterface } from "sequelize";
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.createTable("versions", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "applications",
          key: "id",
        },
      },
      version: {
        type: DataType.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.dropTable("versions");
  },
};
