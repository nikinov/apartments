export const locales = [
  "en", "es", "pt", "fr", "cs", "de", "it", "pl", "nl", "el", "sk", "hu",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  cs: "Čeština",
  de: "Deutsch",
  it: "Italiano",
  pl: "Polski",
  nl: "Nederlands",
  el: "Ελληνικά",
  sk: "Slovenčina",
  hu: "Magyar",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  pt: "🇵🇹",
  fr: "🇫🇷",
  cs: "🇨🇿",
  de: "🇩🇪",
  it: "🇮🇹",
  pl: "🇵🇱",
  nl: "🇳🇱",
  el: "🇬🇷",
  sk: "🇸🇰",
  hu: "🇭🇺",
};

export const localeToHtmlLang: Record<Locale, string> = {
  en: "en",
  es: "es",
  pt: "pt",
  fr: "fr",
  cs: "cs",
  de: "de",
  it: "it",
  pl: "pl",
  nl: "nl",
  el: "el",
  sk: "sk",
  hu: "hu",
};

export const localeToOgLocale: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  pt: "pt_PT",
  fr: "fr_FR",
  cs: "cs_CZ",
  de: "de_DE",
  it: "it_IT",
  pl: "pl_PL",
  nl: "nl_NL",
  el: "el_GR",
  sk: "sk_SK",
  hu: "hu_HU",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
