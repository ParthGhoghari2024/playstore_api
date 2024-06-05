import { QueryInterface, DataTypes, Sequelize } from "sequelize";
import { logger } from "../utils/pino";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
export default {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    const salt: number = Number(process.env.SALT);

    try {
      const hashedDefaultPw: string = bcrypt.hashSync("12345678", salt);
      await queryInterface.addColumn("users", "password", {
        type: DataType.STRING(255),
        allowNull: false,
        defaultValue: hashedDefaultPw,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },

  async down(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("users", "password");
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(error);
    }
  },
};
