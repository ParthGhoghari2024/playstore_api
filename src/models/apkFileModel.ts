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
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
  createIndexDecorator,
} from "sequelize-typescript";
import Application from "./applicationModel";
import Version from "./versionModel";
import { Op } from "sequelize";

export interface IApkAttributes {
  id?: number;
  appId: number;
  versionId: number;
  original_filename: string;
  new_filename: string;
  path: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IApkCreationAttributes extends Optional<IApkAttributes, "id"> {}
@Table({
  indexes: [
    {
      fields: ["appId", "versionId"],
      unique: true,
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
    },
  ],
  tableName: "apkFiles",
})
class ApkFile extends Model<IApkAttributes, IApkCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => Application)
  @Column({ type: DataType.INTEGER })
  appId!: number;

  @AllowNull(false)
  @ForeignKey(() => Application)
  @Column({ type: DataType.INTEGER })
  versionId!: number;

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

  @BelongsTo(() => Version, "versionId")
  version!: Version;
}

export default ApkFile;
