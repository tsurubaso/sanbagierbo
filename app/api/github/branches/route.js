import {listBranches } from "@/lib/github";

export async function GET() {
  try {
    const branches  = await listBranches();
    return Response.json(branches.map(b => b.name));
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}