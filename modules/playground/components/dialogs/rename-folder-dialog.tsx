"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface RenameFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  onSubmit: (newName: string) => void;
}

export function RenameFolderDialog({
  open,
  onOpenChange,
  initialName,
  onSubmit,
}: RenameFolderDialogProps) {
  const [folderName, setFolderName] = useState(initialName);

  useEffect(() => {
    setFolderName(initialName);
  }, [initialName, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim() && folderName !== initialName) {
      onSubmit(folderName);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="foldername" className="text-right">
                Name
              </Label>
              <Input
                id="foldername"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="col-span-3"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Rename</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
