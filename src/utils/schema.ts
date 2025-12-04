/**
 * Schema.org JSON-LD Utilities
 * Implementación de structured data para SEO
 */

export interface SchemaOrganization {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
  logo: string;
}

export interface SchemaBreadcrumb {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SchemaLocalBusiness {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  image: string;
  telephone: string;
  priceRange: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  url: string;
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
}

/**
 * Crear schema de Organización
 */
export function createOrganizationSchema(): SchemaOrganization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hotel Diva',
    description: 'Hotel de lujo con vista al mar en Mar del Plata',
    url: 'https://hoteldiva.com',
    telephone: '+54 9 223 503-3585',
    email: 'matias@hoteldiva.com.ar',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Garay 1630',
      addressLocality: 'Mar del Plata',
      addressRegion: 'Buenos Aires',
      postalCode: '7600',
      addressCountry: 'AR',
    },
    sameAs: [
      'https://www.facebook.com/hoteldiva',
      'https://www.instagram.com/hoteldiva',
      'https://www.tripadvisor.com/Hotel_Review-g317142-d123456-Reviews-Hotel_Diva-Mar_del_Plata_Buenos_Aires_Province_Pampas_Region.html',
    ],
    logo: 'https://hoteldiva.com/images/logo.png',
  };
}

/**
 * Crear schema de Local Business (Hotel)
 */
export function createLocalBusinessSchema(): SchemaLocalBusiness {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Hotel Diva',
    description: 'Luxury hotel with sea view in Mar del Plata, Argentina. Rooms, events, and dining services.',
    image: 'https://hoteldiva.com/images/hotel-main.jpg',
    telephone: '+54 9 223 503-3585',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Garay 1630',
      addressLocality: 'Mar del Plata',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -38.0036,
      longitude: -57.5599,
    },
    url: 'https://hoteldiva.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '156',
    },
  };
}

/**
 * Crear schema de Breadcrumb Navigation
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>): SchemaBreadcrumb {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Inyectar schema JSON-LD en el documento
 */
export function injectSchema(schema: SchemaOrganization | SchemaLocalBusiness | SchemaBreadcrumb, id?: string) {
  // Remover schema anterior si existe
  if (id) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id || `schema-${Date.now()}`;
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Inyectar múltiples schemas
 */
export function injectSchemas(schemas: Array<{ schema: SchemaOrganization | SchemaLocalBusiness | SchemaBreadcrumb; id?: string }>) {
  schemas.forEach(({ schema, id }) => {
    injectSchema(schema, id);
  });
}
