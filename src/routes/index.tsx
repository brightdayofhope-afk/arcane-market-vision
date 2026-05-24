import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ami/Logo";
import { Badge, Panel, Sparkline, StatCard } from "@/components/ami/widgets";
import {
  Sparkles, Bot, MessageSquare, ShieldCheck, TrendingUp, Zap,
  ArrowRight, Activity, Coins, LineChart,
} from "lucide-react";
import heroChar from "@/assets/ami-hero.jpg";
import arcaneBg from "@/assets/arcane-bg.jpg";

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

      {/* Nav */}
      <header className="relative z-10 mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Intelligence</a>
          <a href="#assistant" className="hover:text-foreground">AMI</a>
          <a href="#discord" className="hover:text-foreground">Discord</a>
          <Link to="/app/pricing" className="hover:text-foreground">Early Access</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/app"><Button variant="ghost" className="hidden sm:inline-flex">View Demo</Button></Link>
          <Link to="/app/pricing"><Button>Join Early Access</Button></Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <Badge tone="primary">Closed Beta · Patch 11.x intelligence</Badge>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Trade Azeroth like a
            <span className="text-gradient"> high-frequency mage.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            AMI fuses Auctionator and TSM data with an arcane AI core — surfacing best deals,
            fast flips and market shifts, and broadcasting signals straight to your Discord.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/app/pricing">
              <Button size="lg" className="glow">
                Join Early Access <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/app">
              <Button size="lg" variant="outline" className="border-border bg-card/40">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <Metric label="Items tracked" value="24,581" />
            <Metric label="Signals / day" value="1,820" />
            <Metric label="Avg margin" value="+34%" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 bg-[radial-gradient(closest-side,oklch(0.68_0.22_295/0.4),transparent)] blur-2xl" />
          <div className="relative glass-strong rounded-3xl p-2 glow-border">
            <img
              src={heroChar}
              alt="AMI, the arcane market assistant"
              className="rounded-2xl w-full h-[560px] object-cover object-top"
            />
            <div className="absolute left-6 bottom-6 right-6 glass rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_currentColor]" />
              <div className="text-xs">
                <div className="font-medium">AMI is online</div>
                <div className="text-muted-foreground">Watching 14 realms · 6 categories</div>
              </div>
              <Bot className="ml-auto h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <SectionHead eyebrow="Intelligence" title="Built like a fintech terminal, tuned for Azeroth." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[
            { icon: Coins, title: "Best Deals", text: "Live underpriced items across realms, ranked by confidence and margin." },
            { icon: Zap, title: "Fast Flips", text: "Short-cycle opportunities with sub-hour resale windows." },
            { icon: ShieldCheck, title: "Risk Filter", text: "Volatility, seller pressure and demand decay scored automatically." },
            { icon: TrendingUp, title: "Forecasts", text: "Patch-aware predictions for prices, demand and supply." },
            { icon: Bot, title: "AMI Assistant", text: "Ask in plain language — get tactical answers grounded in your data." },
            { icon: MessageSquare, title: "Discord Signals", text: "Channels for deals, flips, risks and profession alerts." },
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
        <SectionHead eyebrow="Terminal" title="Your auction intelligence, at a glance." />
        <div className="mt-8 glass-strong rounded-3xl p-5 glow-border">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Total Markets" value="24,581" delta="+6.8% vs 24h" icon={Activity} />
            <StatCard label="Trending Up" value="14,329" delta="+8.2%" icon={TrendingUp} accent="success" />
            <StatCard label="Trending Down" value="8,732" delta="-3.6%" trend="down" icon={LineChart} accent="destructive" />
            <StatCard label="Sentiment" value="Bullish" delta="68%" icon={Sparkles} accent="gold" />
          </div>
          <div className="grid lg:grid-cols-3 gap-3 mt-3">
            <Panel title="Price Trend · 24H" className="lg:col-span-2">
              <div className="h-40">
                <Sparkline data={[20,28,24,38,30,52,46,60,55,68,62,80,72,90]} color="oklch(0.78 0.20 295)" height={160} />
              </div>
            </Panel>
            <Panel title="Market Intelligence">
              <ul className="space-y-3 text-sm">
                {[
                  ["Tech Sector Rally", "AI chip demand drives gains", "2m"],
                  ["Inflation Data Impact", "CPI came in lower than expected", "18m"],
                  ["Crypto Market Surge", "Gold token breaks resistance", "45m"],
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
          <Badge tone="primary">AMI Assistant</Badge>
          <h3 className="mt-3 text-2xl font-semibold">Talk to the market.</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Ask about an item, profession, or signal. AMI grounds every answer in live auction data and patch context.
          </p>
          <div className="mt-5 space-y-3">
            {[
              "Why is Arcane Crystal spiking on Spineshatter?",
              "Show me 3 fast flips for Tailoring under 200g.",
              "Explain the risk on the Mythic mount signal.",
            ].map((q) => (
              <div key={q} className="glass rounded-xl p-3 text-sm flex items-center gap-3">
                <Bot className="h-4 w-4 text-primary" /> {q}
              </div>
            ))}
          </div>
        </Panel>
        <div id="discord" />
        <Panel className="p-7">
          <Badge tone="gold">Discord Signals</Badge>
          <h3 className="mt-3 text-2xl font-semibold">Signals where your guild already is.</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Route best deals, fast flips and risk alerts to dedicated channels with one click.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ["#best-deals", "1,284 today"],
              ["#fast-flips", "612 today"],
              ["#risky-deals", "92 today"],
              ["#market-stats", "hourly"],
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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Join the Founders’ circle.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Free during closed beta. Founders keep a lifetime discount on premium analytics.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/app/pricing"><Button size="lg" className="glow">Claim Early Access</Button></Link>
            <Link to="/app"><Button size="lg" variant="outline" className="border-border">Explore Dashboard</Button></Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <Logo withWordmark={false} />
            <span>© {new Date().getFullYear()} AMI · Not affiliated with Blizzard Entertainment.</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Discord</a>
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

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
