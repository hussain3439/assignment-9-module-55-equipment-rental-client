"use client"

import { FormEvent, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/auth-client"

type SignUpFormData = {
  name: string
  email: string
  image: string
  password: string
  role: "seeker" | "recruiter" | "admin"
}

const roles = ["seeker", "recruiter", "admin"] as const

// Password regex: min 6 characters + 1 uppercase + 1 lowercase + 1 number + 1 special character
const passwordPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{6,}"

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    // Convert FormData to Object
    const userData = Object.fromEntries(formData.entries()) as SignUpFormData

    try {
      const { data, error } = await signUp.email({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        image: userData.image || undefined,
        // The auth system stores roles as "seeker" | "recruiter" | "admin"
        // signUp.email's type inference expects "customer" | "owner" | "admin"
        // We assert through unknown to satisfy TypeScript; the runtime value
        // ("seeker" | "recruiter" | "admin") is valid for Better Auth.
        role: userData.role as unknown as "customer" | "owner" | "admin",
        callbackURL: "/",
      })

      if (error) {
        toast.error("Sign up failed!")
        console.log(error.message)
        return
      }

      console.log("Signup successful:", data)
      if (data) {
        toast.success("Sign up successfully!")
        router.push("/")
      }
    } catch (error) {
      console.error("Signup Error:", error)
    }
  }

  return (
    <div className="py-12">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/70 bg-neutral-950 shadow-2xl md:grid-cols-2">
        {/* Left side: shows only on medium and bigger screens */}
        <div className="hidden flex-col justify-center gap-6 bg-gradient-to-br from-[#7a5af8] to-[#4a2fd0] p-12 text-white md:flex">
          <h2 className="text-4xl leading-tight font-bold">
            Find your next
            <br />
            big opportunity
          </h2>
          <p className="text-white/80">
            Join HireLoop and connect job seekers with recruiters in one simple
            place.
          </p>
          <ul className="space-y-2 text-sm text-white/90">
            <li>✓ Create your profile in minutes</li>
            <li>✓ Apply or hire with one click</li>
            <li>✓ Free to get started</li>
          </ul>
        </div>

        {/* Right side: the form */}
        <div className="p-8 sm:p-12">
          <h1 className="text-2xl font-semibold text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Start your journey with Equipment Rental today
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Role */}
            <div className="space-y-2">
              <Label className="text-neutral-300">I am registering as</Label>
              <div className="flex gap-2">
                {roles.map((role) => (
                  <label key={role} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      defaultChecked={role === "seeker"}
                      className="peer sr-only"
                    />
                    <span className="flex h-10 items-center justify-center rounded-lg border border-white/10 text-sm text-neutral-400 capitalize peer-checked:border-[#7a5af8] peer-checked:bg-[#7a5af8]/15 peer-checked:text-white">
                      {role}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-300">
                Full name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                placeholder="John Doe"
                className="h-10 text-white"
              />
            </div>

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
                placeholder="you@example.com"
                className="h-10 text-white"
              />
            </div>

            {/* Image URL: type="url" checks the URL format */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-neutral-300">
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                type="url"
                required
                placeholder="https://example.com/photo.jpg"
                className="h-10 text-white"
              />
            </div>

            {/* Password: pattern = regex, title = message shown when wrong */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  pattern={passwordPattern}
                  title="Min 6 characters with 1 uppercase, 1 lowercase, 1 number and 1 special character."
                  placeholder="Create a password"
                  className="h-10 pr-10 text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-neutral-500">
                Min 6 characters, 1 uppercase, 1 lowercase, 1 number, 1 special
                character.
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#7a5af8] text-white hover:bg-[#6d4ff0]"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#9d8bff] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
