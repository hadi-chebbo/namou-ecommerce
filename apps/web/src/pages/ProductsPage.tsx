import { useState } from "react";
import { ProductGrid } from "../components/product/ProductGrid";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useProducts(page);

    if(isLoading) {
        return <div>Loading Products ...</div>;
    }

    if(isError || !data) {
        return <div>Failed to load products</div>;
    }

    return (
    <main>
    <h1>Products</h1>

    <ProductGrid products={data.data} />

    <div>
        <button
        disabled={page === 1}
        onClick={() => setPage((current) => current - 1)}
        >
        Previous
        </button>

        <span>
        Page {data.pagination.page} of {data.pagination.totalPages}
        </span>

        <button
        disabled={page === data.pagination.totalPages}
        onClick={() => setPage((current) => current + 1)}
        >
        Next
        </button>
    </div>
    </main>
  );
}