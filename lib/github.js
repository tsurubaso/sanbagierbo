import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import matter from "gray-matter";

const BASE_URL = `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`;

async function getAuthHeader() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) throw new Error("Not authenticated");
  return { Authorization: `token ${session.accessToken}` };
}

// 📁 Liste les fichiers d’un dossier (root by default)
export async function listFiles( branch = "master") {
  const headers = await getAuthHeader();
  const url = `${BASE_URL}/contents?ref=${branch}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub list error: ${res.status}`);
  return res.json();
}

// 📄 Récupère un fichier markdown
export async function getFile(fileName, branch = "master") {
  const headers = await getAuthHeader();
  const res = await fetch(`${BASE_URL}/contents/${fileName}?ref=${branch}`, { headers });
  if (!res.ok) throw new Error(`GitHub getFile error: ${res.status}`);
  const data = await res.json();
  if (!data.content) throw new Error(data.message || "No content");
  return Buffer.from(data.content, "base64").toString("utf-8");
}

// 💾 Sauvegarde un fichier (création ou update)
export async function saveFile(fileName, content, branch = "master", message = "Update file") {
  const headers = await getAuthHeader();

  // Vérifie si le fichier existe déjà
  const fileRes = await fetch(`${BASE_URL}/contents/${fileName}.md?ref=${branch}`, { headers });
  const fileData = fileRes.ok ? await fileRes.json() : {};
  const sha = fileData.sha; // undefined si nouveau fichier

  const putRes = await fetch(`${BASE_URL}/contents/${fileName}.md`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      sha,
    }),
  });

  if (!putRes.ok) throw new Error(`GitHub save error: ${putRes.status}`);
  return putRes.json();
}

// ❌ Supprime un fichier
export async function deleteFile(fileName, sha, branch = "master") {
  const headers = await getAuthHeader();
  const res = await fetch(`${BASE_URL}/contents/${fileName}`, {
    method: "DELETE",
    headers: { ...headers, "Content-Type": "application/vnd.github.v3+json" },
    body: JSON.stringify({
      message: `Delete ${fileName}`,
      sha,
      branch,
    }),
  });
  if (!res.ok) throw new Error(`GitHub delete error: ${res.status}`);
  return true;
}

// 🌿 Liste les branches
export async function listBranches() {
  const headers = await getAuthHeader();
  const res = await fetch(`${BASE_URL}/branches`, { headers });
  if (!res.ok) throw new Error(`GitHub branches error: ${res.status}`);
  const branches = await res.json();
  return branches.map(b => b.name);
}

// 📚 Liste les stories depuis GitHub
export async function listStoriesFromGitHub(branch = "master") {
  const files = await listFiles(branch);
  const stories = [];

  for (const file of files) {
    if (file.type === "file" && file.name.endsWith(".md")) {
      const content = await getFile(file.name, branch);
      const { data } = matter(content);
      const baseName = file.name.replace(/\.md$/, "");
      

      stories.push({
        id: baseName,
        title: data.title || baseName,
        description: data.description || "",
        type: data.type || "story",
        status: data.status || "story",
        link: baseName,
        filename: file.name,
      });
    }
  }

  return stories;
}



// 🌱 Crée une nouvelle branche à partir d'une existante (par défaut "master")
export async function createBranch(newBranch, fromBranch = "master") {
  const headers = await getAuthHeader();

  // 1️⃣ Récupérer le dernier commit de la branche source
  const res = await fetch(`${BASE_URL}/git/ref/heads/${fromBranch}`, { headers });
  if (!res.ok) throw new Error(`GitHub get ref error: ${res.status}`);
  const data = await res.json();
  const sha = data.object.sha;

  // 2️⃣ Créer la nouvelle branche
  const createRes = await fetch(`${BASE_URL}/git/refs`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      ref: `refs/heads/${newBranch}`,
      sha,
    }),
  });

  if (!createRes.ok) throw new Error(`GitHub create branch error: ${createRes.status}`);
  return createRes.json();
}

// supprime une branche (delete ref heads/<branch>)
export async function deleteBranch(branch) {
  const headers = await getAuthHeader();
  const res = await fetch(`${BASE_URL}/git/refs/heads/${branch}`, {
    method: "DELETE",
    headers: { ...headers, "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`GitHub delete branch error: ${res.status}`);
  return true;
}