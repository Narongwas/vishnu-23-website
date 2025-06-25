import { addUserAdmin } from "@/lib/services/users";

/*
We might consider seperate logic out of this route like a controller or something
*/
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = await addUserAdmin(body);
    return Response.json({ id: userId }, { status: 201 });
  } catch (e) {
    return Response.json(
      { error: "Failed to create user :" + e },
      { status: 500 }
    );
  }
}
