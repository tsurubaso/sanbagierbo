const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");

const booksFolder = path.join(__dirname,"public", "books");
const outputPath = path.join(__dirname, "public", "stories.json");

async function generateStoriesJson() {
  try {
    const files = await fs.readdir(booksFolder, { withFileTypes: true });
    const stories = [];

    for (const file of files) {
      if (file.isFile() && file.name.endsWith(".md")) {
        const filePath = path.join(booksFolder, file.name);
        const content = await fs.readFile(filePath, "utf8");
        const { data } = matter(content);

        const baseName = path.basename(file.name, ".md");

        // Fallbacks si frontmatter partiel
        stories.push({
          id: baseName,
          title: data.title || baseName,
          description: data.description || "",
          type: data.type || "story",
          status: data.status || "story", // comme dans ton filtre front
          link: baseName,
          filename: file.name,
        });
      }
    }

    await fs.writeFile(outputPath, JSON.stringify(stories, null, 2), "utf8");
    console.log("✅ Fichier stories.json généré !");
  } catch (err) {
    console.error("🔥 Erreur :", err);
  }
}

generateStoriesJson();
