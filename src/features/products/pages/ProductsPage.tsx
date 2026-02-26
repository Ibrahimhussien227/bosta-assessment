import { useSearchParams } from "react-router-dom";
import { Filter, RotateCcw, AlertCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { DEFAULT_SORT, SORT_OPTIONS } from "@/constants";
import { parsePage } from "@/utils/parsePage";
import { reformateCategory } from "../utils/reformateCategory";
import { useCategories, useProducts } from "../hooks";
import { ProductCard } from "../components/ProductCard";

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const page = parsePage(searchParams.get("page"));
  const sortBy = searchParams.get("sort") ?? DEFAULT_SORT;
  const categoryFilter = searchParams.get("category") ?? undefined;

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts(10, page, sortBy, categoryFilter);
  const { data: categories = [] } = useCategories();

  const updateParams = (updater: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams);
    updater(next);
    setSearchParams(next, { replace: true });
  };

  const handlePageChange = (newPage: number) =>
    updateParams((p) => p.set("page", String(newPage)));

  const handleSortChange = (value: string) =>
    updateParams((p) => {
      p.set("sort", value);
      p.set("page", "1");
    });

  const handleCategoryChange = (value: string) =>
    updateParams((p) => {
      if (value === "all") p.delete("category");
      else p.set("category", value);
      p.set("page", "1");
    });

  const resetFilters = () => setSearchParams({}, { replace: true });

  const categoryOptions = reformateCategory(categories);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Products</h1>
        <p className="text-slate-600 mt-1">Browse our collection of products</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div
            className={`flex gap-3 ${showFilters ? "flex" : "hidden lg:flex"}`}
          >
            <Select
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-44 cursor-pointer"
            />
            <Select
              options={categoryOptions}
              value={categoryFilter ?? "all"}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-44 cursor-pointer"
            />
          </div>
        </div>
        {(sortBy !== "default" || categoryFilter) && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {isError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-red-800 flex-1">
            {error.message}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      {isLoading && products.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <h1 className="text-lg font-semibold text-slate-900 mb-2">
            No products found
          </h1>
          <Button onClick={resetFilters}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: 2 }).map((_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "default" : "ghost"}
                size="sm"
                className="w-10"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={page >= 2}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
