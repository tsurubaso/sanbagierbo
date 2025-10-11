// app/api/github/books/route.js
import { listFiles } from "@/lib/github";

export async function GET() {
  try {
    const files = await listFiles("", "master");
    const mdFiles = Array.isArray(files) ? files.filter(f => f.name.endsWith(".md")) : [];
    return new Response(JSON.stringify(mdFiles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("GitHub books API error:", e.message);
    return new Response(JSON.stringify([]), {  // <-- return empty array on error
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
