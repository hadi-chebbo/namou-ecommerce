import { Product } from "@ecommerce/db";
import { Variant } from "@ecommerce/db";
import type { ProductListingQuery } from "./product.schema";

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