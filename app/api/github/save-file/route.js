import { saveFile, listBranches, createBranch } from "@/lib/github";

export async function POST(req) {
  try {
    const { book, content, branch, message } = await req.json();

    if (!book) {
      return new Response(JSON.stringify({ error: "Book name is required" }), { status: 400 });
    }

    // 🔍 Vérifie si la branche existe
    const branches = await listBranches();
    const branchExists = branches.includes(branch);

    // 🌱 Si la branche n'existe pas, on la crée depuis master
    if (!branchExists) {
      console.log(`🪴 Creating new branch: ${branch} (from master)`);
      await createBranch(branch, "master");
    }

    // 💾 Sauvegarde le fichier (création ou update)
    const result = await saveFile(book, content, branch, message || `Update ${book}`);

    return new Response(JSON.stringify({ success: true, result }), { status: 200 });

  } catch (e) {
    console.error("❌ save-file error:", e);
    return new Response(
      JSON.stringify({ error: e.message || e.toString() }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
