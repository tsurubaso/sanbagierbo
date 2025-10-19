import { use } from "react";
import SecretEditor from "@/components/SecretEditor";
import SidebarRight from "@/archive/components/DictionarySidebar";

export default function Page({ params }) {
  const { link, secret } = use(params);
<SidebarRight/>
  return <SecretEditor link={link} secret={secret} />;
}