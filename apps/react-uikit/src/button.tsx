"use client";

import { ReactNode } from "react";
import button from "uikit/cva/button";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'fill';
  color?: 'primary' | 'secondary' | 'dark' | 'light' | 'essential' | 'success' | undefined | null;
}

export const Button = ({ children, variant, color = 'primary', className }: ButtonProps) => {
  return (
    <button
      className={button({ variant, color, className })}
      onClick={() => alert(`Hello from your  app!`)}
    >
      {children}
    </button>
  );
};
