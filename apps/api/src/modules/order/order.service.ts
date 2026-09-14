import { AppError } from "../../utils/AppError";
import { sequelize, Cart, CartItem, Product, Variant, Order, OrderItem } from "@ecommerce/db";

export async function createOrder(userId: string, address: string) {
  return sequelize.transaction(async (transaction) => {
    const cart = await Cart.findOne({
      where: { userId },
      transaction,
    });

    if (!cart) {
      throw new AppError("Cart is empty", 400);
    }

    const cartItems = await CartItem.findAll({
      where: { cartId: cart.id },
      transaction,
    });

    if (cartItems.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    let totalCents = 0;

    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId, {
        transaction,
      });

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      const variant = item.variantId
        ? await Variant.findByPk(item.variantId, {
            transaction,
          })
        : null;

      if (item.variantId && !variant) {
        throw new AppError("Product variant not found", 404);
      }

      const stock = variant
        ? variant.stockQuantity
        : product.stockQuantity;

      if (stock < item.quantity) {
        throw new AppError(
          `Insufficient stock for ${product.title}`,
          400,
        );
      }

      const price = variant
        ? Number(variant.price)
        : Number(product.price);

      totalCents += Math.round(price * 100) * item.quantity;
    }

    const total = (totalCents / 100).toFixed(2);

    const order = await Order.create(
      {
        userId,
        address,
        total,
        status: "confirmed",
      },
      { transaction },
    );

    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId, {
        transaction,
      });

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      const variant = item.variantId
        ? await Variant.findByPk(item.variantId, {
            transaction,
          })
        : null;

      const unitPrice = variant
        ? Number(variant.price)
        : Number(product.price);

      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: unitPrice.toFixed(2),
        },
        { transaction },
      );

      if (variant) {
        await variant.decrement("stockQuantity", {
          by: item.quantity,
          transaction,
        });
      }

      await product.decrement("stockQuantity", {
        by: item.quantity,
        transaction,
      });
    }

    await CartItem.destroy({
      where: { cartId: cart.id },
      transaction,
    });

    return order;
  });
}
