// app/api/github/delete-branch/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { branch } = await req.json();

    if (!branch) {
      return NextResponse.json({ error: "Missing branch name" }, { status: 400 });
    }

    const repoOwner = process.env.GITHUB_USER || process.env.GITHUB_OWNER;
    const repoName = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    if (!repoOwner || !repoName || !token) {
      return NextResponse.json({ error: "Server missing repo config" }, { status: 500 });
    }

    // sécurité : ne jamais supprimer master/main
    if (branch === "master" || branch === "main") {
      return NextResponse.json({ error: "Cannot delete protected branch" }, { status: 400 });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    };

    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/${branch}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `GitHub delete failed: ${res.status} ${text}` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete branch error:", e);
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
