import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.cookies.has("refresh_token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login$|register$).*)',
  ],
};
