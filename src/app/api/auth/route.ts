import { env } from "~/env";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // bonus api route
  const apiKey = request.headers.get("x-henlo-api-key");

  if (!apiKey || apiKey !== env.HENLO_API_KEY) {
    return new NextResponse(null, { status: 401 });
  }

  return new NextResponse(null, { status: 200 });
}
