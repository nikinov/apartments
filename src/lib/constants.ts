export const SITE_NAME = "Tenerife Luxury Rentals";
export const SITE_DESCRIPTION =
  "Premium oceanfront apartments and luxury holiday homes for rent in Tenerife, Canary Islands. Direct from owner with stunning ocean views.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tenerife-luxury-rentals.vercel.app";
export const SITE_LOCALE = "en_US";
export const SITE_TWITTER = "@tenerifeLuxury";

export const CONTACT_PHONE = "+34 644 849 648";
export const CONTACT_WHATSAPP = "34644849648";
export const CONTACT_EMAIL = "contact@tenerife-rentals.com";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
