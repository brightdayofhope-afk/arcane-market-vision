import { createFileRoute } from "@tanstack/react-router";
import { Badge, MultiLineChart, PageHeader, Panel } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export const Route = createFileRoute("/app/compare")({
  head: () => ({ meta: [{ title: "Compare Items · AMI" }] }),
  component: ComparePage,
});

const items = [
  { name: "Arcane Crystal", code: "ARC", color: "oklch(0.78 0.20 295)", min: "118g", avg: "142g", max: "186g", vol: "+38%", risk: "Low",  margin: "+18%", conf: 82, demand: "Strong",  data: Array.from({length:30},(_,i)=>100+Math.sin(i/3)*8+i*1.2) },
  { name: "Black Lotus",    code: "BLO", color: "oklch(0.83 0.13 85)",  min: "980g", avg: "1,260g", max: "1,640g", vol: "+62%", risk: "High", margin: "+24%", conf: 71, demand: "Spiking", data: Array.from({length:30},(_,i)=>900+Math.sin(i/4)*120+i*16) },
  { name: "Thorium Bar",    code: "THB", color: "oklch(0.70 0.18 230)", min: "26g",  avg: "34g",  max: "44g",  vol: "+12%", risk: "Low",  margin: "+9%",  conf: 68, demand: "Steady",  data: Array.from({length:30},(_,i)=>22+Math.cos(i/3)*4+i*0.6) },
];

function Cell({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return <td className={"px-3 py-2.5 text-sm border-t border-border/40 " + (accent ? "text-primary font-medium" : "")}>{children}</td>;
}

function ComparePage() {
  return (
    <div>
      <PageHeader
        title="Compare Items"
        subtitle="Side-by-side price, risk, demand and forecast across tracked auctions."
        actions={<Button variant="outline" className="border-border"><Plus className="h-4 w-4 mr-1.5" /> Add item</Button>}
      />

      <Panel title="Price · 30 days" className="mb-3">
        <MultiLineChart series={items.map((i) => ({ name: i.name, color: i.color, data: i.data }))} height={260} />
        <div className="flex flex-wrap gap-4 mt-3 text-xs">
          {items.map((i) => (
            <span key={i.code} className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: i.color, boxShadow: `0 0 6px ${i.color}` }} />
              <span className="text-muted-foreground">{i.name}</span>
            </span>
          ))}
        </div>
      </Panel>

      <Panel title="Metric comparison">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-xs min-w-[640px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <th className="px-3 py-2 text-left font-normal">Metric</th>
                {items.map((i) => (
                  <th key={i.code} className="px-3 py-2 text-left font-normal">
                    <div className="flex items-center gap-2">
                      <span className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center text-[10px] font-bold">{i.code}</span>
                      <span className="text-foreground font-medium">{i.name}</span>
                      <button className="ml-1 text-muted-foreground hover:text-destructive"><X className="h-3 w-3" /></button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                ["Min · 30d", "min"], ["Avg · 30d", "avg"], ["Max · 30d", "max"],
                ["Volume Δ", "vol"], ["Risk", "risk"], ["Margin", "margin"],
                ["Confidence", "conf"], ["Demand forecast", "demand"],
              ] as const).map(([label, key]) => (
                <tr key={label}>
                  <td className="px-3 py-2.5 text-[11px] uppercase tracking-wider text-muted-foreground border-t border-border/40">{label}</td>
                  {items.map((i) => (
                    <Cell key={i.code} accent={key === "margin" || key === "conf"}>
                      {key === "risk" ? <Badge tone={i.risk === "Low" ? "success" : i.risk === "High" ? "danger" : "warning"}>{i.risk}</Badge>
                        : key === "conf" ? `${i.conf}%`
                        : (i as any)[key]}
                    </Cell>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}