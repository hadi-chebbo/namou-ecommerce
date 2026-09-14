import { Router } from "express";
import * as orderController from "./order.controller";
import { createOrderSchema } from "./order.schema";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { validate } from "../../middlewares/validate";
import { publicApiRateLimiter } from "../../middlewares/rateLimiter";

const router = Router();

router.use(publicApiRateLimiter);

router.post(
    "/order",
    authenticate,
    authorize("user"),
    validate(createOrderSchema, "body"),
    orderController.createOrder,
)

export default router;