import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { saveFile, deleteFile, listBranches } from "@/app/lib/github";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mergedText, filePath, branchesToDelete = [] } = await req.json();

    if (!mergedText || !filePath) {
      return NextResponse.json({ error: "Missing mergedText or filePath" }, { status: 400 });
    }

    const mainBranch = "main";
    const forbiddenBranches = ["master", "main"];
    const branches = await listBranches();

    // 💾 1️⃣ Sauvegarder sur main (ou master si pas de main)
    const targetBranch = branches.includes(mainBranch) ? mainBranch : "master";

    // on interdit d’écraser directement master/main si besoin
    if (forbiddenBranches.includes(targetBranch)) {
      console.log(`✅ Writing merged content to ${targetBranch} (allowed target)`);
    }

    await saveFile(filePath.replace(/\.md$/, ""), mergedText, targetBranch, "feat: merged overwrite");

    // ❌ 2️⃣ Supprimer les branches devenues inutiles
    const actuallyDeleted = [];
    for (const branch of branchesToDelete) {
      if (forbiddenBranches.includes(branch)) {
        console.warn(`⛔ Skipping deletion of protected branch: ${branch}`);
        continue;
      }
      try {
        const res = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/git/refs/heads/${branch}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          actuallyDeleted.push(branch);
        } else {
          console.warn(`⚠️ Could not delete branch ${branch}:`, await res.text());
        }
      } catch (err) {
        console.error(`Error deleting ${branch}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      savedTo: targetBranch,
      deletedBranches: actuallyDeleted,
    });
  } catch (e) {
    console.error("❌ Error in msave-merged:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
