import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatCard, StatusPill, DataTable } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import {
  Handshake, Coins, Users, Link2, Sparkles,
  UploadCloud, ShieldCheck, FileCode2, Eye, FolderLock, PackageOpen,
  CheckCircle2, Database, Copy, AlertTriangle, Crown,
} from "lucide-react";
import { ConfidenceBar } from "@/components/ami/access";

export const Route = createFileRoute("/app/partners")({
  head: () => ({ meta: [{ title: "Partner Program · AMI" }] }),
  component: PartnersPage,
});

const tiers = [
  { tier: "Scout",     reqs: "100+ Discord members", rev: "20%", perks: "Basic referral link, monthly digest" },
  { tier: "Broker",    reqs: "1,000+ members or 5k MAU stream", rev: "30%", perks: "Custom Discord webhook, co-branded signals" },
  { tier: "Archmage",  reqs: "Top 1% volume · invitation only", rev: "40%", perks: "Dedicated AMI channel, early features, founder badge" },
];

function PartnersPage() {
  return (
    <div>
      <PageHeader amiIntent="explain_page"
        title="Partner Program"
        subtitle="Refer guilds and creators. Earn lifetime revenue share on every Founder seat you bring."
        actions={<StatusPill status="beta" hint="Invite-only" />}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Referred seats" value="142" delta="+18 this month" icon={Users} accent="primary" />
        <StatCard label="Lifetime payout" value="48,320g eq." delta="USD 1,612" icon={Coins} accent="gold" />
        <StatCard label="Active links" value="6" delta="2 channels" icon={Link2} />
        <StatCard label="Tier" value="Broker" delta="58% to Archmage" icon={Sparkles} accent="accent" />
      </div>
      <Panel title="Tiers" className="mb-4">
        <DataTable
          dense
          columns={[
            { key: "tier", label: "Tier" },
            { key: "reqs", label: "Requirements" },
            { key: "rev",  label: "Revenue share", align: "right" },
            { key: "perks", label: "Perks" },
          ]}
          rows={tiers.map((t) => ({
            tier:  <span className="inline-flex items-center gap-2"><Handshake className="h-3.5 w-3.5 text-primary" /><span className="font-medium">{t.tier}</span></span>,
            reqs:  <span className="text-muted-foreground">{t.reqs}</span>,
            rev:   <Badge tone="gold">{t.rev}</Badge>,
            perks: <span className="text-muted-foreground">{t.perks}</span>,
          }))}
        />
      </Panel>
      <Panel title="Your referral link">
        <div className="flex flex-wrap items-center gap-2">
          <code className="glass rounded-md px-3 py-2 text-xs flex-1 min-w-0 truncate">https://ami.market/r/spineshatter-horde-broker</code>
          <Button size="sm" variant="outline" className="border-border">Copy</Button>
          <Button size="sm">Open dashboard</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Conversions are credited within 24h of a Founder seat upgrade. Payouts run weekly via Discord or in-game gold transfer.
        </p>
      </Panel>
      <MarketContributorBlock />
    </div>
  );
}

