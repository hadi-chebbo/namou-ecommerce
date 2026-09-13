type CartSummaryProps = {
  subtotal: number;
};

export function CartSummary({ subtotal }: CartSummaryProps) {
  return (
    <aside className="h-fit">
      <div className="border border-[#E5E0D8] p-6">
        <h2 className="text-sm font-medium text-[#1C1A16]">
          Order summary
        </h2>

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-[#8B8478]">Subtotal</span>
          <span className="text-[#1C1A16]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="my-6 border-t border-[#E5E0D8]" />

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#1C1A16]">
            Total
          </span>

          <span className="text-base font-semibold text-[#1C1A16]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          className="mt-6 h-11 w-full bg-[#1C1A16] text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Proceed to checkout
        </button>
      </div>
    </aside>
  );
}