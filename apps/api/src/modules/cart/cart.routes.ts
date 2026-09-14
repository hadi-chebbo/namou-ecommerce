import { Router } from "express";

import * as cartController from "./cart.controller";
import {
  addCartItem,
  updateCartItem,
  cartItemParams,
} from "./cart.schema";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { publicApiRateLimiter } from "../../middlewares/rateLimiter";

const router = Router();

router.use(publicApiRateLimiter);

router.get(
  "/",
  authenticate,
  authorize("user"),
  cartController.getCart,
);

router.post(
  "/items",
  authenticate,
  authorize("user"),
  validate(addCartItem, "body"),
  cartController.addToCart,
);

router.patch(
  "/items/:itemId",
  authenticate,
  authorize("user"),
  validate(cartItemParams, "params"),
  validate(updateCartItem, "body"),
  cartController.updateCartItem,
);

router.delete(
  "/items/:itemId",
  authenticate,
  authorize("user"),
  validate(cartItemParams, "params"),
  cartController.removeCartItem,
);

router.delete(
  "/",
  authenticate,
  authorize("user"),
  cartController.clearCart,
);

export default router;