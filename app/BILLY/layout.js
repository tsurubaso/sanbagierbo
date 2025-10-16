import ClientWrapper from "@/components/ClientWrapper";
import GithubSidebar from "@/components/GitHubSideBar";

export default function ReaderLayout({ children }) {
  return (
    <ClientWrapper
      navItemsTop
      rightSidebarContent={<GithubSidebar />}
      rightSidebarDescription={<p>🔍 Données de connection GitHub </p>}
    >
      {children}
    </ClientWrapper>
  );
}
