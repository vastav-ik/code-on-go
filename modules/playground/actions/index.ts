"use server";

import { prisma } from "@/lib/db";
import { currentUser } from "@/modules/auth";
import { TemplateFolder } from "../lib/path-to-json";

export const getPlaygroundById = async (id: string) => {
  try {
    const playground = await prisma.playground.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        template: true,
        createdAt: true,
        userId: true,
        templateFile: {
          select: {
            content: true,
          },
        },
      },
    });

    if (!playground) {
      return null;
    }

    return playground;
  } catch (error) {
    console.error("Error fetching playground:", JSON.stringify(error, null, 2));
    throw error;
  }
};

export const saveUpdatedCode = async (
  playgroundId: string,
  data: TemplateFolder,
) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const content = JSON.stringify(data);

    const updatedPlayground = await prisma.templateFile.upsert({
      where: {
        playgroundId: playgroundId,
      },
      update: {
        content: content,
      },
      create: {
        playgroundId: playgroundId,
        content: content,
      },
    });

    return { success: true, data: updatedPlayground };
  } catch (error) {
    console.error("Error saving updated code:", error);
    return { success: false, error: "Failed to save code" };
  }
};
