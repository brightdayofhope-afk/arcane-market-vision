import { createFileRoute } from "@tanstack/react-router";
import { Activity, TrendingUp, LineChart, Sparkles, Coins, Zap, ShieldAlert, Star } from "lucide-react";
import { Badge, BarRow, DataTable, LiveTicker, MultiLineChart, PageHeader, Panel, Sparkline, StatCard, StatusPill } from "@/components/ami/widgets";
import { AmiInsight } from "@/components/ami/AmiInsight";
import { PlanBadge, DataSourceStatus, AccessLock, ConfidenceBar, RiskMeter } from "@/components/ami/access";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview · AMI" }] }),
  component: Overview,
});

const movers = [
  { key: "arcaneCrystal", code: "ARC", change: "+8.24%", price: "128g 45s" },
  { key: "blackLotus", code: "BLO", change: "+6.91%", price: "1,420g" },
  { key: "runecloth", code: "RNC", change: "+5.47%", price: "12g 75s" },
  { key: "thoriumBar", code: "THB", change: "+4.32%", price: "38g 21s" },
  { key: "largeBrilliantShard", code: "LBS", change: "+3.89%", price: "92g 17s" },
];

const heat = [
  { key: "herbalism", value: "+7.21%", area: "row-span-2 col-span-2", tone: "success" },
  { key: "mining", value: "+3.42%", area: "", tone: "success" },
  { key: "tailoring", value: "+2.18%", area: "", tone: "success" },
  { key: "enchanting", value: "-1.32%", area: "col-span-1", tone: "danger" },
  { key: "inscription", value: "+0.73%", area: "col-span-1", tone: "success" },
] as const;

