import type { Locale } from "./i18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  pt: () => import("@/dictionaries/pt.json").then((m) => m.default),
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
  cs: () => import("@/dictionaries/cs.json").then((m) => m.default),
  de: () => import("@/dictionaries/de.json").then((m) => m.default),
  it: () => import("@/dictionaries/it.json").then((m) => m.default),
  pl: () => import("@/dictionaries/pl.json").then((m) => m.default),
  nl: () => import("@/dictionaries/nl.json").then((m) => m.default),
  el: () => import("@/dictionaries/el.json").then((m) => m.default),
  sk: () => import("@/dictionaries/sk.json").then((m) => m.default),
  hu: () => import("@/dictionaries/hu.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
