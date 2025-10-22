"use client";

import Link from "next/link";
import Dropdown from "./Dropdown";
import { useSession, signIn, signOut } from "next-auth/react";
import WanderlustLoader, { useLoading } from "./Loading";
import GoProBtn from "./GoProBtn";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

export default function Header() {
  const { data: session, status } = useSession();
  const [invites, setInvites] = useState([]);
  const { setLoading } = useLoading();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchInvites = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/Recieve?userId=${session.user.id}`);
      const data = await res.json();
      setInvites(data);
    } catch (err) {
      console.error("Error fetching invites", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) fetchInvites();
  }, [session]);

  const pendingInvites =
    invites?.filter((invite) => invite.status === "pending") || [];
  const length = pendingInvites.length;

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 shadow-xs bg-white/30 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                fill="black"
              />
            </svg>
          </div>
          <h2 className="text-[#3abff8] text-lg font-bold leading-tight tracking-[-0.015em]">
            Wanderlust
          </h2>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-9 mx-12">
          <Link href="/Explore" className="text-black text-sm font-medium">
            Explore
          </Link>
          <Link href="/Create" className="text-black text-sm font-medium">
            Create
          </Link>
          <Link href="/Trips" className="text-black text-sm font-medium">
            Trips
          </Link>
          <Dropdown />
        </div>

        {/* Right side */}
        <div className="flex flex-1 justify-end gap-6 items-center">
          {/* Notification Bell */}
          <Link
            href={"/notifications"}
            className="relative flex items-center justify-center h-10 w-10 rounded-full bg-[#EEEEEE]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
            </svg>
            {length > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {length}
              </span>
            )}
          </Link>

          {/* Auth/Profile Section */}
          <div className="hidden lg:flex items-center gap-3">
            {status === "loading" ? (
              <span>loading</span>
            ) : session ? (
              <>
                <GoProBtn />
                <span className="text-sm font-medium hidden md:inline">
                  Welcome,{" "}
                  {session.user.name?.split(" ")[0] || session.user.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-3 py-1 text-sm border rounded hover:bg-red-600 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-4 py-1 text-sm border rounded hover:bg-black hover:text-white transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <Link href="/Explore" onClick={() => setMobileMenuOpen(false)}>
              Explore
            </Link>
            <Link href="/Create" onClick={() => setMobileMenuOpen(false)}>
              Create
            </Link>
            <Link href="/Trips" onClick={() => setMobileMenuOpen(false)}>
              Trips
            </Link>

            <div className="mt-6 border-t pt-4">
              {status === "loading" ? (
                <span>loading...</span>
              ) : session ? (
                <>
                  <GoProBtn />
                  <p className="text-sm mb-2">
                    Welcome,{" "}
                    {session.user.name?.split(" ")[0] || session.user.email}
                  </p>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full px-4 py-2 text-sm border rounded hover:bg-red-600 hover:text-white transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="w-full px-4 py-2 text-sm border rounded hover:bg-black hover:text-white transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
