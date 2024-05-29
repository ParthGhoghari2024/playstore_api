import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import connection from "../config/dbConnect";

export interface IUserAttributes {
  id?: number;
  name: string;
  email: string;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export default class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare roleId: number;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "RoleModel",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "users",
    sequelize: connection,
  }
);
