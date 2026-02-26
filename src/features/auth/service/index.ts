import { apiClient } from "@/api/client";
import type { AuthResponse, LoginCredentials, SignupPayload } from "../types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<{ token: string }>(
      "/auth/login",
      credentials,
      { requiresAuth: false }
    );
    return {
      token: response.token,
      id: Math.floor(Math.random() * 1000),
      username: credentials.username,
    };
  },

  signup: async (userData: SignupPayload): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({ id: Date.now(), token: `mock-${Date.now()}`, ...userData }),
        1000
      );
    });
  },
};
