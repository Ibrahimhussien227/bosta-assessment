import type { CartItem, Product } from "@/types";

export interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}
