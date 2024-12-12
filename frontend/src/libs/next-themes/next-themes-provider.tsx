"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export default function NextThemesProvider({ children }: { readonly children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableColorScheme={false}
    >
      {children}
    </ThemeProvider>
  );
}
