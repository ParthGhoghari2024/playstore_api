import { DataTypes, Model, Sequelize } from "sequelize";

export interface IVersionAttributes {
  id?: number;
  applicationId: number;
  version: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
module.exports = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  class VersionModel
    extends Model<IVersionAttributes>
    implements IVersionAttributes
  {
    public id!: number;
    public applicationId!: number;
    public description!: string;
    public version!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }

  VersionModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ApplicationModel",
          key: "id",
        },
      },
      version: {
        type: DataType.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: "versions",
      sequelize,
    }
  );

  return VersionModel;
};
