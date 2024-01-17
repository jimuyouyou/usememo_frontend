import type { NextAuthConfig } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    // figure out the auth and redirect logic, and make changes accordingly
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      console.log("auth-config", { isLoggedIn, isOnDashboard, auth });
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // return Response.redirect(new URL("/dashboard", nextUrl));
        // Set json response first
        const response = NextResponse.json(
          {
            ...auth,
          },
          { status: 200 }
        );

        // // Then set a cookie
        const jwtToken = auth.user.name || '';
        response.cookies.set({
          name: "jwt",
          value: jwtToken,
          httpOnly: true,
          maxAge: 60 * 60,
        });

        return response; // redirect to somewhere?
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
