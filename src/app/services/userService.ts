import { prisma } from "../../../prisma/client";

export const getUserIdByMail = async (mail: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: mail,
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  return user;
};

export const getUserImageByUserId = async (userId: string) => {
  const user = await getUserById(userId);
  return user?.image;
};
