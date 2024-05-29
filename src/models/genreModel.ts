import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import connection from "../config/dbConnect";

export default class GenreModel extends Model<
  InferAttributes<GenreModel>,
  InferCreationAttributes<GenreModel>
> {
  declare id: CreationOptional<number>;
  declare genre: string;
  declare categoryId: number;
}

GenreModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    genre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserModel",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "genres",
    sequelize: connection,
  }
);
