import { create } from "zustand";
import { toast } from "sonner";
import { TemplateFile, TemplateFolder } from "../lib/path-to-json";

interface OpenFile extends TemplateFile {
  id: string;
  hasUnsavedChanges: boolean;
  content: string;
  originalContent: string;
}

interface FileExplorerState {
  playgroundId: string;
  templateData: TemplateFolder | null;
  openFiles: OpenFile[];
  activeFileId: string | null;
  editorContent: string | null;

  setPlaygroundId: (id: string) => void;
  setTemplateData: (data: TemplateFolder) => void;
  setOpenFiles: (files: OpenFile[]) => void;
  setActiveFileId: (id: string) => void;

  openFile: (file: TemplateFile) => void;
  closeFile: (id: string) => void;
  closeAllFiles: () => void;

  updateFileContent: (id: string, content: string) => void;

  // File Operations Stubs
  handleAddFile: (
    file: TemplateFile,
    parentPath: string,
    ...args: any[]
  ) => Promise<void>;
  handleAddFolder: (
    folder: TemplateFolder,
    parentPath: string,
    ...args: any[]
  ) => Promise<void>;
  handleDeleteFile: (
    file: TemplateFile,
    parentPath: string,
    ...args: any[]
  ) => Promise<void>;
  handleDeleteFolder: (
    folder: TemplateFolder,
    parentPath: string,
    ...args: any[]
  ) => Promise<void>;
  handleRenameFile: (
    file: TemplateFile,
    newName: string,
    parentPath: string,
    ...args: any[]
  ) => Promise<void>;
  handleRenameFolder: (
    folder: TemplateFolder,
    newName: string,
    parentPath: string,
    ...args: any[]
  ) => Promise<void>;
}

export const useFileExplorer = create<FileExplorerState>((set, get) => ({
  playgroundId: "",
  templateData: null,
  openFiles: [],
  activeFileId: null,
  editorContent: null,

  setPlaygroundId: (id: string) => set({ playgroundId: id }),
  setTemplateData: (data: TemplateFolder) => set({ templateData: data }),
  setOpenFiles: (files: OpenFile[]) => set({ openFiles: files }),
  setActiveFileId: (id: string) => set({ activeFileId: id }),

  openFile: (file: TemplateFile) => {
    const { openFiles } = get();
    // Assuming file has an 'id' or we construct one.
    // The user code passed 'file' directly.
    // We'll trust file has 'id' or we use name/path as ID if needed,
    // but the OpenFile interface requires 'id'.
    // Let's assume the passed file object is compatible or we need to handle it.
    // In user code: openFile(file); where file is TemplateFile
    // TemplateFile doesn't naturally have ID in path-to-json.ts
    // The previous implementation used path as ID.

    // Quick fix: generate ID if missing, or assume it's attached.
    const fileId = (file as any).id || file.name;

    const existingFile = openFiles.find((f) => f.id === fileId);
    if (existingFile) {
      set({
        activeFileId: existingFile.id,
        editorContent: existingFile.content,
      });
      return;
    }

    const newFile: OpenFile = {
      ...file,
      id: fileId,
      hasUnsavedChanges: false,
      content: file.content,
      originalContent: file.content,
    };

    set((state) => ({
      openFiles: [...state.openFiles, newFile],
      activeFileId: fileId,
      editorContent: file.content,
    }));
  },

  closeFile: (id: string) =>
    set((state) => ({
      openFiles: state.openFiles.filter((file) => file.id !== id),
      activeFileId: state.activeFileId === id ? null : state.activeFileId,
      editorContent: state.activeFileId === id ? null : state.editorContent,
    })),

  closeAllFiles: () =>
    set({
      openFiles: [],
      activeFileId: null,
      editorContent: null,
    }),

  updateFileContent: (id: string, content: string) =>
    set((state) => ({
      openFiles: state.openFiles.map((f) =>
        f.id === id
          ? { ...f, content, hasUnsavedChanges: content !== f.originalContent }
          : f,
      ),
    })),

  // Implement stubs for now
  handleAddFile: async (file, parentPath) => {
    console.log("Add file", file, parentPath);
  },
  handleAddFolder: async (folder, parentPath) => {
    console.log("Add folder", folder, parentPath);
  },
  handleDeleteFile: async (file, parentPath) => {
    console.log("Delete file", file, parentPath);
  },
  handleDeleteFolder: async (folder, parentPath) => {
    console.log("Delete folder", folder, parentPath);
  },
  handleRenameFile: async (file, newName, parentPath) => {
    console.log("Rename file", file, newName);
  },
  handleRenameFolder: async (folder, newName, parentPath) => {
    console.log("Rename folder", folder, newName);
  },
}));
