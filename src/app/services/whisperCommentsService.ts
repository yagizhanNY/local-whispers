import { WhispComment } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AddWhispCommentRequest } from "../model/addWhispCommentRequest";

export const getQuantityOfWhisperComments = async (whisperId: string) => {
  return await prisma.whispComment.count({
    where: {
      whisperId: whisperId,
    },
  });
};

export const addWhispComment = async (whispComment: AddWhispCommentRequest) => {
  const user = await prisma.user.findFirst({
    where: {
      email: whispComment.email,
    },
  });
  return await prisma.whispComment.create({
    data: {
      text: whispComment.text,
      userId: user!.id,
      whisperId: whispComment.whisperId,
    },
    include: {
      user: true,
      whisper: true,
    },
  });
};

export const deleteWhispComment = async (whispCommentId: string) => {
  return await prisma.whispComment.delete({
    where: {
      id: whispCommentId,
    },
  });
};

export const getAllWhispCommentsByWhisperId = async (whisperId: string) => {
  return await prisma.whispComment.findMany({
    where: {
      whisperId: whisperId,
    },
    include: {
      user: true,
      whisper: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
