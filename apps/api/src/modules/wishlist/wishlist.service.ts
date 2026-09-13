import { WishlistItem, Product, Variant } from "@ecommerce/db";
import { AppError } from "../../utils/AppError";

export async function getWishListProducts(userId: string) {
    const wishListItems = await WishlistItem.findAll({
        where: {
            userId,
        },
        include: [
            {
                model: Product,
                as: "product",

                include: [
                    {
                        model: Variant,
                        as: "variants",
                    },
                ],
            },
        ],
    });

    return wishListItems;
}

export async function addProductToWishList(userId: string, slug: string) {
    const product = await Product.findOne({
        where: {
            slug,
        }
    });

    if(!product) {
        throw new AppError("Product not found", 404);
    }

    const existingItem = await WishlistItem.findOne({
        where: {
            userId,
            productId: product.id,
        },
    });

    if (existingItem) {
        throw new AppError("Product is already in wishlist", 409);
    }

    return WishlistItem.create({
        userId,
        productId: product.id,
    });
}
 
export async function removeProductFromWishList(userId: string, slug: string) {
    const product = await Product.findOne({
        where: {
            slug,
        }
    });

    if(!product) {
        throw new AppError("Product not found", 404);
    }

    const deletedCount = await WishlistItem.destroy({
        where: {
            userId,
            productId: product.id,
        }
    });

    if (deletedCount === 0) {
        throw new AppError("Product is not in wishlist", 404);
    }

    return { message: "Product removed from wishlist" };
}