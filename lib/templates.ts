import { Templates } from "@prisma/client";

export const TEMPLATE_PATHS: Record<Templates, string> = {
  [Templates.REACT]: "vibe-code-starters/react",
  [Templates.NEXTJS]: "vibe-code-starters/nextjs",
  [Templates.EXPRESS]: "vibe-code-starters/express",
  [Templates.VUE]: "vibe-code-starters/vue",
  [Templates.HONO]: "vibe-code-starters/hono",
  [Templates.ANGULAR]: "vibe-code-starters/angular",
};
