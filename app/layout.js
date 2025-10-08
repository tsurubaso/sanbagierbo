import ClientWrapper from "@/components/ClientWrapper";
import "./globals.css";

export const metadata = {
  title: "SanBagierBo",
  description: "Why a book when you can App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderColor: "#444",
        }}
      >
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
