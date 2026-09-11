import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        flex h-12 w-full items-center justify-center
        bg-neutral-950 px-6 text-sm font-medium text-white
        transition-colors
        hover:bg-neutral-800
        focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Signing in...
        </span>
      ) : (
        children
      )}
    </button>
  );
}