import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClientInstance = () => {
  if (!apolloClient) {
    // const httpLink = createHttpLink({
    //   uri: "http://localhost:3000/graphql", // Replace with your GraphQL endpoint
    // });
    // apolloClient = new ApolloClient({
    //   link: httpLink,
    //   cache: new InMemoryCache(),
    // });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
      }
    });

    // https://github.com/apollographql/apollo-client/issues/6850
    apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([
        errorLink,
        new HttpLink({ uri: "http://localhost:3000/graphql" }),
      ]),
    });
  }

  return apolloClient;
};

export const createApolloClient = () => {
  return createApolloClientInstance();
};

// http-only cookie cannot be accessed in client side, may move it to server side API later
export const setAccessToken = (jwtToken: string) => {
  const accessToken = jwtToken || getCookieValue("jwt");

  if (accessToken) {
    createApolloClient();
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
