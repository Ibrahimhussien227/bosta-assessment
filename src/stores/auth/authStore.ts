import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  encryptToken,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/encryption";
import type { User } from "@/types";

const ENCRYPTED_TOKEN_KEY = import.meta.env.VITE_ENCRYPTED_TOKEN_KEY;

interface AuthStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => {
        const encryptedToken = encryptToken(token);
        saveToLocalStorage(ENCRYPTED_TOKEN_KEY, encryptedToken);
        set({ token, user, isAuthenticated: true });
      },

      clearAuth: () => {
        removeFromLocalStorage(ENCRYPTED_TOKEN_KEY);
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const authStore = useAuthStore;
