import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import connection from "../config/dbConnect";

interface RoleAttributes {
  id?: number;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export default class RoleModel
  extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>>
  implements RoleAttributes
{
  declare id: CreationOptional<number>;
  declare role: string;
}

RoleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "roles",
    sequelize: connection,
  }
);
