import { gql } from "@/app/__generated__/gql";
import { Folder } from "@/app/__generated__/graphql";

export const ALL_FOLDER = gql(/* GraphQL */ `
  query UserFolders {
    userFolders {
      ...FolderData
    }
  }

  fragment FolderData on Folder {
    id
    createdAt
    updatedAt
    title
    description
  }
`);

export const CREATE_FOLDER = gql(/* GraphQL */ `
  mutation CreateFolder($description: String!, $title: String!) {
    createFolder(data: { description: $description, title: $title }) {
      ...FolderData
    }
  }

  fragment FolderData on Folder {
    id
    createdAt
    updatedAt
    title
    description
  }
`);
