"use client";
import { useState } from "react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import TopNav from "@/app/ui/vocabulary/topnav";
import { logApolloDev } from "@/app/lib/apolloDev";
import { createApolloClient } from "@/app/lib/apolloClient";
import { ALL_FOLDER } from "@/app/graphql/folder";
// export const metadata: Metadata = {
//   title: "Vocabulary",
// };

const client = createApolloClient();

function Section() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { loading, error, data } = useQuery(ALL_FOLDER);
  console.log("3".repeat(10), data);

  return (
    <section>
      <h3>New Folder</h3>
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Name
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data &&
            data.userFolders &&
            data.userFolders.length > 0 &&
            data.userFolders.map(({ id, title, description }: any) => {
              return (
                <tr key={id}>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {title}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {description}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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
