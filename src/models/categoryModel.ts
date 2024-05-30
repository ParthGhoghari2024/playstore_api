import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";

export interface ICategoryAttributes {
  id?: number;
  category: string;
}

interface ICategoryCreationAttributes
  extends Optional<ICategoryAttributes, "id"> {}

@Table({ tableName: "categories" })
class Category extends Model<ICategoryAttributes, ICategoryCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  category!: string;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;
}

export default Category;
