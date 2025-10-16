import { use } from "react";
import SecretEditor from "@/components/SecretEditor";
import SidebarRight from "@/components/DictionarySidebar";

export default function Page({ params }) {
  const { link, secret } = use(params);

  return (
    <div >
      <div>
        <SecretEditor link={link} secret={secret} />
      </div>
      <div >
        <SidebarRight />
      </div>
    </div>
  );
}
