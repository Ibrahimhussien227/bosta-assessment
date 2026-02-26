import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiError } from "@/api/errors";
import type { Product } from "@/types";
import { queryClient } from "@/app/providers/queryClient";
import { productsApi } from "../service";

export const productKeys = {
  all: (page: number, sort: string, category?: string) =>
    ["products", { page, sort, category }] as const,
  detail: (id: number) => ["products", id] as const,
};

export function useProducts(
  limit = 10,
  page = 1,
  sort = "default",
  category?: string
) {
  return useQuery<Product[], ApiError>({
    queryKey: productKeys.all(page, sort, category),
    queryFn: () => productsApi.getAll(limit, page, sort, category),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}

export function useProduct(id: number) {
  return useQuery<Product, ApiError>({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    initialData: () => {
      const cache = queryClient.getQueriesData<Product[]>({
        queryKey: ["products"],
      });
      for (const [, data] of cache) {
        const found = data?.find((p) => p.id === id);
        if (found) return found;
      }
      return undefined;
    },
  });
}

export function useCategories() {
  return useQuery<string[], ApiError>({
    queryKey: ["categories"],
    queryFn: productsApi.getCategories,
    staleTime: Infinity,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation<
    Product,
    ApiError,
    Omit<Product, "id" | "rating">
  >({
    mutationFn: productsApi.create,
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.setQueryData(productKeys.detail(newProduct.id), newProduct);
      toast.success(`"${newProduct.title}" created successfully!`);
    },

    onError: (error) => {
      toast.error(error.message ?? "Failed to create product");
    },
  });

  return {
    createProduct: mutate,
    CreateProductAsync: mutateAsync,
    isCreating: isPending,
    createError: error?.message,
  };
}
