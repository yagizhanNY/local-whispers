import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { AddWhisperRequest } from "@/app/model/addWhisperRequest";
import { getUserIdByMail } from "@/app/services/userService";
import { deleteWhisper } from "@/app/services/whisperService";

export async function GET(req: NextRequest, res: NextResponse) {
  const whispers = await prisma.whisper.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(whispers);
}

export async function POST(req: NextRequest) {
  const whisperRequest = (await req.json()) as AddWhisperRequest;
  const user = await getUserIdByMail(whisperRequest.email);

  const addedWhisper = await prisma.whisper.create({
    data: {
      text: whisperRequest.content,
      userId: user?.id!,
      mediaUrl: whisperRequest.mediaUrl!,
    },
  });

  const currentWhisper = await prisma.whisper.findFirst({
    where: {
      id: addedWhisper.id,
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(currentWhisper);
}

export async function DELETE(req: NextRequest) {
  const whisperId = req.nextUrl.searchParams.get("id") as string;
  const deletedWhisper = await deleteWhisper(whisperId);

  return NextResponse.json(deletedWhisper);
}
