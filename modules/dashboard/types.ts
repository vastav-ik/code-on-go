import { Playground, StarMark, User } from "@prisma/client";

export type Project = Playground & {
  user: User;
  Starmark: StarMark[];
};
