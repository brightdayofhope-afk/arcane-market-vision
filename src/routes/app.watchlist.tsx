import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge, DataTable, PageHeader, Panel, Sparkline, StatusPill } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Plus, Star, Trash2, Bot, LineChart, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AccessLock, RiskMeter, ConfidenceBar } from "@/components/ami/access";
import { AskAmiLink } from "@/components/ami/AmiCompanion";

export const Route = createFileRoute("/app/watchlist")({
  head: () => ({ meta: [{ title: "Watchlist · AMI" }] }),
  component: WatchlistPage,
});

const watch = [
  { itemKey: "arcaneCrystal",       realm: "Spineshatter", factionKey: "horde",    price: "128g 45s", target: "100g",   change: "+8.24%", up: true,  conf: 82, risk: 22, alert: true,  spark: [10,12,14,16,20,22,26,30,32,38,42,48,52,58,64,72] },
  { itemKey: "blackLotus",          realm: "Kazzak",       factionKey: "horde",    price: "1,420g",   target: "1,200g", change: "+12.4%", up: true,  conf: 76, risk: 48, alert: true,  spark: [40,42,46,50,55,60,66,70,74,80,84,88,90,94,98,102] },
  { itemKey: "runecloth",           realm: "Spineshatter", factionKey: "horde",    price: "12g 75s",  target: "15g",    change: "-3.1%",  up: false, conf: 71, risk: 18, alert: true,  spark: [60,58,56,54,52,50,48,46,44,42,40,38,36,34,32,30] },
  { itemKey: "thoriumBar",          realm: "Ravencrest",   factionKey: "alliance", price: "38g 21s",  target: "30g",    change: "+4.32%", up: true,  conf: 68, risk: 24, alert: true,  spark: [20,22,24,23,26,28,30,32,34,33,36,38,40,42,44,46] },
  { itemKey: "largeBrilliantShard", realm: "Spineshatter", factionKey: "horde",    price: "92g 17s",  target: "80g",    change: "+3.89%", up: true,  conf: 64, risk: 30, alert: false, spark: [30,32,34,36,38,40,42,44,42,46,48,50,52,54,56,58] },
  { itemKey: "primalFire",          realm: "Sylvanas",     factionKey: "horde",    price: "175g 32s", target: "150g",   change: "-1.2%",  up: false, conf: 58, risk: 28, alert: false, spark: [50,52,50,48,46,48,46,44,42,40,42,40,38,36,38,36] },
];

