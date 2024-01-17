'use client'
import { useState } from "react";
import { Metadata } from "next";
import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import TopNav from "@/app/ui/vocabulary/topnav";

// export const metadata: Metadata = {
//   title: "Vocabulary",
// };

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // const [pageType, setPageType] = useState("LATEST_SETS");

  return (
    <main>
      <TopNav />
        <section>
          <h3>New Folder</h3>
          <input type="text" placeholder="Input your folder name here"></input>
        </section>
    </main>
  );
}
