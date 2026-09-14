import { useState } from "react";
import { Link } from "react-router-dom";
import { Lottie } from "lottie-react";

import type {
  Product,
  ProductVariant as Variant,
} from "../../types/product";

import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "../../hooks/useWishlist";

import { useAddToCart } from "../../hooks/useCart";
import cartSuccessAnimation from "../../assets/animations/Added to Cart.json";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants[0] ?? null
  );

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { data: wishlist = [] } = useWishlist();

  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const addToCartMutation = useAddToCart();

  const isWishlisted = wishlist.some(
    (item) => item.productId === product.id
  );

  const displayImage =
    selectedVariant?.imageUrl ??
    product.imageUrl ??
    "/placeholder-product.png";

  const displayPrice = selectedVariant?.price ?? product.price;

  const stock =
    selectedVariant?.stockQuantity ?? product.stockQuantity;

  const isOutOfStock = stock <= 0;

  function handleWishlistClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist.mutate(product.slug);
    } else {
      addToWishlist.mutate(product.slug);
    }
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (
      isOutOfStock ||
      addToCartMutation.isPending ||
      isAddedToCart
    ) {
      return;
    }

    addToCartMutation.mutate(
      {
        productSlug: product.slug,
        variantId: selectedVariant?.id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          setIsAddedToCart(true);

          setTimeout(() => {
            setIsAddedToCart(false);
          }, 1800);
        },
      }
    );
  }

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-black/5 bg-white p-3 transition-all duration-300 hover:border-black/10 hover:shadow-lg">
      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlistClick}
        aria-label={
          isWishlisted ? "Remove from wishlist" : "Add to wishlist"
        }
        aria-pressed={isWishlisted}
        disabled={
          addToWishlist.isPending || removeFromWishlist.isPending
        }
        className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95 disabled:opacity-60"
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

      {/* Main product link */}
      <Link to={`/products/${product.slug}`} className="block flex-1">
        {/* Image */}
        <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#F1EEE8]">
          <img
            src={displayImage}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Product information */}
        <div className="pb-3 pt-4">
          {/* Title + Price */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-sm font-medium text-[#1C1A16]">
              {product.title}
            </h2>

            <p className="shrink-0 text-sm text-[#1C1A16]">
              ${Number(displayPrice).toFixed(2)}
            </p>
          </div>

          {/* Variants (Restored exact original styling) */}
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
                      setIsAddedToCart(false);
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
      </Link>

      {/* Integrated Add to cart button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={
          isOutOfStock ||
          addToCartMutation.isPending ||
          isAddedToCart
        }
        className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#1C1A16] px-5 text-xs font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isAddedToCart ? (
          <>
            <Lottie
              key="cart-success"
              src={cartSuccessAnimation}
              autoplay
              loop={false}
              className="mb-1 h-5 w-7 shrink-0 invert"
            />
            <span>Added to cart</span>
          </>
        ) : addToCartMutation.isPending ? (
          "Adding..."
        ) : isOutOfStock ? (
          "Out of stock"
        ) : (
          "Add to cart"
        )}
      </button>
    </article>
  );
}