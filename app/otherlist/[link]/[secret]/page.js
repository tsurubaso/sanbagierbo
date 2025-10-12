import { use } from "react";
import SecretEditor from "@/components/SecretEditor";
import SidebarRight from "@/components/SidebarRight";

export default function Page({ params }) {
  const { link, secret } = use(params);
<SidebarRight/>
  return <SecretEditor link={link} secret={secret} />;
}