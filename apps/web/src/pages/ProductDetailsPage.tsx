import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Loader } from "../components/ui/Loader";
import { WishlistButton } from "../components/ui/WishListButton";
import { VariantSelector } from "../components/product/VariantSelector";
import { useProduct } from "../hooks/useProduct";
import type { ProductVariant } from "../types/product";

function resolveVariant(
  variants: ProductVariant[],
  selectedOptions: Record<string, string>
) {
  return variants.find((variant) =>
    Object.entries(variant.options).every(
      ([key, value]) => selectedOptions[key] === value
    )
  );
}

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useProduct(slug ?? "");

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [variantNotice, setVariantNotice] = useState<string | null>(null);
  const [showVariantNotice, setShowVariantNotice] = useState(false);

  // Pre-select default variant options once product data loads
  useEffect(() => {
    if (
      product?.variants?.length &&
      Object.keys(selectedOptions).length === 0
    ) {
      setSelectedOptions(product.variants[0].options);
    }
  }, [product, selectedOptions]);

  // Fade out and remove the variant notice automatically
  useEffect(() => {
    if (!variantNotice) return;

    setShowVariantNotice(true);

    const fadeTimer = setTimeout(() => {
      setShowVariantNotice(false);
    }, 2800);

    const removeTimer = setTimeout(() => {
      setVariantNotice(null);
    }, 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [variantNotice]);

  const selectedVariant = useMemo(() => {
    if (!product) return undefined;

    return resolveVariant(product.variants, selectedOptions);
  }, [product, selectedOptions]);

  if (isLoading) return <Loader />;

  if (isError || !product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-lg font-medium text-[#1C1A16]">
            Product not found
          </h2>

          <p className="mt-2 text-sm text-[#8B8478]">
            We couldn't load this product. Please try again.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block text-sm text-[#1C1A16] underline underline-offset-4"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const hasVariants = product.variants.length > 0;

  const displayImage =
    selectedVariant?.imageUrl ??
    product.imageUrl ??
    "/placeholder-product.png";

  const unitPrice = Number(selectedVariant?.price ?? product.price);
  const stock = selectedVariant?.stockQuantity ?? product.stockQuantity;
  const total = unitPrice * quantity;

  const needsSelection = hasVariants && !selectedVariant;
  const isOutOfStock = !needsSelection && stock <= 0;
  const canAddToCart = !needsSelection && !isOutOfStock;
  const isLowStock = canAddToCart && stock <= 5;

  function handleOptionChange(name: string, value: string) {
    if (!product) return;

    const currentOptions = {
      ...selectedOptions,
      [name]: value,
    };

    // Check if the exact combination exists.
    const exactVariant = product.variants.find(
      (variant) =>
        variant.stockQuantity > 0 &&
        Object.entries(currentOptions).every(
          ([key, val]) => variant.options[key] === val
        )
    );

    if (exactVariant) {
      setSelectedOptions(exactVariant.options);
      setVariantNotice(null);
      setQuantity(1);
      return;
    }

    // The requested combination doesn't exist.
    // Find an available variant containing the selected option.
    const fallbackVariant = product.variants.find(
      (variant) =>
        variant.stockQuantity > 0 && variant.options[name] === value
    );

    if (!fallbackVariant) return;

    const changedOption = Object.entries(fallbackVariant.options).find(
      ([key, val]) => currentOptions[key] !== val
    );

    setSelectedOptions(fallbackVariant.options);
    setQuantity(1);

    if (changedOption) {
      const [changedName, changedValue] = changedOption;

      setVariantNotice(
        `${changedName} updated to ${changedValue} because ${value} is only available with ${changedValue}.`
      );
    }
  }

  function handleAddToCart() {
    if (!canAddToCart) return;

    // Execute cart mutation here...
  }

  return (
    <div className="w-full px-6 py-8 sm:px-8 lg:px-10 xl:px-12 lg:py-10">
      <div className="mx-auto max-w-[1400px]">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-[#8B8478] transition-colors hover:text-[#1C1A16]"
        >
          <span>←</span>
          <span>All products</span>
        </Link>

        <section className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:gap-16 xl:gap-24">
          {/* Main Display Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#F1EEE8]">
            <img
              src={displayImage}
              alt={product.title}
              className="h-full w-full object-cover"
            />

            {/* Wishlist button overlay visible on mobile devices only */}
            <div className="absolute right-4 top-4 lg:hidden">
              <WishlistButton variant="onImage" slug={product.slug}/>
            </div>
          </div>

          {/* Product Info Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="border-b border-[#E5E0D8] pb-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[#8B8478]">
                Product
              </p>

              <div className="flex items-start justify-between gap-6">
                <h1 className="text-3xl font-semibold tracking-tight text-[#1C1A16] sm:text-4xl">
                  {product.title}
                </h1>

                <p className="shrink-0 text-lg font-medium text-[#1C1A16]">
                  ${unitPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="py-7">
              <p className="max-w-xl text-sm leading-7 text-[#8B8478]">
                {product.description}
              </p>
            </div>

            {hasVariants && (
              <div className="border-t border-[#E5E0D8] py-7">
                <VariantSelector
                  variants={product.variants}
                  selectedOptions={selectedOptions}
                  onChange={handleOptionChange}
                />

                {variantNotice && (
                  <p
                    className={`mt-4 text-xs text-[#8B8478] transition-opacity duration-300 ${
                      showVariantNotice ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {variantNotice}
                  </p>
                )}
              </div>
            )}

            <div className="border-t border-[#E5E0D8] pt-7">
              <div className="flex items-center justify-between">
                {/* Quantity Controls */}
                <div
                  className="flex items-center gap-4 rounded border border-[#E5E0D8] px-3 py-1.5"
                  role="group"
                  aria-label="Quantity controls"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
                    disabled={!canAddToCart || quantity <= 1}
                    aria-label="Decrease quantity"
                    className="text-lg text-[#1C1A16] transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    −
                  </button>

                  <span className="min-w-6 text-center text-sm font-medium text-[#1C1A16]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(stock, q + 1))
                    }
                    disabled={!canAddToCart || quantity >= stock}
                    aria-label="Increase quantity"
                    className="text-lg text-[#1C1A16] transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    +
                  </button>
                </div>

                <p className="text-sm text-[#8B8478]">
                  Total{" "}
                  <span className="ml-2 font-medium text-[#1C1A16]">
                    ${total.toFixed(2)}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="h-12 flex-1 bg-[#1C1A16] px-6 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {needsSelection
                    ? "Select options"
                    : isOutOfStock
                      ? "Out of stock"
                      : "Add to cart"}
                </button>

                <WishlistButton variant="panel" slug={product.slug}/>
              </div>

              {isLowStock && (
                <p className="mt-3 text-xs text-[#A8503A]">
                  Only {stock} left in stock
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}