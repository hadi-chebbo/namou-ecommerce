import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import productRoutes from "../modules/products/product.routes";
import wishlistRoutes from "../modules/wishlist/wishlist.routes";
import cartRoutes from "../modules/cart/cart.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);

export default router;