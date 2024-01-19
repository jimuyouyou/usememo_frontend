import { getSession, GetSessionParams } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// https://nextjs.org/docs/app/api-reference/functions/next-response
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const response = NextResponse.redirect(new URL('/login', req.url));
  response.cookies.delete("jwt");

  // Then set a cookie
  // response.cookies.set({
  //   name: "jwt",
  //   value: "",
  //   httpOnly: true,
  //   maxAge: 0,
  // });

  return response;
}
