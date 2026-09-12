export type ProductVariant = {
    id: string;
    options: Record<string, string>;
    price: number;
    stockQuantity: number;
    imageUrl: string | null;
};

export type Product = {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    stockQuantity: number;
    imageUrl: string | null;
    variants: ProductVariant[];
};

export type ProductPagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type ProductListingResponse = {
    data: Product[];
    pagination: ProductPagination;
};

