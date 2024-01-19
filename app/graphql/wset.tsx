import { gql } from "@/app/__generated__/gql";
import { Folder } from "@/app/__generated__/graphql";

// sets belong to the user
export const USER_WSETS = gql(/* GraphQL */ `
  query UserWsets {
    userWsets {
      ...WsetData
    }
  }

  fragment WsetData on Wset {
    id
    createdAt
    updatedAt
    title
    description
  }
`);

// all sets belong to a folder
export const FOLDER_WSETS = gql(/* GraphQL */ `
  query FolderWsets($id: String!) {
    folderWsets(id: $id) {
      ...WsetData
    }
  }

  fragment WsetData on Wset {
    id
    createdAt
    updatedAt
    title
    description
  }
`);

// one set with all its' words
export const ONE_WSET = gql(/* GraphQL */ `
  query OneWset($id: String!) {
    wset(id: $id) {
      ...WsetData
    }
  }

  fragment WsetData on Wset {
    id
    createdAt
    updatedAt
    title
    description
  }
`);

// create a new wset
export const CREATE_FOLDER = gql(/* GraphQL */ `
  mutation CreateWSet(
    $description: String
    $title: String!
    $folderId: String!
  ) {
    createWset(
      data: { description: $description, title: $title, folderId: $folderId }
    ) {
      ...WsetData
    }
  }

  fragment WsetData on Wset {
    id
    createdAt
    updatedAt
    title
    description
  }
`);
