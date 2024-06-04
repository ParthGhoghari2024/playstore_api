import { DataTypes, Optional } from "sequelize";
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
import User from "./userModel";
export interface ICountryAttributes {
  id?: number;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface ICountryCreationAttributes
  extends Optional<ICountryAttributes, "id"> {}

@Table({ tableName: "countries" })
class Country extends Model<ICountryAttributes, ICountryCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Unique(true)
  @Column({ type: DataType.STRING(255) })
  country!: string;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => User)
  users!: User[];
}

export default Country;
