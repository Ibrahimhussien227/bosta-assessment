import { authStore } from "@/stores/auth/authStore";
import { ApiError } from "./errors";

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
  signal?: AbortSignal;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeader(): Record<string, string> {
    const token = authStore.getState().token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private buildHeaders(
    body: unknown,
    requiresAuth: boolean
  ): Record<string, string> {
    const headers: Record<string, string> = {};

    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (requiresAuth) {
      Object.assign(headers, this.getAuthHeader());
    }

    return headers;
  }

  private serializeBody(data: unknown): BodyInit | undefined {
    if (data === undefined) return undefined;
    if (data instanceof FormData) return data;
    return JSON.stringify(data);
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: unknown,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      requiresAuth = true,
      signal,
      headers: extraHeaders = {},
      ...rest
    } = config;

    const body = this.serializeBody(data);
    const headers = {
      ...this.buildHeaders(data, requiresAuth),
      ...extraHeaders,
    };

    let response: Response;

    try {
      response = await fetch(`${this.baseURL}${endpoint}`, {
        ...rest,
        method,
        headers,
        body,
        signal,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
      if (error instanceof TypeError) {
        throw new ApiError("Network error. Please check your connection.", 0);
      }
      throw new ApiError("An unexpected error occurred", 500);
    }

    if (response.status === 401) {
      authStore.getState().clearAuth();
      window.location.href = "/login";
      throw new ApiError("Session expired. Please log in again.", 401);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        errorData?.message ?? `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, config);
  }

  post<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>("POST", endpoint, data, config);
  }

  put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>("PUT", endpoint, data, config);
  }

  patch<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, data, config);
  }

  delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, config);
  }
}

export const apiClient = new ApiClient(
  import.meta.env.VITE_API_BASE_URL || "/api"
);
