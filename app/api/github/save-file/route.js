// app/api/github/save-file/route.js

import { saveFile } from "@/lib/github";

export async function POST(req) {
  try {
    const { book, content, branch } = await req.json();
    const result = await saveFile(book, content, branch);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
