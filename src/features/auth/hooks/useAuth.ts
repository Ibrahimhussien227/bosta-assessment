import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/auth/authStore";
import { queryClient } from "@/app/providers/queryClient";
import type { ApiError } from "@/api/errors";
import type { User } from "@/types";
import { authApi } from "../service";

export function useLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as { from?: Location })?.from?.pathname || "/products";

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      const user: User = {
        id: data.id,
        username: data.username,
        email: data.email ?? `${data.username}@example.com`,
        firstName: data.firstName ?? data.username,
        lastName: data.lastName ?? "User",
      };

      setAuth(data.token, user);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    },
    onError: (error: ApiError) => {
      toast.error(error.message ?? "Login failed");
    },
  });

  return {
    login: mutate,
    loginAsync: mutateAsync,
    isLoginPending: isPending,
    loginError: error?.message,
  };
}

export function useLogout() {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    queryClient.clear();
    toast.success("Logged out");
    navigate("/login", { replace: true });
  };

  return { logout };
}

export function useSignup() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      setAuth(data.token, {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: "",
      });
      toast.success("Account created!");
      navigate("/products", { replace: true });
    },
    onError: (error: ApiError) => {
      toast.error(error.message ?? "Signup failed");
    },
  });

  return {
    signup: mutate,
    signupAsync: mutateAsync,
    isSignupPending: isPending,
    signupError: error?.message,
  };
}
