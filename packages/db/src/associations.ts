import User from "./models/User";
import Product from "./models/Product";
import Variant from "./models/Variant";
import Cart from "./models/Cart";
import CartItem from "./models/CartItem";
import WishlistItem from "./models/WishListItem";
import Order from "./models/Order";
import OrderItem from "./models/OrderItem";

// User ↔ Cart
User.hasOne(Cart, {
  foreignKey: "userId",
  as: "cart",
});

Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Product ↔ Variant
Product.hasMany(Variant, {
  foreignKey: "productId",
  as: "variants",
});

Variant.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// Cart ↔ CartItem
Cart.hasMany(CartItem, {
  foreignKey: "cartId",
  as: "items",
});

CartItem.belongsTo(Cart, {
  foreignKey: "cartId",
  as: "cart",
});

// CartItem ↔ Product
Product.hasMany(CartItem, {
  foreignKey: "productId",
  as: "cartItems",
});

CartItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// CartItem ↔ Variant
Variant.hasMany(CartItem, {
  foreignKey: "variantId",
  as: "cartItems",
});

CartItem.belongsTo(Variant, {
  foreignKey: "variantId",
  as: "variant",
});

// User ↔ WishlistItem
User.hasMany(WishlistItem, {
  foreignKey: "userId",
  as: "wishlistItems",
});

WishlistItem.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Product ↔ WishlistItem
Product.hasMany(WishlistItem, {
  foreignKey: "productId",
  as: "wishlistItems",
});

WishlistItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// User ↔ Order
User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
});

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Order ↔ OrderItem
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

// OrderItem ↔ Product
Product.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
});

OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// OrderItem ↔ Variant
Variant.hasMany(OrderItem, {
  foreignKey: "variantId",
  as: "orderItems",
});

OrderItem.belongsTo(Variant, {
  foreignKey: "variantId",
  as: "variant",
});