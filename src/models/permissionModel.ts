import { DataTypes, Model, Sequelize } from "sequelize";

export interface IPermissionAttributes {
  id?: number;
  name: string;
  versionId: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
module.exports = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  class PermissionModel
    extends Model<IPermissionAttributes>
    implements IPermissionAttributes
  {
    public id!: number;
    public name!: string;
    public versionId!: number;
    public description!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }

  PermissionModel.init(
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
      versionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "VersionModel",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: "permissions",
      sequelize,
    }
  );

  return PermissionModel;
};
