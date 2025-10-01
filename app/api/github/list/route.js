import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const res = await fetch(
    "https://api.github.com/repos/tsurubaso/bibliotheque/contents",
    {
      headers: {
        Authorization: `token ${session.accessToken}`,
      },
    }
  );

  const files = await res.json();
  return Response.json(files);
}
