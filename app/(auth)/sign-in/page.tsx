"use client"
import Link from "next/link"
import { Suspense, useState, type FormEvent } from "react"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth-client"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type SignInFormData = {
  email: string
  password: string
}

const inputClasses =
  "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus-visible:border-[#7a5af8]/60 focus-visible:ring-2 focus-visible:ring-[#7a5af8]/25"

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? "/"

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    // Convert FormData to Object
    const userData = Object.fromEntries(formData.entries()) as SignInFormData

    try {
      const { data, error } = await signIn.email({
        email: userData.email,
        password: userData.password,
        rememberMe: true,
        callbackURL: redirectTo,
      })

      if (error) {
        toast.error("Sign in failed!")
        console.log(error.message)
        return
      }
      if (data) {
        toast.success("Sign in successfully")
        router.push("/")
      }
      console.log("Signup successful:", data)
    } catch (error) {
      console.error("Signup Error:", error)
    }
  }
  return (
    <>
      <div className="py-12">
        <div className="grid w-full max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/80 bg-neutral-950 shadow-2xl md:grid-cols-2">
          {/* Left side: shows only on medium and bigger screens */}
          <div className="hidden flex-col justify-center gap-6 bg-gradient-to-br from-[#7a5af8] to-[#4a2fd0] p-12 text-white md:flex">
            <h2 className="text-4xl leading-tight font-bold">
              Good to see
              <br />
              you again
            </h2>
            <p className="text-white/80">
              Sign in to continue where you left off on HireLoop.
            </p>
            <ul className="space-y-2 text-sm text-white/90">
              <li>✓ Track your applications</li>
              <li>✓ Manage your job posts</li>
              <li>✓ Stay connected with recruiters</li>
            </ul>
          </div>

          {/* Right side: the form */}
          <div className="p-8 sm:p-12">
            <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Sign in to your HireLoop account to continue
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email: type="email" checks the email format */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-10 text-white"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-neutral-300">
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-xs font-medium text-[#9d8bff] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-10 pr-10 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#7a5af8] text-white hover:bg-[#6d4ff0]"
              >
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-[#9d8bff] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// useSearchParams() must sit inside a Suspense boundary for static prerendering.
const SignInPage = () => (
  <Suspense>
    <SignInForm />
  </Suspense>
)

export default SignInPage
