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
  bookings: Booking[];
  rating?: number;
  reviewCount?: number;
  available: boolean;
  featured: boolean;
}

export interface Booking {
  startDate: string; // ISO date string YYYY-MM-DD
  endDate: string;   // ISO date string YYYY-MM-DD
}

export interface PropertyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
