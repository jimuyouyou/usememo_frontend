// lib/apolloClient.ts

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from '@apollo/client/link/http';
// import fetch from 'isomorphic-unfetch';

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  fetch,
});

const apolloClient = new ApolloClient({
  ssrMode: true,
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
