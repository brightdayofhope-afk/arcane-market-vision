import { createFileRoute } from "@tanstack/react-router";
import { Badge, PageHeader, Panel, Sparkline, StatusPill } from "@/components/ami/widgets";
import { RiskMeter, ConfidenceBar, AccessLock } from "@/components/ami/access";
import { Button } from "@/components/ui/button";
import { Filter, Coins, Zap, ShieldAlert, Star, TrendingUp, TrendingDown, Bot, LineChart, ArrowUpDown, Eye, AlertTriangle, MessageSquare, Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AskAmiLink } from "@/components/ami/AmiCompanion";

export const Route = createFileRoute("/app/signals")({
  head: () => ({ meta: [{ title: "Auction Signals · AMI" }] }),
  component: SignalsPage,
});

const tabDefs = [
  { key: "deals", labelKey: "signals.tabBestDeals", icon: Coins },
  { key: "flips", labelKey: "signals.tabFastFlips", icon: Zap },
  { key: "risky", labelKey: "signals.tabRisky", icon: ShieldAlert },
  { key: "watch", labelKey: "signals.tabWatch", icon: Star },
  { key: "up",    labelKey: "signals.tabUp", icon: TrendingUp },
  { key: "down",  labelKey: "signals.tabDown", icon: TrendingDown },
] as const;

const signals = [
  { itemKey: "arcaneCrystal",       realm: "Spineshatter", factionKey: "horde",    margin: "+32%", confidence: 82, risk: 22, liquidity: 84, buy: "118g",  sell: "156g",  profit: "+612g / stack", reasonKey: "arcane", profKey: "alchemy",       spark: [10,12,14,16,20,22,26,30,32,38,42,48,52,58,64,72] },
  { itemKey: "runecloth",            realm: "Spineshatter", factionKey: "horde",    margin: "+27%", confidence: 74, risk: 18, liquidity: 92, buy: "11g",   sell: "14g",   profit: "+240g / stack", reasonKey: "rune",   profKey: "tailoring",     spark: [40,42,46,48,52,56,58,62,64,66,70,72,74,76,80,82] },
  { itemKey: "blackLotus",           realm: "Kazzak",       factionKey: "horde",    margin: "+24%", confidence: 71, risk: 48, liquidity: 32, buy: "1,180g",sell: "1,460g",profit: "+280g / unit",  reasonKey: "lotus",  profKey: "alchemy",       spark: [80,82,86,88,90,94,100,108,112,118,124,130,138,142,148,152] },
  { itemKey: "thoriumBar",           realm: "Spineshatter", factionKey: "horde",    margin: "+31%", confidence: 68, risk: 24, liquidity: 78, buy: "29g",   sell: "38g",   profit: "+180g / stack", reasonKey: "thorium",profKey: "blacksmithing", spark: [22,24,26,28,30,32,30,34,36,38,40,42,44,46,48,50] },
  { itemKey: "largeBrilliantShard",  realm: "Sylvanas",     factionKey: "alliance", margin: "+20%", confidence: 64, risk: 30, liquidity: 62, buy: "78g",   sell: "94g",   profit: "+160g / shard", reasonKey: "shard",  profKey: "enchanting",    spark: [30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60] },
  { itemKey: "primalFire",           realm: "Ravencrest",   factionKey: "alliance", margin: "+18%", confidence: 62, risk: 28, liquidity: 70, buy: "62g",   sell: "78g",   profit: "+128g / stack", reasonKey: "fire",   profKey: "blacksmithing", spark: [20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50] },
  { itemKey: "primalWater",          realm: "Draenor",      factionKey: "horde",    margin: "+15%", confidence: 58, risk: 26, liquidity: 74, buy: "48g",   sell: "58g",   profit: "+96g / stack",  reasonKey: "water",  profKey: "alchemy",       spark: [18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48] },
  { itemKey: "phaseweaverMount",     realm: "Ravencrest",   factionKey: "alliance", margin: "—",    confidence: 54, risk: 78, liquidity: 14, buy: "—",     sell: "—",     profitKey: "manualReview", reasonKey: "mount", profKey: "none",       spark: [60,58,56,54,52,50,48,46,44,42,40,38,36,34,32,30] },
  { itemKey: "soulDust",             realm: "Tarren Mill",  factionKey: "horde",    margin: "+12%", confidence: 60, risk: 22, liquidity: 88, buy: "32g",   sell: "40g",   profit: "+72g / stack",  reasonKey: "soul",   profKey: "enchanting",    spark: [22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52] },
];

