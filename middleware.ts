import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// https://nextjs.org/docs/app/building-your-application/routing/middleware
// https://nextjs.org/docs/app/api-reference/functions/next-response#redirect
// https://nextjs.org/docs/app/api-reference/functions/next-request#nexturl
export function middleware(request: NextRequest) {
  const isAuthed = request.cookies.has("jwt"); // => true

  if (!isAuthed) {
    const pathname = request.nextUrl && request.nextUrl.pathname;
    const isDashboard = pathname.startsWith("/dashboard");
    if (isDashboard) {
      const loginUrl = new URL("/login", request.url);
      // console.log('0'.repeat(10), JSON.stringify(loginUrl))
      // loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // else return NextResponse.redirect(new URL("/"));
  }
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
