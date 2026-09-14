import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Loader } from "../components/ui/Loader";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { useCart, useClearCart } from "../hooks/useCart";

export default function CartPage() {
  const queryClient = useQueryClient();

  const { data: cart, isLoading, isError } = useCart();
  const clearCart = useClearCart();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !cart) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-lg font-medium text-[#1C1A16]">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-[#8B8478]">
            We couldn't load your cart. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const items = [...cart.items].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime(),
  );

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.variant?.price ?? item.product.price) *
        item.quantity,
    0,
  );

  const handleOrderSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  };

  return (
    <div className="w-full px-6 py-10 sm:px-8 lg:px-10 xl:px-12 lg:py-14">
      <CartHeader
        itemCount={items.length}
        onClear={
          items.length > 0
            ? () => clearCart.mutate()
            : undefined
        }
        isClearing={clearCart.isPending}
      />

      {items.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center border-t border-[#E5E0D8]">
          <div className="text-center">
            <h2 className="text-lg font-medium text-[#1C1A16]">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-[#8B8478]">
              Add some products and they will appear here.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block text-sm text-[#1C1A16] underline underline-offset-4"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <section className="divide-y divide-[#E5E0D8] border-y border-[#E5E0D8]">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </section>

          <CartSummary
            subtotal={subtotal}
            items={items}
            onOrderSuccess={handleOrderSuccess}
          />
        </div>
      )}
    </div>
  );
}

type CartHeaderProps = {
  itemCount: number;
  onClear?: () => void;
  isClearing?: boolean;
};

function CartHeader({
  itemCount,
  onClear,
  isClearing,
}: CartHeaderProps) {
  return (
    <section className="mb-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#8B8478]">
            Your selection
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[#1C1A16] sm:text-4xl">
            Cart
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-[#8B8478]">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>

          {onClear && (
            <button
              type="button"
              onClick={onClear}
              disabled={isClearing}
              className="text-xs text-[#8B8478] hover:text-[#1C1A16] disabled:opacity-40"
            >
              {isClearing ? "Clearing..." : "Clear cart"}
            </button>
          )}
        </div>
      </div>

      {itemCount > 0 && (
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#8B8478]">
          Review the pieces you've selected.
        </p>
      )}
    </section>
  );
}