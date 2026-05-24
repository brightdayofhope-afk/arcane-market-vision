import { createFileRoute } from "@tanstack/react-router";
import { BarRow, DataTable, PageHeader, Panel, Sparkline, StatCard, Badge } from "@/components/ami/widgets";
import { Globe2, Users, Activity, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/realms")({
  head: () => ({ meta: [{ title: "Realm & Faction · AMI" }] }),
  component: RealmsPage,
});

const realms = [
  { realm: "Spineshatter", region: "EU", faction: "Horde",    pop: "High",   active: 12480, liquidity: 92, vol: "+18.4%", up: true,  spark: [10,14,18,22,28,30,34,38,42,46,50,54,58,62,68,72] },
  { realm: "Kazzak",       region: "EU", faction: "Horde",    pop: "High",   active: 11240, liquidity: 88, vol: "+12.1%", up: true,  spark: [20,22,25,28,30,32,34,36,40,42,45,48,52,55,58,62] },
  { realm: "Ravencrest",   region: "EU", faction: "Alliance", pop: "Medium", active:  7840, liquidity: 71, vol: "+4.2%",  up: true,  spark: [30,32,30,34,33,36,38,40,42,40,44,46,48,50,52,54] },
  { realm: "Sylvanas",     region: "EU", faction: "Horde",    pop: "Medium", active:  6210, liquidity: 65, vol: "-2.8%",  up: false, spark: [50,48,46,44,42,40,42,40,38,36,34,32,30,32,30,28] },
  { realm: "Tarren Mill",  region: "EU", faction: "Horde",    pop: "Low",    active:  3120, liquidity: 42, vol: "-5.6%",  up: false, spark: [60,58,55,52,50,48,46,44,42,40,38,36,34,32,30,28] },
  { realm: "Draenor",      region: "EU", faction: "Alliance", pop: "High",   active: 10120, liquidity: 84, vol: "+7.9%",  up: true,  spark: [25,28,30,32,34,38,40,42,44,46,48,50,52,54,56,58] },
];

function RealmsPage() {
  return (
    <div>
      <PageHeader amiIntent="explain_page" title="Realm & Faction Analytics" subtitle="Liquidity, activity and volatility across tracked realms." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard label="Realms tracked" value="14" icon={Globe2} />
        <StatCard label="Active sellers · 24h" value="51,012" delta="+8.4%" icon={Users} accent="success" />
        <StatCard label="Auction events · 1h" value="184,290" delta="+2.1%" icon={Activity} />
        <StatCard label="Volatility index" value="0.34" delta="Stable" trend="flat" icon={ShieldAlert} accent="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mb-3">
        <Panel title="Faction split · 24h volume" className="lg:col-span-1">
          <div className="space-y-3 mt-1">
            <BarRow label="Horde · EU"     value={62} max={100} tone="danger"  suffix="%" />
            <BarRow label="Alliance · EU"  value={38} max={100} tone="primary" suffix="%" />
            <BarRow label="Horde · NA"     value={54} max={100} tone="danger"  suffix="%" />
            <BarRow label="Alliance · NA"  value={46} max={100} tone="primary" suffix="%" />
          </div>
          <div className="rune-divider my-4" />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="glass rounded-lg p-2"><div className="text-muted-foreground">Horde median margin</div><div className="text-success font-medium mt-0.5">+12.4%</div></div>
            <div className="glass rounded-lg p-2"><div className="text-muted-foreground">Alliance median margin</div><div className="text-success font-medium mt-0.5">+9.1%</div></div>
          </div>
        </Panel>

        <Panel title="Profession demand · 7d" className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            <BarRow label="Alchemy"      value={94} max={100} tone="gold" />
            <BarRow label="Herbalism"    value={88} max={100} tone="success" />
            <BarRow label="Enchanting"   value={76} max={100} tone="primary" />
            <BarRow label="Tailoring"    value={64} max={100} tone="primary" />
            <BarRow label="Inscription"  value={58} max={100} tone="primary" />
            <BarRow label="Jewelcrafting" value={52} max={100} tone="primary" />
            <BarRow label="Engineering"  value={38} max={100} tone="danger" />
            <BarRow label="Leatherworking" value={32} max={100} tone="danger" />
          </div>
        </Panel>
      </div>

      <Panel title="Realm leaderboard" action={<Badge tone="primary">Live</Badge>}>
        <DataTable
          columns={[
            { key: "realm", label: "Realm" },
            { key: "region", label: "Region" },
            { key: "faction", label: "Faction" },
            { key: "pop", label: "Pop." },
            { key: "active", label: "Active sellers", align: "right" },
            { key: "liq", label: "Liquidity", align: "right" },
            { key: "vol", label: "Δ 24h vol.", align: "right" },
            { key: "spark", label: "Trend" },
          ]}
          rows={realms.map((r) => ({
            realm: <span className="font-medium">{r.realm}</span>,
            region: r.region,
            faction: <Badge tone={r.faction === "Horde" ? "danger" : "primary"}>{r.faction}</Badge>,
            pop: <span className="text-muted-foreground">{r.pop}</span>,
            active: r.active.toLocaleString(),
            liq: (
              <div className="inline-flex items-center gap-2 justify-end">
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${r.liquidity}%` }} />
                </div>
                <span className="text-muted-foreground">{r.liquidity}</span>
              </div>
            ),
            vol: <span className={r.up ? "text-success" : "text-destructive"}>{r.vol}</span>,
            spark: <div className="w-28 h-7"><Sparkline data={r.spark} color={r.up ? "oklch(0.74 0.17 150)" : "oklch(0.66 0.22 25)"} height={28} /></div>,
          }))}
        />
      </Panel>
    </div>
  );
}