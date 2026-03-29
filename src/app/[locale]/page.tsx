import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import JsonLd from "@/components/JsonLd";
import { getFeaturedProperties, properties } from "@/data/properties";
import { generateFAQJsonLd } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionary";
import { type Locale, locales } from "@/lib/i18n";
import Link from "next/link";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const featured = getFeaturedProperties();

  const faqs = [
    { question: dict.home.faq1Q, answer: dict.home.faq1A },
    { question: dict.home.faq2Q, answer: dict.home.faq2A },
    { question: dict.home.faq3Q, answer: dict.home.faq3A },
    { question: dict.home.faq4Q, answer: dict.home.faq4A },
    { question: dict.home.faq5Q, answer: dict.home.faq5A },
    { question: dict.home.faq6Q, answer: dict.home.faq6A },
  ];

  return (
    <>
      <JsonLd data={generateFAQJsonLd(faqs)} />

      <Hero dict={dict} locale={locale} />

      {/* Navy-to-sand transition from hero */}
      <div
        className="h-24 -mt-1"
        style={{ background: "linear-gradient(to bottom, var(--color-navy) 0%, var(--color-sand) 100%)" }}
        aria-hidden="true"
      />

      {/* Featured Properties */}
      <section className="py-20 px-4" style={{ backgroundColor: "var(--color-sand)" }} id="properties">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-gold)" }}
            >
              {dict.home.featuredOverline}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {dict.home.featuredTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.home.featuredSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((property) => (
              <PropertyCard key={property.slug} property={property} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "var(--color-sand)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-gold)" }}
            >
              {dict.home.whyOverline}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {dict.home.whyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: dict.home.whyFeature1Title,
                description: dict.home.whyFeature1Desc,
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: dict.home.whyFeature2Title,
                description: dict.home.whyFeature2Desc,
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
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                ),
                title: dict.home.whyFeature3Title,
                description: dict.home.whyFeature3Desc,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    backgroundColor: "var(--color-sand)",
                    color: "var(--color-gold)",
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-gold)" }}
            >
              {dict.home.faqOverline}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {dict.home.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className="w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4 text-white text-center"
        style={{
          background:
            "linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {dict.home.ctaTitle}
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            {dict.home.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/properties`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--color-gold)", color: "white" }}
            >
              {dict.home.ctaViewProperties}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
            >
              {dict.home.ctaGetInTouch}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
