import { Footer } from "@/modules/home/footer";
import { Header } from "@/modules/home/header";
import { HybridBackground } from "@/components/ui/backgrounds/hybrid-background";
import { Metadata } from "next";

export const metadata = {
  title: {
    template: "%s | Code On Go",
    default: "Code On Go",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <HybridBackground />
      <main className="min-h-screen z-20 w-full pt-0 md:pt-0">{children}</main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
