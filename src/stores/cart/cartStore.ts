import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";
import type { CartStore } from "./types";

const calcTotals = (items: CartStore["items"]) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product) => {
        const items = get().items;
        const exists = items.find((item) => item.id === product.id);

        const updatedItems = exists
          ? items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...items, { ...product, quantity: 1 }];

        set({ items: updatedItems, ...calcTotals(updatedItems) });
      },

      removeItem: (productId: number) => {
        const updatedItems = get().items.filter(
          (item) => item.id !== productId
        );
        set({ items: updatedItems, ...calcTotals(updatedItems) });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        const updatedItems = get().items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        set({ items: updatedItems, ...calcTotals(updatedItems) });
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    { name: "cart-storage" }
  )
);
