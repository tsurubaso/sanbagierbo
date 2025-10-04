// app/api/github/save-file/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { book, content, branch } = await req.json();

  // 1️⃣ Check if branch exists, create if not
  let branchExists = true;
  const refRes = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/git/refs/heads/${branch}`,
    { headers: { Authorization: `token ${session.accessToken}` } }
  );
  if (refRes.status === 404) branchExists = false;

  if (!branchExists) {
    // create branch from master
    const masterRef = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/git/refs/heads/master`,
      { headers: { Authorization: `token ${session.accessToken}` } }
    ).then((r) => r.json());

    await fetch(`https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/git/refs`, {
      method: "POST",
      headers: { Authorization: `token ${session.accessToken}` },
      body: JSON.stringify({
        ref: `refs/heads/${branch}`,
        sha: masterRef.object.sha,
      }),
    });
  }

  // 2️⃣ Check if file exists in branch
  const fileRes = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/contents/books/${book}.md?ref=${branch}`,
    { headers: { Authorization: `token ${session.accessToken}` } }
  ).then((r) => r.json());

  const sha = fileRes.sha; // undefined if new file

  // 3️⃣ Update/create the file
  const putRes = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/contents/books/${book}.md`,
    {
      method: "PUT",
      headers: { Authorization: `token ${session.accessToken}` },
      body: JSON.stringify({
        message: `Update ${book} in branch ${branch}`,
        content: Buffer.from(content).toString("base64"),
        branch,
        sha,
      }),
    }
  );

  const result = await putRes.json();
  return new Response(JSON.stringify(result));
}