function MarketContributorBlock() {
  const safety = [
    { icon: Database,   text: "Read-only market data — prices, quantities, timestamps only." },
    { icon: Eye,        text: "File contents are never shown publicly. Parsed signals only." },
    { icon: FolderLock, text: "Local paths and usernames are stripped before storage." },
    { icon: PackageOpen, text: "No private inventory, mail, or character data is included." },
  ];

  const recent = [
    { name: "Spineshatter_2026-05-25_18-04.lua", size: "412 KB", status: "imported"     as const, note: "12,840 listings · 1,932 items" },
    { name: "Spineshatter_2026-05-25_12-11.lua", size: "398 KB", status: "accepted"     as const, note: "Queued for ingest" },
    { name: "Spineshatter_2026-05-24_22-47.lua", size: "405 KB", status: "duplicate"    as const, note: "Already covered by neighbor scan" },
    { name: "Spineshatter_2026-05-24_09-02.lua", size: "118 KB", status: "needs_review" as const, note: "Partial scan · low coverage" },
  ];

  const statusTone = {
    imported:     { tone: "success" as const, label: "Imported",     icon: CheckCircle2 },
    accepted:     { tone: "primary" as const, label: "Accepted",     icon: UploadCloud },
    duplicate:    { tone: "default" as const, label: "Duplicate",    icon: Copy },
    needs_review: { tone: "warning" as const, label: "Needs review", icon: AlertTriangle },
  };

  return (
    <Panel
      className="mt-4 relative overflow-hidden"
    >
      <header className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wide inline-flex items-center gap-2">
          <UploadCloud className="h-4 w-4 text-primary" />
          Become a Market Contributor
          <Badge tone="gold">Preview</Badge>
        </h3>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Design only</span>
      </header>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 60%, transparent), transparent 70%)" }}
      />
      <p className="text-sm text-muted-foreground max-w-2xl">
        Upload <code className="text-foreground">Auctionator.lua</code> scans and help AMI improve market intelligence
        for your realm. Contributors get faster signals, deeper history, and early access to Founder features.
      </p>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 mt-4">
        {/* Drop-zone + realm row */}
        <div className="space-y-3">
          <div className="relative glass-strong rounded-2xl border border-dashed border-primary/40 p-6 text-center group hover:border-primary/70 transition-colors">
            <div className="mx-auto h-12 w-12 rounded-xl bg-primary/15 grid place-items-center mb-3 glow-border">
              <UploadCloud className="h-6 w-6 text-primary" />
            </div>
            <div className="text-sm font-medium">Drop your <span className="text-primary">Auctionator.lua</span> here</div>
            <div className="text-xs text-muted-foreground mt-1">
              or browse from <code>WTF/Account/&lt;ACC&gt;/SavedVariables/</code> · Max 8 MB · .lua only
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Button size="sm" disabled className="opacity-90">
                <UploadCloud className="h-3.5 w-3.5" /> Select .lua file
              </Button>
              <Button size="sm" variant="outline" className="border-border" disabled>
                <FileCode2 className="h-3.5 w-3.5" /> Paste path
              </Button>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Design preview</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-2">
            <div className="glass rounded-lg px-3 py-2">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Region</div>
              <div className="text-sm font-medium mt-0.5">EU · Classic Era</div>
            </div>
            <div className="glass rounded-lg px-3 py-2">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Realm</div>
              <div className="text-sm font-medium mt-0.5">Spineshatter</div>
            </div>
            <div className="glass rounded-lg px-3 py-2">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Faction</div>
              <div className="text-sm font-medium mt-0.5">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive" /> Horde
                </span>
              </div>
            </div>
          </div>

          {/* Safety checklist */}
          <div className="glass rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Upload safety</span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-1.5">
              {safety.map((s) => (
                <li key={s.text} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <s.icon className="h-3.5 w-3.5 mt-0.5 text-success shrink-0" />
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contributor badge + progress */}
        <div className="space-y-3">
          <div className="glass-strong rounded-2xl p-4 glow-border">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-gold/30 to-primary/20 grid place-items-center">
                  <Crown className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-medium leading-tight">Archivist · Tier II</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Market contributor</div>
                </div>
              </div>
              <Badge tone="gold"><Sparkles className="h-3 w-3 mr-1" />+14% boost</Badge>
            </div>
            <div className="mt-3">
              <ConfidenceBar value={62} label="Progress to Tier III · Cartographer" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="glass rounded-md py-1.5">
                <div className="text-sm font-semibold">47</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Scans</div>
              </div>
              <div className="glass rounded-md py-1.5">
                <div className="text-sm font-semibold text-primary">98.4%</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Accept rate</div>
              </div>
              <div className="glass rounded-md py-1.5">
                <div className="text-sm font-semibold text-gold">320g</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Weekly tip</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Recent uploads</span>
              <span className="text-[10px] text-muted-foreground">Last 48h</span>
            </div>
            <ul className="space-y-1.5">
              {recent.map((r) => {
                const s = statusTone[r.status];
                const SIcon = s.icon;
                return (
                  <li key={r.name} className="flex items-center gap-2 text-xs">
                    <FileCode2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{r.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{r.size} · {r.note}</div>
                    </div>
                    <Badge tone={s.tone}>
                      <SIcon className="h-3 w-3 mr-1" />
                      {s.label}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Panel>
  );
}