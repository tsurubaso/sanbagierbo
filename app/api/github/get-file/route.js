// app/api/github/get-file/route.js
import { getFile } from "@/lib/github";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const book = searchParams.get("book");
    const branch = searchParams.get("branch") || "master";

    if (!book) return new Response(JSON.stringify({ error: "Book is required" }), { status: 400 });

    const content = await getFile(book, branch);
    //console.log(content)

    return new Response(JSON.stringify({ content }), { status: 200 });
  } catch (e) {
    console.error("❌ get-file error:", e);
    // send the message to the browser to debug
    return new Response(
      JSON.stringify({ error: e.message || e.toString() }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
