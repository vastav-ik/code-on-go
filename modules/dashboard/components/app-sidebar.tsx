import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { Playground, StarMark, User } from "@prisma/client";
import { techIconMap } from "../constants";
import Link from "next/link";
import Image from "next/image";
import { Plus, Home, Star, Clock } from "lucide-react";
import AddNew from "./add-new";

type PlaygroundWithUser = Playground & { user: User; Starmark: StarMark[] };

interface AppSidebarProps {
  playgrounds: PlaygroundWithUser[] | undefined;
}

export function AppSidebar({ playgrounds }: AppSidebarProps) {
  const starredPlaygrounds = playgrounds?.filter(
    (pg) => pg.Starmark && pg.Starmark.some((sm) => sm.isMarked),
  );

  const recentPlaygrounds = playgrounds
    ? [...playgrounds]
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .slice(0, 5)
    : [];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/text-logo.svg"
            alt="CodeOnGo"
            width={120}
            height={30}
            className="group-data-[collapsible=icon]:hidden dark:invert"
          />
          <span className="hidden group-data-[collapsible=icon]:block font-bold">
            C
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {starredPlaygrounds && starredPlaygrounds.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Starred</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {starredPlaygrounds.map((playground) => {
                  const Icon = techIconMap[playground.template];
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/playground/${playground.id}`}>
                          <Icon className="h-4 w-4" />
                          <span>{playground.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {recentPlaygrounds && recentPlaygrounds.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recentPlaygrounds.map((playground) => {
                  const Icon = techIconMap[playground.template];
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/playground/${playground.id}`}>
                          <Icon className="h-4 w-4" />
                          <span>{playground.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <div className="flex items-center justify-between px-2 pb-2">
            <SidebarGroupLabel>All Playgrounds</SidebarGroupLabel>
            <AddNew>
              <Plus className="h-4 w-4 cursor-pointer hover:text-primary" />
            </AddNew>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {playgrounds
                ? playgrounds.map((playground) => {
                    const Icon = techIconMap[playground.template];
                    return (
                      <SidebarMenuItem key={playground.id}>
                        <SidebarMenuButton asChild>
                          <Link href={`/playground/${playground.id}`}>
                            <Icon className="h-4 w-4" />
                            <span>{playground.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                : Array.from({ length: 5 }).map((_, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuSkeleton />
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          &copy; 2026 CodeOnGo
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
