import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, BookOpen, Coins, Brain } from "lucide-react";
import heroChar from "@/assets/ami-hero.jpg";

export const Route = createFileRoute("/app/assistant")({
  head: () => ({ meta: [{ title: "AMI Assistant · AMI" }] }),
  component: AssistantPage,
});

const messages = [
  { from: "ami", text: "Hello! I'm AMI, your arcane market assistant. Ask about an item, profession or signal." },
  { from: "user", text: "Why is Arcane Crystal spiking on Spineshatter?" },
  { from: "ami", text: "Volume on Arcane Crystal is up 38% over the last 24h, driven by Enchanting demand pre-patch. Avg price moved from 122g to 142g with low seller pressure (0.23). I'd watch the 160g threshold." },
];

function AssistantPage() {
  return (
    <div>
      <PageHeader title="AMI Assistant" subtitle="Chat with your arcane market analyst." />

      <div className="grid lg:grid-cols-[1fr_320px] gap-3">
        <Panel className="!p-0 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className="relative h-9 w-9 rounded-full overflow-hidden glow-border">
              <img src={heroChar} alt="AMI" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div>
              <div className="font-medium text-sm">AMI</div>
              <div className="text-[10px] text-success flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_6px_currentColor]" /> online · grounded on live data
              </div>
            </div>
            <span className="ml-auto"><Badge tone="primary">Context: EU · Spineshatter</Badge></span>
          </div>

          <div className="p-4 space-y-4 min-h-[420px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-primary/20 text-foreground glow-border" : "glass"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {["Ask about item","Ask about profession","Explain signal","Show today's flips"].map((p) => (
              <button key={p} className="glass px-3 py-1.5 rounded-lg text-xs hover:text-primary">{p}</button>
            ))}
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <Input placeholder="Ask AMI anything…" className="bg-input/40 border-border h-10" />
            <Button className="glow"><Send className="h-4 w-4" /></Button>
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel title="Status">
            <ul className="text-sm space-y-2">
              <li className="flex justify-between"><span className="text-muted-foreground">Model</span><span>AMI-Core · v3</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Latency</span><span>320 ms</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Grounding</span><span className="text-success">Live</span></li>
            </ul>
          </Panel>
          <Panel title="Market context">
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Patch 11.1 in 8 days</li>
              <li className="flex items-center gap-2"><Coins className="h-3.5 w-3.5 text-gold" /> 24h volume +6.8%</li>
              <li className="flex items-center gap-2"><Brain className="h-3.5 w-3.5 text-accent" /> Sentiment: Bullish</li>
              <li className="flex items-center gap-2"><BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Watching 14 realms</li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
