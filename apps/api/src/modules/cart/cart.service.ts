import { Cart, CartItem, Product, Variant } from "@ecommerce/db";
import { AppError } from "../../utils/AppError";

export async function getCart(userId: string) {
  let cart = await Cart.findOne({
    where: {
      userId,
    },
    include: [
      {
        model: CartItem,
        as: "items",
        include: [
          {
            model: Product,
            as: "product",

            include: [
              {
                model: Variant,
                as: "variants",
              }
            ]
          },
          {
            model: Variant,
            as: "variant",
          },
        ],
      },
    ],
  });

  if (!cart) {
    await Cart.create({
      userId,
    });

    //query the cart again so if it is created now the response will also include items. We can ensure response consistency this way

    cart = await Cart.findOne({
      where: {
        userId,
      },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
            },
            {
              model: Variant,
              as: "variant",
            },
          ],
        },
      ],
    });
  }

  return cart;
}

export async function addToCart(
  userId: string,
  productSlug: string,
  variantId: string | undefined,
  quantity: number
) {
  const product = await Product.findOne({
    where: {
        slug: productSlug,
    },
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const variantCount = await Variant.count({
    where: {
        productId: product.id,
    },
  });

  if(variantCount > 0 && !variantId) {
    throw new AppError("Variant is required for this product", 400);
  }

  if(variantCount === 0 && variantId) {
    throw new AppError("This product does not have variants", 400);
  }

  let variant: Variant | null = null;

  if (variantId) {
    variant = await Variant.findOne({
      where: {
        id: variantId,
        productId: product.id,
      },
    });

    if (!variant) {
      throw new AppError("Variant not found for this product", 404);
    }
  }

  const stock = variant
    ? variant.stockQuantity
    : product.stockQuantity;

  if (quantity > stock) {
    throw new AppError("Not enough stock available", 400);
  }

  let cart = await Cart.findOne({
    where: {
      userId,
    },
  });

  if (!cart) {
    cart = await Cart.create({
      userId,
    });
  }

  const existingItem = await CartItem.findOne({
    where: {
      cartId: cart.id,
      productId: product.id,
      variantId: variantId ?? null,
    },
  });

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity > stock) {
      throw new AppError("Not enough stock available", 400);
    }

    existingItem.quantity = newQuantity;
    await existingItem.save();

    return existingItem;
  }

  return CartItem.create({
    cartId: cart.id,
    productId: product.id,
    variantId: variantId ?? null,
    quantity,
  });
}

export async function updateCartItem(
  userId: string,
  itemId: string,
  quantity?: number,
  variantId?: string
) {
  const cart = await Cart.findOne({
    where: {
      userId,
    },
  });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const cartItem = await CartItem.findOne({
    where: {
      id: itemId,
      cartId: cart.id,
    },
  });

  if (!cartItem) {
    throw new AppError("Cart item not found", 404);
  }

  if (variantId !== undefined) {
    const variant = await Variant.findOne({
      where: {
        id: variantId,
        productId: cartItem.productId,
      },
    });

    if (!variant) {
      throw new AppError("Variant not found for this product", 404);
    }

    const existingItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: cartItem.productId,
        variantId,
      },
    });

    const newQuantity = quantity ?? cartItem.quantity;

    if (newQuantity > variant.stockQuantity) {
      throw new AppError("Not enough stock available", 400);
    }

    if (existingItem && existingItem.id !== cartItem.id) {
      const mergedQuantity = existingItem.quantity + newQuantity;

      if (mergedQuantity > variant.stockQuantity) {
        throw new AppError("Not enough stock available", 400);
      }

      existingItem.quantity = mergedQuantity;
      await existingItem.save();

      await cartItem.destroy();

      return existingItem;
    }

    cartItem.variantId = variantId;
    cartItem.quantity = newQuantity;

    await cartItem.save();

    return cartItem;
  }

  if (quantity !== undefined) {
    const product = await Product.findByPk(cartItem.productId);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const stock = cartItem.variantId
      ? (
          await Variant.findByPk(cartItem.variantId)
        )?.stockQuantity
      : product.stockQuantity;

    if (stock === undefined) {
      throw new AppError("Variant not found", 404);
    }

    if (quantity > stock) {
      throw new AppError("Not enough stock available", 400);
    }

    cartItem.quantity = quantity;
    await cartItem.save();
  }

  return cartItem;
}

export async function removeCartItem(
  userId: string,
  itemId: string
) {
  const cart = await Cart.findOne({
    where: {
      userId,
    },
  });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const deletedCount = await CartItem.destroy({
    where: {
      id: itemId,
      cartId: cart.id,
    },
  });

  if (deletedCount === 0) {
    throw new AppError("Cart item not found", 404);
  }

  return {
    message: "Cart item removed",
  };
}

export async function clearCart(userId: string) {
  const cart = await Cart.findOne({
    where: {
      userId,
    },
  });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  await CartItem.destroy({
    where: {
      cartId: cart.id,
    },
  });

  return {
    message: "Cart cleared",
  };
}