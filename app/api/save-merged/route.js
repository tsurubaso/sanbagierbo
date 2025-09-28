import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { mergedText, filePath, branchesToDelete } = await req.json();

    const repoOwner = process.env.GITHUB_OWNER;
    const repoName = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;

    // 1️⃣ Récupérer le dernier commit de main
    const mainRef = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => res.json());

    const latestCommitSha = mainRef.object.sha;

    // 2️⃣ Écrire le fichier sur main (mode "upsert")
    await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "feat: merged text overwrite main",
          content: Buffer.from(mergedText).toString("base64"),
          branch: "main",
          sha: latestCommitSha,
        }),
      }
    );

    // 3️⃣ Supprimer les branches inutiles
    for (const branch of branchesToDelete) {
      await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/${branch}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
