import { Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
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
import InstalledApp from "./installedAppModel";
import Country from "./countryModel";
import Rating from "./ratingModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const salt: number = Number(process.env.SALT);

export interface IUserAttributes {
  id?: number;
  name: string;
  email: string;
  roleId: number;
  password?: string;
  countryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
const hashedDefaultPw: string = bcrypt.hashSync("12345678", salt);

interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> {}
@Table({ tableName: "users" })
class User extends Model<IUserAttributes, IUserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Unique(true)
  @Column({ type: DataType.STRING(255) })
  name!: string;

  @AllowNull(false)
  @Unique(true)
  @Column({ type: DataType.STRING(255) })
  email!: string;

  @AllowNull(false)
  @Default(hashedDefaultPw)
  @Column({ type: DataType.STRING(255) })
  password!: string;

  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId!: number;

  @AllowNull(false)
  @ForeignKey(() => Country)
  @Column({ type: DataType.INTEGER })
  countryId!: number;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => Application, "developerId")
  application!: Application[];

  @BelongsToMany(() => Application, () => InstalledApp)
  applications!: Application[];

  @BelongsTo(() => Role, "roleId")
  role!: Role;

  @BelongsTo(() => Country, "countryId")
  country!: Country;

  @HasMany(() => Rating, "userId")
  ratings!: Rating[];
}

export default User;
