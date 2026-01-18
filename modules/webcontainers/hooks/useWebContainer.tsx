import { useState, useEffect } from "react";

export function useWebContainer({ templateData }: { templateData: any }) {
  const [serverUrl, setServerUrl] = useState<string | null>(
    "https://example.com",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [instance, setInstance] = useState<any>({
    fs: {
      writeFile: async (path: string, content: string) => {
        console.log(`[Stub] Writing to ${path}`);
      },
    },
  });

  const writeFileSync = async (path: string, content: string) => {
    console.log(`[Stub] writeFileSync: ${path}`);
  };

  return {
    serverUrl,
    isLoading,
    error,
    instance,
    writeFileSync,
  };
}
