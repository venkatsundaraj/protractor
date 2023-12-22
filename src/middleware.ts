import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    let url = req.nextUrl.pathname;
    const token = await getToken({ req });
    const isAuth = !!token;
    const protectedRoutes = ["/dashboard"];
    const authRoutes = ["/login", "/register"];

    const isInLoginPage = authRoutes.some((route) => url.startsWith(route));
    const isInAuthPage = protectedRoutes.some((route) => url.startsWith(route));

    if (isInLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    }
    if (!isAuth && isInAuthPage) {
      if (req.nextUrl.search) {
        url += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(url)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/register", "/login", "/dashboard/:path*"],
};
