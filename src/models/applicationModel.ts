import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Optional,
  Sequelize,
} from "sequelize";
import connection from "../config/dbConnect";
export interface IApplicationAttributes {
  id?: number;
  name: string;
  developerId: number;
  description: string;
  categoryId: number;
  genreId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export default class ApplicationModel extends Model<
  InferAttributes<ApplicationModel>,
  InferCreationAttributes<ApplicationModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare developerId: number;
  declare description: string;
  declare categoryId: number;
  declare genreId: number;
}

ApplicationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    developerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserModel",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categoryModel",
        key: "id",
      },
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "GenreModel",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "applications",
    sequelize: connection,
  }
);
