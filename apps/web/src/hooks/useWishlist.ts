import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as wishlistService from "../services/wishlist.service";

export function useWishlist() {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: wishlistService.getWishlist,
        staleTime: 5 * 60 * 1000,
    });
}

function notifyWishlistAdded() {
  window.dispatchEvent(new Event("wishlist-added"));
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistService.addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });

      notifyWishlistAdded();
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistService.removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });
}