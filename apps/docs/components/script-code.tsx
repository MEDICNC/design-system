import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Script from "next/script";

interface CalloutProps {
  children?: ReactNode;
}

export function ScriptCode({ children }: CalloutProps) {
  return (
      <Script>{children}</Script>
  );
}
