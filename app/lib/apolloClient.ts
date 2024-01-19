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

const createApolloClientInstance = () => {
  if (!apolloClient) {
    // const httpLink = createHttpLink({
    //   uri: "http://localhost:3000/graphql", // Replace with your GraphQL endpoint
    // });
    // apolloClient = new ApolloClient({
    //   link: httpLink,
    //   cache: new InMemoryCache(),
    // });

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

// let authLink: ApolloLink;
export const setAccessToken = (jwtToken: string) => {
  const accessToken = jwtToken || getCookieValue("jwt");

  if (accessToken) {
    // const authLink = setContext((_, { headers }) => {
    //   // get the authentication token from local storage if it exists
    //   const token = accessToken;
    //   // return the headers to the context so httpLink can read them
    //   return {
    //     headers: {
    //       ...headers,
    //       Authorization: token ? `Bearer ${token}` : "",
    //     },
    //   };
    // });

    // https://stackoverflow.com/questions/47443858/apollo-link-response-headers/58986484#58986484
    // Setup the header for the request
    const middlewareAuthLink = new ApolloLink((operation, forward) => {
      const token = accessToken;

      const authorizationHeader = token ? `Bearer ${token}` : null;
      operation.setContext({
        headers: {
          authorization: authorizationHeader,
        },
      });
      return forward(operation);
    });

    // After the backend responds, we take the refreshToken from headers if it exists, and save it in the cookie.
    const afterwareLink = new ApolloLink((operation, forward) => {
      return forward(operation).map((response) => {
        const context = operation.getContext();
        const {
          response: { headers },
        } = context;

        if (headers) {
          const refreshToken = headers.get("refreshToken");
          if (refreshToken) {
            console.log("refreshToken: ", refreshToken);
          }
        }

        return response;
      });
    });

    apolloClient = new ApolloClient({
      link: ApolloLink.from([
        errorLink,
        middlewareAuthLink,
        afterwareLink,
        new HttpLink({ uri: "http://localhost:3000/graphql" }),
      ]),
      cache: new InMemoryCache(),
    });
  }
};

// http-only cookie cannot be accessed in client side, may move it to server side API later
export const setAccessTokenWithoutHeader = (jwtToken: string) => {
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
