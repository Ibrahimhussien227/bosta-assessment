import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginFormData } from "../schemas";
import { useLogin } from "../hooks/useAuth";

export function LoginPage() {
  const { login, isLoginPending, loginError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-600 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="p-6">
          <form
            onSubmit={handleSubmit((data) => login(data))}
            className="space-y-4"
          >
            <Input
              label="Username"
              placeholder="Enter your username"
              error={errors.username?.message}
              {...register("username")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />

            {loginError && (
              <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                {loginError}
              </p>
            )}

            <Button
              type="submit"
              loading={isLoginPending}
              className="w-full cursor-pointer"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-slate-900 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-600 text-center">
            <strong>Demo Credentials:</strong>
            <br />
            Username: mor_2314 / Password: 83r5^_
          </p>
        </div>
      </div>
    </div>
  );
}
