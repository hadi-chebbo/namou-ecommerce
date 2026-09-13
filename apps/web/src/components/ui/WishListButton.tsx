import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "../../hooks/useWishlist";

type WishlistButtonProps = {
  slug: string;
  variant?: "onImage" | "panel";
};

export function WishlistButton({
  slug,
  variant = "onImage",
}: WishlistButtonProps) {
  const { data: wishlist = [] } = useWishlist();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isWishlisted = wishlist.some(
    (item) => item.product.slug === slug
  );

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist.mutate(slug);
    } else {
      addToWishlist.mutate(slug);
    }
  }

  const isPending =
    addToWishlist.isPending || removeFromWishlist.isPending;

  const heart = (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-colors duration-200 ${
        isWishlisted
          ? "fill-[#A8503A] stroke-[#A8503A]"
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
  );

  if (variant === "panel") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={isWishlisted}
        aria-label={
          isWishlisted ? "Remove from wishlist" : "Add to wishlist"
        }
        className="flex h-12 w-12 shrink-0 items-center justify-center border-l border-[#E5E0D8] transition-colors duration-200 hover:bg-[#F1EEE8] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {heart}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={isWishlisted}
      aria-label={
        isWishlisted ? "Remove from wishlist" : "Add to wishlist"
      }
      className="flex h-9 w-9 items-center justify-center border border-[#E5E0D8] bg-[#FAF8F4] transition-colors duration-200 hover:border-[#1C1A16] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {heart}
    </button>
  );
}