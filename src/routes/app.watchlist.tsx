import { createFileRoute } from "@tanstack/react-router";
import { Badge, DataTable, PageHeader, Panel, Sparkline } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Plus, Star, Trash2 } from "lucide-react";

export const Route = createFileRoute("/app/watchlist")({
  head: () => ({ meta: [{ title: "Watchlist · AMI" }] }),
  component: WatchlistPage,
});

const watch = [
  { item: "Arcane Crystal", realm: "Spineshatter", faction: "Horde", price: "128g 45s", target: "100g", change: "+8.24%", up: true,  conf: 82, spark: [10,12,14,16,20,22,26,30,32,38,42,48,52,58,64,72] },
  { item: "Black Lotus",    realm: "Kazzak",       faction: "Horde", price: "1,420g",   target: "1,200g", change: "+12.4%", up: true, conf: 76, spark: [40,42,46,50,55,60,66,70,74,80,84,88,90,94,98,102] },
  { item: "Runecloth",      realm: "Spineshatter", faction: "Horde", price: "12g 75s",  target: "15g",    change: "-3.1%",  up: false, conf: 71, spark: [60,58,56,54,52,50,48,46,44,42,40,38,36,34,32,30] },
  { item: "Thorium Bar",    realm: "Ravencrest",   faction: "Alliance", price: "38g 21s", target: "30g", change: "+4.32%", up: true, conf: 68, spark: [20,22,24,23,26,28,30,32,34,33,36,38,40,42,44,46] },
  { item: "Large Brilliant Shard", realm: "Spineshatter", faction: "Horde", price: "92g 17s", target: "80g", change: "+3.89%", up: true, conf: 64, spark: [30,32,34,36,38,40,42,44,42,46,48,50,52,54,56,58] },
  { item: "Dreamleaf",      realm: "Sylvanas",     faction: "Horde", price: "175g 32s", target: "150g", change: "-1.2%", up: false, conf: 58, spark: [50,52,50,48,46,48,46,44,42,40,42,40,38,36,38,36] },
];

function WatchlistPage() {
  return (
    <div>
      <PageHeader
        title="Watchlist"
        subtitle="Items pinned for live monitoring across your realms."
        actions={
          <div className="flex gap-2">
            <div className="relative">
              <Input placeholder="Add item by name or ID…" className="bg-input/40 border-border h-10 w-64" />
            </div>
            <Button><Plus className="h-4 w-4 mr-1.5" /> Add</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <Panel className="!p-4"><div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Items watched</div><div className="text-2xl font-semibold mt-1">{watch.length}</div></Panel>
        <Panel className="!p-4"><div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Above target</div><div className="text-2xl font-semibold text-success mt-1">4</div></Panel>
        <Panel className="!p-4"><div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Below target</div><div className="text-2xl font-semibold text-destructive mt-1">2</div></Panel>
        <Panel className="!p-4"><div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Alerts · 24h</div><div className="text-2xl font-semibold text-gold mt-1">23</div></Panel>
      </div>

      <Panel title="Pinned items" action={<span className="text-xs text-muted-foreground">Sort: <span className="text-foreground">Change ↓</span></span>}>
        <DataTable
          columns={[
            { key: "fav", label: "" },
            { key: "item", label: "Item" },
            { key: "loc", label: "Realm · Faction" },
            { key: "price", label: "Price", align: "right" },
            { key: "target", label: "Target", align: "right" },
            { key: "change", label: "Δ 24h", align: "right" },
            { key: "trend", label: "Trend" },
            { key: "conf", label: "Conf.", align: "right" },
            { key: "actions", label: "", align: "right" },
          ]}
          rows={watch.map((w) => ({
            fav: <Star className="h-3.5 w-3.5 text-gold" />,
            item: <div className="font-medium text-foreground">{w.item}</div>,
            loc: <span className="text-muted-foreground">EU · {w.realm} · {w.faction}</span>,
            price: <span className="font-medium">{w.price}</span>,
            target: <span className="text-muted-foreground">{w.target}</span>,
            change: <span className={w.up ? "text-success" : "text-destructive"}>{w.change}</span>,
            trend: <div className="w-24 h-7"><Sparkline data={w.spark} color={w.up ? "oklch(0.74 0.17 150)" : "oklch(0.66 0.22 25)"} height={28} /></div>,
            conf: <Badge tone={w.conf > 75 ? "success" : w.conf > 65 ? "primary" : "default"}>{w.conf}%</Badge>,
            actions: (
              <div className="inline-flex gap-1">
                <button className="h-7 w-7 grid place-items-center rounded-md glass hover:text-primary"><Bell className="h-3.5 w-3.5" /></button>
                <button className="h-7 w-7 grid place-items-center rounded-md glass hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            ),
          }))}
        />
      </Panel>
    </div>
  );
}