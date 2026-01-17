"use client";

import { use } from "react";
import { usePlayground } from "@/modules/playground/hooks/use-playground";
import { PlaygroundExplorer } from "@/modules/playground/components/playground-explorer";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function PlaygroundPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { playgroundData, templateData, isLoading, error } = usePlayground(id);

  if (isLoading) return <div>Loading playground...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TooltipProvider>
      <SidebarProvider>
        <PlaygroundExplorer
          data={templateData}
          onFileSelect={(file) => console.log("Selected:", file)}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex flex-1 items-center gap-2">
              <div className="flex flex-col">
                <h1 className="text-sm font-medium">
                  {playgroundData?.title || "Code Playground"}
                </h1>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex-1 rounded-xl bg-muted/50 p-4">
              {/* Editor will go here */}
              <p className="text-muted-foreground">
                Editor Component Placeholder
              </p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
