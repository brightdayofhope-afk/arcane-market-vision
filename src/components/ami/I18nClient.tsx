import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Client-only language sync. Runs once after hydration so SSR and the
 * first client render always agree on "en" (preventing hydration mismatch),
 * then switches to the user's preferred language if different.
 */
export function I18nClient() {
  const { i18n } = useTranslation();
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("ami-lang");
      const nav = window.navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "en";
      const target = stored === "ru" || stored === "en" ? stored : nav;
      if (target && target !== i18n.language) {
        i18n.changeLanguage(target);
      }
    } catch {
      /* ignore */
    }
  }, [i18n]);
  return null;
}