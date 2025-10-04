import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
      if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const res = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/branches`,
    {
      headers: {
        Authorization: `token ${session.accessToken}`,
      },
    }
  );
  const branches = await res.json();
  return Response.json(branches.map(b => b.name));
}
