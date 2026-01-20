import { TemplateFile, TemplateFolder } from "./path-to-json";

export const buildFileId = (path: string, fileName: string) => {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");

  if (!fileName || typeof fileName !== "string") {
    return "";
  }

  const cleanFileName = fileName.trim();
  if (!normalizedPath) {
    return cleanFileName;
  }

  return `${normalizedPath}/${cleanFileName}`;
};

export function findFilePath(
  file: TemplateFile,
  folder: TemplateFolder,
  pathSoFar: string[] = [],
): string | null {
  for (const item of folder.items) {
    if ("folderName" in item) {
      const res = findFilePath(file, item, [...pathSoFar, item.folderName]);
      if (res) return res;
    } else {
      if (item.name === file.name) {
        return [...pathSoFar, item.name].join("/");
      }
    }
  }
  return null;
}

/**
 * Generates a unique file ID based on file location in folder structure
 * @param file The template file
 * @param rootFolder The root template folder containing all files
 * @returns A unique file identifier including full path
 */
export const generateFileId = (
  file: TemplateFile,
  rootFolder: TemplateFolder,
): string => {
  const path = findFilePath(file, rootFolder)?.replace(/^\/+/, "") || "";

  return path || file.name;
};
