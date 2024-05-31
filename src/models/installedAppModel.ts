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
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import Application from "./applicationModel";
import User from "./userModel";

export interface IInstalledAttributes {
  id?: number;
  userId: number;
  applicationId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IUserCreationAttributes
  extends Optional<IInstalledAttributes, "id"> {}
@Table({
  tableName: "installedApps",
  indexes: [
    {
      name: "unique_user_app_pair",
      unique: true,
      fields: ["userId", "applicationId"],
    },
  ],
})
class InstalledApp extends Model<
  IInstalledAttributes,
  IUserCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @AllowNull(false)
  @ForeignKey(() => Application)
  @Column({ type: DataType.INTEGER })
  applicationId!: number;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Application)
  application!: Application;
}

export default InstalledApp;
