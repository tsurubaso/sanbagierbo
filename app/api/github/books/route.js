import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const res = await fetch(
    "https://api.github.com/repos/tsurubaso/bibliotheque/contents?ref=master",
    {
      headers: {
        Authorization: `token ${session.accessToken}`,
      },
    }
  );
  const files = await res.json();
  // On ne garde que les .md
  const mdFiles = files.filter(f => f.name.endsWith(".md"));
  return Response.json(mdFiles);
}
