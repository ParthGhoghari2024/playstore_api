import { QueryInterface, DataTypes } from "sequelize";
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.createTable("permissions", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      versionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "versions",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.dropTable("permissions");
  },
};
