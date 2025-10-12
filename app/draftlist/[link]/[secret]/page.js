import { use } from "react";
import SecretEditor from "@/components/SecretEditor";
import SidebarRight from "@/components/SidebarRight";

export default function Page({ params }) {
  const { link, secret } = use(params);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <SecretEditor link={link} secret={secret} />
      </div>
      <div style={{ width: 300 }}>
        <SidebarRight />
      </div>
    </div>
  );
}
