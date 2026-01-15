"use client";

import React from "react";
import ActionCard from "./action-card";
import AddNew from "./add-new";
import { Plus, Github } from "lucide-react";

export function DashboardActions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 w-full max-w-4xl px-4">
      <AddNew>
        <ActionCard
          title="Add New"
          description="Create a new playground"
          icon={Plus}
          imageSrc="/add-new.svg"
          className="w-full sm:w-[350px]"
        />
      </AddNew>

      <ActionCard
        title="Open Repo"
        description="Open a GitHub repository"
        icon={Github}
        imageSrc="/github.svg"
        className="w-full sm:w-[350px]"
        onClick={() => {
          console.log("Open Repo clicked");
        }}
      />
    </div>
  );
}
