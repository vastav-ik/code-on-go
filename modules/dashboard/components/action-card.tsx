"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: LucideIcon;
  imageSrc: string;
  gradient?: string;
  onClick?: () => void;
}

const ActionCard = React.forwardRef<HTMLDivElement, ActionCardProps>(
  (
    { title, description, icon: Icon, imageSrc, className, onClick, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer transition-all duration-300 ease-in-out hover:bg-background hover:scale-[1.02] shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden relative",
          "hover:border-primary/50 hover:shadow-primary/10",
          className
        )}
        {...props}
      >
        <div className="flex flex-row justify-center items-start gap-4 z-10">
          <Button
            variant={"outline"}
            className="flex justify-center items-center bg-background group-hover:bg-primary/5 group-hover:border-primary group-hover:text-primary transition-colors duration-300 pointer-events-none"
            size={"icon"}
          >
            <Icon
              size={30}
              className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground max-w-[220px]">
              {description}
            </p>
          </div>
        </div>

        <div className="relative z-0">
          <Image
            src={imageSrc}
            alt={title}
            width={120}
            height={120}
            className="transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100 dark:invert"
          />
        </div>
      </div>
    );
  }
);
ActionCard.displayName = "ActionCard";

export default ActionCard;
