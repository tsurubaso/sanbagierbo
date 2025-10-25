"use client";

import ClientWrapper from "@/components/ClientWrapper";
import DictionarySidebarSimple from "@/components/DicoSimplePourSidebare";
import DictionarySidebarFull from "@/components/DicoCompletPourSidebare";
import GithubSidebar from "@/components/GitHubSideBar";
import { usePathname } from "next/navigation";

export default function BillyLayout({ children }) {
  const pathname = usePathname();

  // Catégories principales
  const isDraft = pathname.startsWith("/BILLY/draftlist");
  const isFragment = pathname.startsWith("/BILLY/fragmentlist");
  const isIllustration = pathname.startsWith("/BILLY/illustrationlist");
  const isOther = pathname.startsWith("/BILLY/otherlist");
  const isStory = pathname.startsWith("/BILLY/storylist");

  // Modes
  const isReader = pathname.includes("/reader");
  const isEditor = pathname.includes("/editor");
  const isMerger = pathname.includes("/merger");

  // Base path
  const basePath = pathname.replace(/\/(reader|editor|merger)$/, "");

  const navItemsTop = [
    { href: `${basePath}/reader`, label: "📖 Reader" },
    { href: `${basePath}/editor`, label: "✏️ Editor" },
    { href: `${basePath}/merger`, label: "🧩 Merger" },
  ];

  // === PRIORITÉ AUX MODES ===
  if (isReader) {
    return (
      <ClientWrapper
        navItemsTop={navItemsTop}
        //rightSidebarDescription={<p>🧾 Mode Lecture</p>}
        rightSidebarContent={<DictionarySidebarSimple />}
        showRightDefault={true}
      >
        {children}
      </ClientWrapper>
    );
  }

  if (isEditor) {
    return (
      <ClientWrapper
        navItemsTop={navItemsTop}
        rightSidebarContent={<DictionarySidebarFull/>}
        showRightDefault={true}
      >
        {children}
      </ClientWrapper>
    );
  }

  if (isMerger) {
    return (
      <ClientWrapper
        navItemsTop={navItemsTop}
        rightSidebarContent={<p>🔀 Mode Fusion</p>}
        rightSidebarDescription={<p>Comparaison et fusion de versions</p>}
        showRightDefault
      >
        {children}
      </ClientWrapper>
    );
  }

  // === ENSUITE LES CATÉGORIES ===
  if (isDraft) {
    return (
      <ClientWrapper
        navItemsTop={navItemsTop}
        rightSidebarContent={<GithubSidebar />}
        //rightSidebarDescription={<p>🧾 Liste de brouillons</p>}
        showRightDefault={false}
      >
        {children}
      </ClientWrapper>
    );
  }

  if (isFragment) {
    return (
      <ClientWrapper
        navItemsTop={navItemsTop}
        rightSidebarContent={<GithubSidebar />}
        rightSidebarDescription={<p>📜 Fragments en cours</p>}
        showRightDefault={false}
      >
        {children}
      </ClientWrapper>
    );
  }

  if (isIllustration) {
    return (
      <ClientWrapper
        navItemsTop={navItemsTop}
        rightSidebarContent={<GithubSidebar />}
        rightSidebarDescription={<p>🎨 Illustrations liées</p>}
        showRightDefault={false}
      >
        {children}
      </ClientWrapper>
    );
  }

  if (isOther) {
    return (
      <ClientWrapper
        navItemsTop={navItemsTop}
        rightSidebarContent={<GithubSidebar />}
        rightSidebarDescription={<p>📦 Autres contenus</p>}
        showRightDefault={false}
      >
        {children}
      </ClientWrapper>
    );
  }

  if (isStory) {
    return (
      <ClientWrapper
        navItemsTop={navItemsTop}
        rightSidebarContent={<GithubSidebar />}
        rightSidebarDescription={<p>📖 Histoires complètes</p>}
        showRightDefault={false}
      >
        {children}
      </ClientWrapper>
    );
  }

  // === PAR DÉFAUT ===
  return <>{children}</>;
}
