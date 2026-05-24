import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatCard, DataTable, Sparkline } from "@/components/ami/widgets";
import { PlanBadge, DataSourceStatus } from "@/components/ami/access";
import { Activity, AlertTriangle, CheckCircle2, Flag, Users, Cpu, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "System Health · AMI" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader amiIntent="explain_page"
        title={t("admin.title")}
        subtitle={t("admin.subtitle")}
        actions={<PlanBadge plan="admin" />}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label={t("admin.scans")} value="1,820" delta="+6.8%" icon={Activity} />
        <StatCard label={t("admin.avgLatency")} value="142 ms" delta="−12ms" icon={Cpu} accent="success" />
        <StatCard label={t("admin.failedJobs")} value="3" delta={t("admin.retried2")} trend="down" icon={AlertTriangle} accent="destructive" />
        <StatCard label={t("admin.betaUsers")} value="248" delta={t("admin.betaDelta")} icon={Users} accent="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mb-4">
        <Panel title={t("admin.dataSources")}>
          <DataSourceStatus
            rows={[
              { name: t("source.auctionator"), kind: "auctionator", status: "live",    hint: `EU-Spineshatter · ${t("overview.ago", { age: "38s" })}` },
              { name: t("source.tsm"),          kind: "tsm",         status: "stale",   hint: t("overview.ago", { age: "14m" }) },
              { name: t("source.addon"),        kind: "addon",       status: "demo",    hint: t("source.addonHint") },
              { name: t("source.discord"),      kind: "discord",     status: "live",    hint: t("source.discordChannels", { n: 4 }) },
              { name: t("source.ami"),          kind: "ami",         status: "live",    hint: "v3 · 320ms p95" },
            ]}
          />
        </Panel>

        <Panel title={t("admin.recentFailed")} className="lg:col-span-2">
          <DataTable
            dense
            columns={[
              { key: "job",    label: t("tableCol.job") },
              { key: "src",    label: t("tableCol.source") },
              { key: "err",    label: t("tableCol.error") },
              { key: "when",   label: t("tableCol.when"), align: "right" },
              { key: "status", label: t("tableCol.status"), align: "right" },
            ]}
            rows={[
              { job: "scrape:eu-kazzak",     src: "Auctionator", err: "Rate limit 429",        when: <span className="text-muted-foreground">8m</span>,  status: <Badge tone="warning">{t("common.retried")}</Badge> },
              { job: "publish:#risky-deals", src: "Discord",     err: "Webhook 5xx",           when: <span className="text-muted-foreground">22m</span>, status: <Badge tone="warning">{t("common.retried")}</Badge> },
              { job: "ingest:tsm-dump",      src: "TSM",         err: "Schema drift",          when: <span className="text-muted-foreground">1h</span>,  status: <Badge tone="danger">{t("common.manual")}</Badge> },
              { job: "forecast:patch-11.1",  src: "AMI-Core",    err: "Context window",        when: <span className="text-muted-foreground">3h</span>,  status: <Badge tone="success">{t("common.resolved")}</Badge> },
            ]}
          />
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-3 mb-4">
        <Panel title={t("admin.delivery24h")} action={<RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />}>
          <div className="h-32"><Sparkline data={[20,28,24,38,30,52,46,60,55,68,62,80,72,90,84,96]} color="oklch(0.70 0.18 230)" height={128} /></div>
          <ul className="mt-3 text-xs space-y-1.5">
            <li className="flex justify-between"><span className="text-muted-foreground">#best-deals</span><span className="text-success inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {t("admin.failedRow", { ok: "1,284", fail: 0 })}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">#fast-flips</span><span className="text-success inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {t("admin.failedRow", { ok: "612", fail: 0 })}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">#risky-deals</span><span className="text-warning inline-flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {t("admin.failedRow", { ok: "92", fail: 4 })}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">#market-stats</span><span className="text-success inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {t("admin.failedRow", { ok: "24", fail: 0 })}</span></li>
          </ul>
        </Panel>

        <Panel title={t("admin.featureFlags")} action={<Flag className="h-3.5 w-3.5 text-muted-foreground" />}>
          <DataTable
            dense
            columns={[
              { key: "flag", label: t("tableCol.flag") },
              { key: "audience", label: t("tableCol.audience") },
              { key: "rollout", label: t("tableCol.rollout"), align: "right" },
              { key: "state", label: t("tableCol.state"), align: "right" },
            ]}
            rows={[
              { flag: "forecast.patch_aware_v2",   audience: t("plan.founder"), rollout: "100%", state: <Badge tone="success">{t("common.on")}</Badge> },
              { flag: "ami.saved_summaries",       audience: t("plan.founder"), rollout: "100%", state: <Badge tone="success">{t("common.on")}</Badge> },
              { flag: "signals.crossrealm_arb",    audience: t("plan.premium"), rollout: "10%",  state: <Badge tone="warning">{t("common.canary")}</Badge> },
              { flag: "discord.profession_routing",audience: t("plan.beta"),    rollout: "0%",   state: <Badge tone="default">{t("common.planned")}</Badge> },
              { flag: "export.csv",                audience: t("plan.founder"), rollout: "100%", state: <Badge tone="success">{t("common.on")}</Badge> },
              { flag: "alerts.custom_thresholds",  audience: t("plan.premium"), rollout: "0%",   state: <Badge tone="default">{t("common.planned")}</Badge> },
            ]}
          />
        </Panel>
      </div>

      <Panel title={t("admin.userPlans")}>
        <DataTable
          dense
          columns={[
            { key: "plan",   label: t("tableCol.plan") },
            { key: "active", label: t("tableCol.active"), align: "right" },
            { key: "trend",  label: t("tableCol.trend30") },
            { key: "share",  label: t("tableCol.share"), align: "right" },
          ]}
          rows={[
            { plan: <PlanBadge plan="guest" />,   active: "1,420", trend: <div className="w-32 h-5"><Sparkline data={[100,110,120,128,140,156,170,180,200,220,260,300,340,380]} color="oklch(0.78 0.20 295)" height={20} /></div>, share: "78%" },
            { plan: <PlanBadge plan="beta" />,    active: "248",   trend: <div className="w-32 h-5"><Sparkline data={[40,42,46,52,56,62,68,74,82,90,100,118,140,160]} color="oklch(0.78 0.20 295)" height={20} /></div>, share: "14%" },
            { plan: <PlanBadge plan="founder" />, active: "112",   trend: <div className="w-32 h-5"><Sparkline data={[10,14,18,22,28,32,40,46,54,62,72,82,92,104]} color="oklch(0.83 0.13 85)" height={20} /></div>, share: "6%" },
            { plan: <PlanBadge plan="premium" />, active: "—",     trend: <span className="text-muted-foreground text-xs">{t("common.planned").toLowerCase()}</span>, share: "0%" },
            { plan: <PlanBadge plan="admin" />,   active: "4",     trend: <span className="text-muted-foreground text-xs">{t("admin.internal")}</span>, share: "—" },
          ]}
        />
      </Panel>
    </div>
  );
}