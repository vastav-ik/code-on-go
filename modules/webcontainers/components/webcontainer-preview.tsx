import React from "react";

interface WebContainerPreviewProps {
  templateData: any;
  instance: any;
  writeFileSync: any;
  isLoading: boolean;
  error: any;
  serverUrl: string;
  forceResetup: boolean;
}

const WebContainerPreview: React.FC<WebContainerPreviewProps> = ({
  isLoading,
  serverUrl,
  error,
}) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-zinc-900 text-white">
      {isLoading ? (
        <div>Loading Preview...</div>
      ) : error ? (
        <div className="text-red-500">
          Error: {error.message || "Unknown error"}
        </div>
      ) : serverUrl ? (
        <iframe src={serverUrl} className="w-full h-full border-none" />
      ) : (
        <div>WebContainer functionality is currently a stub.</div>
      )}
    </div>
  );
};

export default WebContainerPreview;
