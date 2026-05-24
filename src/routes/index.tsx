import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ami/Logo";
import { Badge, Panel, Sparkline, StatCard } from "@/components/ami/widgets";
import { HoloChip } from "@/components/ami/AmiInsight";
import { LanguageSwitcher } from "@/components/ami/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import {
  Sparkles, Bot, MessageSquare, ShieldCheck, TrendingUp, Zap,
  ArrowRight, Activity, Coins, LineChart, Radar, Hammer, Database,
  ChevronDown, Newspaper, Tv, Handshake, Star, GitCompareArrows, Globe2,
  CreditCard, Settings, LayoutDashboard, Globe, ShieldAlert,
} from "lucide-react";
import arcaneBg from "@/assets/arcane-bg.jpg";
import amiHeroWide from "@/assets/ami-hero-wide.png";
import amiBannerUltrawide from "@/assets/ami-banner-ultrawide.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AMI — Azeroth Market Intelligence" },
      { name: "description", content: "AI-powered WoW auction analytics. Spot best deals, fast flips and market shifts before anyone else." },
      { property: "og:title", content: "AMI — Azeroth Market Intelligence" },
      { property: "og:description", content: "AI-powered WoW auction analytics. Best deals, fast flips, Discord signals." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background atmosphere */}
      <img
        src={arcaneBg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-[120vh] object-cover opacity-40 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background pointer-events-none" />

      <SiteHeader />

      {/* Ultra-wide brand strip — desktop only, safely cropped */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-6 hidden md:block">
        <div className="relative rounded-2xl overflow-hidden glow-border h-28 lg:h-32">
          <img
            src={amiBannerUltrawide}
            alt="AMI · Market Intelligence Assistant"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-background/85" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <Badge tone="primary">{t("landing.badge")}</Badge>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            {t("landing.headline1")}
            <span className="text-gradient"> {t("landing.headline2")}</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">{t("landing.subhead")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/app">
              <Button size="lg" className="glow">
                {t("landing.ctaOpenDashboard")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/app/assistant">
              <Button size="lg" variant="outline" className="border-border bg-card/40">
                <Bot className="mr-2 h-4 w-4" /> {t("landing.ctaAskAmi")}
              </Button>
            </Link>
            <Link to="/app/discord">
              <Button size="lg" variant="outline" className="border-border bg-card/40">
                <MessageSquare className="mr-2 h-4 w-4" /> {t("landing.ctaDiscord")}
              </Button>
            </Link>
            <Link to="/app/loot">
              <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Database className="mr-2 h-4 w-4" /> {t("landing.ctaLoot")}
              </Button>
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <Metric label={t("landing.metricItems")} value="24,581" />
            <Metric label={t("landing.metricSignals")} value="1,820" />
            <Metric label={t("landing.metricMargin")} value="+34%" />
          </div>

          {/* Product status chips — communicate that AMI is an analytics product, not a fantasy toy */}
          <ProductStatusRow />
        </div>

        <div className="relative">
          <div className="absolute -inset-10 bg-[radial-gradient(closest-side,oklch(0.68_0.22_295/0.4),transparent)] blur-2xl" />
          <div className="relative glass-strong rounded-3xl p-2 glow-border">
            <div className="relative rounded-2xl overflow-hidden w-full h-[420px] md:h-[520px] lg:h-[560px]">
              <img
                src={amiHeroWide}
                alt="AMI — Azeroth Market Intelligence"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            </div>

            {/* Holographic AMI helper chips — market intelligence overlays */}
            <div className="hidden md:block absolute -left-6 top-10">
              <HoloChip icon={Activity} label={t("landing.holoMarketPulse")} hint={t("landing.holoMarketPulseHint")} />
            </div>
            <div className="hidden md:block absolute -right-6 top-24">
              <HoloChip icon={Radar} label={t("landing.holoRiskRadar")} hint={t("landing.holoRiskRadarHint")} />
            </div>
            <div className="hidden md:block absolute -left-8 top-1/2">
              <HoloChip icon={Coins} label={t("landing.holoBestDeals")} hint={t("landing.holoBestDealsHint")} />
            </div>
            <div className="hidden md:block absolute -right-8 top-[62%]">
              <HoloChip icon={Hammer} label={t("landing.holoProfDemand")} hint={t("landing.holoProfDemandHint")} />
            </div>
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -bottom-4">
              <HoloChip icon={MessageSquare} label={t("landing.holoDiscordDigest")} hint={t("landing.holoDiscordDigestHint")} />
            </div>

            <div className="absolute left-6 bottom-6 right-6 glass rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_currentColor]" />
              <div className="text-xs">
                <div className="font-medium">{t("landing.amiOnline")}</div>
                <div className="text-muted-foreground">{t("landing.amiWatching")}</div>
              </div>
              <Bot className="ml-auto h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust / guardrail strip */}
      <TrustStrip />

      {/* Benefits */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <SectionHead eyebrow={t("landing.benefitsEyebrow")} title={t("landing.benefitsTitle")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[
            { icon: Coins,       title: t("landing.ben1Title"), text: t("landing.ben1Text") },
            { icon: Zap,         title: t("landing.ben2Title"), text: t("landing.ben2Text") },
            { icon: ShieldCheck, title: t("landing.ben3Title"), text: t("landing.ben3Text") },
            { icon: TrendingUp,  title: t("landing.ben4Title"), text: t("landing.ben4Text") },
            { icon: Bot,         title: t("landing.ben5Title"), text: t("landing.ben5Text") },
            { icon: MessageSquare, title: t("landing.ben6Title"), text: t("landing.ben6Text") },
          ].map((f) => (
            <Panel key={f.title}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg grid place-items-center glass glow-border">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="font-medium">{f.title}</div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{f.text}</p>
            </Panel>
          ))}
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <SectionHead eyebrow={t("landing.previewEyebrow")} title={t("landing.previewTitle")} />
        <div className="mt-8 glass-strong rounded-3xl p-5 glow-border">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label={t("landing.previewTotal")}     value="24,581" delta="+6.8% · 24h" icon={Activity} />
            <StatCard label={t("landing.previewUp")}        value="14,329" delta="+8.2%" icon={TrendingUp} accent="success" />
            <StatCard label={t("landing.previewDown")}      value="8,732"  delta="-3.6%" trend="down" icon={LineChart} accent="destructive" />
            <StatCard label={t("landing.previewSentiment")} value={t("landing.previewBullish")} delta="68%" icon={Sparkles} accent="gold" />
          </div>
          <div className="grid lg:grid-cols-3 gap-3 mt-3">
            <Panel title={t("landing.previewPriceTrend")} className="lg:col-span-2">
              <div className="h-40">
                <Sparkline data={[20,28,24,38,30,52,46,60,55,68,62,80,72,90]} color="oklch(0.78 0.20 295)" height={160} />
              </div>
            </Panel>
            <Panel title={t("landing.previewIntel")}>
              <ul className="space-y-3 text-sm">
                {[
                  [t("landing.intel1Title"), t("landing.intel1Body"), "2m"],
                  [t("landing.intel2Title"), t("landing.intel2Body"), "18m"],
                  [t("landing.intel3Title"), t("landing.intel3Body"), "45m"],
                ].map(([a,b,c]) => (
                  <li key={a} className="flex items-start gap-3">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                    <div className="flex-1">
                      <div className="font-medium">{a}</div>
                      <div className="text-muted-foreground text-xs">{b}</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground">{c}</div>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </section>

      {/* AMI assistant + Discord */}
      <section id="assistant" className="relative z-10 mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-2 gap-6">
        <Panel className="p-7">
          <Badge tone="primary">{t("landing.assistantBadge")}</Badge>
          <h3 className="mt-3 text-2xl font-semibold">{t("landing.assistantTitle")}</h3>
          <p className="text-sm text-muted-foreground mt-2">{t("landing.assistantBody")}</p>
          <div className="mt-5 space-y-3">
            {[
              t("landing.assistantQ1"),
              t("landing.assistantQ2"),
              t("landing.assistantQ3"),
            ].map((q) => (
              <div key={q} className="glass rounded-xl p-3 text-sm flex items-center gap-3">
                <Bot className="h-4 w-4 text-primary" /> {q}
              </div>
            ))}
          </div>
        </Panel>
        <div id="discord" />
        <Panel className="p-7">
          <Badge tone="gold">{t("landing.discordBadge")}</Badge>
          <h3 className="mt-3 text-2xl font-semibold">{t("landing.discordTitle")}</h3>
          <p className="text-sm text-muted-foreground mt-2">{t("landing.discordBody")}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ["#best-deals",  `1,284 ${t("landing.today")}`],
              ["#fast-flips",  `612 ${t("landing.today")}`],
              ["#risky-deals", `92 ${t("landing.today")}`],
              ["#market-stats", t("landing.hourly")],
            ].map(([c,n]) => (
              <div key={c} className="glass rounded-xl p-3">
                <div className="text-sm font-medium">{c}</div>
                <div className="text-xs text-muted-foreground">{n}</div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <div className="glass-strong rounded-3xl p-10 text-center glow-border relative overflow-hidden">
          <div className="absolute inset-0 opacity-50 pointer-events-none"
            style={{ background: "radial-gradient(closest-side, oklch(0.68 0.22 295 / 0.35), transparent)" }} />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t("landing.ctaTitle")}</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{t("landing.ctaBody")}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/app/pricing"><Button size="lg" className="glow">{t("landing.ctaClaim")}</Button></Link>
            <Link to="/app"><Button size="lg" variant="outline" className="border-border">{t("landing.ctaExplore")}</Button></Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <Logo withWordmark={false} />
            <span>© {new Date().getFullYear()} AMI · {t("landing.footerNote")}</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">{t("landing.privacy")}</a>
            <a href="#" className="hover:text-foreground">{t("landing.terms")}</a>
            <a href="#" className="hover:text-foreground">{t("landing.footer.discord")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl px-3 py-2.5">
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
    </div>
  );
}

function ProductStatusRow() {
  const { t } = useTranslation();
  const chips: { icon: typeof Globe; label: string; value: string; tone?: string }[] = [
    { icon: Globe,       label: t("landing.status.region"), value: "EU" },
    { icon: Globe2,      label: t("landing.status.realm"),  value: "Spineshatter" },
    { icon: Database,    label: t("landing.status.data"),   value: t("landing.status.dataValue") },
    { icon: LineChart,   label: t("landing.status.mode"),   value: t("landing.status.modeValue"), tone: "primary" },
    { icon: ShieldAlert, label: t("landing.status.risk"),   value: t("landing.status.riskValue"), tone: "gold" },
  ];
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {chips.map((c) => (
        <div key={c.label} className="glass rounded-full pl-2 pr-3 py-1.5 inline-flex items-center gap-2 text-[11px]">
          <span className="h-5 w-5 rounded-full glass grid place-items-center">
            <c.icon className={`h-3 w-3 ${c.tone === "gold" ? "text-gold" : c.tone === "primary" ? "text-primary" : "text-muted-foreground"}`} />
          </span>
          <span className="uppercase tracking-[0.14em] text-muted-foreground">{c.label}</span>
          <span className="font-medium text-foreground">{c.value}</span>
        </div>
      ))}
    </div>
  );
}

function TrustStrip() {
  const { t } = useTranslation();
  const items = [
    { icon: LineChart,   label: t("landing.trust.analyticsOnly") },
    { icon: ShieldCheck, label: t("landing.trust.noAutomation") },
    { icon: ShieldAlert, label: t("landing.trust.manualReview") },
    { icon: Activity,    label: t("landing.trust.demoLive") },
  ];
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 -mt-12 mb-12">
      <div className="glass-strong rounded-2xl px-4 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-muted-foreground">
        {items.map((it, i) => (
          <span key={it.label} className="inline-flex items-center gap-1.5">
            {i > 0 && <span className="text-border hidden sm:inline">·</span>}
            <it.icon className="h-3.5 w-3.5 text-primary" />
            <span>{it.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function SiteHeader() {
  const { t } = useTranslation();
  const product = [
    { to: "/app",            label: t("nav.overview"),       icon: LayoutDashboard, hint: t("landing.menu.marketDashboardHint") },
    { to: "/app/signals",    label: t("nav.auctionSignals"), icon: Radar,           hint: t("landing.menu.signalsHint") },
    { to: "/app/assistant",  label: t("nav.amiAssistant"),   icon: Bot,             hint: t("landing.menu.assistantHint") },
    { to: "/app/analytics",  label: t("nav.itemAnalytics"),  icon: LineChart,       hint: t("landing.menu.analyticsHint") },
    { to: "/app/loot",       label: t("nav.lootDatabase"),   icon: Database,        hint: t("landing.menu.lootHint") },
    { to: "/app/forecast",   label: t("nav.marketForecast"), icon: Sparkles,        hint: t("landing.menu.forecastHint") },
    { to: "/app/professions",label: t("nav.professions"),    icon: Hammer,          hint: t("landing.menu.professionsHint") },
    { to: "/app/compare",    label: t("nav.compareItems"),   icon: GitCompareArrows,hint: t("landing.menu.compareHint") },
    { to: "/app/realms",     label: t("nav.realmFaction"),   icon: Globe2,          hint: t("landing.menu.realmsHint") },
    { to: "/app/watchlist",  label: t("nav.watchlist"),      icon: Star,            hint: t("landing.menu.watchlistHint") },
    { to: "/app/discord",    label: t("nav.discord"),        icon: MessageSquare,   hint: t("landing.menu.discordHint") },
  ];
  const community = [
    { to: "/app/news",     label: t("nav.news"),     icon: Newspaper,     hint: t("landing.menu.newsHint") },
    { to: "/app/streams",  label: t("nav.streams"),  icon: Tv,            hint: t("landing.menu.streamsHint") },
    { to: "/app/partners", label: t("nav.partners"), icon: Handshake,     hint: t("landing.menu.partnersHint") },
  ];

  return (
    <header className="relative z-30 sticky top-0">
      <div className="absolute inset-0 backdrop-blur-md bg-background/60 border-b border-border/60" />
      <div className="relative mx-auto max-w-7xl px-5 h-14 flex items-center gap-6">
        <Link to="/" className="shrink-0"><Logo /></Link>
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <MegaMenu label={t("nav.product")} items={product} />
          <MegaMenu label={t("nav.community")} items={community} />
          <Link to="/app/assistant" className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/40 inline-flex items-center gap-1.5">
            <Bot className="h-3.5 w-3.5" /> {t("nav.amiAssistant")}
          </Link>
          <Link to="/app/pricing" className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/40">
            {t("nav.pricing")}
          </Link>
          <Link to="/app/settings" className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/40 inline-flex items-center gap-1.5">
            <Settings className="h-3.5 w-3.5" /> {t("nav.settings")}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Link to="/app" className="hidden md:inline-flex">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              {t("nav.login")}
            </Button>
          </Link>
          <Link to="/app/pricing">
            <Button size="sm" className="glow">
              <CreditCard className="h-3.5 w-3.5 mr-1.5" />
              {t("nav.joinEarlyAccess")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function MegaMenu({
  label,
  items,
}: {
  label: string;
  items: { to: string; label: string; icon: typeof LayoutDashboard; hint: string }[];
}) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/40 inline-flex items-center gap-1"
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
      </button>
      <div
        className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full pt-2 z-50"
      >
        <div className="glass-strong rounded-2xl p-3 glow-border w-[520px] grid grid-cols-2 gap-1">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-sidebar-accent/60 transition-colors"
            >
              <div className="h-8 w-8 rounded-md glass grid place-items-center shrink-0">
                <it.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium leading-tight">{it.label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{it.hint}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
