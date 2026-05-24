import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hash, RefreshCcw } from "lucide-react";

export const Route = createFileRoute("/app/discord")({
  head: () => ({ meta: [{ title: "Discord Integration · AMI" }] }),
  component: DiscordPage,
});

const channels = [
  { key: "best-deals", desc: "Underpriced items, high confidence", count: 1284, status: "Healthy", tone: "success" as const },
  { key: "fast-flips", desc: "Sub-hour resale opportunities", count: 612, status: "Healthy", tone: "success" as const },
  { key: "risky-deals", desc: "High-margin volatile listings", count: 92, status: "Rate-limit warn", tone: "warning" as const },
  { key: "market-stats", desc: "Hourly market summary digests", count: 24, status: "Healthy", tone: "success" as const },
  { key: "prof-herbalism", desc: "Herbs & alchemy reagents", count: 144, status: "Healthy", tone: "success" as const },
  { key: "prof-tailoring", desc: "Cloth & gear opportunities", count: 88, status: "Paused", tone: "default" as const },
];

const logs = [
  { at: "12:42:01", c: "#best-deals", msg: "Arcane Crystal · 118g (Spineshatter)", ok: true },
  { at: "12:41:55", c: "#fast-flips", msg: "Dreamleaf · 8m window", ok: true },
  { at: "12:41:12", c: "#risky-deals", msg: "Phaseweaver mount listing", ok: false },
  { at: "12:40:38", c: "#market-stats", msg: "Hourly digest delivered", ok: true },
];

function DiscordPage() {
  return (
    <div>
      <PageHeader
        title="Discord Integration"
        subtitle="Route signals into the channels your guild already lives in."
        actions={<Button variant="outline" className="border-border"><RefreshCcw className="h-4 w-4 mr-2" /> Test webhooks</Button>}
      />

      <Panel className="mb-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-3 items-center">
          <div>
            <div className="text-sm font-medium">Server webhook</div>
            <div className="text-xs text-muted-foreground">Paste your Discord webhook to enable routing.</div>
          </div>
          <div className="flex gap-2">
            <Input placeholder="https://discord.com/api/webhooks/…" className="bg-input/40 border-border h-10 min-w-[280px]" />
            <Button>Connect</Button>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-3">
        <Panel title="Channel mapping">
          <ul className="space-y-2">
            {channels.map((c) => (
              <li key={c.key} className="glass rounded-xl p-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/15 grid place-items-center"><Hash className="h-4 w-4 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">#{c.key}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.desc}</div>
                </div>
                <div className="text-right">
                  <Badge tone={c.tone}>{c.status}</Badge>
                  <div className="text-[10px] text-muted-foreground mt-1">{c.count} / 24h</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Delivery logs">
          <ul className="font-mono text-xs space-y-1.5">
            {logs.map((l, i) => (
              <li key={i} className="flex items-center gap-3 glass rounded-lg px-3 py-2">
                <span className="text-muted-foreground">{l.at}</span>
                <span className="text-primary">{l.c}</span>
                <span className="flex-1 truncate">{l.msg}</span>
                <Badge tone={l.ok ? "success" : "danger"}>{l.ok ? "OK" : "FAIL"}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
