import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const like = await prisma.like.findFirst({
    where: {
      userId: userId,
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
