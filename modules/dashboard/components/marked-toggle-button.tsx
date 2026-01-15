"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MarkedToggleButtonProps {
  id: string;
  markedForRevision?: boolean;
}

const MarkedToggleButton = ({
  id,
  markedForRevision,
}: MarkedToggleButtonProps) => {
  const [isMarked, setIsMarked] = useState(markedForRevision);

  const toggleMark = async () => {
    setIsMarked(!isMarked);
    // TODO: Implement server action call here
    console.log("Toggle mark for", id);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMark();
      }}
      className="w-full justify-start cursor-pointer hover:bg-transparent p-0 h-auto"
    >
      <div className="flex items-center">
        <Star
          className={cn(
            "h-4 w-4 mr-2 transition-colors",
            isMarked
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground group-hover:text-primary"
          )}
        />
        <span>{isMarked ? "Unstar Project" : "Star Project"}</span>
      </div>
    </Button>
  );
};

export default MarkedToggleButton;
