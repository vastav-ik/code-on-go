"use server";

import { prisma } from "@/lib/db";
import { currentUser } from "@/modules/auth";

export const getAllPlaygrounds = async () => {
  const user = await currentUser();
  try {
    const playgrounds = await prisma.playground.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
        Starmark: true,
      },
    });
    return playgrounds;
  } catch (error) {
    console.log(error);
  }
};

export const createPlayground = async (
  title: string,
  template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR"
) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const playground = await prisma.playground.create({
      data: {
        title,
        template,
        description: "",
        code: `// Welcome to your new ${template} playground!`,
        userId: user.id!,
      },
    });
    return { success: true, playgroundId: playground.id };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create playground" };
  }
};
