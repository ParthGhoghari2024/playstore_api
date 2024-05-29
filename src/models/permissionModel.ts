import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import connection from "../config/dbConnect";

export interface IPermissionAttributes {
  id?: number;
  name: string;
  versionId: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default class PermissionModel extends Model<
  InferAttributes<PermissionModel>,
  InferCreationAttributes<PermissionModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare versionId: number;
  declare description: string;
}

PermissionModel.init(
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
    versionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "VersionModel",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "permissions",
    sequelize: connection,
  }
);
