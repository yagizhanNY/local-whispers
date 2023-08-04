import { prisma } from "../../../prisma/client";
import { getUserIdByMail } from "./userService";

export const addWhisper = async (text: string, email: string) => {
  const user = await getUserIdByMail(email);
  if (user) {
    await prisma.whisper.create({
      data: {
        text: text,
        userId: user.id,
      },
    });
  }
};

export const getAllWhispers = async () => {
  return await prisma.whisper.findMany({
    orderBy: {
      createdAt: "desc",
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
