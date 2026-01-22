interface ProductSchemaProps {
  nazwa: string
  opis: string
  cena: number
  obrazek: string
}

export default function ProductSchema({ nazwa, opis, cena, obrazek }: ProductSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: nazwa,
    description: opis,
    image: obrazek,
    offers: {
      '@type': 'Offer',
      price: cena.toFixed(2),
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
