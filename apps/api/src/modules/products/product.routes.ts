import { Router } from "express";

import * as productController from "./product.controller";
import * as productSchema from "./product.schema";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.get(
    "/",
    authenticate,
    authorize("user"),
    validate(productSchema.productListingSchema, 'query'),
    productController.getProductListings,
);

router.get(
    "/:slug",
    authenticate,
    authorize("user"),
    validate(productSchema.productDetailsSchema, 'params'),
    productController.getProductDetails,
);

export default router;