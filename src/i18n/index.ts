import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ru from "./ru.json";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: { en: { translation: en }, ru: { translation: ru } },
      lng: "en",
      fallbackLng: "en",
      supportedLngs: ["en", "ru"],
      interpolation: { escapeValue: false },
    });
}

// Client-only language detection — runs after hydration so SSR and the
// first client render always agree on "en" (prevents hydration mismatch).
if (typeof window !== "undefined") {
  try {
    const stored = window.localStorage.getItem("ami-lang");
    const nav = window.navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "en";
    const target = stored === "ru" || stored === "en" ? stored : nav;
    if (target && target !== i18n.language) {
      // Defer to next tick so it happens after React hydration completes.
      queueMicrotask(() => i18n.changeLanguage(target));
    }
  } catch {
    /* ignore */
  }
}

export default i18n;