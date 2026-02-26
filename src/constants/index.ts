import type { SortKey } from "@/types";
import { Package, Shield, ShoppingCart, Star } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Name: A to Z" },
  { value: "title-desc", label: "Name: Z to A" },
];

export const DEFAULT_SORT: SortKey = "default";
export const DEFAULT_PAGE = 1;

export const FEATURES = [
  {
    icon: Package,
    title: "Quality Products",
    description: "Browse through our curated collection of premium products",
  },
  {
    icon: ShoppingCart,
    title: "Easy Shopping",
    description: "Add items to your cart and checkout with just a few clicks",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your payment information is always safe with us",
  },
  {
    icon: Star,
    title: "Best Prices",
    description: "Competitive pricing on all our products",
  },
];
