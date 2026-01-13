import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className=" z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      <div className="flex flex-col justify-center items-center my-5 relative z-10">
        <Image src={"/hero.svg"} alt="Hero-Section" height={300} width={300} />

        <div className="relative">
          <h1 className="z-20 text-7xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#6DC3BB] via-[#5459AC] to-[#F2AEBB] dark:from-[#6DC3BB] dark:via-[#5459AC] dark:to-[#F2AEBB] tracking-tighter leading-[1.1] drop-shadow-sm">
            Code On Go
          </h1>
          <div className="absolute -inset-x-4 -inset-y-2 bg-white/5 dark:bg-white/5 blur-xl -z-10 rounded-full opacity-50"></div>
        </div>
      </div>

      <p className="mt-4 text-xl text-center text-gray-700 dark:text-gray-300 px-6 py-4 max-w-2xl font-medium tracking-wide backdrop-blur-sm rounded-xl bg-white/10 dark:bg-black/10 border border-white/10 shadow-sm">
        Intelligent coding anywhere.
        <span className="block mt-2 text-base font-normal text-gray-600 dark:text-gray-400">
          Code On Go redefines development with intelligent assistance,
          lightning-fast performance, and AI assistance.
        </span>
      </p>
      <Link href={"/dashboard"}>
        <Button
          variant={"brand"}
          className="mb-8 mt-4 shadow-lg shadow-purple-500/20"
          size={"lg"}
        >
          Start Coding
          <ArrowUpRight className="w-4 h-4 ml-1" />
        </Button>
      </Link>
    </div>
  );
}
