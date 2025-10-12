// app/api/github/books/route.js
import { listStoriesFromGitHub } from "@/lib/github";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "story";

  try {
    const stories = await listStoriesFromGitHub("master");
    const filtered = stories.filter((s) => s.status === status);
    return Response.json(filtered, { status: 200 });
  } catch (err) {
    console.error("Erreur dans /api/github/books :", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
