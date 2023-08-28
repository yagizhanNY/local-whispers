import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET(req: NextRequest) {
  const whisperId = req.nextUrl.searchParams.get("id") as string;
  const whisper = await prisma.whisper.findFirst({
    where: {
      id: whisperId,
    },
    include: {
      user: true,
      WhispComment: true,
    },
  });

  return NextResponse.json(whisper);
}
