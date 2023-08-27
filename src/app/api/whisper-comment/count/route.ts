import { getQuantityOfWhisperComments } from "@/app/services/whisperCommentsService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const whisperId = req.nextUrl.searchParams.get("id") as string;
  const count = await getQuantityOfWhisperComments(whisperId);

  return NextResponse.json({
    count: count,
  });
}
