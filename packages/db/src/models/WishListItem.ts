import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../sequelize";

class WishlistItem extends Model<
  InferAttributes<WishlistItem>,
  InferCreationAttributes<WishlistItem>
> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare productId: string;
  declare createdAt: CreationOptional<Date>;
}

WishlistItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "product_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "wishlist_items",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "product_id"],
      },
      {
        fields: ["user_id"],
      },
    ],
  },
);

export default WishlistItem;