// app/components/ClientWrapper.js
"use client";

import { SessionProvider } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

export default function ClientWrapper({ children }) {
  return (
    <SessionProvider>
      <ThemeToggle />
      {children}
    </SessionProvider>
  );
}
