import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../sequelize";

class Variant extends Model<
  InferAttributes<Variant>,
  InferCreationAttributes<Variant>
> {
  declare id: CreationOptional<string>;
  declare productId: string;
  declare options: Record<string, string>;
  declare price: string;
  declare imageUrl: string;
  declare stockQuantity: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Variant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "product_id",
    },
    options: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image_url",
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "stock_quantity",
      validate: {
        min: 0,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "variants",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["product_id"],
      },
    ],
  },
);

export default Variant;