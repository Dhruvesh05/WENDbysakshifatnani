import { useState } from "react";

type LightingMode = "day" | "night";

type RoomLightingSimulationProps = {
  imageSrc: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  showNightLabel?: boolean;
};

export default function RoomLightingSimulation({
  imageSrc,
  alt,
  className = "",
  aspectClassName = "aspect-[16/10]",
  showNightLabel = true,
}: RoomLightingSimulationProps) {
  const [mode, setMode] = useState<LightingMode>("day");
  const isNight = mode === "night";

  return (
    <section className={`w-full ${className}`}>
      <div className="mb-4 flex items-center justify-end">
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setMode("day")}
            aria-pressed={mode === "day"}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              mode === "day"
                ? "bg-slate-900 text-white shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Day
          </button>
          <button
            type="button"
            onClick={() => setMode("night")}
            aria-pressed={mode === "night"}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              mode === "night"
                ? "bg-slate-900 text-white shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Night
          </button>
        </div>
      </div>

      <div
        className={`relative overflow-hidden rounded-2xl shadow-[0_14px_45px_rgba(2,8,23,0.15)] ${aspectClassName}`}
      >
        <img
          src={imageSrc}
          alt={alt}
          className={`h-full w-full object-cover transition-[filter,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isNight
              ? "brightness-[0.58] contrast-[1.12] saturate-[0.76] scale-[1.01]"
              : "brightness-100 contrast-100 saturate-100 scale-100"
          }`}
        />

        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isNight ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(180deg, rgba(10,22,45,0.32) 0%, rgba(8,14,30,0.55) 100%), radial-gradient(120% 90% at 84% 0%, rgba(23,51,94,0.36) 0%, rgba(23,51,94,0) 62%)",
          }}
        />

        <div
          className={`pointer-events-none absolute -bottom-6 left-1/2 h-52 w-72 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isNight ? "opacity-80" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(255,214,144,0.88) 0%, rgba(255,194,113,0.34) 42%, rgba(255,194,113,0) 72%)",
          }}
        />

        <div
          className={`pointer-events-none absolute top-[34%] left-[46%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isNight ? "opacity-70" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(255,229,169,0.95) 0%, rgba(255,200,120,0.35) 52%, rgba(255,200,120,0) 78%)",
          }}
        />

        {showNightLabel && (
          <span
            className={`absolute left-4 top-4 rounded-full border border-white/35 bg-black/25 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isNight
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0"
            }`}
          >
            Lights On
          </span>
        )}
      </div>
    </section>
  );
}
