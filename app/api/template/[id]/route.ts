import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import path from "path";
import fs from "fs";
import { TEMPLATE_PATHS } from "@/lib/templates";
import {
  saveTemplateStructureToJson,
  readTemplateFromJson,
} from "@/modules/playground/lib/path-to-json";
import { Templates } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing playground ID" },
        { status: 400 }
      );
    }

    const playground = await prisma.playground.findUnique({
      where: { id },
    });

    if (!playground) {
      return NextResponse.json(
        { error: "Playground not found" },
        { status: 404 }
      );
    }

    // Get the template key (e.g., REACT)
    const templateKey = playground.template;
    const templateDir = TEMPLATE_PATHS[templateKey];

    if (!templateDir) {
      return NextResponse.json(
        { error: "Invalid template path mapping" },
        { status: 500 }
      );
    }

    const inputPath = path.resolve(process.cwd(), templateDir);
    // Temp output file
    const outputFileName = `${templateKey}_${id}.json`;
    const outputPath = path.resolve(process.cwd(), "output", outputFileName);

    // 1. Convert directory to JSON
    await saveTemplateStructureToJson(inputPath, outputPath);

    // 2. Read the JSON
    const result = await readTemplateFromJson(outputPath);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to process template structure" },
        { status: 500 }
      );
    }

    // 3. Clean up (delete temp file)
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    return NextResponse.json({ success: true, templateJson: result });
  } catch (error) {
    console.error("API Template Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
