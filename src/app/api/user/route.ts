import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET(req: NextRequest, res: NextResponse) {
  const userId = req.nextUrl.searchParams.get("id");
  const user = await prisma.user.findFirst({
    where: {
      id: userId!,
    },
  });

  return NextResponse.json(user);
}
