import type { SORT_OPTIONS } from "@/constants";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Category {
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type User = {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface ProductsState {
  products: Product[];
  categories: string[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  sortBy: "price-asc" | "price-desc" | "title-asc" | "title-desc" | "default";
  categoryFilter: string | null;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export type SortKey = (typeof SORT_OPTIONS)[number]["value"];
