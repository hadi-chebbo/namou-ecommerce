import type { Request, Response, NextFunction } from "express";
import * as productService from "./product.service";
import { ProductListingQuery } from "./product.schema";

export async function getProductListings(req: Request, res: Response, next: NextFunction) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 12;

        const result = await productService.getProducts({page, limit});

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}