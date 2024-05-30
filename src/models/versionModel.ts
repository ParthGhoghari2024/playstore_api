import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import connection from "../config/dbConnect";

export interface IVersionAttributes {
  id?: number;
  applicationId: number;
  version: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export default class Version extends Model<
  InferAttributes<Version>,
  InferCreationAttributes<Version>
> {
  declare id: CreationOptional<number>;
  declare applicationId: number;
  declare description: string;
  declare version: string;
}

Version.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ApplicationModel",
        key: "id",
      },
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "versions",
    sequelize: connection,
  }
);
