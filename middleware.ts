import { NextRequest, NextResponse } from "next/server";
import type { Session } from "@/lib/auth-types";

export async function middleware(request: NextRequest) {
  const response = await fetch(
    `${process.env.BETTER_AUTH_URL}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const session: Session | null = await response.json();

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
