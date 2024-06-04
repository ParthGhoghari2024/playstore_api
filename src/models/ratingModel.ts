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
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import User from "./userModel";
import Application from "./applicationModel";

export interface IRatingAttributes {
  id?: number;
  userId: number;
  appId: number;
  comment?: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IRatingCreationAttributes extends Optional<IRatingAttributes, "id"> {}
@Table({ tableName: "ratings" })
class Rating extends Model<IRatingAttributes, IRatingCreationAttributes> {
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
  appId!: number;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  comment!: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  rating!: number;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => User, "userId")
  user!: User;

  @BelongsTo(() => Application, "appId")
  application!: Application;
}

export default Rating;
