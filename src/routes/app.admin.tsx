import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatCard, DataTable, Sparkline } from "@/components/ami/widgets";
import { PlanBadge, DataSourceStatus } from "@/components/ami/access";
import { Activity, AlertTriangle, CheckCircle2, Flag, Users, Cpu, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "System Health · AMI" }] }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div>
      <PageHeader
        title="System Health"
        subtitle="Data import status, source health, Discord delivery, and feature flags."
        actions={<PlanBadge plan="admin" />}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Scans / 24h" value="1,820" delta="+6.8%" icon={Activity} />
        <StatCard label="Avg latency" value="142 ms" delta="−12ms" icon={Cpu} accent="success" />
        <StatCard label="Failed jobs" value="3" delta="2 retried" trend="down" icon={AlertTriangle} accent="destructive" />
        <StatCard label="Active beta users" value="248" delta="+18 this week" icon={Users} accent="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mb-4">
        <Panel title="Data sources">
          <DataSourceStatus
            rows={[
              { name: "Auctionator scrape", kind: "auctionator", status: "live",    hint: "EU-Spineshatter · 38s ago" },
              { name: "TSM dump",            kind: "tsm",         status: "stale",   hint: "Last fetch 14m ago" },
              { name: "Custom AMI Addon",    kind: "addon",       status: "demo",    hint: "Local seed · 8 realms" },
              { name: "Discord webhook",     kind: "discord",     status: "live",    hint: "4 channels healthy" },
              { name: "AMI-Core LLM",        kind: "ami",         status: "live",    hint: "v3 · 320ms p95" },
            ]}
          />
        </Panel>

        <Panel title="Recent failed jobs" className="lg:col-span-2">
          <DataTable
            dense
            columns={[
              { key: "job",    label: "Job" },
              { key: "src",    label: "Source" },
              { key: "err",    label: "Error" },
              { key: "when",   label: "When", align: "right" },
              { key: "status", label: "Status", align: "right" },
            ]}
            rows={[
              { job: "scrape:eu-kazzak",     src: "Auctionator", err: "Rate limit 429",        when: <span className="text-muted-foreground">8m</span>,  status: <Badge tone="warning">Retried</Badge> },
              { job: "publish:#risky-deals", src: "Discord",     err: "Webhook 5xx",           when: <span className="text-muted-foreground">22m</span>, status: <Badge tone="warning">Retried</Badge> },
              { job: "ingest:tsm-dump",      src: "TSM",         err: "Schema drift",          when: <span className="text-muted-foreground">1h</span>,  status: <Badge tone="danger">Manual</Badge> },
              { job: "forecast:patch-11.1",  src: "AMI-Core",    err: "Context window",        when: <span className="text-muted-foreground">3h</span>,  status: <Badge tone="success">Resolved</Badge> },
            ]}
          />
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-3 mb-4">
        <Panel title="Signal delivery · last 24h" action={<RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />}>
          <div className="h-32"><Sparkline data={[20,28,24,38,30,52,46,60,55,68,62,80,72,90,84,96]} color="oklch(0.70 0.18 230)" height={128} /></div>
          <ul className="mt-3 text-xs space-y-1.5">
            <li className="flex justify-between"><span className="text-muted-foreground">#best-deals</span><span className="text-success inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> 1,284 / 0 failed</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">#fast-flips</span><span className="text-success inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> 612 / 0 failed</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">#risky-deals</span><span className="text-warning inline-flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> 92 / 4 failed</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">#market-stats</span><span className="text-success inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> 24 / 0 failed</span></li>
          </ul>
        </Panel>

        <Panel title="Feature flags" action={<Flag className="h-3.5 w-3.5 text-muted-foreground" />}>
          <DataTable
            dense
            columns={[
              { key: "flag", label: "Flag" },
              { key: "audience", label: "Audience" },
              { key: "rollout", label: "Rollout", align: "right" },
              { key: "state", label: "State", align: "right" },
            ]}
            rows={[
              { flag: "forecast.patch_aware_v2",   audience: "Founders",      rollout: "100%", state: <Badge tone="success">On</Badge> },
              { flag: "ami.saved_summaries",       audience: "Founders",      rollout: "100%", state: <Badge tone="success">On</Badge> },
              { flag: "signals.crossrealm_arb",    audience: "Premium",       rollout: "10%",  state: <Badge tone="warning">Canary</Badge> },
              { flag: "discord.profession_routing",audience: "Beta",          rollout: "0%",   state: <Badge tone="default">Planned</Badge> },
              { flag: "export.csv",                audience: "Founders",      rollout: "100%", state: <Badge tone="success">On</Badge> },
              { flag: "alerts.custom_thresholds",  audience: "Premium",       rollout: "0%",   state: <Badge tone="default">Planned</Badge> },
            ]}
          />
        </Panel>
      </div>

      <Panel title="User plans · snapshot">
        <DataTable
          dense
          columns={[
            { key: "plan",   label: "Plan" },
            { key: "active", label: "Active", align: "right" },
            { key: "trend",  label: "30d trend" },
            { key: "share",  label: "Share", align: "right" },
          ]}
          rows={[
            { plan: <PlanBadge plan="guest" />,   active: "1,420", trend: <div className="w-32 h-5"><Sparkline data={[100,110,120,128,140,156,170,180,200,220,260,300,340,380]} color="oklch(0.78 0.20 295)" height={20} /></div>, share: "78%" },
            { plan: <PlanBadge plan="beta" />,    active: "248",   trend: <div className="w-32 h-5"><Sparkline data={[40,42,46,52,56,62,68,74,82,90,100,118,140,160]} color="oklch(0.78 0.20 295)" height={20} /></div>, share: "14%" },
            { plan: <PlanBadge plan="founder" />, active: "112",   trend: <div className="w-32 h-5"><Sparkline data={[10,14,18,22,28,32,40,46,54,62,72,82,92,104]} color="oklch(0.83 0.13 85)" height={20} /></div>, share: "6%" },
            { plan: <PlanBadge plan="premium" />, active: "—",     trend: <span className="text-muted-foreground text-xs">planned</span>, share: "0%" },
            { plan: <PlanBadge plan="admin" />,   active: "4",     trend: <span className="text-muted-foreground text-xs">internal</span>, share: "—" },
          ]}
        />
      </Panel>
    </div>
  );
}