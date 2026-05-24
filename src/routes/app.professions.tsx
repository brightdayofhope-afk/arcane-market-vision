import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Badge, BarRow, DataTable, PageHeader, Panel, Sparkline, StatCard, StatusPill, TabStrip,
} from "@/components/ami/widgets";
import { Hammer, FlaskConical, Scissors, Gem, Anvil, Feather, Wrench, Leaf, Pickaxe, Skull } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/professions")({
  head: () => ({ meta: [{ title: "Professions · AMI" }] }),
  component: ProfessionsPage,
});

const PROFS = [
  { key: "alchemy",       icon: FlaskConical, demand: 94, supply: 62, margin: "+31%", spark: [20,24,22,28,30,34,32,40,44,48,52,58,62,68,74,80] },
  { key: "herbalism",     icon: Leaf,         demand: 88, supply: 71, margin: "+22%", spark: [10,14,18,16,22,28,26,32,30,38,42,40,48,52,50,58] },
  { key: "enchanting",    icon: Feather,      demand: 76, supply: 48, margin: "+27%", spark: [20,22,28,30,34,32,40,42,46,50,54,52,60,66,70,74] },
  { key: "tailoring",     icon: Scissors,     demand: 64, supply: 84, margin: "+14%", spark: [40,42,38,44,42,46,48,46,50,52,54,52,56,58,56,60] },
  { key: "inscription",   icon: Feather,      demand: 58, supply: 38, margin: "+18%", spark: [22,24,26,28,30,28,32,34,36,40,42,46,48,50,54,58] },
  { key: "jewelcrafting", icon: Gem,          demand: 52, supply: 44, margin: "+12%", spark: [30,32,34,36,34,38,40,42,40,44,46,48,46,50,52,54] },
  { key: "blacksmithing", icon: Anvil,        demand: 46, supply: 56, margin: "+9%",  spark: [42,40,44,46,44,48,46,50,52,50,54,56,54,58,56,60] },
  { key: "mining",        icon: Pickaxe,      demand: 42, supply: 78, margin: "+7%",  spark: [50,48,52,50,54,52,56,54,58,56,60,58,62,60,64,62] },
  { key: "engineering",   icon: Wrench,       demand: 38, supply: 36, margin: "+11%", spark: [28,30,32,30,34,32,36,34,38,36,40,38,42,40,44,42] },
  { key: "skinning",      icon: Skull,        demand: 28, supply: 88, margin: "-4%",  spark: [60,58,56,54,52,50,48,46,44,42,40,38,36,34,32,30] },
] as const;

type ProfKey = (typeof PROFS)[number]["key"];

