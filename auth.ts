import NextAuth from 'next-auth';
import { Session } from 'next-auth';
import type { TokenSet } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';
import { NextRequest, NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { createApolloClient } from "@/app/lib/apolloClient";

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

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        console.log('credentials: ', credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // gql mutation
          const { data } = await apolloClient.mutate({ mutation: LOG_IN });
          console.log("apollo data", data);

          // const user = await getUser(email);
          const user = { email, password, name: data.login.accessToken  } ;
          if (!user) return null;

          // const passwordsMatch = await bcrypt.compare(password, user.password);
          const passwordsMatch = true;
          console.log('0'.repeat(10), [passwordsMatch, data.login]);
          // const rs = Object.create({name: data.login.accessToken}, data.login.user);
          // console.log('01'.repeat(10), [passwordsMatch, data.login]);
          return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  /*callbacks: {
    async session(params) {
      // Adjust the session callback to handle the provided parameters
      console.log('10'.repeat(10));
      const { session, token } = params as { session: Session & { user: any }; token: TokenSet };
      
      if (token) {
        session.user = token.user;
      }
      console.log('11'.repeat(10), session);
      return session;
    },
    async jwt({ token, user }) {
      console.log('2'.repeat(10), [token, user]);
      if (user) {
        // token.user = user;
        Object.assign(user, token.user);
        // console.log('21'.repeat(10), session);
        // Object.assign(session.user, token.user);
      }
      console.log('3'.repeat(10), user);
      return token;
    },
  },*/
});
