import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatusPill } from "@/components/ami/widgets";
import { Newspaper, Sparkles, TrendingUp, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/news")({
  head: () => ({ meta: [{ title: "Market News · AMI" }] }),
  component: NewsPage,
});

const stories = [
  {
    tag: "Patch",
    icon: Sparkles,
    title: "Patch 11.1 PTR — Alchemy mastery rework",
    body: "Flask of the Aether procs change from 12% to 18%. AMI projects +22% Dreamleaf demand within 48h of live.",
    meta: "4h ago · sourced from PTR datamining",
  },
  {
    tag: "Market",
    icon: TrendingUp,
    title: "Black Lotus supply collapse on EU-Spineshatter",
    body: "Active sellers dropped from 14 → 3. Median ask climbed from 940g to 1,420g. AMI flagged the cartel pattern at 02:14 UTC.",
    meta: "12m ago · Auction scrape",
  },
  {
    tag: "Risk",
    icon: ShieldAlert,
    title: "Mythic mount listings — manual review wave",
    body: "3 fresh listings sit 38% under floor across Kazzak and Ravencrest. Pattern matches prior recovery-scam attempts.",
    meta: "1h ago · Risk model v3.2",
  },
];

function NewsPage() {
  return (
    <div>
      <PageHeader amiIntent="explain_page"
        title="Market News"
        subtitle="Patch notes, market events and Auction House anomalies — curated by AMI."
        actions={<StatusPill status="demo" />}
      />
      <div className="grid lg:grid-cols-3 gap-3">
        {stories.map((s) => (
          <Panel key={s.title}>
            <div className="flex items-center gap-2 mb-3">
              <s.icon className="h-4 w-4 text-primary" />
              <Badge tone="primary">{s.tag}</Badge>
              <span className="ml-auto text-[10px] text-muted-foreground">{s.meta}</span>
            </div>
            <h3 className="text-sm font-semibold leading-snug">{s.title}</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
          </Panel>
        ))}
      </div>
      <Panel className="mt-4" title="AMI weekly digest">
        <div className="flex items-start gap-3">
          <Newspaper className="h-4 w-4 text-primary mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            14 patch signals · 1,820 auction events · 6 risk alerts. Alchemy and Enchanting reagents lead the week with
            +18% and +12% median price movement. Mounts and rare drops continue a four-week decline (−9% MoM).
          </p>
        </div>
      </Panel>
    </div>
  );
}