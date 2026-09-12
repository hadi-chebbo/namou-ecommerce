import { Product } from "@ecommerce/db";
import { Variant } from "@ecommerce/db";
import type { ProductListingQuery } from "./product.schema";
import { AppError } from "../../utils/AppError";

export async function getProducts({
    page,
    limit,
}: ProductListingQuery) {
    const offset = (page - 1) * limit;

    const { rows, count } = await Product.findAndCountAll({
        limit,
        offset,
        include: [
            {
                model: Variant,
                as: "variants",
            },
        ],
        order: [["createdAt", "DESC"]],
    });

    return {
        data: rows,
        pagination: {
            page,
            limit,
            total: count,
            totalPages: Math.ceil(count / limit),
        },
    };
}

export async function getProductDetails(slug: string) {
    const result = await Product.findOne({
        where: {
            slug,
        },

        include: [
            {
                model: Variant,
                as: "variants",
            },
        ],
    });

    if(!result) {
        throw new AppError("Product not found", 404);
    }

    return result;
}