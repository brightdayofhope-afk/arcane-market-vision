import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatCard, StatusPill, DataTable } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Handshake, Coins, Users, Link2, Sparkles } from "lucide-react";

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
      <PageHeader
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
    </div>
  );
}