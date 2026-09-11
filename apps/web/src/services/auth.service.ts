import { api } from "../lib/api";

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<User>("/auth/login", payload);

    return data;
  },

  async me() {
    const { data } = await api.get<User>("/auth/me");

    return data;
  },

  async logout() {
    await api.post("/auth/logout");
  },
};