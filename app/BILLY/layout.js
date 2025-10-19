"use client";

import ClientWrapper from "@/components/ClientWrapper";
import GithubSidebar from "@/components/GitHubSideBar";

import { usePathname } from "next/navigation";

export default function BillyLayout({ children }) {
  const pathname = usePathname();

  const isDraft = pathname.startsWith("/BILLY/draftlist");
  const isFragment = pathname.startsWith("/BILLY/fragmentlist");
  const isIllustration = pathname.startsWith("/BILLY/illustrationlist");
  const isOther = pathname.startsWith("/BILLY/otherlist");
  const isStory = pathname.startsWith("/BILLY/storylist");

  const isReader = pathname.includes("/reader");
  const isEditor = pathname.includes("/editor");
  const isMerger = pathname.includes("/merger");
  const navItemsTop = [
  { href: "/reader", label: "📖 Reader" },
  { href: "/editor", label: "✏️ Editor" },
  { href: "/merger", label: "🧩 Merger" },
];

  return (
    <>
      {isDraft && (
        <>
          <ClientWrapper
            navItemsTop
            rightSidebarContent={<GithubSidebar />}
            rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
            showRightDefault={false} // désactive la barre droite
          >
            {children}
          </ClientWrapper>
        </>
      )}
      {isFragment && (
        <>
          <ClientWrapper
            navItemsTop
            rightSidebarContent={<GithubSidebar />}
            rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
            showRightDefault={false} // désactive la barre droite
          >
            {children}
          </ClientWrapper>
        </>
      )}
      {isIllustration && (
        <>
          <ClientWrapper
            navItemsTop
            rightSidebarContent={<GithubSidebar />}
            rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
            showRightDefault={false} // désactive la barre droite
          >
            {children}
          </ClientWrapper>
        </>
      )}
      {isOther && (
        <>
          <ClientWrapper
            navItemsTop
            rightSidebarContent={<GithubSidebar />}
            rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
            showRightDefault={false} // désactive la barre droite
          >
            {children}
          </ClientWrapper>
        </>
      )}
      {isStory && (
        <>
          <ClientWrapper
            navItemsTop
            rightSidebarContent={<GithubSidebar />}
            rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
            showRightDefault={false} // désactive la barre droite
          >
            {children}
          </ClientWrapper>
        </>
      )}
    </>
  );
}
