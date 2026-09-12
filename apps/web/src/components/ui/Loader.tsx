import { useEffect, useState } from "react";

type LoaderProps = {
  label?: string;
  delay?: number;
  fullscreen?: boolean;
};

export function Loader({ label, delay = 200, fullscreen = false }: LoaderProps) {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`flex items-center justify-center transition-opacity duration-300 ${
        fullscreen ? "min-h-screen" : "min-h-[50vh]"
      } ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
        <div className="relative h-9 w-9">
          {/* Faint track */}
          <div className="absolute inset-0 rounded-full border-2 border-[#E5E0D8]" />
          {/* Spinning arc */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#1C1A16] border-r-[#1C1A16]"
            style={{
              animation: "loader-spin 0.9s cubic-bezier(0.65, 0.05, 0.36, 1) infinite",
            }}
          />
        </div>

        {label && (
          <span className="text-xs tracking-wide text-[#8B8478]">{label}</span>
        )}

        <span className="sr-only">Loading</span>
      </div>

      <style>{`
        @keyframes loader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}