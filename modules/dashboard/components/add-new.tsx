"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Templates } from "@prisma/client";
import { createPlayground } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { techIconMap } from "../constants";

interface AddNewProps {
  children?: React.ReactNode;
}

const AddNew = ({ children }: AddNewProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState<Templates>(Templates.REACT);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    setLoading(true);
    const res = await createPlayground(title, template);
    if (res?.success) {
      toast.success("Playground created successfully");
      setOpen(false);
      router.push(`/editor/${res.playgroundId}`);
    } else {
      toast.error("Failed to create playground");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Playground</DialogTitle>
          <DialogDescription>
            Start a new coding project. Choose a template and give it a name.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="My Awesome Project"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="template" className="text-right">
              Template
            </Label>
            <Select
              value={template}
              onValueChange={(val) => setTemplate(val as Templates)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Templates).map((t) => {
                  const Icon = techIconMap[t];
                  return (
                    <SelectItem key={t} value={t}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {t}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Playground"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNew;
