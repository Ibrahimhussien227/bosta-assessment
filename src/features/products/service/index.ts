import { apiClient } from "@/api/client";
import type { Product } from "@/types";

export const productsApi = {
  getAll: async (limit = 10, page = 1, sort = "default", category?: string) => {
    let url = category
      ? `/products/category/${category}?limit=${limit}&page=${page}`
      : `/products?limit=${limit}&page=${page}`;

    if (sort === "price-asc") url += "&sort=asc";
    else if (sort === "price-desc") url += "&sort=desc";

    return apiClient.get<Product[]>(url);
  },

  getById: async (id: number) => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  getCategories: async () => {
    return apiClient.get<string[]>("/products/categories");
  },

  create: async (product: Omit<Product, "id" | "rating">) => {
    return apiClient.post<Product>("/products", product);
  },
};
