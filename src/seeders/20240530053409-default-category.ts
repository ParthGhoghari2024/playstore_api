import { DataTypes, QueryInterface } from "sequelize";
export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    const categories: string[] = ["game", "app"];

    console.log(queryInterface);
    categories.forEach((category) => {
      queryInterface.upsert(
        "categories",
        {
          category,
        },
        { category },
        { category }
      );
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("roles", {}, {});
  },
};
