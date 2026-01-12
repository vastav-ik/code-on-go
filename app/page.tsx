import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import UserButton from "@/modules/auth/components/user-button";

export default async function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button>Get Started</Button>
      <UserButton />
    </div>
  );
}
