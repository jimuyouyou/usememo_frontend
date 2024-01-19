import { gql } from "@/app/__generated__/gql";
import { User, Auth } from "@/app/__generated__/graphql";

export const LOG_IN = gql(/* GraphQL */ `
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
`);
