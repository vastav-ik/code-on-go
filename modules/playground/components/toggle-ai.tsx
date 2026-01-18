import React from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToggleAIProps {
  isEnabled: boolean;
  onToggle: () => void;
  suggestionLoading?: boolean;
}

const ToggleAI: React.FC<ToggleAIProps> = ({ isEnabled, onToggle }) => {
  return (
    <Button
      variant={isEnabled ? "default" : "outline"}
      size="sm"
      onClick={onToggle}
      className="gap-2"
    >
      <Bot className="h-4 w-4" />
      {isEnabled ? "AI On" : "AI Off"}
    </Button>
  );
};

export default ToggleAI;
