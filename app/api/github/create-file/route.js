import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const res = await fetch(
    "https://api.github.com/repos/tsurubaso/bibliotheque/contents/testFromApi2.txt",
    {
      method: "PUT",
      headers: {
        Authorization: `token ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Add test.txt",
        content: Buffer.from("Hello from NextAuth!").toString("base64"),
         branch: "master", // ou master selon ton repo
      }),
    }
  );

  const data = await res.json();
  return Response.json(data);
}
