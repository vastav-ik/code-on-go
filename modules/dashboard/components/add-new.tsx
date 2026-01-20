"use client";

import React, { useState } from "react";
import { Templates } from "@prisma/client";
import { createPlayground } from "../actions";
import { CreatePlaygroundRequest } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TemplateSelectingModal from "./template-selecting-modal";

interface AddNewProps {
  children?: React.ReactNode;
}

const AddNew = ({ children }: AddNewProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCreate = async (data: CreatePlaygroundRequest) => {
    const res = await createPlayground(
      data.title,
      data.template,
      data.description,
    );
    if (res?.success) {
      toast.success("Project created successfully");
      setOpen(false);
      router.push(`/playground/${res.playgroundId}`);
    } else {
      toast.error(res?.error || "Failed to create project");
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <TemplateSelectingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreate}
      />
    </>
  );
};

export default AddNew;
