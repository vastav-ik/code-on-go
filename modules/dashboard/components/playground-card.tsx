"use client";

import React from "react";
import { Playground, User } from "@prisma/client";
import { techIconMap } from "../constants";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PlaygroundCardProps {
  playground: Playground & { user: User };
}

const PlaygroundCard = ({ playground }: PlaygroundCardProps) => {
  const Icon = techIconMap[playground.template];

  return (
    <Link href={`/playground/${playground.id}`}>
      <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full flex flex-col justify-between group">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="p-2 bg-muted rounded-md group-hover:bg-primary/10 transition-colors">
            <Icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
          </div>
          <CardTitle className="text-lg font-semibold truncate">
            {playground.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {playground.description || "No description provided."}
          </p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Updated{" "}
          {formatDistanceToNow(new Date(playground.updatedAt), {
            addSuffix: true,
          })}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PlaygroundCard;
