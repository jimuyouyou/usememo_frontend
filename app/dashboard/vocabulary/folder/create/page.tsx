"use client";
import { useState } from "react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { gql } from "@/app/__generated__/gql";

import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import TopNav from "@/app/ui/vocabulary/topnav";

// export const metadata: Metadata = {
//   title: "Vocabulary",
// };

const CREATE_FOLDER = gql(/* GraphQL */ `
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

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createFolder, { error, data }] = useMutation(CREATE_FOLDER, {
    variables: { title, description },
  });
  const router = useRouter();

  const handleClick = () => {
    createFolder();
    router.push("/dashboard/vocabulary/folder/all");
  };

  return (
    <main>
      <TopNav />
      <section>
        <h3>New Folder</h3>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Input your folder name here"
            onClick={handleClick}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            title="description"
            name="description"
            value={description}
            placeholder="Input your folder description here"
            onClick={handleClick}
          />
        </div>
        <div>
          <button>Create</button>
        </div>
      </section>
    </main>
  );
}
