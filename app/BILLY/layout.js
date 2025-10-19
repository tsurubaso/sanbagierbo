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
          <aside className="w-64 bg-gray-100 border-r p-4">
            <p>📁 Fragment navigation</p>
          </aside>

          <ClientWrapper
            navItemsTop
            rightSidebarContent={<GithubSidebar />}
            rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
          >
            {children}
          </ClientWrapper>
        </>
      )}

      {isIllustration && (
        <>
          <aside className="w-64 bg-gray-100 border-r p-4">
            <p>📁 Illustration navigation</p>
          </aside>

          <ClientWrapper
            navItemsTop
            rightSidebarContent={<GithubSidebar />}
            rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
          >
            {children}
          </ClientWrapper>
        </>
      )}

      {isOther && (
        <>
          <aside className="w-64 bg-gray-100 border-r p-4">
            <p>📁 Other navigation</p>
          </aside>

          <ClientWrapper
            navItemsTop
            rightSidebarContent={<GithubSidebar />}
            rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
          >
            {children}
          </ClientWrapper>
        </>
      )}

      {isStory && (
        <>
          <aside className="w-64 bg-gray-100 border-r p-4">
            <p>📁 Story navigation</p>
          </aside>

          <ClientWrapper
            navItemsTop
            rightSidebarContent={<GithubSidebar />}
            rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
          >
            {children}
          </ClientWrapper>
        </>
      )}
    </>
  );
}
