import connection from "../config/dbConnect";
import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import Category from "./categoryModel";

export interface IGenreAttributes {
  id?: number;
  genre: string;
  categoryId: number;
}

interface IGenreCreationAttributes extends Optional<IGenreAttributes, "id"> {}
@Table({ tableName: "genres" })
class Genre extends Model<IGenreAttributes, IGenreCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  genre!: string;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId!: number;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;
}
export default Genre;
