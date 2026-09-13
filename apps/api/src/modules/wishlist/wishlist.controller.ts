import type { Request, Response, NextFunction } from "express";
import * as wishlistService from "../wishlist/wishlist.service";

export async function getWishListProducts(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = String(req.user?.userId);

        const result = await wishlistService.getWishListProducts(userId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function addProductToWishList(req: Request, res: Response, next: NextFunction) {
    try {
        const productSlug = String(req.params.slug);

        const userId = String(req.user?.userId);

        const result = await wishlistService.addProductToWishList(userId, productSlug);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export async function removeProductFromWishList(req: Request, res: Response, next: NextFunction) {
    try {
        const productSlug = String(req.params.slug);

        const userId = String(req.user?.userId);

        const result = await wishlistService.removeProductFromWishList(userId, productSlug);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}