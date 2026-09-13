import { Link } from "react-router-dom";
import {
  useRemoveCartItem,
  useUpdateCartItem,
} from "../../hooks/useCart";
import type { ProductVariant } from "../../types/product";

type CartItemProps = {
  item: {
    id: string;
    quantity: number;
    variant?: ProductVariant | null;
    product: {
      slug: string;
      title: string;
      price: number;
      imageUrl?: string | null;
      variants?: ProductVariant[];
    };
  };
};

export function CartItem({ item }: CartItemProps) {
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();

  const variants = item.product.variants ?? [];
  const selectedVariant = item.variant;

  const price = Number(
    selectedVariant?.price ?? item.product.price
  );
  const subtotal = price * item.quantity;

  const isUpdating = updateCartItem.isPending;
  const isRemoving = removeCartItem.isPending;
  const isBusy = isUpdating || isRemoving;

  function handleVariantChange(variant: ProductVariant) {
    if (variant.id === selectedVariant?.id) return;

    updateCartItem.mutate({
      itemId: item.id,
      variantId: variant.id,
      quantity: item.quantity,
    });
  }

  function handleQuantityChange(quantity: number) {
    if (quantity < 1) return;

    updateCartItem.mutate({
      itemId: item.id,
      variantId: selectedVariant?.id,
      quantity,
    });
  }

  return (
    <article
      className={`flex gap-5 border-b border-[#E5E0D8] py-6 transition-opacity duration-300 last:border-b-0 ${
        isRemoving ? "pointer-events-none opacity-40" : ""
      }`}
    >
      <Link
        to={`/products/${item.product.slug}`}
        className="h-32 w-28 shrink-0 overflow-hidden bg-[#F3F0EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A16]"
      >
        <img
          src={
            selectedVariant?.imageUrl ??
            item.product.imageUrl ??
            "/placeholder-product.png"
          }
          alt={item.product.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <Link
              to={`/products/${item.product.slug}`}
              className="text-sm font-medium leading-snug text-[#1C1A16] underline-offset-2 hover:underline focus-visible:underline"
            >
              {item.product.title}
            </Link>

            {selectedVariant && (
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                {Object.entries(selectedVariant.options).map(
                  ([key, value]) => (
                    <span
                      key={key}
                      className="text-xs text-[#8B8478]"
                    >
                      <span className="capitalize">
                        {key}
                      </span>{" "}
                      {value}
                    </span>
                  )
                )}
              </div>
            )}
          </div>

          <div className="shrink-0 text-right">
            <p className="text-sm tabular-nums text-[#1C1A16]">
              ${subtotal.toFixed(2)}
            </p>
            {item.quantity > 1 && (
              <p className="mt-0.5 text-xs tabular-nums text-[#8B8478]">
                ${price.toFixed(2)} each
              </p>
            )}
          </div>
        </div>

        {variants.length > 0 && (
          <div
            role="group"
            aria-label="Select variant"
            className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5"
          >
            {variants.map((variant) => {
              const isActive =
                selectedVariant?.id === variant.id;
              const isOutOfStock = variant.stockQuantity <= 0;
              const label = Object.values(variant.options).join(" / ");

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => handleVariantChange(variant)}
                  disabled={isBusy || isOutOfStock}
                  aria-pressed={isActive}
                  title={isOutOfStock ? `${label} — out of stock` : label}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A16] ${
                    isActive
                      ? "border-[#1C1A16] text-[#1C1A16]"
                      : "border-[#E5E0D8] text-[#8B8478] hover:border-[#8B8478] hover:text-[#1C1A16]"
                  } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center border border-[#E5E0D8]">
            <button
              type="button"
              onClick={() =>
                handleQuantityChange(item.quantity - 1)
              }
              disabled={item.quantity <= 1 || isBusy}
              aria-label={`Decrease quantity of ${item.product.title}`}
              className="flex h-8 w-8 items-center justify-center text-sm text-[#1C1A16] transition-colors hover:bg-[#F7F5F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1C1A16] disabled:cursor-not-allowed disabled:opacity-30"
            >
              −
            </button>

            <span
              aria-live="polite"
              aria-label={`Quantity: ${item.quantity}`}
              className="flex h-8 min-w-8 items-center justify-center text-xs tabular-nums text-[#1C1A16]"
            >
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                handleQuantityChange(item.quantity + 1)
              }
              disabled={isBusy}
              aria-label={`Increase quantity of ${item.product.title}`}
              className="flex h-8 w-8 items-center justify-center text-sm text-[#1C1A16] transition-colors hover:bg-[#F7F5F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1C1A16] disabled:cursor-not-allowed disabled:opacity-30"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeCartItem.mutate(item.id)}
            disabled={isBusy}
            className="text-xs text-[#8B8478] underline-offset-2 transition-colors hover:text-[#1C1A16] hover:underline focus-visible:text-[#1C1A16] focus-visible:underline disabled:opacity-40"
          >
            {isRemoving ? "Removing…" : "Remove"}
          </button>
        </div>
      </div>
    </article>
  );
}