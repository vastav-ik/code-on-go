"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { TemplateFolder, TemplateFile } from "../lib/path-to-json";
import { getPlaygroundById, saveUpdatedCode } from "../actions";

interface PlaygroundData {
  id: string;
  title: string;
  template: string;
  templateFile?: {
    content: string;
  } | null;
}

interface UsePlaygroundReturn {
  playgroundData: PlaygroundData | null;
  templateData: (TemplateFile | TemplateFolder)[] | null;
  isLoading: boolean;
  error: string | null;
  loadPlayground: (id: string) => Promise<void>;
  saveTemplateData: (id: string, data: TemplateFolder) => Promise<void>;
}

export const usePlayground = (id: string): UsePlaygroundReturn => {
  const [playgroundData, setPlaygroundData] = useState<PlaygroundData | null>(
    null
  );
  const [templateData, setTemplateData] = useState<
    (TemplateFile | TemplateFolder)[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayground = useCallback(async (playgroundId: string) => {
    if (!playgroundId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Fetch playground data
      const data = await getPlaygroundById(playgroundId);

      // Handle explicit null from server action
      if (!data) {
        setError("Playground not found");
        toast.error("Playground not found");
        return;
      }

      setPlaygroundData(data as PlaygroundData);

      const existingContent = data.templateFile?.content;

      // SCENARIO 1: DB has content
      if (existingContent && typeof existingContent === "string") {
        try {
          const parsed = JSON.parse(existingContent);
          if (parsed.items && Array.isArray(parsed.items)) {
            setTemplateData(parsed.items);
          } else if (Array.isArray(parsed)) {
            setTemplateData(parsed);
          } else {
            setTemplateData([parsed]);
          }
        } catch (e) {
          console.error("Failed to parse existing content", e);
          toast.error("Data corruption error");
        }
      } else {
        // SCENARIO 2: DB has empty content -> Load from API
        const res = await fetch(`/api/template/${playgroundId}`);

        if (!res.ok) {
          throw new Error("Failed to load template from API");
        }

        const responseData = await res.json();

        if (responseData.templateJson) {
          const rawData = responseData.templateJson;

          // Structure wraps it in root folder if it's an array for consistency
          // But per transcript, we might want to ensure it matches the TemplateFolder interface
          const formattedData = Array.isArray(rawData) ? rawData : [rawData];

          setTemplateData(formattedData);

          // Auto-save to DB
          const rootFolder: TemplateFolder = {
            folderName: "root",
            type: "folder",
            items: formattedData,
          };

          await saveUpdatedCode(playgroundId, rootFolder);

          toast.success("Template loaded from Disk and Saved to DB");
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      toast.error("Failed to load playground");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveTemplateDataFn = useCallback(
    async (playgroundId: string, data: any) => {
      try {
        const res = await saveUpdatedCode(playgroundId, data);
        if (res.success) {
          toast.success("Saved successfully");
        } else {
          toast.error("Failed to save");
        }
      } catch (e) {
        toast.error("Error saving");
      }
    },
    []
  );

  useEffect(() => {
    if (id) {
      loadPlayground(id);
    }
  }, [id, loadPlayground]);

  return {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData: saveTemplateDataFn, // expose for manual saving
  };
};
