"use client";

import { ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { UserProvider } from "./UserContext";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <UserProvider>{children}</UserProvider>
    </ReactQueryProvider>
  );
};

export default AppProvider;
