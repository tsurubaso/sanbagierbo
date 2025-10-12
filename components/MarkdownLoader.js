// app/components/MarkdownLoader.js
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getFile } from "@/lib/github";

export default async function MarkdownLoader({ link }) {
  let content;
  try {
    content = await getFile(`${link}.md`);
    content = content.replace(/^---[\s\S]+?---\s*/, ""); // strip frontmatter
  } catch {
    content = null;
  }

  if (!content) {
    return <p className="text-red-400">Histoire introuvable</p>;
  }

  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>;
}
