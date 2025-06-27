"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-primary)",
          "--normal-text": "white",
          "--normal-border": "var(--color-primary)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
