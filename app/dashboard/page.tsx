import React from "react";
import EmptyState from "@/modules/dashboard/components/empty-state";
import { DashboardActions } from "@/modules/dashboard/components/dashboard-actions";
import { getAllPlaygrounds } from "@/modules/dashboard/actions";
import ProjectTable from "@/modules/dashboard/components/project-table";

const page = async () => {
  const playgrounds = await getAllPlaygrounds();

  return (
    <div className="flex flex-col h-full items-start gap-8 p-4 w-full max-w-7xl mx-auto">
      <div className="w-full flex justify-center">
        <DashboardActions />
      </div>

      <div className="w-full flex-1 overflow-auto">
        {playgrounds && playgrounds.length > 0 ? (
          <ProjectTable projects={playgrounds} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default page;
