import { prisma } from "../../../prisma/client";

export const getAllWhispers = async () => {
  return await prisma.whisper.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getWhisperById = async (id: string) => {
  return await prisma.whisper.findFirst({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
};

export const deleteWhisper = async (id: string) => {
  const deletedWhisper = await prisma.whisper.delete({
    where: {
      id: id,
    },
  });

  return deletedWhisper;
};
