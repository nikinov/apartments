import { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { SITE_URL } from "@/lib/constants";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Homepage
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    // Properties listing
    entries.push({
      url: `${SITE_URL}/${locale}/properties`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // About
    entries.push({
      url: `${SITE_URL}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });

    // Contact
    entries.push({
      url: `${SITE_URL}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });

    // Individual properties
    for (const property of properties) {
      entries.push({
        url: `${SITE_URL}/${locale}/properties/${property.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
