// lib/github.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BASE_URL = `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`;


async function getAuthHeader() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) throw new Error("Not authenticated");
  return { Authorization: `token ${session.accessToken}` };
}

// 📁 Liste les fichiers d’un dossier
export async function listFiles(path = "", branch = "master") {
  const headers = await getAuthHeader();
  const res = await fetch(`${BASE_URL}/contents/${path}?ref=${branch}`, { headers });
  if (!res.ok) throw new Error("GitHub list error");
  return res.json();
}

// 📄 Récupère un fichier markdown
export async function getFile(book, branch = "master") {
  const headers = await getAuthHeader();
  //console.log(book)
  const res = await fetch(`${BASE_URL}/contents/${book}?ref=${branch}`, { headers });
  const data = await res.json();
  //console.log("data: "+ data)
  if (!data.content) throw new Error(data.message);
  return Buffer.from(data.content, "base64").toString("utf-8");
}

// 💾 Sauvegarde un fichier (création ou update)
export async function saveFile(book, content, branch = "master", message = "Update file") {
  const headers = await getAuthHeader();
  const fileRes = await fetch(`${BASE_URL}/contents/books/${book}.md?ref=${branch}`, { headers });
  const fileData = await fileRes.json();
  const sha = fileData.sha; // undefined si nouveau fichier

  const putRes = await fetch(`${BASE_URL}/contents/books/${book}.md`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      sha,
    }),
  });

  if (!putRes.ok) throw new Error("GitHub save error");
  return putRes.json();
}

// ❌ Supprime un fichier
export async function deleteFile(name, sha, branch = "master") {
  const headers = await getAuthHeader();
  const res = await fetch(`${BASE_URL}/contents/${name}`, {
    method: "DELETE",
    headers: { ...headers, "Content-Type": "application/vnd.github.v3+json" },
    body: JSON.stringify({
      message: `Delete ${name}`,
      sha,
      branch,
    }),
  });
  if (!res.ok) throw new Error("GitHub delete error");
  return true;
}

// 🌿 Liste les branches
export async function listBranches() {
  const headers = await getAuthHeader();
  const res = await fetch(`${BASE_URL}/branches`, { headers });
  if (!res.ok) throw new Error("GitHub branches error");
  const branches = await res.json();
  //console.log(branches)
  return branches.map(b => b.name);
}
