// app/api/github/save-file/route.js

import { saveFile } from "@/lib/github";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { book, content, branch } = await req.json();

  try {
    const result = await saveFile(book, content, branch, `Update ${book}`, session.accessToken);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
