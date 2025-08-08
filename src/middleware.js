// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedPaths = ["/Profile", "/Create", "/Trips"];
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = new URL("/signIN", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url); // optional: return user back
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
