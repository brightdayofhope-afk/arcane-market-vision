import { createFileRoute } from "@tanstack/react-router";
import { Activity, TrendingUp, LineChart, Sparkles, Coins, Zap, ShieldAlert, Star } from "lucide-react";
import { Badge, MultiLineChart, PageHeader, Panel, Sparkline, StatCard } from "@/components/ami/widgets";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview · AMI" }] }),
  component: Overview,
});

const movers = [
  { name: "Arcane Crystal", code: "ARC", change: "+8.24%", price: "128g 45s" },
  { name: "Black Lotus", code: "BLO", change: "+6.91%", price: "1,420g" },
  { name: "Runecloth", code: "RNC", change: "+5.47%", price: "12g 75s" },
  { name: "Thorium Bar", code: "THB", change: "+4.32%", price: "38g 21s" },
  { name: "Large Brilliant Shard", code: "LBS", change: "+3.89%", price: "92g 17s" },
];

const heat = [
  { label: "Herbalism", value: "+7.21%", area: "row-span-2 col-span-2", tone: "success" },
  { label: "Mining", value: "+3.42%", area: "", tone: "success" },
  { label: "Tailoring", value: "+2.18%", area: "", tone: "success" },
  { label: "Enchanting", value: "-1.32%", area: "col-span-1", tone: "danger" },
  { label: "Inscription", value: "+0.73%", area: "col-span-1", tone: "success" },
] as const;

