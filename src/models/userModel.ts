import { DataTypes, Optional } from "sequelize";
import ApplicationModel from "./applicationModel";
import {
  AllowNull,
  AutoIncrement,
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
import Role from "./roleModel";
import Application from "./applicationModel";

export interface IUserAttributes {
  id?: number;
  name: string;
  email: string;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> {}
@Table({ tableName: "users" })
class User extends Model<IUserAttributes, IUserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  name!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  email!: string;

  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId!: number;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => Application, "developerId")
  application!: Application[];
}

export default User;
