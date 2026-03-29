import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import SetHtmlLang from "@/components/SetHtmlLang";
import { generateOrganizationJsonLd } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionary";
import {
  type Locale,
  locales,
  localeToHtmlLang,
  localeToOgLocale,
  isValidLocale,
} from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1b33",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const meta = dict.meta;

  const title = `${meta.siteName} | ${meta.titleSuffix}`;
  const description = meta.siteDescription;
  const ogLocale = localeToOgLocale[locale as Locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${meta.siteName}`,
    },
    description,
    keywords: meta.keywords.split(", "),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeToOgLocale[l]),
      url: `${SITE_URL}/${locale}`,
      siteName: meta.siteName,
      title,
      description,
      images: [
        {
          url: "/properties/oceanfront-apartment-tenerife/dining-ocean-view.png",
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "/properties/oceanfront-apartment-tenerife/dining-ocean-view.png",
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [localeToOgLocale[l], `${SITE_URL}/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const htmlLang = localeToHtmlLang[locale as Locale];

  return (
    <>
      <SetHtmlLang lang={htmlLang} />
      <head>
        <JsonLd data={generateOrganizationJsonLd()} />
      </head>
      <Navbar dict={dict} locale={locale} />
      <main>{children}</main>
      <Footer dict={dict} locale={locale} />
      <WhatsAppButton dict={dict} />
    </>
  );
}
