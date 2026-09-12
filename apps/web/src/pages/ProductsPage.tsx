import { useState } from "react";

import { ProductGrid } from "../components/product/ProductGrid";
import { Loader } from "../components/ui/Loader";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useProducts(page);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-lg font-medium text-[#1C1A16]">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-[#8B8478]">
            We couldn't load the products. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full m-2 px-6 py-10 sm:px-8 lg:px-10 xl:px-12 lg:py-14">
      <section className="mb-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#8B8478]">
          The collection
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1C1A16] sm:text-4xl">
              All products
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#8B8478]">
              Thoughtfully selected pieces for your everyday life.
            </p>
          </div>

          <p className="text-sm text-[#8B8478]">
            {data.pagination.total} products
          </p>
        </div>
      </section>

      <ProductGrid products={data.data} />

      <div className="mt-16 flex items-center justify-center gap-6 border-t border-[#E5E0D8] pt-8">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((current) => current - 1)}
          className="text-sm text-[#8B8478] transition-colors hover:text-[#1C1A16] disabled:cursor-not-allowed disabled:opacity-30"
        >
          Previous
        </button>

        <span className="text-sm text-[#1C1A16]">
          {data.pagination.page}{" "}
          <span className="text-[#8B8478]">
            / {data.pagination.totalPages}
          </span>
        </span>

        <button
          type="button"
          disabled={page === data.pagination.totalPages}
          onClick={() => setPage((current) => current + 1)}
          className="text-sm text-[#8B8478] transition-colors hover:text-[#1C1A16] disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}