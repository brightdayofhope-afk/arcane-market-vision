import { Link } from "@tanstack/react-router";
import amiLogoRound from "@/assets/ami-logo-round.png";

export function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="relative h-9 w-9 rounded-full overflow-hidden glow-border shrink-0">
        <img
          src={amiLogoRound}
          alt="AMI"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <span className="absolute inset-0 rounded-full animate-pulse-glow pointer-events-none" />
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
