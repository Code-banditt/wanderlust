"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useLoading } from "../_components/Loading";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const { setLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Create the account
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register");
        toast.error(data.error || "Registration failed");
        return;
      }

      toast.success("✅ Account created successfully");

      // 2️⃣ Send welcome email
      try {
        const emailRes = await fetch("/api/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: form.email,
            subject: "🎉 Welcome to Wanderlust!",
            message: `Hey ${form.name || "Traveler"}, your account has been successfully created. Get ready to explore!`,
          }),
        });

        if (emailRes.ok) {
          toast.success("📧 Welcome email sent");
        } else {
          toast.error("❌ Failed to send welcome email");
        }
      } catch (err) {
        toast.error("❌ Failed to send welcome email");
      }

      // 3️⃣ Redirect after a short delay
      setTimeout(() => router.push("/signIN"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f4f4] to-[#fef9e7]"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2021/11/15/05/54/couple-6796433_1280.jpg')",
      }}
    >
      <div className="flex flex-col md:flex-row w-[95%] max-w-6xl overflow-hidden shadow-lg bg-white">
        {/* Left: Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-10 space-y-6"
        >
          <div className="text-3xl font-bold text-gray-800">
            <div className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full font-bold text-lg">
                W
              </div>
              <h1 className="text-xl font-bold">WanderLust</h1>
            </div>
            Create an account
          </div>
          <p className="text-gray-500">Sign up to start your Trips</p>

          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            required
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-xl transition"
          >
            Submit
          </button>

          <p className="text-sm text-gray-500 text-center">
            Have an account?{" "}
            <a href="signIN" className="text-blue-600">
              Sign in
            </a>
          </p>
        </form>

        {/* Right: Image section */}
        <div
          className="w-full md:w-1/2 relative h-[500px] md:h-auto bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2017/06/22/09/29/istanbul-2430072_1280.jpg')`,
          }}
        >
          <div className="absolute top-6 left-6 bg-black/70 text-white text-xs px-3 py-1 rounded-full shadow">
            AI Trip Generator for Quick Planning
          </div>
          <div className="absolute bottom-6 left-6 bg-white text-gray-800 text-sm px-4 py-2 rounded-xl shadow-md">
            We make our Users happy
            <div className="flex mt-2 space-x-2">
              <Image
                width={400}
                height={400}
                alt="user1"
                src="https://randomuser.me/api/portraits/women/68.jpg"
                className="w-6 h-6 rounded-full"
              />
              <Image
                width={400}
                height={400}
                alt="user2"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-6 h-6 rounded-full"
              />
              <Image
                width={400}
                height={400}
                alt="user3"
                src="https://randomuser.me/api/portraits/women/12.jpg"
                className="w-6 h-6 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
