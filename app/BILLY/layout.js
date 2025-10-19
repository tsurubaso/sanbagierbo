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
  // Remove the final segment ("reader", "editor", "merger") if it exists
  const basePath = pathname.replace(/\/(reader|editor|merger)$/, "");

  // Then build the 3 nav buttons dynamically
  const navItemsTop = [
    { href: `${basePath}/reader`, label: "📖 Reader" },
    { href: `${basePath}/editor`, label: "✏️ Editor" },
    { href: `${basePath}/merger`, label: "🧩 Merger" },
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
      {isReader && (
        <ClientWrapper
          navItemsTop={navItemsTop}
          rightSidebarContent={<p>📖 Mode Lecture</p>}
          rightSidebarDescription={<p>Visualisation du texte</p>}
          showRightDefault={false}
        >
          {children}
        </ClientWrapper>
      )}
      {isEditor && (
        <ClientWrapper
          navItemsTop={navItemsTop}
          rightSidebarContent={<p>✍️ Mode Édition</p>}
          rightSidebarDescription={<p>Modification du contenu</p>}
          showRightDefault
        >
          {children}
        </ClientWrapper>
      )}
      {isMerger && (
        <ClientWrapper
          navItemsTop={navItemsTop}
          rightSidebarContent={<p>🔀 Mode Fusion</p>}
          rightSidebarDescription={<p>Comparaison et fusion de versions</p>}
          showRightDefault
        >
          {children}
        </ClientWrapper>
      )}
    </>
  );
}