function Overview() {
  return (
    <div>
      <PageHeader
        title="Market Overview"
        subtitle="EU · Spineshatter · Horde — real-time auction intelligence."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Markets" value="24,581" delta="+6.8% vs 24h" icon={Activity} />
        <StatCard label="Trending Up" value="14,329" delta="+8.2%" icon={TrendingUp} accent="success" />
        <StatCard label="Trending Down" value="8,732" delta="-3.6%" trend="down" icon={LineChart} accent="destructive" />
        <StatCard label="Sentiment" value="Bullish · 68%" icon={Sparkles} accent="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title="Price Trends" className="lg:col-span-2" action={<TimeTabs />}>
          <MultiLineChart
            series={[
              { name: "Reagents Index", color: "oklch(0.78 0.20 295)", data: [40,46,42,55,50,62,58,70,66,78,72,86,80,92] },
              { name: "Raid Consumables", color: "oklch(0.70 0.18 230)", data: [30,34,38,36,42,46,50,54,58,60,64,68,70,74] },
              { name: "Crafted Gear",    color: "oklch(0.83 0.13 85)",   data: [60,58,55,52,50,48,46,45,42,40,42,44,46,48] },
            ]}
            height={240}
          />
          <div className="flex flex-wrap gap-4 mt-3 text-xs">
            <Legend color="oklch(0.78 0.20 295)" label="Reagents Index · +6.8%" />
            <Legend color="oklch(0.70 0.18 230)" label="Raid Consumables · +9.3%" />
            <Legend color="oklch(0.83 0.13 85)" label="Crafted Gear · -2.1%" />
          </div>
        </Panel>
        <Panel title="Market Intelligence" action={<a className="text-xs text-primary">View all →</a>}>
          <ul className="space-y-4 text-sm">
            {([
              [Sparkles, "Patch Hotfix Rally", "Crafted gear demand surges on Spineshatter", "2m"],
              [Coins, "Reagent Cost Drop", "Runecloth & herbs cheaper across EU-Horde", "18m"],
              [Zap, "Black Lotus Surge", "Alchemy flasks breaking resistance", "45m"],
              [ShieldAlert, "Volatility Alert", "Thorium Bar supply spike — short window", "1h"],
            ] as const).map(([Icon, a, b, c]) => (
              <li key={a} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg glass grid place-items-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{a}</div>
                  <div className="text-xs text-muted-foreground">{b}</div>
                </div>
                <div className="text-[10px] text-muted-foreground">{c}</div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title="Top Movers" action={<MoverTabs />}>
          <ul className="space-y-2">
            {movers.map((m) => (
              <li key={m.code} className="flex items-center gap-3 glass rounded-xl p-3">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center text-[10px] font-bold">{m.code}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.code} Auction Index</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-success">{m.change}</div>
                  <div className="text-[10px] text-muted-foreground">{m.price}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Market Heatmap" action={<a className="text-xs text-primary">View all →</a>}>
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[260px]">
            {heat.map((h) => (
              <div
                key={h.label}
                className={`rounded-xl p-3 flex flex-col justify-between glow-border ${h.area}`}
                style={{
                  background: h.tone === "success"
                    ? "linear-gradient(135deg, oklch(0.42 0.12 150 / 0.55), oklch(0.30 0.10 150 / 0.3))"
                    : "linear-gradient(135deg, oklch(0.42 0.18 25 / 0.55), oklch(0.30 0.16 25 / 0.3))",
                }}
              >
                <div className="text-xs uppercase tracking-wider">{h.label}</div>
                <div className="text-lg font-semibold">{h.value}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Alerts" action={<a className="text-xs text-primary">View all →</a>}>
          <ul className="space-y-3 text-sm">
            {([
              [ShieldAlert, "Price Alert", "Arcane Crystal above 130g (Spineshatter)", "now", "warning"],
              [Zap, "Volume Alert", "Runecloth volume 2× normal on EU-Horde", "5m", "primary"],
              [Star, "Patch Note", "11.x hotfix touches Inscription mats", "15m", "gold"],
              [TrendingUp, "Technical Alert", "Large Brilliant Shard broke 90g resistance", "1h", "success"],
            ] as const).map(([Icon, a, b, c, t]) => (
              <li key={a} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg glass grid place-items-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{a}</div>
                  <div className="text-xs text-muted-foreground">{b}</div>
                </div>
                <Badge tone={t as any}>{c}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-3 mt-3">
        <Panel title="Recent Signals">
          <ul className="divide-y divide-border/60">
            {([
              ["Best Deal", "Arcane Crystal · Spineshatter", "+32% margin", "success"],
              ["Fast Flip", "Dreamleaf · Kazzak", "8m window", "primary"],
              ["Risky", "Mount: Phaseweaver", "Volatility 0.84", "danger"],
              ["Watch", "Stormscale · Ravencrest", "Vol +210%", "gold"],
            ] as const).map(([k, n, m, t]) => (
              <li key={n} className="py-3 flex items-center gap-3">
                <Badge tone={t as any}>{k}</Badge>
                <div className="flex-1 text-sm">{n}</div>
                <div className="text-xs text-muted-foreground">{m}</div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Discord Publish Status">
          <ul className="space-y-2">
            {([
              ["#best-deals", "Healthy", "success"],
              ["#fast-flips", "Healthy", "success"],
              ["#risky-deals", "Rate-limit warn", "warning"],
              ["#market-stats", "Healthy", "success"],
            ] as const).map(([c, s, t]) => (
              <li key={c} className="flex items-center gap-3 glass rounded-xl px-3 py-2.5">
                <span className="font-mono text-sm">{c}</span>
                <span className="ml-auto"><Badge tone={t as any}>{s}</Badge></span>
              </li>
            ))}
          </ul>
          <div className="rune-divider my-4" />
          <div className="h-16"><Sparkline data={[10,14,12,18,22,20,26,24,30,28,34,32,38]} color="oklch(0.70 0.18 230)" /></div>
          <div className="text-xs text-muted-foreground mt-2">Delivery throughput · last 24h</div>
        </Panel>
      </div>
    </div>
  );
}

function TimeTabs() {
  return (
    <div className="flex gap-1 text-xs">
      {["1H","24H","7D","30D","1Y","All"].map((t,i) => (
        <button key={t} className={`px-2 py-1 rounded-md ${i===1?"bg-primary/20 text-primary":"text-muted-foreground hover:text-foreground"}`}>{t}</button>
      ))}
    </div>
  );
}
function MoverTabs() {
  return (
    <div className="flex gap-1 text-xs">
      {["Gainers","Losers","Active"].map((t,i) => (
        <button key={t} className={`px-2 py-1 rounded-md ${i===0?"bg-primary/20 text-primary":"text-muted-foreground hover:text-foreground"}`}>{t}</button>
      ))}
    </div>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
