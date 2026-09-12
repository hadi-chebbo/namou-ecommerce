import type { Product } from "../../types/product";

type ProductCardProps = {
    product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
    return (
        <article>
            <img src={product.imageUrl ?? "/placeholder-product.png"} alt={product.title} />
            <h2>{product.title}</h2>

            <p>${product.price}</p>

            {product.variants.length > 0 && (
                <div>
                    {product.variants.map((variant) => (
                        <span key={variant.id}>
                        {Object.entries(variant.options)
                        .map(([key, value]) => `${key}: ${value}`).join(", ")}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
}