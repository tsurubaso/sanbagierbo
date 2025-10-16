import { use } from "react";
import SecretEditor from "@/components/SecretEditor";
import SidebarRight from "@/components/DictionarySidebar";

export default function Page({ params }) {
  const { link, secret } = use(params);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Writing area */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <SecretEditor link={link} secret={secret} />
             {/* Right sidebar */}
      <div style={{ width: 300, borderLeft: "1px solid #ccc", overflow: "auto" }}>
        <SidebarRight />
      </div>
      </div>

 
    </div>
  );
}
