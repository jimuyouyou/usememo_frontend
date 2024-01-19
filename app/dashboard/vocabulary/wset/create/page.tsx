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
import { logApolloDev } from "@/app/lib/apolloDev";
import { createApolloClient } from "@/app/lib/apolloClient";
import { CREATE_FOLDER, ALL_FOLDER } from "@/app/graphql/folder";

// export const metadata: Metadata = {
//   title: "Vocabulary",
// };

const client = createApolloClient();

function Section() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createFolder, { error, data }] = useMutation(CREATE_FOLDER, {
    variables: { title, description },
    refetchQueries: [{ query: ALL_FOLDER }],
  });
  const router = useRouter();

  const handleClick = () => {
    createFolder();
    router.push("/dashboard/vocabulary/folder/all");
  };

  return (
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
          onChange={(e) => {
            setTitle(e.target.value);
          }}
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
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={handleClick}>Create</button>
      </div>
    </section>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  logApolloDev();

  return (
    <ApolloProvider client={client}>
      <main>
        <TopNav />
        <Section />
      </main>
    </ApolloProvider>
  );
}
