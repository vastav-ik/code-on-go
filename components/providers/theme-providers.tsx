"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Provides theme context by rendering NextThemesProvider with the given children and forwarded props.
 *
 * @param children - React nodes to be rendered inside the provider.
 * @param props - All remaining props are forwarded to NextThemesProvider.
 * @returns A NextThemesProvider element configured with the provided props and children.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}