const RECIPES_BY_PROF: Record<ProfKey, { recipe: string; mats: string; cost: string; sell: string; margin: string; conf: string }[]> = {
  alchemy: [
    { recipe: "Flask of the Aether",     mats: "3× Arcane Crystal, 2× Dreamleaf", cost: "412g", sell: "586g", margin: "+42%", conf: "84%" },
    { recipe: "Elixir of Stormveil",     mats: "4× Dreamleaf, 1× Black Lotus",     cost: "1,640g", sell: "2,180g", margin: "+33%", conf: "76%" },
    { recipe: "Potion of Mistwalking",   mats: "2× Mistwood Sap, 1× Soul Dust",    cost: "184g", sell: "246g", margin: "+34%", conf: "71%" },
    { recipe: "Greater Mana Potion",     mats: "2× Runecloth, 1× Primal Mana",     cost: "62g",  sell: "84g",  margin: "+35%", conf: "68%" },
  ],
  herbalism: [
    { recipe: "Dreamleaf bundle (20)",   mats: "Field harvest · Aether Wilds",    cost: "—",    sell: "412g", margin: "—",     conf: "—" },
    { recipe: "Black Lotus (1)",         mats: "Spawn timer · Stormveil",         cost: "—",    sell: "1,420g", margin: "—",   conf: "—" },
  ],
  enchanting: [
    { recipe: "Enchant Weapon · Aether", mats: "8× Soul Dust, 2× Arcane Crystal", cost: "412g", sell: "560g", margin: "+36%", conf: "78%" },
    { recipe: "Enchant Cloak · Storm",   mats: "4× Large Brilliant Shard",         cost: "368g", sell: "480g", margin: "+30%", conf: "72%" },
  ],
  tailoring: [
    { recipe: "Mageweave Bag (16)",      mats: "6× Mageweave Bolt, 2× Runecloth", cost: "168g", sell: "212g", margin: "+26%", conf: "70%" },
    { recipe: "Phaseweaver Cloak",       mats: "8× Runecloth, 2× Soul Dust",       cost: "94g",  sell: "138g", margin: "+47%", conf: "66%" },
  ],
  inscription: [
    { recipe: "Glyph of Aether",         mats: "3× Runecloth, 1× Pigment Ink",     cost: "44g",  sell: "62g",  margin: "+41%", conf: "64%" },
  ],
  jewelcrafting: [
    { recipe: "Cut Stormveil Sapphire",  mats: "1× Raw Sapphire",                  cost: "84g",  sell: "118g", margin: "+40%", conf: "69%" },
  ],
  blacksmithing: [
    { recipe: "Khorium Greaves",         mats: "4× Khorium Bar, 2× Primal Earth",  cost: "342g", sell: "418g", margin: "+22%", conf: "62%" },
  ],
  mining: [
    { recipe: "Thorium Bar (smelt)",     mats: "2× Thorium Ore",                   cost: "22g",  sell: "38g",  margin: "+72%", conf: "—" },
  ],
  engineering: [
    { recipe: "Field Repair Bot 110G",   mats: "4× Khorium Bar, 1× Power Core",    cost: "412g", sell: "498g", margin: "+20%", conf: "58%" },
  ],
  skinning: [
    { recipe: "Wyrm Scale (bundle 20)",  mats: "Field harvest · Embermire",        cost: "—",    sell: "162g", margin: "—",     conf: "—" },
  ],
};

function ProfessionsPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState<ProfKey>("alchemy");
  const current = PROFS.find((p) => p.key === active)!;
  const currentLabel = t(`professions.prof.${current.key}`);

  return (
    <div>
      <PageHeader amiIntent="explain_profession"
        title={t("professions.title")}
        subtitle={t("professions.subtitle")}
        actions={<StatusPill status="demo" hint={t("professions.statusHint")} />}
      />

      <Panel className="mb-3">
        <TabStrip
          active={active}
          onChange={(k) => setActive(k as ProfKey)}
          tabs={PROFS.map((p) => ({ key: p.key, label: t(`professions.prof.${p.key}`), icon: p.icon }))}
        />
      </Panel>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard label={t("professions.demandIndex")} value={`${current.demand}/100`} icon={Hammer} accent="primary" />
        <StatCard label={t("professions.supplyIndex")} value={`${current.supply}/100`} icon={Hammer} accent="gold" />
        <StatCard label={t("professions.avgMargin")} value={current.margin} icon={Hammer} accent="success" />
        <StatCard label={t("professions.trackedRecipes")} value={`${RECIPES_BY_PROF[active].length}`} icon={Hammer} />
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <Panel title={t("professions.activity7d", { name: currentLabel })} className="lg:col-span-2">
          <div className="h-40"><Sparkline data={[...current.spark]} color="oklch(0.78 0.20 295)" height={160} /></div>
          <div className="grid sm:grid-cols-3 gap-3 mt-4 text-xs">
            <Mini label={t("professions.activeCrafters")} value="128" />
            <Mini label={t("professions.listings24h")}  value="612" />
            <Mini label={t("professions.crossRealm")} value={t("professions.crossRealmVal")} tone="text-success" />
          </div>
        </Panel>
        <Panel title={t("professions.reagentBreakdown")}>
          <div className="space-y-2.5">
            <BarRow label="Dreamleaf"      value={84} max={100} tone="success" />
            <BarRow label="Arcane Crystal" value={72} max={100} tone="primary" />
            <BarRow label="Soul Dust"      value={58} max={100} tone="gold" />
            <BarRow label="Runecloth"      value={42} max={100} tone="primary" />
            <BarRow label="Black Lotus"    value={18} max={100} tone="danger" />
          </div>
          <div className="rune-divider my-4" />
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">{t("professions.suggestedByAmi")}</div>
          <div className="flex flex-wrap gap-1.5">
            <Badge tone="primary">{t("professions.suggestion.buyDream")}</Badge>
            <Badge tone="gold">{t("professions.suggestion.holdLotus")}</Badge>
            <Badge>{t("professions.suggestion.skipRune")}</Badge>
          </div>
        </Panel>
      </div>

      <Panel title={t("professions.topOpps", { name: currentLabel })} className="mt-3" action={<Link to="/app/signals" className="text-xs text-primary">{t("common.openInSignals")}</Link>}>
        <DataTable
          dense
          columns={[
            { key: "recipe", label: t("tableCol.recipe") },
            { key: "mats",   label: t("tableCol.materials") },
            { key: "cost",   label: t("tableCol.cost"),   align: "right" },
            { key: "sell",   label: t("tableCol.sell"),   align: "right" },
            { key: "margin", label: t("tableCol.margin"), align: "right" },
            { key: "conf",   label: t("tableCol.conf"),  align: "right" },
          ]}
          rows={RECIPES_BY_PROF[active].map((r) => ({
            recipe: <span className="font-medium">{r.recipe}</span>,
            mats: <span className="text-muted-foreground">{r.mats}</span>,
            cost: r.cost,
            sell: r.sell,
            margin: <span className="text-success">{r.margin}</span>,
            conf: r.conf,
          }))}
        />
      </Panel>

      <div className="grid lg:grid-cols-2 gap-3 mt-3">
        <Panel title={t("professions.allDvS")}>
          <div className="space-y-3">
            {PROFS.map((p) => (
              <div key={p.key} className="grid grid-cols-[120px_1fr_1fr_64px] items-center gap-3 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <p.icon className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate">{t(`professions.prof.${p.key}`)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${p.demand}%` }} />
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold to-gold/40" style={{ width: `${p.supply}%` }} />
                </div>
                <div className={`text-right ${p.margin.startsWith("-") ? "text-destructive" : "text-success"}`}>{p.margin}</div>
              </div>
            ))}
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-muted-foreground pt-2">
              <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-sm bg-primary" /> {t("professions.legendDemand")}</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-sm bg-gold" /> {t("professions.legendSupply")}</span>
              <span className="ml-auto">{t("professions.marginNote")}</span>
            </div>
          </div>
        </Panel>
        <Panel title={t("professions.amiCraftNotes")} action={<StatusPill status="beta" />}>
          <ul className="space-y-3 text-sm">
            {[
              { tone: "primary" as const, title: t("professions.note.alchemyTitle"), d: t("professions.note.alchemyBody") },
              { tone: "gold"    as const, title: t("professions.note.tailoringTitle"), d: t("professions.note.tailoringBody") },
              { tone: "danger"  as const, title: t("professions.note.engTitle"), d: t("professions.note.engBody") },
            ].map((n) => (
              <li key={n.title} className="glass rounded-xl p-3">
                <div className="flex items-center gap-2"><Badge tone={n.tone}>AMI</Badge> <span className="font-medium">{n.title}</span></div>
                <div className="text-xs text-muted-foreground mt-1">{n.d}</div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Mini({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="glass rounded-lg px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-sm font-medium ${tone ?? ""}`}>{value}</div>
    </div>
  );
}