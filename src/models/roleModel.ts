import { DataTypes, Optional } from "sequelize";
import db from ".";
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
interface IRoleAttributes {
  id?: number;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IRoleCreationAttributes extends Optional<IRoleAttributes, "id"> {}

@Table({ tableName: "roles" })
class Role extends Model<IRoleAttributes, IRoleCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  role!: string;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;
}

export default Role;
