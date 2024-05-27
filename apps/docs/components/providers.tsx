"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useState, useEffect } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [isMount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
