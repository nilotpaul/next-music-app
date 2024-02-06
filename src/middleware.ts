import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") &&
    !token
  ) {
    return NextResponse.next();
  }

  if (
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") &&
    token
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/likes",
    "/playlist/:path*",
    "/profile",
    "/subscription",
  ],
};
