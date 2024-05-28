import { DataTypes, QueryInterface } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          role: "user",
        },
        {
          role: "admin",
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("roles", {}, {});
  },
};
