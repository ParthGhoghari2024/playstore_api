import { Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import Role from "./roleModel";
import Application from "./applicationModel";

export interface IAppImagesAttributes {
  id?: number;
  appId: number;
  original_filename: string;
  new_filename: string;
  path: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IAppImagesCreationAttributes
  extends Optional<IAppImagesAttributes, "id"> {}
@Table({ tableName: "appImages" })
class AppImages extends Model<
  IAppImagesAttributes,
  IAppImagesCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => Application)
  @Column({ type: DataType.INTEGER })
  appId!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  original_filename!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  new_filename!: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  path!: string;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => Application, "appId")
  application!: Application;
}

export default AppImages;
