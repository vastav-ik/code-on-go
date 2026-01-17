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

interface RenameFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  onSubmit: (newName: string) => void;
}

export function RenameFileDialog({
  open,
  onOpenChange,
  initialName,
  onSubmit,
}: RenameFileDialogProps) {
  const [fileName, setFileName] = useState(initialName);

  useEffect(() => {
    setFileName(initialName);
  }, [initialName, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileName.trim() && fileName !== initialName) {
      onSubmit(fileName);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filename" className="text-right">
                Name
              </Label>
              <Input
                id="filename"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
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
