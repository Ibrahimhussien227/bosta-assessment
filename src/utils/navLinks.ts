import {
  Package,
  PlusCircle,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

export interface NavLinkItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  ariaLabel: string;
}

export const getNavLinks = (
  isAuthenticated: boolean,
  totalItems: number
): NavLinkItem[] => [
  {
    href: "/products",
    label: "Products",
    icon: Package,
    ariaLabel: "Products",
  },

  ...(isAuthenticated
    ? [
        {
          href: "/products/new",
          label: "Create",
          icon: PlusCircle,
          ariaLabel: "Create Product",
        },
        {
          href: "/cart",
          label: "Cart",
          icon: ShoppingCart,
          badge: totalItems,
          ariaLabel: "Shopping cart",
        },
      ]
    : []),
];
