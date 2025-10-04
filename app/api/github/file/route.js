// app/api/github/file/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const book = searchParams.get("book");
  const branch = searchParams.get("branch") || "main";

  if (!book) {
    return new Response(JSON.stringify({ error: "Book is required" }), { status: 400 });
  }

  const res = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/contents/${book}?ref=${branch}`,
    {
      headers: {
        Authorization: `token ${session.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const data = await res.json();
  if (res.ok) {
    return new Response(JSON.stringify(data), { status: 200 });
  } else {
    return new Response(JSON.stringify(data), { status: res.status });
  }
}