function WatchlistPage() {
  const { t } = useTranslation();
  const above = watch.filter((w) => w.up).length;
  const below = watch.length - above;
  return (
    <div>
      <PageHeader amiIntent="explain_page"
        title={t("watchlist.title")}
        subtitle={t("watchlist.subtitle")}
        actions={
          <div className="flex gap-2 items-center">
            <StatusPill status="beta" />
            <div className="relative">
              <Input placeholder={t("watchlist.addPlaceholder")} className="bg-input/40 border-border h-10 w-64" />
            </div>
            <Button><Plus className="h-4 w-4 mr-1.5" /> {t("common.add")}</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <Panel className="!p-4"><div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t("watchlist.itemsWatched")}</div><div className="text-2xl font-semibold mt-1">{watch.length}</div></Panel>
        <Panel className="!p-4"><div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t("watchlist.aboveTarget")}</div><div className="text-2xl font-semibold text-success mt-1">{above}</div></Panel>
        <Panel className="!p-4"><div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t("watchlist.belowTarget")}</div><div className="text-2xl font-semibold text-destructive mt-1">{below}</div></Panel>
        <Panel className="!p-4"><div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t("watchlist.alerts24")}</div><div className="text-2xl font-semibold text-gold mt-1">23</div></Panel>
      </div>

      <div className="mb-3 inline-flex items-start gap-2 text-[11px] text-muted-foreground glass rounded-md px-3 py-2">
        <ShieldAlert className="h-3.5 w-3.5 text-warning mt-0.5 shrink-0" />
        <span>{t("watchlist.manualReviewNote")}</span>
      </div>

      <Panel title={t("watchlist.pinned")} action={<span className="text-xs text-muted-foreground">{t("watchlist.sortChange")}</span>}>
        <DataTable
          columns={[
            { key: "fav", label: "" },
            { key: "item",    label: t("watchlist.colItem") },
            { key: "loc",     label: t("watchlist.colRealm") },
            { key: "price",   label: t("watchlist.colPrice"),  align: "right" },
            { key: "target",  label: t("watchlist.colTarget"), align: "right" },
            { key: "change",  label: t("watchlist.colChange"), align: "right" },
            { key: "trend",   label: t("watchlist.colTrend") },
            { key: "conf",    label: t("watchlist.colConf"),   align: "right" },
            { key: "risk",    label: t("watchlist.colRisk"),   align: "right" },
            { key: "alert",   label: t("watchlist.colAlert"),  align: "center" },
            { key: "actions", label: "", align: "right" },
          ]}
          rows={watch.map((w) => ({
            fav: <Star className="h-3.5 w-3.5 text-gold" />,
            item: <div className="font-medium text-foreground">{t(`item.${w.itemKey}`)}</div>,
            loc: <span className="text-muted-foreground">EU · {w.realm} · {t(`faction.${w.factionKey}`)}</span>,
            price: <span className="font-medium">{w.price}</span>,
            target: <span className="text-muted-foreground">{w.target}</span>,
            change: <span className={w.up ? "text-success" : "text-destructive"}>{w.change}</span>,
            trend: <div className="w-24 h-7"><Sparkline data={w.spark} color={w.up ? "oklch(0.74 0.17 150)" : "oklch(0.66 0.22 25)"} height={28} /></div>,
            conf: <div className="w-20 inline-block align-middle"><ConfidenceBar value={w.conf} label=" " /></div>,
            risk: <div className="w-20 inline-block align-middle"><RiskMeter value={w.risk} label=" " /></div>,
            alert: <Badge tone={w.alert ? "success" : "default"}>{w.alert ? t("watchlist.alertOn") : t("watchlist.alertOff")}</Badge>,
            actions: (
              <div className="inline-flex gap-1">
                <AskAmiLink intent="explain_item" topic={`${t(`item.${w.itemKey}`)} · ${w.realm}`} className="h-7 w-7 grid place-items-center rounded-md glass hover:text-primary" >
                  <Bot className="h-3.5 w-3.5" />
                </AskAmiLink>
                <Link to="/app/analytics" search={{ from: "watchlist", item: w.itemKey } as never} className="h-7 w-7 grid place-items-center rounded-md glass hover:text-primary" title={t("watchlist.openAnalytics")}>
                  <LineChart className="h-3.5 w-3.5" />
                </Link>
                <button className="h-7 w-7 grid place-items-center rounded-md glass hover:text-primary" title={t("watchlist.colAlert")}><Bell className="h-3.5 w-3.5" /></button>
                <button className="h-7 w-7 grid place-items-center rounded-md glass hover:text-destructive" title={t("watchlist.remove")}><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            ),
          }))}
        />
      </Panel>

      <div className="mt-3">
        <AccessLock level="premium" reason={t("watchlist.customThresholdsReason")} cta={t("access.seePlans")} to="/app/pricing">
          <Panel title={t("watchlist.customThresholdsTitle")}>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="glass rounded-lg px-2 py-1.5"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("signals.whenMarginGte")}</div><div className="text-sm font-medium">20%</div></div>
              <div className="glass rounded-lg px-2 py-1.5"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("signals.andConfGte")}</div><div className="text-sm font-medium">70%</div></div>
              <div className="glass rounded-lg px-2 py-1.5"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("signals.andRiskLte")}</div><div className="text-sm font-medium">{t("common.medium")}</div></div>
            </div>
          </Panel>
        </AccessLock>
      </div>
    </div>
  );
}