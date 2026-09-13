import { Link } from "react-router-dom";

import { ProductGrid } from "../components/product/ProductGrid";
import { Loader } from "../components/ui/Loader";
import { useWishlist } from "../hooks/useWishlist";

export default function WishlistPage() {
  const { data: wishlist, isLoading, isError } = useWishlist();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !wishlist) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-lg font-medium text-[#1C1A16]">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-[#8B8478]">
            We couldn't load your wishlist. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const products = wishlist.map((item) => item.product);

  return (
    <div className="w-full px-6 py-10 sm:px-8 lg:px-10 xl:px-12 lg:py-14">
      <section className="mb-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#8B8478]">
          Saved pieces
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1C1A16] sm:text-4xl">
              Wishlist
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#8B8478]">
              The pieces you've saved for later.
            </p>
          </div>

          <p className="text-sm text-[#8B8478]">
            {products.length} {products.length === 1 ? "item" : "items"}
          </p>
        </div>
      </section>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="flex min-h-[40vh] items-center justify-center border-t border-[#E5E0D8]">
          <div className="text-center">
            <h2 className="text-lg font-medium text-[#1C1A16]">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-sm text-[#8B8478]">
              Save products you love and come back to them later.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block text-sm text-[#1C1A16] underline underline-offset-4"
            >
              Browse products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}