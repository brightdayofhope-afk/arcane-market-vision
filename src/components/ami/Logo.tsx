import { Link } from "@tanstack/react-router";

export function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="relative h-9 w-9 grid place-items-center rounded-lg glass-strong glow-border">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary drop-shadow-[0_0_6px_currentColor]" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2 L20 8 L17 21 L7 21 L4 8 Z" />
          <path d="M12 7 L15.5 10 L14 17 L10 17 L8.5 10 Z" fill="currentColor" fillOpacity="0.25" />
        </svg>
        <span className="absolute inset-0 rounded-lg animate-pulse-glow pointer-events-none" />
      </div>
      {withWordmark && (
        <div className="leading-tight">
          <div className="font-semibold tracking-[0.18em] text-sm">AMI</div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Azeroth Intel</div>
        </div>
      )}
    </Link>
  );
}
