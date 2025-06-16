import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestSecret = request.nextUrl.searchParams.get("secret");
  if (!requestSecret) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Missing secret",
    });
  }

  const secret = process.env.REVALIDATE_SECRET!;
  if (requestSecret !== secret) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Invalid secret",
    });
  }

  revalidatePath("/", "layout");

  return Response.json({
    revalidated: true,
    now: Date.now(),
    message: "Revalidated",
  });
}
