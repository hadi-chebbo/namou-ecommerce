import { useState } from "react";
import { createPortal } from "react-dom";
import { Lottie } from "lottie-react";
import doneAnimation from "../../assets/animations/Order Placed (1).json";
import type { CartItem } from "../../types/cart";
import { useCreateOrder } from "../../hooks/useOrder";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: () => void;
  subtotal: number;
  items: CartItem[];
};

export function CheckoutModal({
  isOpen,
  onClose,
  onOrderSuccess,
  subtotal,
  items,
}: CheckoutModalProps) {
  const [address, setAddress] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const createOrder = useCreateOrder();

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (createOrder.isPending) {
      return;
    }

    if (isSuccess) {
      onOrderSuccess();
    }

    setAddress("");
    setIsSuccess(false);
    onClose();
  };

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      return;
    }

    createOrder.mutate(address.trim(), {
      onSuccess: () => {
        setAddress("");
        setIsSuccess(true);
      },
    });
  };

  return createPortal(
    <div
      style={{ zIndex: 999999 }}
      className="fixed inset-0 flex items-end justify-center bg-black/40 sm:items-center sm:p-6"
    >
      <div className="flex h-[92vh] w-full flex-col bg-[#F1EEE8] sm:h-auto sm:max-h-[84vh] sm:max-w-xl sm:rounded-2xl">
        {isSuccess ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 text-center sm:px-8">
            <Lottie
              src={doneAnimation}
              autoplay={true}
              loop={false}
              className="h-40 w-40 sm:h-48 sm:w-48"
            />

            <h2 className="mt-2 text-xl font-semibold text-[#1C1A16] sm:text-2xl">
              Order placed successfully
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#8B8478]">
              Thank you for your order. We'll take care of the rest.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-7 mb-7 h-11 w-full max-w-xs bg-[#1C1A16] text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#E5E0D8] px-5 py-4 sm:px-8 sm:py-5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8B8478]">
                  Order review
                </p>

                <h2 className="mt-1 text-lg font-semibold text-[#1C1A16] sm:text-xl">
                  Checkout
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={createOrder.isPending}
                aria-label="Close checkout"
                className="flex h-8 w-8 items-center justify-center text-xl text-[#8B8478] transition-colors hover:text-[#1C1A16] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
              {/* Order */}
              <section>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-[#1C1A16]">
                    Your order
                  </h3>

                  <span className="text-xs text-[#8B8478]">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="mt-3 divide-y divide-[#E5E0D8] border-y border-[#E5E0D8]">
                  {items.map((item) => {
                    const price = Number(
                      item.variant?.price ?? item.product.price,
                    );

                    return (
                      <div
                        key={item.id}
                        className="flex gap-3 py-3.5 sm:gap-4 sm:py-4"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden bg-white sm:h-16 sm:w-16">
                          <img
                            src={
                              item.variant?.imageUrl ??
                              item.product.imageUrl ??
                              "/placeholder-product.png"
                            }
                            alt={item.product.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[#1C1A16]">
                            {item.product.title}
                          </p>

                          {item.variant && (
                            <p className="mt-1 truncate text-xs text-[#8B8478]">
                              {Object.entries(item.variant.options)
                                .map(
                                  ([key, value]) =>
                                    `${key}: ${value}`,
                                )
                                .join(" · ")}
                            </p>
                          )}

                          <p className="mt-1 text-xs text-[#8B8478]">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <span className="shrink-0 text-sm font-medium text-[#1C1A16]">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8B8478]">
                      Subtotal
                    </span>

                    <span className="text-sm text-[#1C1A16]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#1C1A16]">
                      Total
                    </span>

                    <span className="text-lg font-semibold text-[#1C1A16]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </section>

              {/* Delivery */}
              <section className="mt-7 sm:mt-8">
                <h3 className="text-sm font-medium text-[#1C1A16]">
                  Delivery
                </h3>

                <div className="mt-3 sm:mt-4">
                  <label
                    htmlFor="checkout-address"
                    className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#8B8478]"
                  >
                    Delivery address
                  </label>

                  <textarea
                    id="checkout-address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter your delivery address"
                    rows={3}
                    disabled={createOrder.isPending}
                    className="mt-2 w-full resize-none border border-[#E5E0D8] bg-white px-3 py-3 text-sm text-[#1C1A16] outline-none transition-colors placeholder:text-[#8B8478] focus:border-[#1C1A16] disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </section>

              {/* Payment */}
              <section className="mt-7 sm:mt-8">
                <h3 className="text-sm font-medium text-[#1C1A16]">
                  Payment
                </h3>

                <div className="mt-3 flex items-center gap-3 border border-[#1C1A16] bg-white px-4 py-3.5 sm:mt-4 sm:p-4">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center border border-[#1C1A16]">
                    <div className="h-2 w-2 bg-[#1C1A16]" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#1C1A16]">
                      Cash on delivery
                    </p>

                    <p className="mt-0.5 text-xs text-[#8B8478]">
                      Pay when your order is delivered.
                    </p>
                  </div>
                </div>
              </section>

              {createOrder.isError && (
                <p className="mt-4 text-sm text-red-600">
                  Something went wrong while placing your order.
                  Ensure you provided a valid address and please try again.
                </p>
              )}
            </div>

            {/* Footer */}
            <div
              className="shrink-0 border-t border-[#E5E0D8] bg-[#F1EEE8] px-5 py-4 sm:px-8 sm:py-5"
              style={{
                paddingBottom:
                  "max(1rem, env(safe-area-inset-bottom))",
              }}
            >
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={createOrder.isPending}
                  className="h-11 flex-1 border border-[#E5E0D8] bg-transparent text-sm font-medium text-[#1C1A16] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={
                    !address.trim() || createOrder.isPending
                  }
                  className="h-11 flex-1 bg-[#1C1A16] text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {createOrder.isPending
                    ? "Placing order..."
                    : "Place order"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}