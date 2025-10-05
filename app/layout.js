"use client";
import { SessionProvider } from "next-auth/react";
//import ThemeToggle from "@/components/ThemeToggle"; {/* Toggle client pour le thème */} <ThemeToggle /> not in use
        
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderColor: "#444",
        }}
      >
        <SessionProvider>{children}</SessionProvider>

      </body>
    </html>
  );
}
