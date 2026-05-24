import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, MultiLineChart, Badge, StatCard, BarRow, DataTable, Sparkline, StatusPill } from "@/components/ami/widgets";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Activity, Coins, Gauge, ShieldAlert, Link2, Layers, Hammer, Sparkles, Star, MessageSquare, Bot, Radar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AskAmiLink } from "@/components/ami/AmiCompanion";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Item Analytics · AMI" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    from: typeof search.from === "string" ? search.from : undefined,
    item: typeof search.item === "string" ? search.item : undefined,
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { t } = useTranslation();
  const { from, item } = Route.useSearch();
  const itemKey = item ?? "arcaneCrystal";
  const itemName = t(`item.${itemKey}`, { defaultValue: t("item.arcaneCrystal") });
  const topic = `${itemName} · EU · Spineshatter`;
  return (
    <div>
      <PageHeader amiIntent="explain_item"
        title={t("analytics.title")}
        subtitle={t("analytics.subtitle")}
        actions={<StatusPill status="demo" hint={t("analytics.statusHint")} />}
      />

      {from === "signal" && (
        <Panel className="!p-3 mb-3 flex items-center gap-3 glow-border">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <div className="text-xs min-w-0">
            <div className="font-medium truncate">{t("analytics.fromSignalTitle")} · {itemName}</div>
            <div className="text-muted-foreground truncate">{t("analytics.fromSignalHint")}</div>
          </div>
          <Link to="/app/signals" className="ml-auto text-[11px] text-primary inline-flex items-center gap-1">
            <Radar className="h-3 w-3" /> {t("common.openInSignals")}
          </Link>
        </Panel>
      )}

      <Panel className="mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("analytics.searchPlaceholder")} className="pl-9 h-10 bg-input/40 border-border" />
          </div>
          <Button variant="outline" className="border-border">
            {t("analytics.lookupById")} <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </Button>
        </div>
      </Panel>

      <div className="flex items-start gap-4 mb-4">
        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-lg font-bold glow">AC</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-semibold">{itemName}</h2>
            <Badge tone="gold">{t("badge.epic")}</Badge>
            <Badge>{t("badge.tradeGood")}</Badge>
            {from === "signal" && <Badge tone="primary">{t("common.fromSignal")}</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{t("analytics.itemSubtitle")}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <AskAmiLink intent="explain_item" topic={topic} className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
              <Bot className="h-3 w-3" /> {t("analytics.askAboutItem")}
            </AskAmiLink>
            <Link to="/app/watchlist" className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
              <Star className="h-3 w-3" /> {t("analytics.addItemToWatchlist")}
            </Link>
            <Link to="/app/discord" className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
              <MessageSquare className="h-3 w-3" /> {t("common.discordRoute")}
            </Link>
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground px-2 py-1">
              <ShieldAlert className="h-3 w-3 text-warning" /> {t("analytics.demoSelectedItem")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard label={t("analytics.minPrice")} value="118g 22s" icon={Coins} accent="success" />
        <StatCard label={t("analytics.avgPrice")} value="142g 80s" icon={Activity} />
        <StatCard label={t("analytics.maxPrice")} value="186g 10s" icon={Coins} accent="destructive" />
        <StatCard label={t("analytics.riskIndex")} value={t("analytics.riskLow")} icon={ShieldAlert} accent="success" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard label={t("analytics.saleVolume")} value="1,284" delta={t("analytics.deltaPrior")} icon={Activity} accent="success" />
        <StatCard label={t("analytics.activeListings")} value="186" delta={t("analytics.listingsDelta")} trend="down" icon={Layers} />
        <StatCard label={t("analytics.volatility")} value="0.18" icon={Gauge} accent="gold" />
        <StatCard label={t("analytics.demandForecast")} value="+24%" icon={Hammer} accent="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <Panel title={t("analytics.price30d")} className="lg:col-span-2">
          <MultiLineChart
            series={[
              { name: t("analytics.minPrice"), color: "oklch(0.74 0.17 150)", data: Array.from({length:30},(_,i)=>100+Math.sin(i/3)*8+i*1.2) },
              { name: t("analytics.avgPrice"), color: "oklch(0.78 0.20 295)", data: Array.from({length:30},(_,i)=>120+Math.sin(i/3)*10+i*1.4) },
              { name: t("analytics.maxPrice"), color: "oklch(0.66 0.22 25)", data: Array.from({length:30},(_,i)=>150+Math.cos(i/3)*12+i*1.6) },
            ]}
            height={280}
          />
        </Panel>
        <div className="flex flex-col gap-3">
          <Panel title={t("analytics.volumeTrend")}>
            <div className="text-2xl font-semibold">+38%</div>
            <div className="text-xs text-muted-foreground">{t("analytics.vsPrior")}</div>
            <div className="h-12 mt-3"><Sparkline data={[20,22,28,26,34,32,40,38,46,52,48,58,64,62,72,80]} color="oklch(0.74 0.17 150)" height={48} /></div>
          </Panel>
          <Panel title={t("analytics.sellerPressure")}>
            <Gauge className="h-4 w-4 text-warning" />
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-success via-warning to-destructive" />
            </div>
            <div className="text-xs text-muted-foreground mt-2">{t("analytics.sellerPressureNote")}</div>
          </Panel>
          <Panel title={t("analytics.regionSnapshot")}>
            <div className="text-xs grid grid-cols-2 gap-2">
              <div className="glass rounded-lg p-2"><div className="text-muted-foreground">EU</div><div>+6.4%</div></div>
              <div className="glass rounded-lg p-2"><div className="text-muted-foreground">NA</div><div>+2.1%</div></div>
              <div className="glass rounded-lg p-2"><div className="text-muted-foreground">{t("faction.horde")}</div><div>+4.8%</div></div>
              <div className="glass rounded-lg p-2"><div className="text-muted-foreground">{t("faction.alliance")}</div><div>+3.6%</div></div>
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title={t("analytics.professionUsage")} className="lg:col-span-1">
          <div className="space-y-2.5">
            <BarRow label={t("prof.enchanting")}   value={86} max={100} tone="primary" suffix="%" />
            <BarRow label={t("prof.alchemy")}      value={62} max={100} tone="gold" suffix="%" />
            <BarRow label={t("prof.jewelcrafting")} value={34} max={100} tone="primary" suffix="%" />
            <BarRow label={t("prof.inscription")}  value={18} max={100} tone="primary" suffix="%" />
          </div>
          <div className="rune-divider my-4" />
          <div className="text-xs text-muted-foreground">{t("analytics.reagentUsedIn")}</div>
        </Panel>

        <Panel title={t("analytics.recentListings")} className="lg:col-span-2" action={<Button variant="outline" size="sm" className="border-border h-7 text-xs">{t("common.openInAddon")} <Link2 className="ml-1.5 h-3 w-3" /></Button>}>
          <DataTable
            dense
            columns={[
              { key: "seller", label: t("tableCol.seller") },
              { key: "qty", label: t("tableCol.qty"), align: "right" },
              { key: "unit", label: t("tableCol.unit"), align: "right" },
              { key: "total", label: t("tableCol.total"), align: "right" },
              { key: "age", label: t("tableCol.age"), align: "right" },
              { key: "verdict", label: t("tableCol.verdict") },
            ]}
            rows={[
              { seller: "Grimtotem-H", qty: "12", unit: "118g", total: "1,416g", age: <span className="text-muted-foreground">2m</span>, verdict: <Badge tone="success">{t("common.snipe")}</Badge> },
              { seller: "Shadowfen-H", qty: "8",  unit: "124g", total: "992g",   age: <span className="text-muted-foreground">5m</span>, verdict: <Badge tone="primary">{t("common.watch")}</Badge> },
              { seller: "Ironvale-H",  qty: "20", unit: "139g", total: "2,780g", age: <span className="text-muted-foreground">11m</span>, verdict: <Badge>{t("common.fair")}</Badge> },
              { seller: "Mistwood-A",  qty: "4",  unit: "162g", total: "648g",   age: <span className="text-muted-foreground">19m</span>, verdict: <Badge tone="danger">{t("common.skip")}</Badge> },
              { seller: "Stormwake-H", qty: "10", unit: "121g", total: "1,210g", age: <span className="text-muted-foreground">24m</span>, verdict: <Badge tone="primary">{t("common.watch")}</Badge> },
            ]}
          />
        </Panel>
      </div>

      {/* Related signals + Discord route preview */}
      <div className="grid lg:grid-cols-2 gap-3 mt-3">
        <Panel title={t("analytics.relatedSignals")} action={<Link to="/app/signals" className="text-xs text-primary">{t("common.openInSignals")}</Link>}>
          <ul className="space-y-2 text-xs">
            {[
              { tone: "success" as const, label: t("badge.bestDeal"), text: `${itemName} · Spineshatter · +32%` },
              { tone: "primary" as const, label: t("badge.fastFlip"), text: `${itemName} · Kazzak · +24%` },
              { tone: "gold" as const,    label: t("badge.watch"),    text: `${itemName} · Ravencrest · +18%` },
            ].map((r) => (
              <li key={r.text} className="glass rounded-lg px-3 py-2 flex items-center gap-2">
                <Badge tone={r.tone}>{r.label}</Badge>
                <span className="truncate">{r.text}</span>
                <AskAmiLink intent="explain_signal" topic={r.text} className="ml-auto text-[11px] text-primary inline-flex items-center gap-1">
                  <Bot className="h-3 w-3" /> {t("signals.explainAmi")}
                </AskAmiLink>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={t("analytics.discordPreviewTitle")} action={<Link to="/app/discord" className="text-xs text-primary">{t("common.discordRoute")}</Link>}>
          <div className="text-xs text-muted-foreground mb-2">{t("analytics.discordPreviewHint")}</div>
          <div className="glass rounded-lg p-3 font-mono text-[11px] leading-relaxed">
            <div className="text-primary">#best-deals</div>
            <div className="text-foreground">{itemName} · Spineshatter-Horde</div>
            <div className="text-success">Buy ≤ 118g · Sell ≈ 156g · Margin +32%</div>
            <div className="text-muted-foreground">{t("discordPage.messageRisk")}</div>
            <div className="text-[10px] text-warning mt-1">{t("discordPage.messageFooter")}</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
