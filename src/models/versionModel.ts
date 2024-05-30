import { DataTypes, Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
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
import Application from "./applicationModel";
export interface IVersionAttributes {
  id?: number;
  applicationId: number;
  version: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IVersionCreationAttributes
  extends Optional<IVersionAttributes, "id"> {}

@Table({ tableName: "versions" })
class Version extends Model<IVersionAttributes, IVersionCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => Application)
  @Column({ type: DataType.INTEGER })
  applicationId!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  version!: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  description!: string;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => Application, "applicationId")
  application!: Application;
}

export default Version;
