import { Router } from "express";
import * as orderController from "./order.controller";
import { createOrderSchema } from "./order.schema";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { validate } from "../../middlewares/validate";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("user"),
    validate(createOrderSchema, "body"),
    orderController.createOrder,
)

export default router;