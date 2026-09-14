import type { Request, Response, NextFunction } from "express";
import * as orderService from "./order.service";

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const order = await orderService.createOrder(
      req.user!.userId,
      req.body.address,
    );

    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}