import { Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import User from "./userModel";
import Category from "./categoryModel";
import Genre from "./genreModel";
import Version from "./versionModel";
import InstalledApp from "./installedAppModel";
export interface IApplicationAttributes {
  id?: number;
  name?: string;
  developerId?: number;
  description?: string;
  categoryId?: number;
  genreId?: number;
}

export interface IApplicationCreationAttributes
  extends Optional<IApplicationAttributes, "id"> {}
@Table({ tableName: "applications" })
class Application extends Model<
  IApplicationAttributes,
  IApplicationCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  name!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  developerId!: number;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  description!: string;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId!: number;

  @AllowNull(false)
  @ForeignKey(() => Genre)
  @Column({ type: DataType.INTEGER })
  genreId!: number;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => User, "developerId")
  developer!: User;

  @BelongsTo(() => Genre, "genreId")
  genre!: Genre;

  @BelongsTo(() => Category, "categoryId")
  category!: Category;

  @HasMany(() => Version, "applicationId")
  versions!: Version[];

  @BelongsToMany(() => User, () => InstalledApp)
  users!: User[];
}

export default Application;
