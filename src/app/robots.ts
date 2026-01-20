import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout', '/thank-you']
      }
    ],
    sitemap: 'https://stronasklep.vercel.app/sitemap.xml'
  }
}
