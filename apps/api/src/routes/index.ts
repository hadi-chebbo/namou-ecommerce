import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import productRoutes from "../modules/products/product.routes";
import wishlistRoutes from "../modules/wishlist/wishlist.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);

export default router;