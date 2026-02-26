import { DEFAULT_PAGE } from "@/constants";

export function parsePage(v: string | null) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : DEFAULT_PAGE;
}
