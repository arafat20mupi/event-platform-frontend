"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"
import { registerSchema, type RegisterFormData } from "@/lib/utils/validation"
import { authService } from "@/services/api/auth.service"
import { ROUTES } from "@/lib/utils/constants"

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const password = watch("password")

  const passwordStrength = {
    hasLength: password?.length >= 6,
    hasUpperCase: /[A-Z]/.test(password || ""),
    hasNumber: /[0-9]/.test(password || ""),
    hasSpecial: /[!@#$%^&*]/.test(password || ""),
  }

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const { confirmPassword, ...submitData } = data
      const response = await authService.register(submitData)
      // TODO: Store token in secure storage (httpOnly cookie)
      // localStorage.setItem('token', response.token);
      router.push(ROUTES.DASHBOARD)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-lg border border-border p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Join thousands discovering amazing events and building communities.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
              disabled={isLoading}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              disabled={isLoading}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                disabled={isLoading}
                className={errors.password ? "border-destructive pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${(strengthScore / 4) * 100}%`,
                        backgroundColor:
                          strengthScore < 2
                            ? "rgb(239, 68, 68)"
                            : strengthScore < 3
                              ? "rgb(249, 115, 22)"
                              : "rgb(34, 197, 94)",
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {strengthScore === 0 && "Weak"}
                    {strengthScore === 1 && "Weak"}
                    {strengthScore === 2 && "Fair"}
                    {strengthScore === 3 && "Good"}
                    {strengthScore === 4 && "Strong"}
                  </span>
                </div>

                <ul className="text-xs space-y-1">
                  {[
                    { key: "hasLength", text: "At least 6 characters" },
                    { key: "hasUpperCase", text: "One uppercase letter" },
                    { key: "hasNumber", text: "One number" },
                    { key: "hasSpecial", text: "One special character (!@#$%^&*)" },
                  ].map(({ key, text }) => (
                    <li
                      key={key}
                      className={`flex items-center gap-1 ${
                        passwordStrength[key as keyof typeof passwordStrength]
                          ? "text-green-600 dark:text-green-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                disabled={isLoading}
                className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer text-sm">
            <input type="checkbox" className="rounded border-border mt-0.5" disabled={isLoading} required />
            <span>
              I agree to the{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading} size="lg">
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href={ROUTES.LOGIN} className="text-primary hover:underline font-medium">
            Sign in here
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 border-t border-border" />
          <span className="text-xs text-muted-foreground">OR SIGN UP WITH</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" disabled={isLoading} className="text-sm bg-transparent">
            Google
          </Button>
          <Button variant="outline" disabled={isLoading} className="text-sm bg-transparent">
            GitHub
          </Button>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        Your data is secure and will never be shared with third parties.
      </p>
    </div>
  )
}
