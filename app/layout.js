
import "./globals.css";

export const metadata = {
  title: "SanBagierBo",
  description: "Why a book when you can App",
  authors: [{ name: "Tsuru Baso", url: "https://github.com/tsurubaso" }],
  keywords: [
    "Next.js", "SanBagierBo", "Book", "App", "Stories", "Interactive",
    "React", "JavaScript", "Web Development", "reader", "fiction",
    "narrative", "digital", "experience", "creative", "literature",
    "imagination", "explore", "adventure", "characters"
  ],
  openGraph: {
    title: "SanBagierBo – Why a book when you can App",
    description: "Discover a new way to experience stories.",
    url: "https://sanbagierbo.vercel.app",
    siteName: "SanBagierBo",
    images: [
      {
        url: "https://sanbagierbo.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SanBagierBo",
    description: "Why a book when you can App",
    creator: "@SanBagierBo",
    images: ["https://sanbagierbo.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://sanbagierbo.vercel.app"),
  alternates: {
    canonical: "https://sanbagierbo.vercel.app",
  },
};

export const viewport = {
  themeColor: "#1e1e1e",
};


export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
