"use client";

import React, { useState } from "react";
import { Templates } from "@prisma/client";
import { createPlayground } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TemplateSelectingModal from "./template-selecting-modal";

interface AddNewProps {
  children?: React.ReactNode;
}

const AddNew = ({ children }: AddNewProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCreate = async (data: {
    title: string;
    template: Templates;
    description: string;
  }) => {
    const res = await createPlayground(data.title, data.template);
    if (res?.success) {
      toast.success("Playground created successfully");
      setOpen(false);
      router.push(`/editor/${res.playgroundId}`);
    } else {
      toast.error("Failed to create playground");
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
