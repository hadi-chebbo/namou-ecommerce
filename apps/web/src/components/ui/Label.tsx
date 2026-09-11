import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label
      className={`mb-2 block text-sm font-medium text-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}