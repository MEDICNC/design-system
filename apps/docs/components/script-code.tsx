import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Script from "next/script";

interface ScriptCodeProps {
  children?: ReactNode;
}

export function ScriptCode({ children }: ScriptCodeProps) {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: typeof children === "string" ? children : "",
      }}
    />
  );
}
