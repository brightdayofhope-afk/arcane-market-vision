import { createFileRoute } from "@tanstack/react-router";
import { Badge, PageHeader, Panel, Sparkline } from "@/components/ami/widgets";
import { CalendarClock, TrendingUp, TrendingDown, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/forecast")({
  head: () => ({ meta: [{ title: "Market Forecast · AMI" }] }),
  component: ForecastPage,
});

const events = [
  { title: "Patch 11.1 · Echoes of Aether", date: "in 8 days", impact: "High", tone: "primary" as const, text: "New crafting reagents will spike demand for primal materials." },
  { title: "Mythic+ Season Reset", date: "in 14 days", impact: "Medium", tone: "gold" as const, text: "Gear consumables and enchants typically rise 20–35%." },
  { title: "Anniversary Event", date: "in 21 days", impact: "Low", tone: "success" as const, text: "Cosmetic & pet market activity ramps up." },
];

const forecasts = [
  { item: "Arcane Crystal", dir: "up" as const, delta: "+18%", conf: 82, demand: "Strong", spark: [10,12,14,16,20,22,26,30,32,38,42,48,52,58,64,72] },
  { item: "Dreamleaf", dir: "up" as const, delta: "+12%", conf: 76, demand: "Moderate", spark: [20,22,21,24,26,28,30,32,34,36,38,40,42,44,46,50] },
  { item: "Phaseweaver Mount", dir: "down" as const, delta: "-22%", conf: 64, demand: "Cooling", spark: [80,78,75,72,68,66,62,60,58,54,50,46,42,40,36,32] },
  { item: "Stormscale", dir: "up" as const, delta: "+9%", conf: 71, demand: "Steady", spark: [30,32,31,34,36,35,38,40,42,44,43,46,48,50,52,55] },
];

function ForecastPage() {
  return (
    <div>
      <PageHeader title="Market Forecast" subtitle="Patch-aware predictions for prices, demand and supply." />

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
    </div>
  );
}
