import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import connection from "../config/dbConnect";

export interface ICategoryAttributes {
  id?: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
// module.exports = (sequelize: Sequelize, DataType: typeof DataTypes) => {
export default class CategoryModel extends Model<
  InferAttributes<CategoryModel>,
  InferCreationAttributes<CategoryModel>
> {
  declare id: CreationOptional<number>;
  declare category: string;
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "categories",
    sequelize: connection,
  }
);
