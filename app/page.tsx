import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button>Get Started</Button>
    </div>
  );
}
