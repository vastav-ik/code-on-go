"use client";

import { useState } from "react";
import {
  Folder,
  File as FileIcon,
  MoreHorizontal,
  ChevronRight,
  Plus,
  Trash,
  Pencil,
  FilePlus,
  FolderPlus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TemplateFile, TemplateFolder } from "../lib/path-to-json";
import { buildFileId } from "../lib";
import { NewFileDialog } from "./dialogs/new-file-dialog";
import { NewFolderDialog } from "./dialogs/new-folder-dialog";
import { RenameFileDialog } from "./dialogs/rename-file-dialog";
import { RenameFolderDialog } from "./dialogs/rename-folder-dialog";
import { DeleteDialog } from "./dialogs/delete-dialog";

interface PlaygroundExplorerProps {
  data: (TemplateFile | TemplateFolder)[] | null;
  onFileSelect?: (file: TemplateFile & { id: string }) => void;
  onAddFile?: (newFile: TemplateFile, parentPath: string) => void;
  onAddFolder?: (newFolder: TemplateFolder, parentPath: string) => void;
  onDeleteFile?: (file: TemplateFile, parentPath: string) => void;
  onDeleteFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onRenameFile?: (
    file: TemplateFile,
    newFilename: string,
    parentPath: string,
  ) => void;
  onRenameFolder?: (
    folder: TemplateFolder,
    newFolderName: string,
    parentPath: string,
  ) => void;
  title?: string;
  selectedFile?: any;
}

export function TemplateFileTree({
  data,
  onFileSelect,
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder,
  onRenameFile,
  onRenameFolder,
  title,
  selectedFile,
}: PlaygroundExplorerProps) {
  // Global Dialog States
  const [newFileOpen, setNewFileOpen] = useState(false);
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [renameFileOpen, setRenameFileOpen] = useState(false);
  const [renameFolderOpen, setRenameFolderOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Track context for the action
  const [activePath, setActivePath] = useState<string>("");
  const [activeName, setActiveName] = useState<string>("");
  const [activeItem, setActiveItem] = useState<
    TemplateFile | TemplateFolder | undefined
  >(undefined);

  const handleCreateFile = (name: string) => {
    const newFile: TemplateFile = {
      name,
      type: "file",
      content: "",
    };
    onAddFile?.(newFile, activePath);
    setNewFileOpen(false);
  };

  const handleCreateFolder = (name: string) => {
    const newFolder: TemplateFolder = {
      folderName: name,
      type: "folder",
      items: [],
    };
    onAddFolder?.(newFolder, activePath);
    setNewFolderOpen(false);
  };

  const handleRename = (newName: string) => {
    if (!activeItem) return;

    if (activeItem.type === "file") {
      onRenameFile?.(activeItem as TemplateFile, newName, activePath);
    } else {
      onRenameFolder?.(activeItem as TemplateFolder, newName, activePath);
    }
    setRenameFileOpen(false);
    setRenameFolderOpen(false);
  };

  const handleDelete = () => {
    if (!activeItem) return;

    if (activeItem.type === "file") {
      onDeleteFile?.(activeItem as TemplateFile, activePath);
    } else {
      onDeleteFolder?.(activeItem as TemplateFolder, activePath);
    }
    setDeleteOpen(false);
  };

  const openDialog = (
    type:
      | "new-file"
      | "new-folder"
      | "rename-file"
      | "rename-folder"
      | "delete",
    path: string,
    item?: TemplateFile | TemplateFolder,
  ) => {
    setActivePath(path);
    setActiveItem(item);
    if (item) {
      if (item.type === "file") setActiveName(item.name);
      if (item.type === "folder")
        setActiveName((item as TemplateFolder).folderName);
    }

    if (type === "new-file") setNewFileOpen(true);
    if (type === "new-folder") setNewFolderOpen(true);
    if (type === "rename-file") setRenameFileOpen(true);
    if (type === "rename-folder") setRenameFolderOpen(true);
    if (type === "delete") setDeleteOpen(true);
  };

  if (!data) return null;

  return (
    <>
      <Sidebar collapsible="none" className="bg-transparent border-r">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="justify-between">
              <span>EXPLORER</span>
              <div className="flex gap-1">
                <button
                  onClick={() => openDialog("new-file", "", undefined)}
                  className="hover:bg-muted p-0.5 rounded"
                >
                  <FilePlus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openDialog("new-folder", "", undefined)}
                  className="hover:bg-muted p-0.5 rounded"
                >
                  <FolderPlus className="h-4 w-4" />
                </button>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item, index) => (
                  <TemplateNode
                    key={index}
                    item={item}
                    level={0}
                    parentPath=""
                    onFileSelect={onFileSelect}
                    openDialog={openDialog}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <NewFileDialog
        open={newFileOpen}
        onOpenChange={setNewFileOpen}
        onSubmit={handleCreateFile}
      />
      <NewFolderDialog
        open={newFolderOpen}
        onOpenChange={setNewFolderOpen}
        onSubmit={handleCreateFolder}
      />
      <RenameFileDialog
        open={renameFileOpen}
        onOpenChange={setRenameFileOpen}
        initialName={activeName}
        onSubmit={handleRename}
      />
      <RenameFolderDialog
        open={renameFolderOpen}
        onOpenChange={setRenameFolderOpen}
        initialName={activeName}
        onSubmit={handleRename}
      />
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`Delete ${activeName}?`}
        onConfirm={handleDelete}
      />
    </>
  );
}

interface TemplateNodeProps {
  item: TemplateFile | TemplateFolder;
  level: number;
  parentPath: string;
  onFileSelect?: (file: TemplateFile & { id: string }) => void;
  openDialog: (
    type: any,
    path: string,
    item?: TemplateFile | TemplateFolder,
  ) => void;
}

function TemplateNode({
  item,
  level,
  parentPath,
  onFileSelect,
  openDialog,
}: TemplateNodeProps) {
  const itemName =
    (item.type === "file" ? item.name : item.folderName) || "untitled";
  const currentPath = buildFileId(parentPath, itemName);

  // Folder Rendering
  if (item.type === "folder") {
    const folder = item as TemplateFolder;
    return (
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90 mr-1 h-4 w-4" />
              <Folder className="mr-2 h-4 w-4" />
              <span>{folder.folderName}</span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="ml-auto opacity-0 group-hover/collapsible:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      openDialog("new-file", currentPath, undefined);
                    }}
                  >
                    <FilePlus className="mr-2 h-4 w-4" /> New File
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      openDialog("new-folder", currentPath, undefined);
                    }}
                  >
                    <FolderPlus className="mr-2 h-4 w-4" /> New Folder
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      openDialog("rename-folder", parentPath, folder);
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDialog("delete", parentPath, folder);
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {folder.items.map((subItem, index) => (
                <TemplateNode
                  key={index}
                  item={subItem}
                  level={level + 1}
                  parentPath={currentPath}
                  onFileSelect={onFileSelect}
                  openDialog={openDialog}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  // File Rendering
  const file = item as TemplateFile;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => onFileSelect?.({ ...file, id: currentPath })}
        className="group/file"
      >
        <FileIcon className="mr-2 h-4 w-4" />
        <span>{file.name}</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="ml-auto opacity-0 group-hover/file:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                openDialog("rename-file", parentPath, file);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                openDialog("delete", parentPath, file);
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
