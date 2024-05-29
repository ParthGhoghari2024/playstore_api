import { QueryInterface, DataTypes, Sequelize } from "sequelize";
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.changeColumn("genres", "createdAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.changeColumn("genres", "updatedAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.changeColumn("genres", "deletedAt", {
      allowNull: true,
      type: "timestamp",
      defaultValue: null,
    });

    await queryInterface.changeColumn("genres", "categoryId", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    });
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.changeColumn("genres", "createdAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.changeColumn("genres", "updatedAt", {
      allowNull: false,
      type: "timestamp",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.changeColumn("genres", "deletedAt", {
      allowNull: true,
      type: "timestamp",
      defaultValue: null,
    });
    await queryInterface.changeColumn("genres", "categoryId", {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  },
};
