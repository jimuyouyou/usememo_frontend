import { NextRequest, NextResponse } from "next/server";
import { gql } from '@apollo/client';
import apolloClient from '../../../lib/apolloClient';

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
  const { data } = await apolloClient.mutate({mutation: LOG_IN});
  console.log('apollo data', data);

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
    value: "token",
    httpOnly: true,
    maxAge: 60 * 60,
  });

  return response;
}
