import { createFileRoute } from "@tanstack/react-router";
import { Badge, BarRow, PageHeader, Panel, Sparkline, StatusPill } from "@/components/ami/widgets";
import { CalendarClock, TrendingUp, TrendingDown, Sparkles, Hammer, Layers } from "lucide-react";

export const Route = createFileRoute("/app/forecast")({
  head: () => ({ meta: [{ title: "Market Forecast · AMI" }] }),
  component: ForecastPage,
});

const events = [
  { title: "Patch 11.1 · Echoes of Aether", date: "in 8 days", impact: "High", tone: "primary" as const, text: "New crafting recipes touch Arcane Crystal, Large Brilliant Shard and Black Lotus." },
  { title: "Mythic+ Season Reset", date: "in 14 days", impact: "Medium", tone: "gold" as const, text: "Raid consumables and enchants typically rise 20–35% in the first week." },
  { title: "Darkmoon Faire", date: "in 21 days", impact: "Low", tone: "success" as const, text: "Inscription cards and reagent demand bump for ~5 days." },
];

const forecasts = [
  { item: "Arcane Crystal", dir: "up" as const, delta: "+18%", conf: 82, demand: "Strong", spark: [10,12,14,16,20,22,26,30,32,38,42,48,52,58,64,72] },
  { item: "Black Lotus",    dir: "up" as const, delta: "+24%", conf: 78, demand: "Heavy",  spark: [20,22,21,24,26,28,30,34,38,42,46,52,58,62,68,74] },
  { item: "Phaseweaver Mount", dir: "down" as const, delta: "-22%", conf: 64, demand: "Cooling", spark: [80,78,75,72,68,66,62,60,58,54,50,46,42,40,36,32] },
  { item: "Runecloth",      dir: "down" as const, delta: "-9%",  conf: 68, demand: "Oversupply", spark: [60,58,56,55,52,50,48,46,45,42,40,38,36,34,32,30] },
  { item: "Thorium Bar",    dir: "up" as const, delta: "+11%", conf: 73, demand: "Steady", spark: [30,32,31,34,36,35,38,40,42,44,43,46,48,50,52,55] },
  { item: "Large Brilliant Shard", dir: "up" as const, delta: "+14%", conf: 70, demand: "Strong", spark: [20,22,26,28,30,34,36,40,44,46,50,54,58,62,66,72] },
];

function ForecastPage() {
  return (
    <div>
      <PageHeader
        title="Market Forecast"
        subtitle="Patch-aware predictions for prices, demand and supply across professions."
        actions={<StatusPill status="planned" hint="Forecast engine in design" />}
      />

      <div className="grid md:grid-cols-3 gap-3 mb-3">
        {events.map((e) => (
          <Panel key={e.title}>
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <Badge tone={e.tone}>{e.impact} impact</Badge>
              <span className="ml-auto text-xs text-muted-foreground">{e.date}</span>
            </div>
            <div className="mt-3 font-medium">{e.title}</div>
            <p className="text-sm text-muted-foreground mt-1">{e.text}</p>
          </Panel>
        ))}
      </div>

      <Panel title="Predicted price movements" action={<Sparkles className="h-4 w-4 text-primary" />}>
        <div className="grid lg:grid-cols-2 gap-3">
          {forecasts.map((f) => (
            <div key={f.item} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-xs font-bold">{f.item.slice(0,2).toUpperCase()}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{f.item}</div>
                <div className="text-xs text-muted-foreground">Demand: {f.demand} · Confidence {f.conf}%</div>
                <div className="h-2 rounded-full bg-muted mt-2 overflow-hidden">
                  <div className="h-full" style={{ width: `${f.conf}%`, background: "var(--gradient-arcane)" }} />
                </div>
              </div>
              <div className="w-24 h-12"><Sparkline data={f.spark} color={f.dir === "up" ? "oklch(0.74 0.17 150)" : "oklch(0.66 0.22 25)"} height={48} /></div>
              <div className={`text-right ${f.dir === "up" ? "text-success" : "text-destructive"}`}>
                <div className="flex items-center gap-1 justify-end text-sm font-medium">
                  {f.dir === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />} {f.delta}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">7d forecast</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title="Demand forecast · 7d" action={<Hammer className="h-4 w-4 text-primary" />}>
          <div className="space-y-2.5">
            <BarRow label="Raid consumables" value={92} max={100} tone="success" suffix="%" />
            <BarRow label="Enchant mats"     value={84} max={100} tone="primary" suffix="%" />
            <BarRow label="Reagents"         value={71} max={100} tone="gold" suffix="%" />
            <BarRow label="Crafted gear"     value={42} max={100} tone="primary" suffix="%" />
            <BarRow label="Mounts & pets"    value={18} max={100} tone="danger" suffix="%" />
          </div>
        </Panel>
        <Panel title="Supply forecast · 7d" action={<Layers className="h-4 w-4 text-primary" />}>
          <div className="space-y-2.5">
            <BarRow label="Runecloth"        value={94} max={100} tone="danger" suffix="%" />
            <BarRow label="Thorium Bar"      value={62} max={100} tone="primary" suffix="%" />
            <BarRow label="Arcane Crystal"   value={38} max={100} tone="success" suffix="%" />
            <BarRow label="Black Lotus"      value={22} max={100} tone="success" suffix="%" />
            <BarRow label="Large Brilliant Shard" value={48} max={100} tone="gold" suffix="%" />
          </div>
        </Panel>
        <Panel title="Affected professions">
          <div className="flex flex-wrap gap-1.5">
            {["Alchemy","Enchanting","Tailoring","Inscription","Jewelcrafting","Blacksmithing","Engineering","Leatherworking"].map((p,i) => (
              <Badge key={p} tone={i<3?"primary": i<5?"gold":"default"}>{p}</Badge>
            ))}
          </div>
          <div className="rune-divider my-4" />
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Categories impacted</div>
          <div className="flex flex-wrap gap-1.5">
            {["Reagents","Raid consumables","Crafted gear","Enchant mats","Gems","Glyphs"].map((c) => (
              <Badge key={c}>{c}</Badge>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
