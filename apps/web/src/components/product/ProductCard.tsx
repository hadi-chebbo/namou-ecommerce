import { useState } from "react";
import type { Product, ProductVariant as Variant } from "../../types/product";
import { Link } from "react-router-dom";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "../../hooks/useWishlist";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants[0] ?? null
  );

  const { data: wishlist = [] } = useWishlist();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isWishlisted = wishlist.some(
    (item) => item.productId === product.id
  );

  const displayImage =
    selectedVariant?.imageUrl ?? product.imageUrl ?? "/placeholder-product.png";

  const displayPrice = selectedVariant?.price ?? product.price;

  function handleWishlistClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist.mutate(product.slug);
    } else {
      addToWishlist.mutate(product.slug);
    }
  }

  return (
    <Link to={`/products/${product.slug}`} className="block">
      <article className="group relative">
        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
          disabled={addToWishlist.isPending || removeFromWishlist.isPending}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95 disabled:opacity-60"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 transition-colors duration-200 ${
              isWishlisted
                ? "fill-[#C0392B] stroke-[#C0392B]"
                : "fill-none stroke-[#1C1A16]"
            }`}
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c-.3 0-.6-.1-.83-.3C7.9 17.3 3.75 13.86 3.75 9.75 3.75 7.13 5.88 5 8.5 5c1.42 0 2.77.65 3.5 1.75C12.73 5.65 14.08 5 15.5 5c2.62 0 4.75 2.13 4.75 4.75 0 4.11-4.15 7.55-7.42 10.2-.23.2-.53.3-.83.3Z"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="aspect-[4/5] overflow-hidden bg-[#F1EEE8]">
          <img
            src={displayImage}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="pt-4">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-sm font-medium text-[#1C1A16]">
              {product.title}
            </h2>

            <p className="shrink-0 text-sm text-[#1C1A16]">
              ${Number(displayPrice).toFixed(2)}
            </p>
          </div>

          {product.variants.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5">
              {product.variants.map((variant) => {
                const isActive = selectedVariant?.id === variant.id;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedVariant(variant);
                    }}
                    aria-pressed={isActive}
                    className={`rounded-full border px-2.5 py-1 text-xs transition-colors duration-200 ${
                      isActive
                        ? "border-[#1C1A16] text-[#1C1A16]"
                        : "border-transparent text-[#8B8478] hover:text-[#1C1A16]"
                    }`}
                  >
                    {Object.values(variant.options).join(" / ")}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}