function Overview() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader
        title={t("overview.title")}
        subtitle={t("overview.subtitle")}
        actions={
          <div className="flex items-center gap-2">
            <PlanBadge plan="founder" />
            <StatusPill status="demo" hint="Live data wiring planned" />
          </div>
        }
      />

      {/* Pre-flight strip: Account · Data Sources · What changed since last scan */}
      <div className="grid lg:grid-cols-3 gap-3 mb-3">
        <Panel title={t("overview.session")}>
          <ul className="text-xs space-y-1.5">
            <li className="flex justify-between"><span className="text-muted-foreground">{t("overview.region")}</span><span>EU</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">{t("overview.realm")}</span><span>Spineshatter</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">{t("overview.faction")}</span><span>{t("overview.factionHordeAuto")}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">{t("overview.lastScan")}</span><span className="text-success">{t("overview.ago", { age: "38s" })}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">{t("overview.plan")}</span><PlanBadge plan="founder" /></li>
          </ul>
        </Panel>
        <Panel title={t("overview.dataSources")}>
          <DataSourceStatus
            rows={[
              { name: "Auctionator",    kind: "auctionator", status: "live",  hint: t("overview.ago", { age: "38s" }) },
              { name: "TSM",            kind: "tsm",         status: "stale", hint: t("overview.ago", { age: "14m" }) },
              { name: "Custom Addon",   kind: "addon",       status: "demo",  hint: t("source.addonHint") },
              { name: "Discord",        kind: "discord",     status: "live",  hint: t("source.discordChannels", { n: 4 }) },
            ]}
          />
        </Panel>
        <Panel title={t("overview.whatChanged")}>
          <ul className="text-xs space-y-2">
            <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_6px_currentColor]" /><div><div className="font-medium">{t("overview.ch1Title")}</div><div className="text-muted-foreground">{t("overview.ch1Body")}</div></div></li>
            <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-warning shadow-[0_0_6px_currentColor]" /><div><div className="font-medium">{t("overview.ch2Title")}</div><div className="text-muted-foreground">{t("overview.ch2Body")}</div></div></li>
            <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_currentColor]" /><div><div className="font-medium">{t("overview.ch3Title")}</div><div className="text-muted-foreground">{t("overview.ch3Body")}</div></div></li>
            <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_currentColor]" /><div><div className="font-medium">{t("overview.ch4Title")}</div><div className="text-muted-foreground">{t("overview.ch4Body")}</div></div></li>
          </ul>
        </Panel>
      </div>

      <div className="mb-3">
        <AmiInsight
          title={t("overview.amiInsightTitle")}
          body={t("overview.amiInsightBody")}
          tag={t("overview.amiInsightTag")}
          primaryCta={{ label: t("overview.openSignal"), to: "/app/signals" }}
          secondaryCta={{ label: t("overview.askAmi"), to: "/app/assistant" }}
        />
      </div>

      <div className="mb-3">
        <LiveTicker
          items={[
            { tone: "success", text: t("overview.tickerLotus"), meta: "EU · Spineshatter" },
            { tone: "primary", text: t("overview.tickerRunecloth"), meta: "EU · " + t("faction.horde") },
            { tone: "gold",    text: t("overview.tickerHotfix"), meta: t("common.live").toLowerCase() },
            { tone: "danger",  text: t("overview.tickerMount"), meta: "-22%" },
            { tone: "success", text: t("overview.tickerThorium"), meta: t("extras.now") },
            { tone: "primary", text: t("overview.tickerShard"), meta: t("overview.ago", { age: "5m" }) },
          ]}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={t("overview.totalMarkets")} value="24,581" delta={"+6.8% " + t("extras.vs24h")} icon={Activity} />
        <StatCard label={t("overview.trendingUp")} value="14,329" delta="+8.2%" icon={TrendingUp} accent="success" />
        <StatCard label={t("overview.trendingDown")} value="8,732" delta="-3.6%" trend="down" icon={LineChart} accent="destructive" />
        <StatCard label={t("overview.sentiment")} value={t("overview.sentimentBullish")} icon={Sparkles} accent="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title={t("overview.priceTrends")} className="lg:col-span-2" action={<TimeTabs />}>
          <MultiLineChart
            series={[
              { name: t("extras.seriesReagents"), color: "oklch(0.78 0.20 295)", data: [40,46,42,55,50,62,58,70,66,78,72,86,80,92] },
              { name: t("extras.seriesRaid"), color: "oklch(0.70 0.18 230)", data: [30,34,38,36,42,46,50,54,58,60,64,68,70,74] },
              { name: t("extras.seriesCrafted"),    color: "oklch(0.83 0.13 85)",   data: [60,58,55,52,50,48,46,45,42,40,42,44,46,48] },
            ]}
            height={240}
          />
          <div className="flex flex-wrap gap-4 mt-3 text-xs">
            <Legend color="oklch(0.78 0.20 295)" label={`${t("extras.seriesReagents")} · +6.8%`} />
            <Legend color="oklch(0.70 0.18 230)" label={`${t("extras.seriesRaid")} · +9.3%`} />
            <Legend color="oklch(0.83 0.13 85)" label={`${t("extras.seriesCrafted")} · -2.1%`} />
          </div>
        </Panel>
        <Panel title={t("overview.marketIntelligence")} action={<a className="text-xs text-primary">{t("common.viewAllArrow")}</a>}>
          <ul className="space-y-4 text-sm">
            {([
              [Sparkles, t("overview.intel.patchTitle"), t("overview.intel.patchBody"), "2m"],
              [Coins, t("overview.intel.reagentTitle"), t("overview.intel.reagentBody"), "18m"],
              [Zap, t("overview.intel.lotusTitle"), t("overview.intel.lotusBody"), "45m"],
              [ShieldAlert, t("overview.intel.volTitle"), t("overview.intel.volBody"), "1h"],
            ] as const).map(([Icon, a, b, c]) => (
              <li key={a} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg glass grid place-items-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{a}</div>
                  <div className="text-xs text-muted-foreground">{b}</div>
                </div>
                <div className="text-[10px] text-muted-foreground">{c}</div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title={t("overview.topMovers")} action={<MoverTabs />}>
          <ul className="space-y-2">
            {movers.map((m) => (
              <li key={m.code} className="flex items-center gap-3 glass rounded-xl p-3">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center text-[10px] font-bold">{m.code}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{t(`item.${m.key}`)}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.code} · {t("overview.auctionIndexShort")}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-success">{m.change}</div>
                  <div className="text-[10px] text-muted-foreground">{m.price}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t("overview.marketHeatmap")} action={<a className="text-xs text-primary">{t("common.viewAllArrow")}</a>}>
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[260px]">
            {heat.map((h) => (
              <div
                key={h.key}
                className={`rounded-xl p-3 flex flex-col justify-between glow-border ${h.area}`}
                style={{
                  background: h.tone === "success"
                    ? "linear-gradient(135deg, oklch(0.42 0.12 150 / 0.55), oklch(0.30 0.10 150 / 0.3))"
                    : "linear-gradient(135deg, oklch(0.42 0.18 25 / 0.55), oklch(0.30 0.16 25 / 0.3))",
                }}
              >
                <div className="text-xs uppercase tracking-wider">{t(`prof.${h.key}`)}</div>
                <div className="text-lg font-semibold">{h.value}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={t("overview.alerts")} action={<a className="text-xs text-primary">{t("common.viewAllArrow")}</a>}>
          <ul className="space-y-3 text-sm">
            {([
              [ShieldAlert, t("overview.alertList.priceTitle"), t("overview.alertList.priceBody"), "now", "warning"],
              [Zap, t("overview.alertList.volumeTitle"), t("overview.alertList.volumeBody"), "5m", "primary"],
              [Star, t("overview.alertList.patchTitle"), t("overview.alertList.patchBody"), "15m", "gold"],
              [TrendingUp, t("overview.alertList.techTitle"), t("overview.alertList.techBody"), "1h", "success"],
            ] as const).map(([Icon, a, b, c, t]) => (
              <li key={a} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg glass grid place-items-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{a}</div>
                  <div className="text-xs text-muted-foreground">{b}</div>
                </div>
                <Badge tone={t as any}>{c}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-3 mt-3">
        <Panel title={t("overview.recentSignals")}>
          <DataTable
            dense
            columns={[
              { key: "type", label: t("tableCol.type") },
              { key: "item", label: t("tableCol.itemRealm") },
              { key: "buy", label: t("tableCol.buy"), align: "right" },
              { key: "sell", label: t("tableCol.sell"), align: "right" },
              { key: "margin", label: t("tableCol.margin"), align: "right" },
              { key: "conf", label: t("tableCol.conf"), align: "right" },
              { key: "age", label: t("tableCol.age"), align: "right" },
            ]}
            rows={[
              { type: <Badge tone="success">{t("badge.bestDeal")}</Badge>,  item: `${t("item.arcaneCrystal")} · Spineshatter`, buy: "118g", sell: "156g", margin: <span className="text-success">+32%</span>, conf: "82%", age: <span className="text-muted-foreground">2m</span> },
              { type: <Badge tone="primary">{t("badge.fastFlip")}</Badge>,  item: `${t("item.runecloth")} · Spineshatter`,       buy: "11g",  sell: "14g",  margin: <span className="text-success">+27%</span>, conf: "74%", age: <span className="text-muted-foreground">5m</span> },
              { type: <Badge tone="gold">{t("badge.watch")}</Badge>,         item: `${t("item.blackLotus")} · Kazzak`,            buy: "1,180g", sell: "1,460g", margin: <span className="text-success">+24%</span>, conf: "71%", age: <span className="text-muted-foreground">8m</span> },
              { type: <Badge tone="danger">{t("badge.risky")}</Badge>,       item: `${t("item.phaseweaverMount")} · Ravencrest`,  buy: "—",    sell: "—",    margin: <span className="text-muted-foreground">Vol 0.84</span>, conf: "54%", age: <span className="text-muted-foreground">12m</span> },
              { type: <Badge tone="success">{t("badge.bestDeal")}</Badge>,  item: `${t("item.thoriumBar")} · Spineshatter`,      buy: "29g",  sell: "38g",  margin: <span className="text-success">+31%</span>, conf: "68%", age: <span className="text-muted-foreground">14m</span> },
              { type: <Badge tone="primary">{t("badge.fastFlip")}</Badge>,  item: `${t("item.largeBrilliantShard")} · Sylvanas`, buy: "78g", sell: "94g",  margin: <span className="text-success">+20%</span>, conf: "64%", age: <span className="text-muted-foreground">21m</span> },
            ]}
          />
        </Panel>
        <Panel title={t("overview.discordStatus")}>
          <ul className="space-y-2">
            {([
              ["#best-deals", t("common.healthy"), "success"],
              ["#fast-flips", t("common.healthy"), "success"],
              ["#risky-deals", t("common.rateLimitWarn"), "warning"],
              ["#market-stats", t("common.healthy"), "success"],
            ] as const).map(([c, s, t]) => (
              <li key={c} className="flex items-center gap-3 glass rounded-xl px-3 py-2.5">
                <span className="font-mono text-sm">{c}</span>
                <span className="ml-auto"><Badge tone={t as any}>{s}</Badge></span>
              </li>
            ))}
          </ul>
          <div className="rune-divider my-4" />
          <div className="h-16"><Sparkline data={[10,14,12,18,22,20,26,24,30,28,34,32,38]} color="oklch(0.70 0.18 230)" /></div>
          <div className="text-xs text-muted-foreground mt-2">{t("overview.deliveryThroughput")}</div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title={t("overview.professionDemand7d")} className="lg:col-span-1">
          <div className="space-y-2.5">
            <BarRow label={t("prof.alchemy")}      value={94} max={100} tone="gold" />
            <BarRow label={t("prof.herbalism")}    value={88} max={100} tone="success" />
            <BarRow label={t("prof.enchanting")}   value={76} max={100} tone="primary" />
            <BarRow label={t("prof.tailoring")}    value={64} max={100} tone="primary" />
            <BarRow label={t("prof.inscription")}  value={58} max={100} tone="primary" />
            <BarRow label={t("prof.engineering")}  value={38} max={100} tone="danger" />
          </div>
        </Panel>

        <Panel title={t("overview.watchlistMovers")} className="lg:col-span-2" action={<Link to="/app/watchlist" className="text-xs text-primary">{t("common.openWatchlist")}</Link>}>
          <DataTable
            dense
            columns={[
              { key: "item", label: t("tableCol.item") },
              { key: "loc", label: t("tableCol.realm") },
              { key: "price", label: t("tableCol.price"), align: "right" },
              { key: "target", label: t("tableCol.target"), align: "right" },
              { key: "delta", label: t("tableCol.delta24"), align: "right" },
              { key: "trend", label: t("tableCol.trend") },
            ]}
            rows={[
              { item: <span className="font-medium">{t("item.blackLotus")}</span>, loc: `Kazzak · ${t("faction.horde")}`, price: "1,420g", target: "1,200g", delta: <span className="text-success">+12.4%</span>, trend: <div className="w-24 h-6"><Sparkline data={[40,42,46,50,55,60,66,70,74,80,84,88,90,94,98,102]} color="oklch(0.74 0.17 150)" height={24} /></div> },
              { item: <span className="font-medium">{t("item.arcaneCrystal")}</span>, loc: `Spineshatter · ${t("faction.horde")}`, price: "128g", target: "100g", delta: <span className="text-success">+8.2%</span>, trend: <div className="w-24 h-6"><Sparkline data={[10,12,14,16,20,22,26,30,32,38,42,48,52,58,64,72]} color="oklch(0.74 0.17 150)" height={24} /></div> },
              { item: <span className="font-medium">{t("item.thoriumBar")}</span>, loc: `Ravencrest · ${t("faction.alliance")}`, price: "38g", target: "30g", delta: <span className="text-success">+4.3%</span>, trend: <div className="w-24 h-6"><Sparkline data={[20,22,24,23,26,28,30,32,34,33,36,38,40,42,44,46]} color="oklch(0.74 0.17 150)" height={24} /></div> },
              { item: <span className="font-medium">{t("item.runecloth")}</span>, loc: `Spineshatter · ${t("faction.horde")}`, price: "12g 75s", target: "15g", delta: <span className="text-destructive">-3.1%</span>, trend: <div className="w-24 h-6"><Sparkline data={[60,58,56,54,52,50,48,46,44,42,40,38,36,34,32,30]} color="oklch(0.66 0.22 25)" height={24} /></div> },
            ]}
          />
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        <Panel title={t("overview.amiInsights")} className="lg:col-span-2">
          <ul className="space-y-3 text-sm">
            {[
              { tone: "primary" as const, t: t("overview.amiI1Title"), d: t("overview.amiI1Body") },
              { tone: "gold"    as const, t: t("overview.amiI2Title"), d: t("overview.amiI2Body") },
              { tone: "danger"  as const, t: t("overview.amiI3Title"), d: t("overview.amiI3Body") },
            ].map((i) => (
              <li key={i.t} className="glass rounded-xl p-3 flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                <div>
                  <div className="flex items-center gap-2"><Badge tone={i.tone}>AMI</Badge> <div className="font-medium">{i.t}</div></div>
                  <div className="text-xs text-muted-foreground mt-1">{i.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t("overview.realmLiquidity")} action={<Link to="/app/realms" className="text-xs text-primary">{t("common.openAllRealms")}</Link>}>
          <div className="space-y-2.5">
            <BarRow label="Spineshatter" value={92} max={100} tone="success" />
            <BarRow label="Kazzak"       value={88} max={100} tone="success" />
            <BarRow label="Draenor"      value={84} max={100} tone="primary" />
            <BarRow label="Ravencrest"   value={71} max={100} tone="primary" />
            <BarRow label="Sylvanas"     value={65} max={100} tone="gold" />
            <BarRow label="Tarren Mill"  value={42} max={100} tone="danger" />
          </div>
        </Panel>
      </div>

      {/* Premium-locked example: cross-realm arbitrage forecast */}
      <div className="grid lg:grid-cols-2 gap-3 mt-3">
        <Panel title={t("overview.signalQuality")}>
          <div className="grid grid-cols-2 gap-4">
            <ConfidenceBar value={74} label={t("overview.avgConfidence")} />
            <RiskMeter value={32} label={t("overview.avgRisk")} />
            <ConfidenceBar value={68} label={t("overview.liquidity")} />
            <RiskMeter value={18} label={t("overview.volatility")} />
          </div>
          <div className="text-[10px] text-muted-foreground mt-3">
            {t("overview.qualityFooter")}
          </div>
        </Panel>
        <AccessLock level="premium" reason={t("access.crossRealmReason")} cta={t("access.seePlans")} to="/app/pricing">
          <Panel title={t("overview.crossRealm")}>
            <DataTable
              dense
              columns={[
                { key: "item",  label: t("tableCol.item") },
                { key: "from",  label: t("tableCol.from") },
                { key: "to",    label: t("tableCol.to") },
                { key: "gap",   label: t("tableCol.gap"), align: "right" },
                { key: "conf",  label: t("tableCol.conf"), align: "right" },
              ]}
              rows={[
                { item: t("item.runecloth"),        from: "Spineshatter", to: "Kazzak",     gap: "+27%", conf: "76%" },
                { item: t("item.arcaneCrystal"),   from: "Kazzak",       to: "Ravencrest", gap: "+18%", conf: "71%" },
                { item: t("item.largeBrilliantShard"),  from: "Sylvanas",     to: "Draenor",    gap: "+22%", conf: "64%" },
              ]}
            />
          </Panel>
        </AccessLock>
      </div>
    </div>
  );
}

function TimeTabs() {
  const { t } = useTranslation();
  const tabs = t("overview.tabsTime", { returnObjects: true }) as string[];
  return (
    <div className="flex gap-1 text-xs">
      {tabs.map((label, i) => (
        <button key={label} className={`px-2 py-1 rounded-md ${i===1?"bg-primary/20 text-primary":"text-muted-foreground hover:text-foreground"}`}>{label}</button>
      ))}
    </div>
  );
}
function MoverTabs() {
  const { t } = useTranslation();
  const tabs = t("overview.tabsMovers", { returnObjects: true }) as string[];
  return (
    <div className="flex gap-1 text-xs">
      {tabs.map((label, i) => (
        <button key={label} className={`px-2 py-1 rounded-md ${i===0?"bg-primary/20 text-primary":"text-muted-foreground hover:text-foreground"}`}>{label}</button>
      ))}
    </div>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
