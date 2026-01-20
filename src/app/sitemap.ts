import { MetadataRoute } from 'next'
import { pobierzProdukty } from '@/lib/airtable'

const BASE_URL = 'https://stronasklep.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Strony statyczne
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/koszyk`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    },
    {
      url: `${BASE_URL}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    },
    {
      url: `${BASE_URL}/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3
    },
    {
      url: `${BASE_URL}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4
    },
    {
      url: `${BASE_URL}/dostawa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4
    },
    {
      url: `${BASE_URL}/zwroty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3
    }
  ]

  // Dynamiczne strony produktów
  let productPages: MetadataRoute.Sitemap = []

  try {
    const produkty = await pobierzProdukty()

    productPages = produkty.map((produkt) => ({
      url: `${BASE_URL}/produkt/${produkt.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }))
  } catch (error) {
    console.error('Błąd pobierania produktów do sitemap:', error)
  }

  return [...staticPages, ...productPages]
}
