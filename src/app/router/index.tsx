import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import NotFound from "@/features/not-found";
import RootErrorBoundary from "@/components/RootErrorBoundary";
import { HomePage } from "@/features/home/pages/HomePage";
import {
  AuthPageSkeleton,
  CartPageSkeleton,
  ProductDetailPageSkeleton,
  ProductsPageSkeleton,
} from "@/components/ui/Skeleton";
import { RequireAuth, RequireGuest } from "./guards";
import { RootLayout } from "../layouts/RootLayout";

const LoginPage = lazy(() =>
  import("@/features/auth/pages/LoginPage").then((m) => ({
    default: m.LoginPage,
  }))
);
const SignupPage = lazy(() =>
  import("@/features/auth/pages/SignupPage").then((m) => ({
    default: m.SignupPage,
  }))
);
const CartPage = lazy(() =>
  import("@/features/cart/pages/CartPage").then((m) => ({
    default: m.CartPage,
  }))
);
const ProductsPage = lazy(() =>
  import("@/features/products/pages/ProductsPage").then((m) => ({
    default: m.ProductsPage,
  }))
);
const ProductDetailPage = lazy(() =>
  import("@/features/products/pages/ProductDetailPage").then((m) => ({
    default: m.ProductDetailPage,
  }))
);
const CreateProductPage = lazy(() =>
  import("@/features/products/pages/CreateProductPage").then((m) => ({
    default: m.CreateProductPage,
  }))
);

function withSuspense(Component: React.ReactNode, Fallback: React.ReactNode) {
  return <Suspense fallback={Fallback}>{Component}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/products",
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: withSuspense(<ProductsPage />, <ProductsPageSkeleton />),
          },
          {
            path: ":id",
            element: withSuspense(
              <ProductDetailPage />,
              <ProductDetailPageSkeleton />
            ),
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/cart",
            element: withSuspense(<CartPage />, <CartPageSkeleton />),
          },
          {
            path: "/products/new",
            element: withSuspense(
              <CreateProductPage />,
              <ProductsPageSkeleton />
            ),
          },
        ],
      },
      {
        element: <RequireGuest />,
        children: [
          {
            path: "/login",
            element: withSuspense(<LoginPage />, <AuthPageSkeleton />),
          },
          {
            path: "/signup",
            element: withSuspense(<SignupPage />, <AuthPageSkeleton />),
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
