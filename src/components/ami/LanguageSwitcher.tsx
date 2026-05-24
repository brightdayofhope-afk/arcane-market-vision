import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === "ru" ? "ru" : "en";

  const set = (l: "en" | "ru") => {
    if (l !== lang) i18n.changeLanguage(l);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 glass rounded-full px-1.5 py-1 text-[11px]",
        className,
      )}
      aria-label="Language switcher"
    >
      <Languages className="h-3.5 w-3.5 text-muted-foreground ml-1" />
      <button
        type="button"
        onClick={() => set("en")}
        className={cn(
          "px-2 py-0.5 rounded-full transition-colors",
          lang === "en"
            ? "bg-primary/20 text-foreground glow-border"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => set("ru")}
        className={cn(
          "px-2 py-0.5 rounded-full transition-colors",
          lang === "ru"
            ? "bg-primary/20 text-foreground glow-border"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-pressed={lang === "ru"}
      >
        RU
      </button>
    </div>
  );
}