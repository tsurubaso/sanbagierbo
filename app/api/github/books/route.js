
import { listFiles } from "@/lib/github";

export async function GET() {
  try {
    const files = await listFiles("books", "master");
    const mdFiles = files.filter(f => f.name.endsWith(".md"));
    return Response.json(mdFiles);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
