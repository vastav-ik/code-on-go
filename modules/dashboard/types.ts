import { Playground, StarMark, User, Templates } from "@prisma/client";

export type Project = Playground & {
  user: User;
  Starmark: StarMark[];
};

export interface CreatePlaygroundRequest {
  title: string;
  template: Templates;
  description: string;
}
