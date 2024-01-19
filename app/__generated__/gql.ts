/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation User {\n    login(data: { email: \"lisa@simpson.com\", password: \"secret42\" }) {\n      ...AuthTokens\n    }\n  }\n\n  fragment UserData on User {\n    id\n    email\n  }\n\n  fragment AuthTokens on Auth {\n    accessToken\n    refreshToken\n    user {\n      ...UserData\n    }\n  }\n": types.UserDocument,
    "\n  mutation CreateFolder($description: String!, $title: String!) {\n    createFolder(data: { description: $description, title: $title }) {\n      ...FolderData\n    }\n  }\n\n  fragment FolderData on Folder {\n    id\n    createdAt\n    updatedAt\n    title\n    description\n  }\n": types.CreateFolderDocument,
    "\n  query UserPosts {\n    userPosts(id: \"clrctnggg0000oprtx7qti2vr\") {\n      ...PostData\n    }\n  }\n\n  fragment PostData on Post {\n    id\n    createdAt\n    updatedAt\n    published\n    title\n    content\n  }\n": types.UserPostsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation User {\n    login(data: { email: \"lisa@simpson.com\", password: \"secret42\" }) {\n      ...AuthTokens\n    }\n  }\n\n  fragment UserData on User {\n    id\n    email\n  }\n\n  fragment AuthTokens on Auth {\n    accessToken\n    refreshToken\n    user {\n      ...UserData\n    }\n  }\n"): (typeof documents)["\n  mutation User {\n    login(data: { email: \"lisa@simpson.com\", password: \"secret42\" }) {\n      ...AuthTokens\n    }\n  }\n\n  fragment UserData on User {\n    id\n    email\n  }\n\n  fragment AuthTokens on Auth {\n    accessToken\n    refreshToken\n    user {\n      ...UserData\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateFolder($description: String!, $title: String!) {\n    createFolder(data: { description: $description, title: $title }) {\n      ...FolderData\n    }\n  }\n\n  fragment FolderData on Folder {\n    id\n    createdAt\n    updatedAt\n    title\n    description\n  }\n"): (typeof documents)["\n  mutation CreateFolder($description: String!, $title: String!) {\n    createFolder(data: { description: $description, title: $title }) {\n      ...FolderData\n    }\n  }\n\n  fragment FolderData on Folder {\n    id\n    createdAt\n    updatedAt\n    title\n    description\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserPosts {\n    userPosts(id: \"clrctnggg0000oprtx7qti2vr\") {\n      ...PostData\n    }\n  }\n\n  fragment PostData on Post {\n    id\n    createdAt\n    updatedAt\n    published\n    title\n    content\n  }\n"): (typeof documents)["\n  query UserPosts {\n    userPosts(id: \"clrctnggg0000oprtx7qti2vr\") {\n      ...PostData\n    }\n  }\n\n  fragment PostData on Post {\n    id\n    createdAt\n    updatedAt\n    published\n    title\n    content\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;