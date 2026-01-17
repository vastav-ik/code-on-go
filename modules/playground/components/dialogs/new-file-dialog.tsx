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
import { useState } from "react";

interface NewFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (fileName: string) => void;
}

export function NewFileDialog({
  open,
  onOpenChange,
  onSubmit,
}: NewFileDialogProps) {
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileName.trim()) {
      onSubmit(fileName);
      setFileName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New File</DialogTitle>
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
                placeholder="example.ts"
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
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