function SignalsPage() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader amiIntent="explain_signal"
        title={t("signals.title")}
        subtitle={t("signals.subtitle")}
        actions={
          <div className="flex items-center gap-2">
            <StatusPill status="demo" />
            <Button variant="outline" className="border-border"><Filter className="h-4 w-4 mr-2" /> {t("signals.filtersBtn")}</Button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-[260px_1fr] gap-3">
        {/* Filter rail */}
        <Panel className="self-start sticky top-32">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{t("common.filters")}</div>
          <FilterGroup
            label={t("signals.category")}
            options={[t("category.all"), t("category.reagents"), t("category.craftedGear"), t("category.mounts"), t("category.recipes"), t("category.enchants")]}
            active={t("category.reagents")}
          />
          <FilterGroup
            label={t("signals.profession")}
            options={[t("common.all"), t("prof.alchemy"), t("prof.enchanting"), t("prof.tailoring"), t("prof.blacksmithing"), t("prof.jewelcrafting")]}
            active={t("common.all")}
          />
          <FilterGroup label={t("signals.timeWindow")} options={["15m", "1h", "6h", "24h"]} active="1h" />
          <FilterGroup label={t("signals.source")} options={["Auctionator", "TSM", "AMI Addon"]} active="Auctionator" />
          <div className="space-y-3 mt-3">
            <RangeRow label={t("signals.marginGte")} value="15%" />
            <RangeRow label={t("signals.confidenceGte")} value="60%" />
            <RangeRow label={t("signals.riskLte")} value={t("common.medium")} />
            <RangeRow label={t("signals.liquidityGte")} value="40" />
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3 border-border">{t("common.reset")}</Button>
        </Panel>

        <div>
          {/* Tab strip */}
          <Panel className="mb-3 !py-2">
            <div className="flex flex-wrap items-center gap-2">
              {tabDefs.map((tab, i) => (
                <button key={tab.key} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${i===0?"bg-primary/20 text-primary glow-border":"glass text-muted-foreground hover:text-foreground"}`}>
                  <tab.icon className="h-3.5 w-3.5" />{t(tab.labelKey)}
                </button>
              ))}
              <div className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowUpDown className="h-3.5 w-3.5" /> {t("signals.sort")}
                <select className="bg-transparent text-foreground outline-none">
                  <option>{t("signals.sortOptions.profit")}</option>
                  <option>{t("signals.sortOptions.confidence")}</option>
                  <option>{t("signals.sortOptions.risk")}</option>
                  <option>{t("signals.sortOptions.time")}</option>
                  <option>{t("signals.sortOptions.gap")}</option>
                  <option>{t("signals.sortOptions.volume")}</option>
                </select>
              </div>
            </div>
          </Panel>

          {/* Decision-support reminder */}
          <div className="mb-3 inline-flex items-start gap-2 text-[11px] text-muted-foreground glass rounded-md px-3 py-2">
            <Info className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
            <span>{t("signals.decisionSupportNote")}</span>
          </div>

          {/* Signal cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {signals.map((s) => {
              const risky = s.risk >= 60;
              const itemName = t(`item.${s.itemKey}`);
              const factionName = t(`faction.${s.factionKey}`);
              const profName = t(`prof.${s.profKey}`);
              const topic = `${itemName} · EU · ${s.realm} · ${factionName}`;
              return (
                <Panel key={s.itemKey + s.realm} className="!p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-xs font-bold">{itemName.slice(0,2).toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{itemName}</div>
                      <div className="text-[10px] text-muted-foreground truncate">EU · {s.realm} · {factionName} · {profName}</div>
                    </div>
                    <Badge tone={risky ? "danger" : "success"}>{s.margin}</Badge>
                  </div>
                  <div className="h-14 mt-2"><Sparkline data={s.spark} color={risky ? "oklch(0.66 0.22 25)" : "oklch(0.78 0.20 295)"} height={56} /></div>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                    <Stat label={t("tableCol.buy")} value={s.buy} />
                    <Stat label={t("tableCol.sell")} value={s.sell} />
                    <Stat label={t("signals.estProfit")} value={s.profitKey ? t("common.manualReview") : (s.profit ?? "")} accent />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <ConfidenceBar value={s.confidence} />
                    <RiskMeter value={s.risk} />
                  </div>
                  <div className="mt-3 text-[11px] text-muted-foreground leading-snug">
                    <span className="text-foreground/90 font-medium">{t("signals.why")}</span>{t(`signals.reasons.${s.reasonKey}`)}
                  </div>
                  {risky && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-warning">
                      <AlertTriangle className="h-3 w-3" /> {t("signals.manualReviewLong")}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <AskAmiLink intent="explain_signal" topic={topic} className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
                      <Bot className="h-3 w-3" /> {t("signals.explainAmi")}
                    </AskAmiLink>
                    <Link to="/app/analytics" search={{ from: "signal", item: s.itemKey } as never} className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
                      <LineChart className="h-3 w-3" /> {t("signals.itemAnalytics")}
                    </Link>
                    <Link to="/app/watchlist" className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
                      <Star className="h-3 w-3" /> {t("common.addToWatchlist")}
                    </Link>
                    <Link to="/app/discord" className="inline-flex items-center gap-1 glass rounded-md px-2 py-1 text-[11px] hover:text-primary">
                      <MessageSquare className="h-3 w-3" /> {t("common.discordRoute")}
                    </Link>
                  </div>
                </Panel>
              );
            })}
          </div>

          {/* Locked premium row example — custom alert thresholds */}
          <div className="mt-3">
            <AccessLock level="premium" reason={t("access.customAlertReason")} cta={t("access.seePlans")} to="/app/pricing">
              <Panel title={t("signals.customAlertTitle")}>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <Stat label={t("signals.whenMarginGte")} value="20%" />
                  <Stat label={t("signals.andConfGte")} value="70%" />
                  <Stat label={t("signals.andRiskLte")} value={t("common.medium")} />
                </div>
                <div className="text-[10px] text-muted-foreground mt-3">{t("signals.routingNote")}</div>
              </Panel>
            </AccessLock>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="glass rounded-lg px-2 py-1.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={accent ? "text-primary text-sm font-medium" : "text-sm font-medium"}>{value}</div>
    </div>
  );
}

function FilterGroup({ label, options, active }: { label: string; options: string[]; active: string }) {
  return (
    <div className="mb-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => (
          <button
            key={o}
            className={`px-2 py-0.5 rounded-md text-[11px] ${o === active ? "bg-primary/20 text-primary glow-border" : "glass text-muted-foreground hover:text-foreground"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function RangeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="text-muted-foreground flex-1">{label}</span>
      <span className="glass rounded-md px-2 py-0.5 text-foreground">{value}</span>
    </div>
  );
}
