import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import connection from "../config/dbConnect";
import UserModel from "./userModel";
import CategoryModel from "./categoryModel";
import GenreModel from "./genreModel";

export default class Application extends Model<
  InferAttributes<Application>,
  InferCreationAttributes<Application>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare developerId: number;
  declare description: string;
  declare categoryId: number;
  declare genreId: number;
}

Application.init(
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
        model: UserModel,
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
        model: CategoryModel,
        key: "id",
      },
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: GenreModel,
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

UserModel.hasMany(Application, {
  foreignKey: "developerId",
});
Application.belongsTo(UserModel, {
  foreignKey: "developerId",
});

Application.belongsTo(GenreModel, {
  foreignKey: "genreId",
});
GenreModel.hasMany(Application, {
  foreignKey: "genreId",
});

Application.belongsTo(CategoryModel, {
  foreignKey: "categoryId",
});

CategoryModel.hasMany(Application, {
  foreignKey: "categoryId",
});
