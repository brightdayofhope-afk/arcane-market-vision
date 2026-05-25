import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatCard, StatusPill, DataTable } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import {
  Handshake, Coins, Users, Link2, Sparkles,
  UploadCloud, ShieldCheck, FileCode2, Eye, FolderLock, PackageOpen,
  CheckCircle2, Database, Copy, AlertTriangle, Crown, Lock, Clock, Hash,
} from "lucide-react";
import { ConfidenceBar } from "@/components/ami/access";
import { cn } from "@/lib/utils";

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
    { name: "Spineshatter_2026-05-25_18-04.lua", size: "412 KB", when: "2h ago",  status: "imported"     as const, note: "12,840 listings · 1,932 items" },
    { name: "Spineshatter_2026-05-25_12-11.lua", size: "398 KB", when: "8h ago",  status: "accepted"     as const, note: "Queued for ingest" },
    { name: "Spineshatter_2026-05-24_22-47.lua", size: "405 KB", when: "21h ago", status: "duplicate"    as const, note: "Already covered by neighbor scan" },
    { name: "Spineshatter_2026-05-24_09-02.lua", size: "118 KB", when: "1d ago",  status: "needs_review" as const, note: "Partial scan · low coverage" },
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
      <header className="flex items-start justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight inline-flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/25 to-accent/20 grid place-items-center">
              <UploadCloud className="h-4 w-4 text-primary" />
            </span>
            Become a Market Contributor
            <Badge tone="gold">Preview</Badge>
          </h3>
          <p className="text-xs text-muted-foreground mt-1.5 max-w-2xl">
            Upload <code className="text-foreground/90 bg-muted/40 px-1 py-px rounded">Auctionator.lua</code> scans
            and help AMI improve market intelligence for your realm. Contributors get faster signals,
            deeper history, and early access to Founder features.
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <Lock className="h-3 w-3" /> Upload integration coming soon
        </span>
      </header>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 60%, transparent), transparent 70%)" }}
      />

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        {/* Drop-zone + realm row */}
        <div className="space-y-4">
          <div
            role="group"
            aria-disabled="true"
            className="relative rounded-2xl border border-dashed border-border/70 bg-muted/10 p-7 text-center overflow-hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, color-mix(in oklab, var(--muted) 30%, transparent) 0 8px, transparent 8px 16px)",
            }}
          >
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 glass rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Lock className="h-3 w-3" /> Read-only preview
            </span>
            <div className="mx-auto h-12 w-12 rounded-xl bg-muted/40 grid place-items-center mb-3 ring-1 ring-border/60">
              <UploadCloud className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium text-foreground/80">
              Drop your <span className="text-primary/70">Auctionator.lua</span> here
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              or browse from <code className="bg-muted/40 px-1 rounded">WTF/Account/&lt;ACC&gt;/SavedVariables/</code> · Max 8 MB · .lua only
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Button size="sm" disabled aria-disabled="true" title="Upload integration coming soon">
                <UploadCloud className="h-3.5 w-3.5" /> Select .lua file
              </Button>
              <Button size="sm" variant="outline" className="border-border" disabled aria-disabled="true">
                <FileCode2 className="h-3.5 w-3.5" /> Paste path
              </Button>
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Frontend mock · no file leaves your device
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
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Upload safety</span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
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
        <div className="space-y-4">
          <div className="glass-strong rounded-2xl p-4 glow-border">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold/30 to-primary/20 grid place-items-center ring-1 ring-gold/20">
                  <Crown className="h-4.5 w-4.5 text-gold" />
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
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="glass rounded-lg py-2">
                <div className="text-base font-semibold tabular-nums">47</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Scans</div>
              </div>
              <div className="glass rounded-lg py-2">
                <div className="text-base font-semibold text-primary tabular-nums">98.4%</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Accept rate</div>
              </div>
              <div className="glass rounded-lg py-2">
                <div className="text-base font-semibold text-gold tabular-nums">320g</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Weekly tip</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <Hash className="h-3 w-3" /> Recent uploads
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" /> Last 48h
              </span>
            </div>
            <ul className="divide-y divide-border/40 -my-1">
              {recent.map((r) => {
                const s = statusTone[r.status];
                const SIcon = s.icon;
                const toneDot = {
                  success: "bg-success",
                  primary: "bg-primary",
                  warning: "bg-warning",
                  default: "bg-muted-foreground/60",
                }[s.tone];
                return (
                  <li key={r.name} className="flex items-center gap-3 py-2 text-xs hover:bg-muted/20 -mx-1 px-1 rounded-md transition-colors">
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", toneDot)} />
                    <FileCode2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium tabular-nums">{r.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        <span className="tabular-nums">{r.size}</span> · {r.note} · <span className="tabular-nums">{r.when}</span>
                      </div>
                    </div>
                    <Badge tone={s.tone}>
                      <SIcon className="h-3 w-3 mr-1" />
                      {s.label}
                    </Badge>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Stream is a frontend mock · awaiting API.</span>
              <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" /> read-only</span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}