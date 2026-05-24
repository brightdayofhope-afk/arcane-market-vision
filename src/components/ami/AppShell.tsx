import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Radar, LineChart, Sparkles, Bot, MessageSquare,
  Database, CreditCard, Settings, Bell, Search, Menu,
  Star, GitCompareArrows, Globe2, Activity,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectorChip } from "./widgets";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; group: string };
const nav: NavItem[] = [
  { to: "/app",            label: "Overview",        icon: LayoutDashboard, group: "Terminal" },
  { to: "/app/signals",    label: "Auction Signals", icon: Radar,           group: "Terminal" },
  { to: "/app/watchlist",  label: "Watchlist",       icon: Star,            group: "Terminal" },
  { to: "/app/analytics",  label: "Item Analytics",  icon: LineChart,       group: "Analytics" },
  { to: "/app/compare",    label: "Compare Items",   icon: GitCompareArrows,group: "Analytics" },
  { to: "/app/realms",     label: "Realm & Faction", icon: Globe2,          group: "Analytics" },
  { to: "/app/forecast",   label: "Market Forecast", icon: Sparkles,        group: "Analytics" },
  { to: "/app/assistant",  label: "AMI Assistant",   icon: Bot,             group: "Intelligence" },
  { to: "/app/discord",    label: "Discord",         icon: MessageSquare,   group: "Intelligence" },
  { to: "/app/loot",       label: "Loot Database",   icon: Database,        group: "Intelligence" },
  { to: "/app/pricing",    label: "Early Access",    icon: CreditCard,      group: "Account" },
  { to: "/app/settings",   label: "Settings",        icon: Settings,        group: "Account" },
];

const groups = ["Terminal", "Analytics", "Intelligence", "Account"] as const;

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 glass-strong border-r border-border transition-transform",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="h-16 px-5 flex items-center border-b border-border">
          <Logo />
        </div>
        <nav className="p-3 space-y-4 overflow-y-auto h-[calc(100vh-9rem)] pb-28">
          {groups.map((g) => (
            <div key={g}>
              <div className="px-3 mb-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">{g}</div>
              <div className="space-y-0.5">
                {nav.filter((n) => n.group === g).map((item) => {
                  const active = path === item.to || (item.to !== "/app" && path.startsWith(item.to));
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                        active
                          ? "bg-sidebar-accent text-foreground glow-border"
                          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", active && "text-primary")} />
                      <span className="tracking-wide">{item.label}</span>
                      {active && <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-xs font-bold">AM</div>
          <div className="text-xs">
            <div className="font-medium">Alex Morgan</div>
            <div className="text-muted-foreground">Founder Plan</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 px-4 lg:px-8 glass-strong border-b border-border">
          <div className="h-16 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative flex-1 max-w-xl min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search items, realms, signals…  (e.g. Black Lotus, Spineshatter)" className="pl-9 bg-input/40 border-border h-10" />
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2">
            <SelectorChip label="Region" value="EU" options={["EU","NA","KR","TW"]} />
            <SelectorChip label="Realm"  value="Spineshatter" options={["Spineshatter","Kazzak","Ravencrest","Sylvanas","Draenor","Tarren Mill"]} />
            <SelectorChip label="Faction" value="Horde" options={["Auto","Horde","Alliance"]} />
          </div>
          <div className="ml-auto md:ml-2 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
            </Button>
          </div>
          </div>
          <div className="h-9 -mt-1 flex items-center gap-4 text-[11px] text-muted-foreground border-t border-border/60 overflow-x-auto whitespace-nowrap scrollbar-thin">
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_currentColor]" /> Live · EU-Spineshatter-Horde</span>
            <span className="text-border">|</span>
            <span className="inline-flex items-center gap-1.5"><Activity className="h-3 w-3 text-primary" /> 1,820 signals / 24h</span>
            <span className="text-border">|</span>
            <span>Latency 142ms</span>
            <span className="text-border">|</span>
            <span>AH scrape · 38s ago</span>
            <span className="text-border">|</span>
            <span className="text-success">Reagents +6.8%</span>
            <span className="text-destructive">Mounts −3.6%</span>
            <span className="text-gold">Sentiment bullish · 68%</span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      {open && <div className="fixed inset-0 z-30 bg-background/60 lg:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
}
