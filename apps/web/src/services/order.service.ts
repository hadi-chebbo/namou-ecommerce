import { api } from "../lib/api";

export type CreateOrderPayload = {
  address: string;
};

export async function createOrder(address: string) {
  const response = await api.post("/orders/order", {
    address,
  });

  return response.data;
}