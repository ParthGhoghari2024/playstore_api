import { DataTypes, Model, Sequelize } from "sequelize";

interface RoleAttributes {
  id?: number;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
module.exports = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  class RoleModel extends Model<RoleAttributes> implements RoleAttributes {
    public id!: number;
    public role!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }

  RoleModel.init(
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataType.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: "roles",
      sequelize,
    }
  );

  return RoleModel;
};
