import { useMutation } from "@tanstack/react-query";
import * as orderService from "../services/order.service";

export function useCreateOrder() {
  return useMutation({
    mutationFn: orderService.createOrder,
  });
}