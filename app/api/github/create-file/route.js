import { saveFile } from "@/lib/github";

export async function POST(req) {
  try {
    const { fileName, content, branch } = await req.json();
    const result = await saveFile(fileName, content, branch);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
