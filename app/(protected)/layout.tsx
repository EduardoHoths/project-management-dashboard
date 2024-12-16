import React from "react";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Header } from "@/components/header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Header />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
};

export default ProtectedLayout;
