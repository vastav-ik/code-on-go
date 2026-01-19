import { FileSystemTree } from "@webcontainer/api";
import {
  TemplateFile,
  TemplateFolder,
} from "@/modules/playground/lib/path-to-json";

export const transformToWebContainerFormat = (
  templateData: TemplateFolder | (TemplateFile | TemplateFolder)[],
): FileSystemTree => {
  const tree: FileSystemTree = {};

  const items = Array.isArray(templateData)
    ? templateData
    : templateData?.items || [];

  const processItem = (item: TemplateFile | TemplateFolder) => {
    if (item.type === "file") {
      return {
        file: {
          contents: item.content || "",
        },
      };
    } else if (item.type === "folder") {
      const folderContent: FileSystemTree = {};
      if (item.items) {
        item.items.forEach((subItem) => {
          const name =
            subItem.type === "folder" ? subItem.folderName : subItem.name;
          folderContent[name] = processItem(subItem);
        });
      }
      return {
        directory: folderContent,
      };
    }
    // Should not happen given the types, but safe fallback
    return {
      file: { contents: "" },
    };
  };

  items.forEach((item) => {
    const name = item.type === "folder" ? item.folderName : item.name;
    tree[name] = processItem(item);
  });

  return tree;
};
