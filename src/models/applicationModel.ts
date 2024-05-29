import { DataTypes, Model, Sequelize } from "sequelize";

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
module.exports = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  class ApplicationModel
    extends Model<IApplicationAttributes>
    implements IApplicationAttributes
  {
    public id!: number;
    public name!: string;
    public developerId!: number;
    public description!: string;
    public categoryId!: number;
    public genreId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
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
      sequelize,
    }
  );

  return ApplicationModel;
};
