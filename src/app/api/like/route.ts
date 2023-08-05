import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  const whisperId = req.nextUrl.searchParams.get("id");
  const likes = await prisma.like.findMany({
    where: {
      whisperId: whisperId!,
    },
  });
  const likeCount = likes.length;
  return NextResponse.json({
    count: likeCount,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.isLike === true) {
    await prisma.like.create({
      data: {
        userId: body.userId,
        whisperId: body.whisperId,
      },
    });
  } else {
    await prisma.like.delete({
      where: {
        userId_whisperId: {
          userId: body.userId,
          whisperId: body.whisperId,
        },
      },
    });
  }

  const currentLikeState = await prisma.like.findMany({
    where: {
      whisperId: body.whisperId,
    },
  });

  return NextResponse.json({
    count: currentLikeState.length,
  });
}
