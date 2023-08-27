import { NextRequest, NextResponse } from "next/server";
import { WhispComment } from "@prisma/client";
import {
  addWhispComment,
  deleteWhispComment,
  getAllWhispCommentsByWhisperId,
} from "@/app/services/whisperCommentsService";
import { AddWhispCommentRequest } from "@/app/model/addWhispCommentRequest";

export async function GET(req: NextRequest, res: NextResponse) {
  const whisperId = req.nextUrl.searchParams.get("id") as string;
  const whispComments = await getAllWhispCommentsByWhisperId(whisperId);
  return NextResponse.json(whispComments);
}

export async function POST(req: NextRequest) {
  const whispComment = (await req.json()) as AddWhispCommentRequest;
  const addedWhispComment = await addWhispComment(whispComment);

  return NextResponse.json(addedWhispComment);
}

export async function DELETE(req: NextRequest) {
  const whispCommentId = req.nextUrl.searchParams.get("id") as string;
  const deletedWhispComment = await deleteWhispComment(whispCommentId);

  return NextResponse.json(deletedWhispComment);
}
