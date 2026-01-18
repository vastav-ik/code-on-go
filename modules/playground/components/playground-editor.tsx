import Editor, { Monaco } from "@monaco-editor/react";
import {
  configureMonaco,
  defaultEditorOptions,
  getEditorLanguage,
} from "@/modules/playground/lib/editor-config";

interface PlaygroundEditorProps {
  activeFile: any;
  content: string;
  onContentChange: (value: string) => void;
  suggestion?: any;
  suggestionLoading?: boolean;
  suggestionPosition?: any;
  onAcceptSuggestion?: (editor: any, monaco: any) => void;
  onRejectSuggestion?: (editor: any) => void;
  onTriggerSuggestion?: (type: any, editor: any) => void;
}

export const PlaygroundEditor: React.FC<PlaygroundEditorProps> = ({
  activeFile,
  content,
  onContentChange,
}) => {
  const handleEditorWillMount = (monaco: Monaco) => {
    configureMonaco(monaco);
  };

  const extension = activeFile?.name?.split(".").pop() || "txt";
  const language = getEditorLanguage(extension);

  return (
    <div className="h-full w-full border overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        language={language}
        value={content}
        theme="modern-dark"
        beforeMount={handleEditorWillMount}
        onChange={(value) => onContentChange(value || "")}
        options={{
          ...defaultEditorOptions,
          readOnly: !activeFile,
        }}
        loading={
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Loading editor...
          </div>
        }
      />
    </div>
  );
};
