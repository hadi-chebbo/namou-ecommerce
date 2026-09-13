import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as cartService from "../services/cart.service";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productSlug,
      variantId,
      quantity,
    }: {
      productSlug: string;
      variantId?: string;
      quantity: number;
    }) => cartService.addToCart(productSlug, variantId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
      variantId,
    }: {
      itemId: string;
      quantity?: number;
      variantId?: string;
    }) => cartService.updateCartItem(itemId, quantity, variantId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.removeCartItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.clearCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}