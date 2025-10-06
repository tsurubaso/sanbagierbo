import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { mergedText, filePath, branchesToDelete } = await req.json();

    const repoOwner = process.env.GITHUB_OWNER;
    const repoName = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // 1️⃣ Récupérer le SHA du fichier sur main
    const fileRes = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=main`,
      { headers }
    ).then(r => r.json());

    const sha = fileRes.sha; // SHA du fichier à mettre à jour

    // 2️⃣ Écrire le fichier sur main (upsert)
    await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: "feat: merged text overwrite main",
          content: Buffer.from(mergedText).toString("base64"),
          branch: "main",
          sha, // SHA du fichier existant
        }),
      }
    );

    // 3️⃣ Supprimer les branches inutiles
    for (const branch of branchesToDelete) {
      await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/${branch}`,
        { method: "DELETE", headers }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
