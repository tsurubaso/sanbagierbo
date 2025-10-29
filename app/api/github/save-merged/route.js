// app/api/github/save-merged/route.js
import { NextResponse } from "next/server";
import { createBranch } from "@/lib/github"; // optionnel si tu veux créer branch via lib (requires session)
 
export async function POST(req) {
  try {
    const { book, targetBranch, mergedText, branchesToDelete = [] } = await req.json();

    if (!book || !targetBranch || typeof mergedText !== "string") {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const repoOwner = process.env.GITHUB_USER || process.env.GITHUB_OWNER;
    const repoName = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    if (!repoOwner || !repoName || !token) {
      return NextResponse.json({ error: "Server missing repo config" }, { status: 500 });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    };

    const filePath = `${book}.md`;

    // 1) Ensure target branch exists: try to get ref, otherwise create from main
    const refRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/ref/heads/${targetBranch}`, { headers });
    if (!refRes.ok) {
      // create branch from main (or master)
      const base = "main"; // ou "master" selon ton repo
      // get base commit sha
      const baseRef = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/ref/heads/${base}`, { headers });
      if (!baseRef.ok) {
        return NextResponse.json({ error: `Cannot find base branch ${base}` }, { status: 500 });
      }
      const baseData = await baseRef.json();
      const sha = baseData.object.sha;
      // create ref
      await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/refs`, {
        method: "POST",
        headers,
        body: JSON.stringify({ ref: `refs/heads/${targetBranch}`, sha }),
      });
    }

    // 2) Try to get file sha on targetBranch to update (optional)
    // Use ?ref=targetBranch to check existing file on that branch
    let existingSha;
    const getFileRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${targetBranch}`, { headers });
    if (getFileRes.ok) {
      const fileData = await getFileRes.json();
      existingSha = fileData.sha;
    }

    // 3) PUT the file to targetBranch (create or update)
    const putRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: `chore: merged ${book} -> ${targetBranch}`,
        content: Buffer.from(mergedText).toString("base64"),
        branch: targetBranch,
        sha: existingSha,
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      return NextResponse.json({ error: `Failed saving: ${putRes.status} ${errText}` }, { status: 500 });
    }

    // 4) Optionnel : delete branchesToDelete (sauf master/main)
    for (const br of branchesToDelete || []) {
      if (!br || br === "master" || br === "main") continue;
      await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/${br}`, {
        method: "DELETE",
        headers,
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
