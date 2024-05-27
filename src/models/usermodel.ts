import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class UserModel extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }

  UserModel.init(
    {
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
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: "users",
      sequelize,
    }
  );

  return UserModel;
};
