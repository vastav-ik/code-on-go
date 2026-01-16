"use server";

import { prisma } from "@/lib/db";
import { currentUser } from "@/modules/auth";
import { revalidatePath } from "next/cache";

export const getAllPlaygrounds = async () => {
  const user = await currentUser();
  try {
    const playgrounds = await prisma.playground.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
        Starmark: {
          where: {
            userId: user?.id,
          },
        },
      },
    });
    return playgrounds;
  } catch (error) {
    console.log(error);
  }
};

export const createPlayground = async (
  title: string,
  template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR",
  description: string
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
        description,
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

export const deletePlayground = async (playgroundId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const playground = await prisma.playground.delete({
      where: {
        id: playgroundId,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, playgroundId: playground.id };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete playground" };
  }
};

export const updatePlayground = async (
  playgroundId: string,
  title: string,
  description: string
) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const playground = await prisma.playground.update({
      where: {
        id: playgroundId,
      },
      data: {
        title,
        description,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, playgroundId: playground.id };
  } catch (error) {
    console.log(error);
    return { error: "Failed to update playground" };
  }
};

export const duplicatePlayground = async (playgroundId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const playground = await prisma.playground.findUnique({
      where: {
        id: playgroundId,
      },
    });
    if (!playground) {
      return { error: "Playground not found" };
    }
    const newPlayground = await prisma.playground.create({
      data: {
        title: `Copy of ${playground.title}`,
        template: playground.template,
        description: playground.description,
        code: playground.code,
        userId: user.id!,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, playgroundId: newPlayground.id };
  } catch (error) {
    console.log(error);
    return { error: "Failed to duplicate playground" };
  }
};

export const toggleProjectStar = async (playgroundId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const existingMark = await prisma.starMark.findFirst({
      where: {
        userId: user.id,
        playgroundId,
      },
    });

    if (existingMark) {
      await prisma.starMark.delete({
        where: {
          id: existingMark.id,
        },
      });
    } else {
      await prisma.starMark.create({
        data: {
          userId: user.id!,
          playgroundId,
          isMarked: true,
        },
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed to toggle star" };
  }
};
