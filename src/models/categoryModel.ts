import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import Application from "./applicationModel";
import Genre from "./genreModel";

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
  @Unique(true)
  @Column({ type: DataType.STRING(255) })
  category!: string;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => Application, "categoryId")
  applications!: Application[];

  @HasMany(() => Genre, "categoryId")
  categories!: Genre[];
}

export default Category;
