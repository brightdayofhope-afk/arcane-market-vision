import { createFileRoute } from "@tanstack/react-router";
import { Badge, PageHeader, Panel, Sparkline, StatusPill } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Filter, Coins, Zap, ShieldAlert, Star, TrendingUp, TrendingDown } from "lucide-react";

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

const signals = Array.from({ length: 9 }).map((_, i) => ({
  item: ["Arcane Crystal","Dreamleaf","Stormscale","Titanic Sigil","Frozen Orb","Soul Dust","Mageweave","Khorium Ore","Primal Mana"][i],
  realm: ["Spineshatter","Kazzak","Ravencrest","Sylvanas","Draenor","Tarren Mill"][i % 6],
  faction: i % 2 ? "Horde" : "Alliance",
  region: "EU",
  margin: `+${(8 + i * 3).toFixed(1)}%`,
  confidence: 60 + i * 4,
  buy: `${120 + i * 18}g`,
  sell: `${160 + i * 22}g`,
  spark: [10,14,18,16,22,28,26,32,30,38,42,40,48,52,50,58],
}));

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

      <Panel className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t, i) => (
            <button key={t.key} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${i===0?"bg-primary/20 text-primary glow-border":"glass text-muted-foreground hover:text-foreground"}`}>
              <t.icon className="h-3.5 w-3.5" />{t.label}
            </button>
          ))}
        </div>
        <div className="rune-divider my-3" />
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[
            "Profession: All",
            "Category: Reagents",
            "Margin ≥ 15%",
            "Risk ≤ Medium",
            "Confidence ≥ 60%",
            "Window: 1h",
          ].map((p) => (
            <span key={p} className="glass px-2.5 py-1 rounded-md text-muted-foreground">{p}</span>
            ))}
        </div>
      </Panel>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {signals.map((s) => (
          <Panel key={s.item + s.realm} className="!p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-xs font-bold">{s.item.slice(0,2).toUpperCase()}</div>
              <div className="flex-1">
                <div className="font-medium">{s.item}</div>
                <div className="text-xs text-muted-foreground">{s.region} · {s.realm} · {s.faction}</div>
              </div>
              <Badge tone="success">{s.margin}</Badge>
            </div>
            <div className="h-16 mt-3"><Sparkline data={s.spark} color="oklch(0.78 0.20 295)" height={64} /></div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <Stat label="Buy" value={s.buy} />
              <Stat label="Sell" value={s.sell} />
              <Stat label="Confidence" value={`${s.confidence}%`} accent />
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" className="flex-1">Snipe</Button>
              <Button size="sm" variant="outline" className="border-border">Watch</Button>
            </div>
          </Panel>
        ))}
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
