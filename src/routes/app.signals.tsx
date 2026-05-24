import { createFileRoute } from "@tanstack/react-router";
import { Badge, PageHeader, Panel, Sparkline, StatusPill } from "@/components/ami/widgets";
import { RiskMeter, ConfidenceBar, AccessLock } from "@/components/ami/access";
import { Button } from "@/components/ui/button";
import { Filter, Coins, Zap, ShieldAlert, Star, TrendingUp, TrendingDown, Bot, LineChart, ArrowUpDown, Eye, AlertTriangle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/signals")({
  head: () => ({ meta: [{ title: "Auction Signals · AMI" }] }),
  component: SignalsPage,
});

const tabs = [
  { key: "deals", label: "Best Deals", icon: Coins },
  { key: "flips", label: "Fast Flips", icon: Zap },
  { key: "risky", label: "Risky Deals", icon: ShieldAlert },
  { key: "watch", label: "Watch Items", icon: Star },
  { key: "up",    label: "Price Up Forecast", icon: TrendingUp },
  { key: "down",  label: "Price Down Forecast", icon: TrendingDown },
];

const signals = [
  { item: "Arcane Crystal",        realm: "Spineshatter", faction: "Horde",    margin: "+32%", confidence: 82, risk: 22, liquidity: 84, buy: "118g",  sell: "156g",  profit: "+612g / stack", reason: "Pre-raid Alchemy demand spike", profession: "Alchemy",       spark: [10,12,14,16,20,22,26,30,32,38,42,48,52,58,64,72] },
  { item: "Runecloth",             realm: "Spineshatter", faction: "Horde",    margin: "+27%", confidence: 74, risk: 18, liquidity: 92, buy: "11g",   sell: "14g",   profit: "+240g / stack", reason: "Volume 2× normal · Tailoring",     profession: "Tailoring",     spark: [40,42,46,48,52,56,58,62,64,66,70,72,74,76,80,82] },
  { item: "Black Lotus",           realm: "Kazzak",       faction: "Horde",    margin: "+24%", confidence: 71, risk: 48, liquidity: 32, buy: "1,180g",sell: "1,460g",profit: "+280g / unit",  reason: "Supply collapse · 14→3 sellers",   profession: "Alchemy",       spark: [80,82,86,88,90,94,100,108,112,118,124,130,138,142,148,152] },
  { item: "Thorium Bar",           realm: "Spineshatter", faction: "Horde",    margin: "+31%", confidence: 68, risk: 24, liquidity: 78, buy: "29g",   sell: "38g",   profit: "+180g / stack", reason: "Underpriced stack · smelting demand", profession: "Blacksmithing", spark: [22,24,26,28,30,32,30,34,36,38,40,42,44,46,48,50] },
  { item: "Large Brilliant Shard", realm: "Sylvanas",     faction: "Alliance", margin: "+20%", confidence: 64, risk: 30, liquidity: 62, buy: "78g",   sell: "94g",   profit: "+160g / shard", reason: "Enchanting reset window",          profession: "Enchanting",    spark: [30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60] },
  { item: "Primal Fire",           realm: "Ravencrest",   faction: "Alliance", margin: "+18%", confidence: 62, risk: 28, liquidity: 70, buy: "62g",   sell: "78g",   profit: "+128g / stack", reason: "Crafted gear demand uptick",       profession: "Blacksmithing", spark: [20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50] },
  { item: "Primal Water",          realm: "Draenor",      faction: "Horde",    margin: "+15%", confidence: 58, risk: 26, liquidity: 74, buy: "48g",   sell: "58g",   profit: "+96g / stack",  reason: "Steady Alchemy reagent flow",      profession: "Alchemy",       spark: [18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48] },
  { item: "Phaseweaver Mount",     realm: "Ravencrest",   faction: "Alliance", margin: "—",    confidence: 54, risk: 78, liquidity: 14, buy: "—",     sell: "—",     profit: "Manual review", reason: "Listings 38% under floor · recovery-scam pattern", profession: "—",            spark: [60,58,56,54,52,50,48,46,44,42,40,38,36,34,32,30] },
  { item: "Soul Dust",             realm: "Tarren Mill",  faction: "Horde",    margin: "+12%", confidence: 60, risk: 22, liquidity: 88, buy: "32g",   sell: "40g",   profit: "+72g / stack",  reason: "Enchanting low-tier reset",        profession: "Enchanting",    spark: [22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52] },
];

