import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { authService } from "../services/auth.service";
import {
  loginSchema,
  type LoginFormData,
} from "../schemas/auth.schema";
import maveLoginImage from "../assets/images/mave-login.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");

      await authService.login(data);

      // We'll handle authenticated navigation
      // when we build the application shell.
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message ||
          "Unable to sign in. Please check your credentials.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <div className="grid min-h-screen lg:grid-cols-[55%_45%]">
        {/* Image */}
        <div className="relative hidden min-h-screen lg:block">
          <img
            src={maveLoginImage}
            alt="MAVE curated lifestyle products"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          <div className="absolute left-10 top-10">
            <span className="text-2xl font-large tracking-[0.45em] text-white">
              MAVE
            </span>
          </div>

          <div className="absolute bottom-10 left-10 right-10 text-white">
            <p className="text-lg leading-snug">
              Pieces we'd keep for ourselves,
              <br />
              curated for your home.
            </p>
          </div>
        </div>

        {/* Login */}
        <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-md">
            <div className="mb-12 lg:hidden">
              <div className="text-center text-l font-medium tracking-[0.25em] text-[#1C1A16]">
                MAVE
              </div>
            </div>

            <div className="mb-10">
            <span className="text-l font-large tracking-[0.25em] text-[#1C1A16] hidden lg:block">
              MAVE
            </span>
              <h1 className="text-3xl font-semibold tracking-tight text-[#1C1A16]">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-[#8B8478]">
                Sign in to continue shopping.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  error={!!errors.email}
                  className="focus-visible:ring-[#7A5C3E]"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="mt-2 text-xs text-red-700">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <Label htmlFor="password">Password</Label>

                  <a
                    href="/forgot-password"
                    className="text-xs text-[#8B8478] transition-colors hover:text-[#1C1A16]"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    error={!!errors.password}
                    className="pr-16 focus-visible:ring-[#7A5C3E]"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8B8478] underline-offset-2 transition-colors hover:text-[#1C1A16] hover:underline"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-xs text-red-700">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {serverError && (
                <div
                  role="alert"
                  className="border-l-2 border-red-700 bg-red-50/60 px-4 py-3 text-sm text-red-800"
                >
                  {serverError}
                </div>
              )}

              <Button
                type="submit"
                loading={isSubmitting}
                className="bg-[#1C1A16] hover:bg-[#1C1A16]/90"
              >
                Sign in
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-[#8B8478]">
              New to MAVE?{" "}
              <a
                href="/register"
                className="font-medium text-[#1C1A16] underline-offset-2 hover:underline"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}