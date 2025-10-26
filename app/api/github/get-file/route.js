// app/api/github/get-file/route.js
import { getFile } from "@/lib/github";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const book = searchParams.get("book");
    const branch = searchParams.get("branch") || "master";

    if (!book)
      return new Response(
        JSON.stringify({ error: "Book is required" }),
        { status: 400 }
      );

    let content = "";
    try {
      // 🔹 Essaye de charger le fichier
      content = await getFile(book, branch);
    } catch (e) {
      // 🔹 Si 404 → fichier ou branche absente → contenu vide, pas d’erreur
      if (e.message.includes("404")) {
        console.warn(`⚠️ File not found on branch '${branch}', returning empty content.`);
        content = "";
      } else {
        throw e;
      }
    }

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
  if (!e.message.includes("404")) {
    console.error("❌ get-file error:", e);
    return new Response(
      JSON.stringify({ error: e.message || e.toString() }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } else {
    // 🔹 Pour les 404 non attrapés, on renvoie quand même un content vide
    return new Response(JSON.stringify({ content: "" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
}
