import { useState } from "react";

export function useAISuggestions() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [position, setPosition] = useState(null);

  const toggleEnabled = () => setIsEnabled((prev) => !prev);
  const fetchSuggestion = async (triggerType: any, editor: any) =>
    console.log("Fetching suggestion...", triggerType);
  const acceptSuggestion = (editor: any, monaco: any) =>
    console.log("Accepted suggestion");
  const rejectSuggestion = (editor: any) => console.log("Rejected suggestion");

  return {
    isEnabled,
    isLoading,
    suggestion,
    position,
    toggleEnabled,
    fetchSuggestion,
    acceptSuggestion,
    rejectSuggestion,
  };
}
