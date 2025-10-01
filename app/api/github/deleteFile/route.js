import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { name, sha } = await req.json();

  const res = await fetch(
    `https://api.github.com/repos/tsurubaso/bibliotheque/contents/${name}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `token ${session.accessToken}`,
        "Content-Type": "application//vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: `Delete ${name}`,
        sha,       // obligatoire pour supprimer
        branch: "main",
      }),
    }
  );

  if (!res.ok) {
    return Response.json({ error: "GitHub API error" }, { status: res.status });
  }

  return Response.json({ success: true });
}
