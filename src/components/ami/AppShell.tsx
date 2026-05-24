import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Radar, LineChart, Sparkles, Bot, MessageSquare,
  Database, CreditCard, Settings, Bell, Search, Menu,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Overview", icon: LayoutDashboard },
  { to: "/app/signals", label: "Auction Signals", icon: Radar },
  { to: "/app/analytics", label: "Item Analytics", icon: LineChart },
  { to: "/app/forecast", label: "Market Forecast", icon: Sparkles },
  { to: "/app/assistant", label: "AMI Assistant", icon: Bot },
  { to: "/app/discord", label: "Discord Integration", icon: MessageSquare },
  { to: "/app/loot", label: "Loot Database", icon: Database },
  { to: "/app/pricing", label: "Early Access", icon: CreditCard },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 glass-strong border-r border-border transition-transform",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="h-16 px-5 flex items-center border-b border-border">
          <Logo />
        </div>
        <nav className="p-3 space-y-1">
          {nav.map((item) => {
            const active = path === item.to || (item.to !== "/app" && path.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
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
        <header className="sticky top-0 z-30 h-16 px-4 lg:px-8 flex items-center gap-3 glass-strong border-b border-border">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search items, realms, signals…" className="pl-9 bg-input/40 border-border h-10" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
            </Button>
            <Button variant="default" className="hidden sm:inline-flex">Add Widget</Button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
      {open && <div className="fixed inset-0 z-30 bg-background/60 lg:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
}
