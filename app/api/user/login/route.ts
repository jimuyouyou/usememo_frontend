import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // ...your post request logic here
  const res = await request.json();

  // Set json response first
  const response = NextResponse.json(
    {
      ...res,
    },
    { status: 200 }
  );

  // Then set a cookie
  response.cookies.set({
    name: "jwt",
    value: "token",
    httpOnly: true,
    maxAge: 60 * 60,
  });

  return response;
}