function SignalsPage() {
  return (
    <div>
      <PageHeader
        title="Auction Signals"
        subtitle="Live underpriced, flip, and forecast opportunities — refreshed every 38s."
        actions={
          <div className="flex items-center gap-2">
            <StatusPill status="demo" />
            <Button variant="outline" className="border-border"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-[260px_1fr] gap-3">
        {/* Filter rail */}
        <Panel className="self-start sticky top-32">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Filters</div>
          <FilterGroup label="Category" options={["All", "Reagents", "Crafted Gear", "Mounts", "Recipes", "Enchants"]} active="Reagents" />
          <FilterGroup label="Profession" options={["All", "Alchemy", "Enchanting", "Tailoring", "Blacksmithing", "Jewelcrafting"]} active="All" />
          <FilterGroup label="Time window" options={["15m", "1h", "6h", "24h"]} active="1h" />
          <FilterGroup label="Source" options={["Auctionator", "TSM", "AMI Addon"]} active="Auctionator" />
          <div className="space-y-3 mt-3">
            <RangeRow label="Margin ≥" value="15%" />
            <RangeRow label="Confidence ≥" value="60%" />
            <RangeRow label="Risk ≤" value="Medium" />
            <RangeRow label="Liquidity ≥" value="40" />
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3 border-border">Reset</Button>
        </Panel>

        <div>
          {/* Tab strip */}
          <Panel className="mb-3 !py-2">
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((t, i) => (
                <button key={t.key} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${i===0?"bg-primary/20 text-primary glow-border":"glass text-muted-foreground hover:text-foreground"}`}>
                  <t.icon className="h-3.5 w-3.5" />{t.label}
                </button>
              ))}
              <div className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowUpDown className="h-3.5 w-3.5" /> Sort:
                <select className="bg-transparent text-foreground outline-none">
                  <option>Profit potential</option>
                  <option>Confidence</option>
                  <option>Risk (low→high)</option>
                  <option>Time detected</option>
                  <option>Price gap</option>
                  <option>Volume</option>
                </select>
              </div>
            </div>
          </Panel>

          {/* Signal cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {signals.map((s) => {
              const risky = s.risk >= 60;
              return (
                <Panel key={s.item + s.realm} className="!p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-xs font-bold">{s.item.slice(0,2).toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{s.item}</div>
                      <div className="text-[10px] text-muted-foreground truncate">EU · {s.realm} · {s.faction} · {s.profession}</div>
                    </div>
                    <Badge tone={risky ? "danger" : "success"}>{s.margin}</Badge>
                  </div>
                  <div className="h-14 mt-2"><Sparkline data={s.spark} color={risky ? "oklch(0.66 0.22 25)" : "oklch(0.78 0.20 295)"} height={56} /></div>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                    <Stat label="Buy" value={s.buy} />
                    <Stat label="Sell" value={s.sell} />
                    <Stat label="Est. profit" value={s.profit} accent />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <ConfidenceBar value={s.confidence} />
                    <RiskMeter value={s.risk} />
                  </div>
                  <div className="mt-3 text-[11px] text-muted-foreground leading-snug">
                    <span className="text-foreground/90 font-medium">Why: </span>{s.reason}
                  </div>
                  {risky && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-warning">
                      <AlertTriangle className="h-3 w-3" /> Manual review recommended · verify auction state
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <Link to="/app/assistant" className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
                      <Bot className="h-3 w-3" /> Explain with AMI
                    </Link>
                    <Link to="/app/analytics" className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
                      <LineChart className="h-3 w-3" /> Item analytics
                    </Link>
                    <button className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
                      <Eye className="h-3 w-3" /> Watch
                    </button>
                  </div>
                </Panel>
              );
            })}
          </div>

          {/* Locked premium row example — custom alert thresholds */}
          <div className="mt-3">
            <AccessLock level="premium" reason="Custom alert thresholds & export unlock with Premium." cta="See plans" to="/app/pricing">
              <Panel title="Custom alert threshold builder">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <Stat label="When margin ≥" value="20%" />
                  <Stat label="And confidence ≥" value="70%" />
                  <Stat label="And risk ≤" value="Medium" />
                </div>
                <div className="text-[10px] text-muted-foreground mt-3">Route matching signals to #my-alerts every 15 minutes.</div>
              </Panel>
            </AccessLock>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="glass rounded-lg px-2 py-1.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={accent ? "text-primary text-sm font-medium" : "text-sm font-medium"}>{value}</div>
    </div>
  );
}

function FilterGroup({ label, options, active }: { label: string; options: string[]; active: string }) {
  return (
    <div className="mb-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => (
          <button
            key={o}
            className={`px-2 py-0.5 rounded-md text-[11px] ${o === active ? "bg-primary/20 text-primary glow-border" : "glass text-muted-foreground hover:text-foreground"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function RangeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="text-muted-foreground flex-1">{label}</span>
      <span className="glass rounded-md px-2 py-0.5 text-foreground">{value}</span>
    </div>
  );
}
