import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const whisperId = req.nextUrl.searchParams.get("whisperId");
  const like = await prisma.like.findFirst({
    where: {
      userId: userId,
      whisperId: whisperId!,
    },
  });
  if (like) {
    return NextResponse.json({
      isExists: true,
    });
  } else {
    return NextResponse.json({
      isExists: false,
    });
  }
}
