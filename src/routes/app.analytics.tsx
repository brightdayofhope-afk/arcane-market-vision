import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, MultiLineChart, Badge, StatCard, BarRow, DataTable, Sparkline } from "@/components/ami/widgets";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Activity, Coins, Gauge, ShieldAlert, Link2, Layers, Hammer } from "lucide-react";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Item Analytics · AMI" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Item Analytics"
        subtitle="30-day price, volume, volatility and listing intelligence for any tracked item."
      />

      <Panel className="mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search item by name or ID…" className="pl-9 h-10 bg-input/40 border-border" />
          </div>
          <Button variant="outline" className="border-border">
            Lookup by item ID <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </Button>
        </div>
      </Panel>

      <div className="flex items-start gap-4 mb-4">
        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-lg font-bold glow">AC</div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-semibold">Arcane Crystal</h2>
            <Badge tone="gold">Epic</Badge>
            <Badge>Trade Good</Badge>
          </div>
          <p className="text-sm text-muted-foreground">EU · Spineshatter · Horde · used by Enchanting, Alchemy</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard label="Min price" value="118g 22s" icon={Coins} accent="success" />
        <StatCard label="Avg price" value="142g 80s" icon={Activity} />
        <StatCard label="Max price" value="186g 10s" icon={Coins} accent="destructive" />
        <StatCard label="Risk index" value="Low · 0.23" icon={ShieldAlert} accent="success" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard label="Sale volume · 24h" value="1,284" delta="+38% vs 7d" icon={Activity} accent="success" />
        <StatCard label="Active listings" value="186" delta="-12 since last scan" trend="down" icon={Layers} />
        <StatCard label="Volatility · σ" value="0.18" icon={Gauge} accent="gold" />
        <StatCard label="Demand forecast · 7d" value="+24%" icon={Hammer} accent="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <Panel title="Price · 30 days" className="lg:col-span-2">
          <MultiLineChart
            series={[
              { name: "Min", color: "oklch(0.74 0.17 150)", data: Array.from({length:30},(_,i)=>100+Math.sin(i/3)*8+i*1.2) },
              { name: "Avg", color: "oklch(0.78 0.20 295)", data: Array.from({length:30},(_,i)=>120+Math.sin(i/3)*10+i*1.4) },
              { name: "Max", color: "oklch(0.66 0.22 25)", data: Array.from({length:30},(_,i)=>150+Math.cos(i/3)*12+i*1.6) },
            ]}
            height={280}
          />
        </Panel>
        <div className="flex flex-col gap-3">
          <Panel title="Volume trend">
            <div className="text-2xl font-semibold">+38%</div>
            <div className="text-xs text-muted-foreground">vs prior 30 days</div>
            <div className="h-12 mt-3"><Sparkline data={[20,22,28,26,34,32,40,38,46,52,48,58,64,62,72,80]} color="oklch(0.74 0.17 150)" height={48} /></div>
          </Panel>
          <Panel title="Seller pressure">
            <Gauge className="h-4 w-4 text-warning" />
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-success via-warning to-destructive" />
            </div>
            <div className="text-xs text-muted-foreground mt-2">Moderate · 14 active sellers</div>
          </Panel>
          <Panel title="Region snapshot">
            <div className="text-xs grid grid-cols-2 gap-2">
              <div className="glass rounded-lg p-2"><div className="text-muted-foreground">EU</div><div>+6.4%</div></div>
              <div className="glass rounded-lg p-2"><div className="text-muted-foreground">NA</div><div>+2.1%</div></div>
              <div className="glass rounded-lg p-2"><div className="text-muted-foreground">Horde</div><div>+4.8%</div></div>
              <div className="glass rounded-lg p-2"><div className="text-muted-foreground">Alliance</div><div>+3.6%</div></div>
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title="Profession usage" className="lg:col-span-1">
          <div className="space-y-2.5">
            <BarRow label="Enchanting"   value={86} max={100} tone="primary" suffix="%" />
            <BarRow label="Alchemy"      value={62} max={100} tone="gold" suffix="%" />
            <BarRow label="Jewelcrafting" value={34} max={100} tone="primary" suffix="%" />
            <BarRow label="Inscription"  value={18} max={100} tone="primary" suffix="%" />
          </div>
          <div className="rune-divider my-4" />
          <div className="text-xs text-muted-foreground">Reagent for 17 known recipes across 4 professions.</div>
        </Panel>

        <Panel title="Recent listings · Spineshatter" className="lg:col-span-2" action={<Button variant="outline" size="sm" className="border-border h-7 text-xs">Open in addon <Link2 className="ml-1.5 h-3 w-3" /></Button>}>
          <DataTable
            dense
            columns={[
              { key: "seller", label: "Seller" },
              { key: "qty", label: "Qty", align: "right" },
              { key: "unit", label: "Unit", align: "right" },
              { key: "total", label: "Total", align: "right" },
              { key: "age", label: "Age", align: "right" },
              { key: "verdict", label: "AMI" },
            ]}
            rows={[
              { seller: "Grimtotem-H", qty: "12", unit: "118g", total: "1,416g", age: <span className="text-muted-foreground">2m</span>, verdict: <Badge tone="success">Snipe</Badge> },
              { seller: "Shadowfen-H", qty: "8",  unit: "124g", total: "992g",   age: <span className="text-muted-foreground">5m</span>, verdict: <Badge tone="primary">Watch</Badge> },
              { seller: "Ironvale-H",  qty: "20", unit: "139g", total: "2,780g", age: <span className="text-muted-foreground">11m</span>, verdict: <Badge>Fair</Badge> },
              { seller: "Mistwood-A",  qty: "4",  unit: "162g", total: "648g",   age: <span className="text-muted-foreground">19m</span>, verdict: <Badge tone="danger">Skip</Badge> },
              { seller: "Stormwake-H", qty: "10", unit: "121g", total: "1,210g", age: <span className="text-muted-foreground">24m</span>, verdict: <Badge tone="primary">Watch</Badge> },
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}
