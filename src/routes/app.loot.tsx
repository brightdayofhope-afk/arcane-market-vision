import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, Sparkline, StatusPill } from "@/components/ami/widgets";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/loot")({
  head: () => ({ meta: [{ title: "Loot Database · AMI" }] }),
  component: LootPage,
});

const ITEM_KEYS = ["crystalOfAether","dreamleafBundle","phaseweaverCloak","titanShard","arcaneSigil","soulDust","mageweaveBolt","khoriumBar","primalMana","wyrmScale","mistwoodPlank","astralEmber"];
const SRC_KEYS = ["raidVault","dungeonSpire","profTailoring","raidStormveil","worldBoss","dungeonEmbermire"];
const PROF_KEYS = ["enchanting","alchemy","tailoring","jewelcrafting","inscription","engineering"];
const RARITY_KEYS = ["epic","rare","legendary","rare","epic","common"];
const EXPANSIONS = ["Aether","Stormveil","Aether","Embermire","Stormveil","Aether"];

function LootPage() {
  const { t } = useTranslation();
  const items = ITEM_KEYS.map((k, i) => ({
    name: t(`item.${k}`),
    source: t(`loot.src.${SRC_KEYS[i % 6]}`),
    expansion: EXPANSIONS[i % 6],
    prof: t(`prof.${PROF_KEYS[i % 6]}`),
    price: `${80 + i * 22}g`,
    trend: [10,14,18,22,28,26,32,38,42,40,48,52],
    rarity: t(`badge.${RARITY_KEYS[i % 6]}`),
  }));
  const filters: [string, string][] = [
    [t("loot.fSource"), t("loot.fSourceVal")],
    [t("loot.fExpansion"), t("loot.fExpansionVal")],
    [t("loot.fProfession"), t("loot.fProfessionVal")],
    [t("loot.fRarity"), t("loot.fRarityVal")],
  ];
  return (
    <div>
      <PageHeader
        title={t("loot.title")}
        subtitle={t("loot.subtitle")}
        actions={<StatusPill status="planned" hint={t("loot.statusHint")} />}
      />

      <Panel className="mb-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("loot.searchPlaceholder")} className="pl-9 h-10 bg-input/40 border-border" />
        </div>
        <div className="grid md:grid-cols-4 gap-2 text-xs">
          {filters.map(([k,v]) => (
            <div key={k} className="glass rounded-lg p-2">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="mt-0.5 truncate">{v}</div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {items.map((it) => (
          <Panel key={it.name} className="!p-4">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-xs font-bold">{it.name.slice(0,2).toUpperCase()}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{it.name}</div>
                <div className="text-xs text-muted-foreground truncate">{it.source}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              <Badge tone="primary">{it.expansion}</Badge>
              <Badge tone="gold">{it.rarity}</Badge>
              <Badge>{it.prof}</Badge>
            </div>
            <div className="h-12 mt-3"><Sparkline data={it.trend} color="oklch(0.70 0.18 230)" height={48} /></div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("loot.liveOpp")}</div>
                <div className="text-sm font-semibold text-success">{it.price}</div>
              </div>
              <a className="text-xs text-primary">{t("common.view")}</a>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
