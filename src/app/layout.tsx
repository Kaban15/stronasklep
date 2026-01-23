import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ClerkProvider } from '@clerk/nextjs'
import { plPL } from '@clerk/localizations'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSheet from '@/components/CartSheet'
import CookieConsent from '@/components/CookieConsent'
import { PostHogProvider } from '@/providers/PostHogProvider'
import { PostHogPageView } from '@/providers/PostHogPageView'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: {
    default: 'Chemia z Niemiec - Tanie Proszki i Żele | Sklep Online',
    template: '%s | Chemia z Niemiec'
  },
  description: 'Oryginalna chemia gospodarcza z Niemiec. Najniższe ceny za pranie, wysyłka 24h. Sprawdź Persil, Ariel i inne marki.',
  keywords: ['chemia z Niemiec', 'Persil', 'Ariel', 'Lenor', 'proszki do prania', 'żele do prania', 'środki czystości', 'import z Niemiec', 'tanie pranie'],
  authors: [{ name: 'Chemia z Niemiec' }],
  openGraph: {
    title: 'Chemia z Niemiec - Tanie Proszki i Żele | Sklep Online',
    description: 'Oryginalna chemia gospodarcza z Niemiec. Najniższe ceny za pranie, wysyłka 24h. Sprawdź Persil, Ariel i inne marki.',
    url: 'https://stronasklep.vercel.app',
    siteName: 'Chemia z Niemiec',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: 'https://stronasklep.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chemia z Niemiec - Sklep Online'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chemia z Niemiec - Tanie Proszki i Żele',
    description: 'Oryginalna chemia gospodarcza z Niemiec. Najniższe ceny za pranie, wysyłka 24h.',
    images: ['https://stronasklep.vercel.app/og-image.png']
  },
  robots: {
    index: true,
    follow: true
  },
  metadataBase: new URL('https://stronasklep.vercel.app')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={plPL}>
      <html lang="pl">
        <body className={inter.className}>
          <PostHogProvider>
            <PostHogPageView />
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <CartSheet />
            <CookieConsent />
            <Toaster position="top-center" richColors />
          </PostHogProvider>
          <GoogleAnalytics gaId="G-Q3GVLLDCR3" />
        </body>
      </html>
    </ClerkProvider>
  )
}
