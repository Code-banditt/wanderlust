"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false); // ✅ Stop loading

    if (res.ok) {
      toast.success("Logged in");
      router.push("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* Left Image Section */}
      <div className="relative hidden md:block">
        <Image
          src="https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg"
          alt="Travel background"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute bottom-10 left-10 text-white max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover the world
          </h1>
          <p className="mt-4 text-lg">
            Plan smarter. Travel better. Join our Wanderlust community.
          </p>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="flex flex-col justify-center px-10 py-20 bg-white shadow-xl">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading} // ✅ Disable button when loading
              className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-sm text-center text-gray-500">
              Don&#39;t have an account?{" "}
              <Link href="/Registered" className="text-black font-semibold">
                Sign up
              </Link>
            </p>
          </form>

          <div className="flex flex-col items-center mt-6 text-xs underline">
            <Link
              href={"/forgot-password"}
              className="cursor-pointer hover:text-gray-400"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
