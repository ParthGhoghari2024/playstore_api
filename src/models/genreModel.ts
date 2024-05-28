import { DataTypes, Model, Sequelize } from "sequelize";

export interface IGenreAttributes {
  id?: number;
  genre: string;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
module.exports = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  class GenreModel extends Model<IGenreAttributes> implements IGenreAttributes {
    public id!: number;
    public genre!: string;
    public categoryId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }

  GenreModel.init(
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      genre: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      categoryId: {
        type: DataType.INTEGER,
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
      sequelize,
    }
  );

  return GenreModel;
};
