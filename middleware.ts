import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { userStatus } from "@prisma/client";

// Define protected routes and their required roles
// const PROTECTED_ROUTES = {
//   '/profile': [userStatus.USER, userStatus.ADMIN],
//   '/game': [userStatus.USER, userStatus.ADMIN],
//   '/admin': [userStatus.ADMIN],
//   '/api/admin': [userStatus.ADMIN],
// } as const;

const PROTECTED_ROUTES: Record<string, userStatus[]> = {
  "/profile": [userStatus.USER, userStatus.ADMIN],
  "/game": [userStatus.USER, userStatus.ADMIN],
  "/dashboard": [userStatus.ADMIN],
  "/admin": [userStatus.ADMIN],
  "/api/admin": [userStatus.ADMIN],
};

export type JwtPayload = {
  userId: string;
  username: string;
  role: userStatus;
  discordUsername: string | null;
  discordAvatar: string | null;
  iat: number;
  exp: number;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  
  const protectedPath = Object.keys(PROTECTED_ROUTES).find((path) =>
    pathname.startsWith(path)
  );

  if (protectedPath) {
    // const authHeader = request.headers.get('authorization');
    // console.log("auth header", authHeader);
    const token = request.cookies.get("token")?.value;

    // const token = authHeader?.split(' ')[1];

    // Handle missing
    console.log("token", token);
    if (!token) {
      if (request.headers.get("accept")?.includes("application/json")) {
        return NextResponse.json(
          { message: "Authentication required" },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/login", baseUrl));
    }

    // Verify token and check user role
    const user = await verifyToken(token) as JwtPayload | null;
    if (!user) {
      if (request.headers.get("accept")?.includes("application/json")) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", baseUrl));
    }

    console.log(user);
    // Check if user has required role for the path
    const requiredRoles =
      PROTECTED_ROUTES[protectedPath as keyof typeof PROTECTED_ROUTES];
    if (!requiredRoles.includes(user.role)) {
      if (request.headers.get("accept")?.includes("application/json")) {
        return NextResponse.json(
          { message: "Unauthorized access" },
          { status: 403 }
        );
      }
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Add user info to headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.userId);
    requestHeaders.set("x-user-role", user.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
