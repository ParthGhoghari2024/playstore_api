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
import Version from "./versionModel";

export interface IPermissionAttributes {
  id?: number;
  name: string;
  versionId: number;
  description: string;
}

interface IPermissionCreationAttributes
  extends Optional<IPermissionAttributes, "id"> {}
@Table({ tableName: "permissions" })
class Permission extends Model<
  IPermissionAttributes,
  IPermissionCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  name!: string;

  @AllowNull(false)
  @ForeignKey(() => Version)
  @Column({ type: DataType.INTEGER })
  versionId!: number;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  description!: string;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;
}

export default Permission;
