// app/api/github/get-file/route.js
import { getFileContent } from "@/lib/github";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const book = searchParams.get("book");
    const branch = searchParams.get("branch") || "master";

    if (!book) return new Response(JSON.stringify({ error: "Book is required" }), { status: 400 });

    const content = await getFileContent(book, branch);

    return new Response(JSON.stringify({ content }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
