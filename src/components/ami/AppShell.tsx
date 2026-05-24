import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Radar, LineChart, Sparkles, Bot, MessageSquare,
  Database, CreditCard, Settings, Bell, Search, Menu,
  Star, GitCompareArrows, Globe2, Activity, Hammer, Newspaper, Tv, Handshake,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectorChip } from "./widgets";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AmiCompanion, useAmiCompanion } from "./AmiCompanion";
import { cn } from "@/lib/utils";

export function AppShell() {
  const { t } = useTranslation();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const { mode: amiMode, setMode: setAmiMode } = useAmiCompanion();

  type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; group: string };
  const nav: NavItem[] = [
    { to: "/app",            label: t("nav.overview"),        icon: LayoutDashboard, group: "Terminal" },
    { to: "/app/signals",    label: t("nav.auctionSignals"),  icon: Radar,           group: "Terminal" },
    { to: "/app/watchlist",  label: t("nav.watchlist"),       icon: Star,            group: "Terminal" },
    { to: "/app/analytics",  label: t("nav.itemAnalytics"),   icon: LineChart,       group: "Analytics" },
    { to: "/app/compare",    label: t("nav.compareItems"),    icon: GitCompareArrows,group: "Analytics" },
    { to: "/app/realms",     label: t("nav.realmFaction"),    icon: Globe2,          group: "Analytics" },
    { to: "/app/professions",label: t("nav.professions"),     icon: Hammer,          group: "Analytics" },
    { to: "/app/forecast",   label: t("nav.marketForecast"),  icon: Sparkles,        group: "Analytics" },
    { to: "/app/assistant",  label: t("nav.amiAssistant"),    icon: Bot,             group: "Intelligence" },
    { to: "/app/loot",       label: t("nav.lootDatabase"),    icon: Database,        group: "Intelligence" },
    { to: "/app/discord",    label: t("nav.discord"),         icon: MessageSquare,   group: "Intelligence" },
    { to: "/app/news",       label: t("nav.news"),            icon: Newspaper,       group: "Community" },
    { to: "/app/streams",    label: t("nav.streams"),         icon: Tv,              group: "Community" },
    { to: "/app/partners",   label: t("nav.partners"),        icon: Handshake,       group: "Community" },
    { to: "/app/pricing",    label: t("nav.earlyAccess"),     icon: CreditCard,      group: "Account" },
    { to: "/app/settings",   label: t("nav.settings"),        icon: Settings,        group: "Account" },
    { to: "/app/admin",      label: t("nav.admin"),           icon: ShieldCheck,     group: "Account" },
  ];

  const groupLabels: Record<string, string> = {
    Terminal: t("nav.terminal"),
    Analytics: t("nav.analytics"),
    Intelligence: t("nav.intelligenceGroup"),
    Community: t("nav.community"),
    Account: t("nav.account"),
  };
  const groups = ["Terminal", "Analytics", "Intelligence", "Community", "Account"] as const;

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
              <div className="px-3 mb-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">{groupLabels[g]}</div>
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
            <div className="font-medium">{t("header.userName")}</div>
            <div className="text-muted-foreground">{t("header.founderPlan")}</div>
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
            <Input placeholder={t("common.searchPlaceholder")} className="pl-9 bg-input/40 border-border h-10" />
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2">
            <SelectorChip label={t("selector.region")} value="EU" options={["EU","NA","KR","TW"]} />
            <SelectorChip label={t("selector.realm")}  value="Spineshatter" options={["Spineshatter","Kazzak","Ravencrest","Sylvanas","Draenor","Tarren Mill"]} />
            <SelectorChip label={t("selector.faction")} value={t("faction.horde")} options={[t("faction.auto"),t("faction.horde"),t("faction.alliance")]} />
          </div>
          <div className="ml-auto md:ml-2 flex items-center gap-2">
            <LanguageSwitcher className="hidden md:inline-flex" />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
            </Button>
          </div>
          </div>
          <div className="h-9 -mt-1 flex items-center gap-4 text-[11px] text-muted-foreground border-t border-border/60 overflow-x-auto whitespace-nowrap scrollbar-thin">
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_currentColor]" /> {t("header.liveBadge")}</span>
            <span className="text-border">|</span>
            <span className="inline-flex items-center gap-1.5"><Activity className="h-3 w-3 text-primary" /> {t("header.signals24h", { count: "1,820" })}</span>
            <span className="text-border">|</span>
            <span>{t("header.latency", { ms: "142" })}</span>
            <span className="text-border">|</span>
            <span>{t("header.ahScrape", { age: "38s" })}</span>
            <span className="text-border">|</span>
            <span className="text-success">{t("header.reagentsUp")}</span>
            <span className="text-destructive">{t("header.mountsDown")}</span>
            <span className="text-gold">{t("header.sentiment")}</span>
          </div>
        </header>
        <main
          className={cn(
            "flex-1 p-4 md:p-6 lg:p-8 transition-[padding]",
            amiMode === "docked" && "lg:pr-[21rem]",
          )}
        >
          <Outlet />
        </main>
      </div>
      {open && <div className="fixed inset-0 z-30 bg-background/60 lg:hidden" onClick={() => setOpen(false)} />}
      <AmiCompanion mode={amiMode} setMode={setAmiMode} />
    </div>
  );
}
