import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Badge } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Check, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/app/pricing")({
  head: () => ({ meta: [{ title: "Early Access · AMI" }] }),
  component: PricingPage,
});

const tiers = [
  { name: "Free Test Access", price: "0g", note: "Closed beta", cta: "Join Beta",
    features: ["1 realm", "Best Deals signals", "Daily market digest", "Community Discord"], accent: false },
  { name: "Founder", price: "Lifetime", note: "Limited seats", cta: "Claim Founder",
    features: ["3 realms", "All signal channels", "Discord webhook routing", "Priority AI assistant", "Lifetime premium discount"], accent: true },
  { name: "Premium Analytics", price: "Soon", note: "Post-beta", cta: "Notify me",
    features: ["Multi-region", "Patch forecast engine", "Custom alerts & strategies", "Team workspaces", "API access"], accent: false },
];

function PricingPage() {
  return (
    <div>
      <PageHeader
        title="Early Access"
        subtitle="Founder seats unlock all signal channels, multi-realm tracking and the AMI assistant."
      />
      <div className="grid md:grid-cols-3 gap-3">
        {tiers.map((t) => (
          <Panel key={t.name} className={`!p-6 relative ${t.accent ? "glow-border" : ""}`}>
            {t.accent && <div className="absolute -top-3 right-5"><Badge tone="primary">Most popular</Badge></div>}
            <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t.name}</div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className={`text-4xl font-semibold ${t.accent ? "text-gradient" : ""}`}>{t.price}</div>
              <div className="text-xs text-muted-foreground">{t.note}</div>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <Button className={`mt-6 w-full ${t.accent ? "glow" : ""}`} variant={t.accent ? "default" : "outline"}>{t.cta}</Button>
          </Panel>
        ))}
      </div>

      <Panel className="mt-4 !p-6 flex flex-wrap items-center gap-4">
        <div className="h-12 w-12 rounded-xl grid place-items-center glass glow-border"><MessageSquare className="h-5 w-5 text-primary" /></div>
        <div className="flex-1 min-w-[240px]">
          <div className="font-medium">Join the AMI Discord community</div>
          <div className="text-sm text-muted-foreground">Trade strategies, request features, meet other Azeroth merchants.</div>
        </div>
        <Link to="/app/discord"><Button variant="outline" className="border-border">Open Discord</Button></Link>
      </Panel>
    </div>
  );
}
