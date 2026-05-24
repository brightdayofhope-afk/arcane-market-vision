import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatusPill } from "@/components/ami/widgets";
import { Tv, Play, Radio } from "lucide-react";

export const Route = createFileRoute("/app/streams")({
  head: () => ({ meta: [{ title: "Streams · AMI" }] }),
  component: StreamsPage,
});

const streams = [
  { name: "Goldforge", topic: "Black Lotus cartel watch", viewers: 1284, live: true,  realm: "EU · Spineshatter" },
  { name: "FlipMage",  topic: "Tailoring flips under 200g", viewers: 612,  live: true,  realm: "EU · Kazzak" },
  { name: "Aetherbank", topic: "Patch 11.1 reagent prep",   viewers: 0,    live: false, realm: "EU · Ravencrest" },
  { name: "Runebroker", topic: "Enchanting Soul Dust farm", viewers: 248,  live: true,  realm: "NA · Sylvanas" },
  { name: "Hordemarket", topic: "Risky deals breakdown",    viewers: 0,    live: false, realm: "EU · Tarren Mill" },
  { name: "AmiCast",    topic: "AMI weekly market wrap",    viewers: 1820, live: true,  realm: "Global" },
];

function StreamsPage() {
  return (
    <div>
      <PageHeader
        title="Streams"
        subtitle="Live broadcasts from AMI partners and gold-making creators."
        actions={<StatusPill status="planned" hint="Twitch / YouTube embed" />}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {streams.map((s) => (
          <Panel key={s.name} className="!p-0 overflow-hidden">
            <div className="aspect-video relative bg-gradient-to-br from-primary/20 via-accent/10 to-background flex items-center justify-center">
              <Play className="h-10 w-10 text-foreground/70" />
              {s.live ? (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1.5 glass rounded-md px-2 py-0.5 text-[10px]">
                  <Radio className="h-3 w-3 text-destructive" /> LIVE · {s.viewers.toLocaleString()} viewers
                </span>
              ) : (
                <span className="absolute top-2 left-2 glass rounded-md px-2 py-0.5 text-[10px] text-muted-foreground">Offline</span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Tv className="h-3.5 w-3.5 text-primary" />
                <div className="font-medium text-sm">{s.name}</div>
                <Badge tone="default">{s.realm}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{s.topic}</p>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}