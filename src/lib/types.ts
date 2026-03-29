export interface Property {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  type: "apartment" | "house" | "villa";
  location: {
    city: string;
    region: string;
    country: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    areaUnit: string;
    maxGuests: number;
    floor?: number;
  };
  amenities: string[];
  highlights: string[];
  images: PropertyImage[];
  pricing: {
    perNight: number;
    perWeek?: number;
    perMonth?: number;
    currency: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email?: string;
  };
  rating?: number;
  reviewCount?: number;
  available: boolean;
  featured: boolean;
}

export interface PropertyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
