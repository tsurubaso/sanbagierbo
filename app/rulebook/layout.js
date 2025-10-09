import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import GitHubIdentificationRIghtSideBar from "@/components/GitHubIdentificationRIghtSideBar";

export default function SubLayout({ children }) {
  return (
    <div>
      <div className="flex">
        <Sidebar /> <GitHubIdentificationRIghtSideBar />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
