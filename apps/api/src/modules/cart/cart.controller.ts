import type { Request, Response, NextFunction } from "express";
import * as cartService from "./cart.service";

export async function getCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cart = await cartService.getCart(req.user!.userId);

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
}

export async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { productSlug, variantId, quantity } = req.body;

    const item = await cartService.addToCart(
      req.user!.userId,
      productSlug,
      variantId,
      quantity
    );

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function updateCartItem(
  req: Request<{ itemId: string} >,
  res: Response,
  next: NextFunction
) {
  try {
    const { itemId } = req.params;
    const { quantity, variantId } = req.body;

    const item = await cartService.updateCartItem(
      req.user!.userId,
      itemId,
      quantity,
      variantId
    );

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

export async function removeCartItem(
  req: Request<{ itemId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { itemId } = req.params;

    const result = await cartService.removeCartItem(
      req.user!.userId,
      itemId
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function clearCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await cartService.clearCart(req.user!.userId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}