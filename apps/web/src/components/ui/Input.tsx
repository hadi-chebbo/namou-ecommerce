import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({
  error = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        h-12 w-full border bg-white px-4 text-sm text-neutral-900
        outline-none transition
        placeholder:text-neutral-400
        focus:border-neutral-900
        focus:ring-1 focus:ring-neutral-900
        disabled:cursor-not-allowed disabled:bg-neutral-100
        ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-neutral-300"}
        ${className}
      `}
      {...props}
    />
  );
}