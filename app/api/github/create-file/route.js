import { createFile } from "@/lib/github";

export async function POST(req) {
  try {
    const result = await createFile();
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
