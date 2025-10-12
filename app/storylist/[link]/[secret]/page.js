import { use } from "react";
import SecretEditor from "@/components/SecretEditor";

export default function Page({ params }) {
  const { link, secret } = use(params);

  return <SecretEditor link={link} secret={secret} />;
}