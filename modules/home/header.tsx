import Link from "next/link";
import Image from "next/image";
import UserButton from "../auth/components/user-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-white dark:bg-black/5 w-full">
          {/* Rest of the header content */}
          <div className="flex items-center justify-center w-full flex-col">
            <div
              className={`
                            flex items-center justify-between
                            bg-white/80 dark:bg-zinc-900/80
                            backdrop-blur-xl
                            border-x border-b border-zinc-200 dark:border-zinc-800
                            shadow-sm
                            w-full sm:min-w-[800px] sm:max-w-[1200px]
                            rounded-b-[24px]
                            px-6 py-3
                            relative
                            transition-all duration-300 ease-in-out
                        `}
            >
              <div className="relative z-10 flex items-center justify-between w-full gap-2">
                {/* Logo Section with Navigation Links */}
                <div className="flex items-center gap-8 justify-center">
                  <Link
                    href="/"
                    className="flex items-center gap-3 justify-center group"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-green-500/20 rounded-lg blur-sm group-hover:bg-green-500/30 transition-all duration-300" />
                      <Image
                        src={"/text-logo.svg"}
                        alt="CodeOnGo Logo"
                        height={40}
                        width={150}
                        className="relative z-10 dark:invert"
                      />
                    </div>
                  </Link>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  {/* Desktop Navigation Links */}
                  <div className="hidden sm:flex items-center gap-6">
                    <Link
                      href="/docs/components/background-paths"
                      className="text-sm font-medium font-mono text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors relative group"
                    >
                      <span className="relative z-10">Docs</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                    {/* <Link
                                            href="/pricing"
                                            className="text-sm font-medium font-mono text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors relative group"
                                        >
                                            <span className="relative z-10">Pricing</span>
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                                        </Link> */}
                    <Link
                      href="https://codesnippetui.pro/templates?utm_source=codesnippetui.com&utm_medium=header"
                      target="_blank"
                      className="text-sm font-medium font-mono text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      API
                      <span className="text-green-600 dark:text-green-400 border border-green-500/50 dark:border-green-400/50 bg-green-500/10 rounded-sm px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                        New
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right side items */}
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  {/* <HeaderPro /> */}
                  <ThemeToggle />
                  <UserButton />
                </div>

                {/* Mobile Navigation remains unchanged */}
                <div className="flex sm:hidden items-center gap-4">
                  <Link
                    href="/docs/components/action-search-bar"
                    className="text-sm font-medium font-mono text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
                  >
                    Docs
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-sm font-medium font-mono text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
                  >
                    API
                  </Link>
                  <ThemeToggle />
                  <UserButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
