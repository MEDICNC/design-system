import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CalloutProps {
  children?: ReactNode;
}

export function Preview({ children, ...props }: CalloutProps) {
  return (
    <div
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, oklch(1 0 0), oklch(1 0 0) 13px, oklch(0.961151 0 0) 13px, oklch(0.961151 0 0) 14px)",
        backgroundSize: "40px 40px",
        borderRadius: "8px",
        border: "1px solid oklch(0.924169 0.00108 197.138)",
      }}
      className={cn("p-5 preview")}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
}
