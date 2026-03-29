import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { type Locale, locales } from "@/lib/i18n";

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
    title: dict.about.pageTitle,
    description: dict.about.pageDescription,
  };
}

export default async function AboutPage({
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
          { label: dict.breadcrumbs.about, href: `/${locale}/about` },
        ]}
        ariaLabel={dict.breadcrumbs.ariaLabel}
      />

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ color: "var(--color-gold)" }}
              >
                {dict.about.overline}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {dict.about.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {dict.about.p1}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {dict.about.p2}
              </p>
              <Link
                href={`/${locale}/properties`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--color-gold)" }}
              >
                {dict.about.browseProperties}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/properties/oceanfront-apartment-tenerife/living-room.png"
                alt={dict.about.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "var(--color-sand)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.about.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
                    />
                  </svg>
                ),
                title: dict.about.value1Title,
                description: dict.about.value1Desc,
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
                title: dict.about.value2Title,
                description: dict.about.value2Desc,
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                title: dict.about.value3Title,
                description: dict.about.value3Desc,
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: dict.about.value4Title,
                description: dict.about.value4Desc,
              },
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    backgroundColor: "var(--color-sand)",
                    color: "var(--color-gold)",
                  }}
                >
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenerife Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {dict.about.discoverTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {dict.about.discoverDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { stat: "22-28\u00B0C", label: dict.about.stat1 },
              { stat: "300+", label: dict.about.stat2 },
              { stat: "#1", label: dict.about.stat3 },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-8"
                style={{ backgroundColor: "var(--color-sand)" }}
              >
                <p
                  className="text-4xl font-bold mb-2"
                  style={{ color: "var(--color-gold)" }}
                >
                  {item.stat}
                </p>
                <p className="text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4 text-white text-center"
        style={{
          background:
            "linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            {dict.about.ctaTitle}
          </h2>
          <p className="text-gray-300 mb-8">
            {dict.about.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/properties`}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--color-gold)", color: "white" }}
            >
              {dict.about.ctaViewProperties}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
            >
              {dict.about.ctaContactUs}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
