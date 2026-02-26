import { type ReactNode } from "react";
import { Toaster } from "sonner";

import ErrorBoundary from "@/components/ErrorBoundary";
import ReactQueryProvider from "./ReactQueryProvider";

type Props = {
  children: ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <ErrorBoundary>
      <ReactQueryProvider>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}
