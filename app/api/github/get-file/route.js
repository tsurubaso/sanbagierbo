// app/api/github/get-file/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const book = searchParams.get("book");
  const branch = searchParams.get("branch");

  const res = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/contents/books/${book}.md?ref=${branch}`,
    { headers: { Authorization: `token ${session.accessToken}` } }
  );

  const data = await res.json();
  if (data.content) {
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return new Response(JSON.stringify({ content }));
  }

  return new Response(JSON.stringify({ error: data.message }), { status: 400 });
}
