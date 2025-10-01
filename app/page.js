"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  async function createFile() {
    const res = await fetch("/api/github/create-file", { method: "POST" });
    const data = await res.json();
    console.log(data);
  }

  if (!session) {
    return <button onClick={() => signIn("github")}>Login avec GitHub</button>;
  }

  return (
    <div>
      <p>Connecté : {session.user.name}</p>
      <button onClick={() => signOut()}>Logout</button>
      <button onClick={createFile}>Créer un fichier dans mon repo</button>
    </div>
  );
}
