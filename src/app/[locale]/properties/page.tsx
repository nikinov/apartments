import type { Metadata } from "next";
import PropertyCard from "@/components/PropertyCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { properties } from "@/data/properties";
import { getDictionary } from "@/lib/dictionary";
import { type Locale, locales } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/constants";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.properties.pageTitle,
    description: dict.properties.pageDescription,
    openGraph: {
      title: `${dict.properties.pageTitle} | ${SITE_NAME}`,
      description: dict.properties.pageDescription,
      images: [
        {
          url: "/properties/oceanfront-apartment-tenerife/dining-ocean-view.png",
          width: 1200,
          height: 630,
          alt: dict.properties.title,
        },
      ],
    },
  };
}

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: dict.breadcrumbs.home, href: `/${locale}` },
          { label: dict.breadcrumbs.properties, href: `/${locale}/properties` },
        ]}
        ariaLabel={dict.breadcrumbs.ariaLabel}
      />

      {/* Header */}
      <section className="px-4 pt-8 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            {dict.properties.overline}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {dict.properties.title}
          </h1>
          <p className="text-lg text-gray-600">
            {dict.properties.subtitle}
          </p>
        </div>
      </section>

      {/* Property Grid */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.slug} property={property} locale={locale} dict={dict} />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              {dict.properties.noProperties}
            </p>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="px-4 mt-20 max-w-4xl mx-auto">
        <div
          className="rounded-2xl p-8 md:p-12"
          style={{ backgroundColor: "var(--color-sand)" }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {dict.properties.whyRentTitle}
          </h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p>{dict.properties.whyRentP1}</p>
            <p>{dict.properties.whyRentP2}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
