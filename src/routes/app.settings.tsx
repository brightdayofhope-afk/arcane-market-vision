import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge } from "@/components/ami/widgets";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plug, Database, Bot } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings · AMI" }] }),
  component: SettingsPage,
});

const sel = "w-full h-10 px-3 rounded-lg bg-input/40 border border-border text-sm";

function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Personalize AMI for your realm and play style." />

      <div className="grid lg:grid-cols-2 gap-3">
        <Panel title="Profile">
          <div className="grid gap-3">
            <Field label="Display name"><Input defaultValue="Alex Morgan" className="bg-input/40 border-border h-10" /></Field>
            <Field label="Email"><Input defaultValue="alex@ami.gg" className="bg-input/40 border-border h-10" /></Field>
            <Field label="Language">
              <select className={sel} defaultValue="en">
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </Field>
          </div>
        </Panel>

        <Panel title="Realm & faction">
          <div className="grid gap-3">
            <Field label="Region">
              <select className={sel} defaultValue="EU"><option>EU</option><option>NA</option><option>KR</option><option>TW</option></select>
            </Field>
            <Field label="Realm">
              <select className={sel} defaultValue="Spineshatter"><option>Spineshatter</option><option>Kazzak</option><option>Ravencrest</option><option>Sylvanas</option></select>
            </Field>
            <Field label="Faction">
              <select className={sel} defaultValue="Horde"><option>Auto</option><option>Horde</option><option>Alliance</option></select>
            </Field>
          </div>
        </Panel>

        <Panel title="Notifications">
          <ul className="space-y-3 text-sm">
            {([
              ["Best Deals", true],
              ["Fast Flips", true],
              ["Risky Deals", false],
              ["Watchlist alerts", true],
              ["Market summaries", false],
            ] as const).map(([k, v]) => (
              <li key={k} className="flex items-center justify-between glass rounded-lg px-3 py-2.5">
                <span>{k}</span>
                <Toggle on={v} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Webhook status">
          <ul className="space-y-2 text-sm">
            {([
              ["#best-deals", "Healthy", "success"],
              ["#fast-flips", "Healthy", "success"],
              ["#risky-deals", "Warning", "warning"],
              ["#market-stats", "Healthy", "success"],
            ] as const).map(([c,s,t]) => (
              <li key={c} className="flex items-center gap-3 glass rounded-lg px-3 py-2.5">
                <span className="font-mono">{c}</span>
                <span className="ml-auto"><Badge tone={t as any}>{s}</Badge></span>
              </li>
            ))}
          </ul>
          <div className="rune-divider my-4" />
          <Button variant="outline" className="border-border">Re-run webhook test</Button>
        </Panel>

        <Panel title="Discord connection">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg grid place-items-center glass glow-border"><Plug className="h-4 w-4 text-primary" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">AMI Bot · Spineshatter Traders</div>
              <div className="text-xs text-muted-foreground">Connected · 6 channels mapped · last publish 38s ago</div>
            </div>
            <Badge tone="success">Live</Badge>
          </div>
          <div className="rune-divider my-4" />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="border-border">Reconnect</Button>
            <Button variant="outline" size="sm" className="border-border">Disconnect</Button>
          </div>
        </Panel>

        <Panel title="Data sources">
          <ul className="space-y-2 text-sm">
            {([
              ["Auctionator", "Healthy · last sync 38s ago", "success", Database],
              ["TradeSkillMaster (TSM)", "Healthy · last sync 1m ago", "success", Database],
              ["AMI Custom Addon", "Beta · 4 realms covered", "warning", Bot],
            ] as const).map(([n, s, t, Icon]) => (
              <li key={n} className="flex items-center gap-3 glass rounded-lg px-3 py-2.5">
                <Icon className="h-4 w-4 text-primary" />
                <div className="min-w-0">
                  <div className="font-medium truncate">{n}</div>
                  <div className="text-xs text-muted-foreground truncate">{s}</div>
                </div>
                <span className="ml-auto"><Badge tone={t as any}>{t === "warning" ? "Beta" : "OK"}</Badge></span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={`relative inline-flex h-5 w-9 rounded-full ${on ? "bg-primary/70" : "bg-muted"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground ${on ? "left-4" : "left-0.5"}`} />
    </span>
  );
}
