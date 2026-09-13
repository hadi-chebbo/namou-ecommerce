import { Router } from "express";

import * as wishlistController from "./wishlist.controller";
import { wishlistParams } from "./wishlist.schema";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.get(
    "/",
    authenticate,
    authorize("user"),
    wishlistController.getWishListProducts,
);

router.post(
    "/:slug",
    authenticate,
    authorize("user"),
    validate(wishlistParams, "params"),
    wishlistController.addProductToWishList
);

router.delete(
    "/:slug",
    authenticate,
    authorize("user"),
    validate(wishlistParams, "params"),
    wishlistController.removeProductFromWishList,
);

export default router;