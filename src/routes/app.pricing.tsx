import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Badge } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Check, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/pricing")({
  head: () => ({ meta: [{ title: "Early Access · AMI" }] }),
  component: PricingPage,
});

function PricingPage() {
  const { t } = useTranslation();
  const tiers = [
    { name: t("pricing.t1Name"), price: t("pricing.t1Price"), note: t("pricing.t1Note"), cta: t("pricing.t1Cta"),
      features: [t("pricing.t1F1"), t("pricing.t1F2"), t("pricing.t1F3"), t("pricing.t1F4")], accent: false },
    { name: t("pricing.t2Name"), price: t("pricing.t2Price"), note: t("pricing.t2Note"), cta: t("pricing.t2Cta"),
      features: [t("pricing.t2F1"), t("pricing.t2F2"), t("pricing.t2F3"), t("pricing.t2F4"), t("pricing.t2F5")], accent: true },
    { name: t("pricing.t3Name"), price: t("pricing.t3Price"), note: t("pricing.t3Note"), cta: t("pricing.t3Cta"),
      features: [t("pricing.t3F1"), t("pricing.t3F2"), t("pricing.t3F3"), t("pricing.t3F4"), t("pricing.t3F5")], accent: false },
  ];
  return (
    <div>
      <PageHeader amiIntent="explain_page"
        title={t("pricing.title")}
        subtitle={t("pricing.subtitle")}
      />
      <div className="grid md:grid-cols-3 gap-3">
        {tiers.map((tier) => (
          <Panel key={tier.name} className={`!p-6 relative ${tier.accent ? "glow-border" : ""}`}>
            {tier.accent && <div className="absolute -top-3 right-5"><Badge tone="primary">{t("badge.mostPopular")}</Badge></div>}
            <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{tier.name}</div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className={`text-4xl font-semibold ${tier.accent ? "text-gradient" : ""}`}>{tier.price}</div>
              <div className="text-xs text-muted-foreground">{tier.note}</div>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <Button className={`mt-6 w-full ${tier.accent ? "glow" : ""}`} variant={tier.accent ? "default" : "outline"}>{tier.cta}</Button>
          </Panel>
        ))}
      </div>

      <Panel className="mt-4 !p-6 flex flex-wrap items-center gap-4">
        <div className="h-12 w-12 rounded-xl grid place-items-center glass glow-border"><MessageSquare className="h-5 w-5 text-primary" /></div>
        <div className="flex-1 min-w-[240px]">
          <div className="font-medium">{t("pricing.joinCommunity")}</div>
          <div className="text-sm text-muted-foreground">{t("pricing.communityBody")}</div>
        </div>
        <Link to="/app/discord"><Button variant="outline" className="border-border">{t("pricing.openDiscord")}</Button></Link>
      </Panel>
    </div>
  );
}
