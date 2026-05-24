import { createFileRoute } from "@tanstack/react-router";
import { Activity, TrendingUp, LineChart, Sparkles, Coins, Zap, ShieldAlert, Star } from "lucide-react";
import { Badge, BarRow, DataTable, LiveTicker, MultiLineChart, PageHeader, Panel, SelectorChip, Sparkline, StatCard } from "@/components/ami/widgets";
import { Link } from "@tanstack/react-router";

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
        subtitle="EU · Spineshatter · Horde — real-time auction intelligence across 14 tracked realms."
      />

      <div className="mb-3">
        <LiveTicker
          items={[
            { tone: "success", text: "Black Lotus +42% in 1h", meta: "EU · Spineshatter" },
            { tone: "primary", text: "Runecloth volume 2× normal", meta: "EU · Horde" },
            { tone: "gold",    text: "Patch 11.x hotfix · Inscription mats", meta: "live" },
            { tone: "danger",  text: "Phaseweaver mount listings cooling", meta: "-22%" },
            { tone: "success", text: "Thorium Bar broke 35g resistance", meta: "now" },
            { tone: "primary", text: "Large Brilliant Shard supply spike", meta: "5m ago" },
          ]}
        />
      </div>

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
          <DataTable
            dense
            columns={[
              { key: "type", label: "Type" },
              { key: "item", label: "Item · Realm" },
              { key: "buy", label: "Buy", align: "right" },
              { key: "sell", label: "Sell", align: "right" },
              { key: "margin", label: "Margin", align: "right" },
              { key: "conf", label: "Conf.", align: "right" },
              { key: "age", label: "Age", align: "right" },
            ]}
            rows={[
              { type: <Badge tone="success">Best Deal</Badge>,  item: "Arcane Crystal · Spineshatter", buy: "118g", sell: "156g", margin: <span className="text-success">+32%</span>, conf: "82%", age: <span className="text-muted-foreground">2m</span> },
              { type: <Badge tone="primary">Fast Flip</Badge>,  item: "Runecloth · Spineshatter",       buy: "11g",  sell: "14g",  margin: <span className="text-success">+27%</span>, conf: "74%", age: <span className="text-muted-foreground">5m</span> },
              { type: <Badge tone="gold">Watch</Badge>,         item: "Black Lotus · Kazzak",            buy: "1,180g", sell: "1,460g", margin: <span className="text-success">+24%</span>, conf: "71%", age: <span className="text-muted-foreground">8m</span> },
              { type: <Badge tone="danger">Risky</Badge>,       item: "Phaseweaver Mount · Ravencrest",  buy: "—",    sell: "—",    margin: <span className="text-muted-foreground">Vol 0.84</span>, conf: "54%", age: <span className="text-muted-foreground">12m</span> },
              { type: <Badge tone="success">Best Deal</Badge>,  item: "Thorium Bar · Spineshatter",      buy: "29g",  sell: "38g",  margin: <span className="text-success">+31%</span>, conf: "68%", age: <span className="text-muted-foreground">14m</span> },
              { type: <Badge tone="primary">Fast Flip</Badge>,  item: "Large Brilliant Shard · Sylvanas", buy: "78g", sell: "94g",  margin: <span className="text-success">+20%</span>, conf: "64%", age: <span className="text-muted-foreground">21m</span> },
            ]}
          />
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

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title="Profession demand · 7d" className="lg:col-span-1">
          <div className="space-y-2.5">
            <BarRow label="Alchemy"      value={94} max={100} tone="gold" />
            <BarRow label="Herbalism"    value={88} max={100} tone="success" />
            <BarRow label="Enchanting"   value={76} max={100} tone="primary" />
            <BarRow label="Tailoring"    value={64} max={100} tone="primary" />
            <BarRow label="Inscription"  value={58} max={100} tone="primary" />
            <BarRow label="Engineering"  value={38} max={100} tone="danger" />
          </div>
        </Panel>

        <Panel title="Watchlist · top movers" className="lg:col-span-2" action={<Link to="/app/watchlist" className="text-xs text-primary">Open watchlist →</Link>}>
          <DataTable
            dense
            columns={[
              { key: "item", label: "Item" },
              { key: "loc", label: "Realm" },
              { key: "price", label: "Price", align: "right" },
              { key: "target", label: "Target", align: "right" },
              { key: "delta", label: "Δ 24h", align: "right" },
              { key: "trend", label: "Trend" },
            ]}
            rows={[
              { item: <span className="font-medium">Black Lotus</span>, loc: "Kazzak · Horde", price: "1,420g", target: "1,200g", delta: <span className="text-success">+12.4%</span>, trend: <div className="w-24 h-6"><Sparkline data={[40,42,46,50,55,60,66,70,74,80,84,88,90,94,98,102]} color="oklch(0.74 0.17 150)" height={24} /></div> },
              { item: <span className="font-medium">Arcane Crystal</span>, loc: "Spineshatter · Horde", price: "128g", target: "100g", delta: <span className="text-success">+8.2%</span>, trend: <div className="w-24 h-6"><Sparkline data={[10,12,14,16,20,22,26,30,32,38,42,48,52,58,64,72]} color="oklch(0.74 0.17 150)" height={24} /></div> },
              { item: <span className="font-medium">Thorium Bar</span>, loc: "Ravencrest · Alliance", price: "38g", target: "30g", delta: <span className="text-success">+4.3%</span>, trend: <div className="w-24 h-6"><Sparkline data={[20,22,24,23,26,28,30,32,34,33,36,38,40,42,44,46]} color="oklch(0.74 0.17 150)" height={24} /></div> },
              { item: <span className="font-medium">Runecloth</span>, loc: "Spineshatter · Horde", price: "12g 75s", target: "15g", delta: <span className="text-destructive">-3.1%</span>, trend: <div className="w-24 h-6"><Sparkline data={[60,58,56,54,52,50,48,46,44,42,40,38,36,34,32,30]} color="oklch(0.66 0.22 25)" height={24} /></div> },
            ]}
          />
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title="AMI insights" className="lg:col-span-2">
          <ul className="space-y-3 text-sm">
            {[
              { tone: "primary" as const, t: "Black Lotus is entering a pre-raid spike window.", d: "Volume up 62% over 7d on EU-Horde. Suggested action: hold listings 4–6h, expect +18–24% upside." },
              { tone: "gold"    as const, t: "Inscription mats undervalued vs. patch 11.x flux.", d: "Confidence 76%. Cross-realm Runecloth arbitrage between Spineshatter ↔ Kazzak: ~+27% margin." },
              { tone: "danger"  as const, t: "Phaseweaver mount listings cooling fast.", d: "Sellers up 38%, demand down 22%. AMI recommends exiting open positions before reset." },
            ].map((i) => (
              <li key={i.t} className="glass rounded-xl p-3 flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                <div>
                  <div className="flex items-center gap-2"><Badge tone={i.tone}>AMI</Badge> <div className="font-medium">{i.t}</div></div>
                  <div className="text-xs text-muted-foreground mt-1">{i.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Realm liquidity" action={<Link to="/app/realms" className="text-xs text-primary">All realms →</Link>}>
          <div className="space-y-2.5">
            <BarRow label="Spineshatter" value={92} max={100} tone="success" />
            <BarRow label="Kazzak"       value={88} max={100} tone="success" />
            <BarRow label="Draenor"      value={84} max={100} tone="primary" />
            <BarRow label="Ravencrest"   value={71} max={100} tone="primary" />
            <BarRow label="Sylvanas"     value={65} max={100} tone="gold" />
            <BarRow label="Tarren Mill"  value={42} max={100} tone="danger" />
          </div>
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
