import fs from "fs";
import path from "path";

// Represent a file in the template structure
export interface TemplateFile {
  name: string;
  type: "file";
  content: string;
}

// Represent a folder in the template structure
export interface TemplateFolder {
  folderName: string;
  type: "folder";
  items: (TemplateFile | TemplateFolder)[];
}

// Ensure output directory exists before writing
const ensureDirectoryExists = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Scan directory recursively
export const scanTemplateDirectory = (
  dirPath: string,
  ignoreFiles: string[] = []
): (TemplateFile | TemplateFolder)[] => {
  // Ensure the directory exists
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    return [];
  }

  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const structure: (TemplateFile | TemplateFolder)[] = [];

  for (const item of items) {
    if (ignoreFiles.includes(item.name)) continue;

    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      structure.push({
        folderName: item.name,
        type: "folder",
        items: scanTemplateDirectory(fullPath, ignoreFiles),
      });
    } else {
      structure.push({
        name: item.name,
        type: "file",
        content: fs.readFileSync(fullPath, "utf-8"),
      });
    }
  }

  return structure;
};

// Main function to convert folder structure to JSON file
export const saveTemplateStructureToJson = async (
  inputPath: string,
  outputPath: string,
  ignoreFiles: string[] = [
    "node_modules",
    ".git",
    "dist",
    ".DS_Store",
    "package-lock.json",
  ]
) => {
  try {
    const templateStructure = scanTemplateDirectory(inputPath, ignoreFiles);
    ensureDirectoryExists(outputPath);
    fs.writeFileSync(
      outputPath,
      JSON.stringify(templateStructure, null, 2),
      "utf-8"
    );
    console.log(`JSON structure saved to ${outputPath}`);
  } catch (error) {
    console.error("Error saving template structure:", error);
    throw error;
  }
};

// Function to read the saved JSON
export const readTemplateFromJson = async (
  jsonPath: string
): Promise<(TemplateFile | TemplateFolder)[] | null> => {
  try {
    if (!fs.existsSync(jsonPath)) {
      console.error(`JSON file not found: ${jsonPath}`);
      return null;
    }
    const data = fs.readFileSync(jsonPath, "utf-8");
    return JSON.parse(data) as (TemplateFile | TemplateFolder)[];
  } catch (error) {
    console.error("Error reading template JSON:", error);
    return null;
  }
};
