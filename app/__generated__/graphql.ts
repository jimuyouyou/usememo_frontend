/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: any; output: any; }
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
  user: User;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  createPost: Post;
  login: Auth;
  refreshToken: Token;
  signup: Auth;
  updateUser: User;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['JWT']['input'];
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges?: Maybe<Array<PostEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String']['output'];
  node: Post;
};

export type PostOrder = {
  direction: OrderDirection;
  field: PostOrderField;
};

/** Properties by which post connections can be ordered. */
export enum PostOrderField {
  Content = 'content',
  CreatedAt = 'createdAt',
  Id = 'id',
  Published = 'published',
  Title = 'title',
  UpdatedAt = 'updatedAt'
}

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  helloWorld: Scalars['String']['output'];
  me: User;
  me2: User;
  post: Post;
  publishedPosts: PostConnection;
  userPosts: Array<Post>;
};


export type QueryHelloArgs = {
  name: Scalars['String']['input'];
};


export type QueryPublishedPostsArgs = {
  orderBy?: InputMaybe<PostOrder>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserPostsArgs = {
  id: Scalars['String']['input'];
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignupInput = {
  email: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  postCreated: Post;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
};

export type UpdateUserInput = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Post>>;
  role: Role;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type UserMutationVariables = Exact<{ [key: string]: never; }>;


export type UserMutation = { __typename?: 'Mutation', login: (
    { __typename?: 'Auth' }
    & { ' $fragmentRefs'?: { 'AuthTokensFragment': AuthTokensFragment } }
  ) };

export type UserDataFragment = { __typename?: 'User', id: string, email: string } & { ' $fragmentName'?: 'UserDataFragment' };

export type AuthTokensFragment = { __typename?: 'Auth', accessToken: any, refreshToken: any, user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDataFragment': UserDataFragment } }
  ) } & { ' $fragmentName'?: 'AuthTokensFragment' };

export type UserPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserPostsQuery = { __typename?: 'Query', userPosts: Array<(
    { __typename?: 'Post' }
    & { ' $fragmentRefs'?: { 'PostDataFragment': PostDataFragment } }
  )> };

export type PostDataFragment = { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, published: boolean, title: string, content?: string | null } & { ' $fragmentName'?: 'PostDataFragment' };

export const UserDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserDataFragment, unknown>;
export const AuthTokensFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthTokens"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Auth"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<AuthTokensFragment, unknown>;
export const PostDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]} as unknown as DocumentNode<PostDataFragment, unknown>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"StringValue","value":"lisa@simpson.com","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"StringValue","value":"secret42","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthTokens"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthTokens"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Auth"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserData"}}]}}]}}]} as unknown as DocumentNode<UserMutation, UserMutationVariables>;
export const UserPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"clrctnggg0000oprtx7qti2vr","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]} as unknown as DocumentNode<UserPostsQuery, UserPostsQueryVariables>;