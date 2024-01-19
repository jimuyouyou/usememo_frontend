import { getSession, GetSessionParams } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { createApolloClient } from "../../../lib/apolloClient";

const apolloClient = createApolloClient();

const LOG_IN = gql`
  mutation User {
    login(data: { email: "lisa@simpson.com", password: "secret42" }) {
      ...AuthTokens
    }
  }

  fragment UserData on User {
    id
    email
  }

  fragment AuthTokens on Auth {
    accessToken
    refreshToken
    user {
      ...UserData
    }
  }
`;

export async function POST(request: NextRequest) {
  // ...your post request logic here
  const res = await request.json();

  // gql mutation
  const { data } = await apolloClient.mutate({ mutation: LOG_IN });
  // console.log("apollo data", data);

  // Set json response first
  const response = NextResponse.json(
    {
      ...data.login,
    },
    { status: 200 }
  );

  // Then set a cookie
  response.cookies.set({
    name: "jwt",
    value: data.login.accessToken,
    httpOnly: true,
    maxAge: 60 * 60,
  });

  return response;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // res.
  const session = await getSession({ req } as GetSessionParams); // 
  console.log("s0".repeat(10), session);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Access session.user and return it
  const user = session.user;

  // ...your post request logic here
  // const res = await request;

  // gql mutation
  const login = { a: "dfda", accessToken: "accessToken" };
  // Set json response first
  const response = NextResponse.json(
    {
      login,
    },
    { status: 200 }
  );

  // Then set a cookie
  response.cookies.set({
    name: "jwt",
    value: login.accessToken,
    httpOnly: true,
    maxAge: 60 * 60,
  });

  return response;
}
