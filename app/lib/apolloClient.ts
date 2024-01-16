import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClientInstance = () => {
  if (!apolloClient) {
    const httpLink = createHttpLink({
      uri: "http://localhost:3000/graphql", // Replace with your GraphQL endpoint
    });

    apolloClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });
  }

  return apolloClient;
};

export const createApolloClient = () => {
  return createApolloClientInstance();
};

export const setAccessToken = () => {
  const accessToken = getCookieValue("jwt");

  if (accessToken) {
    apolloClient.setLink(
      setContext(() => ({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }))
    );
  }
};

const getCookieValue = (name: string) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};
