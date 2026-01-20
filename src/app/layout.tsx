import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSheet from '@/components/CartSheet'
import CookieConsent from '@/components/CookieConsent'
import { PostHogProvider } from '@/providers/PostHogProvider'
import { PostHogPageView } from '@/providers/PostHogPageView'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'Sklep MVP - Produkty z Niemiec',
  description: 'Chemia gospodarcza i zabawki z Niemiec w najlepszych cenach. Import oryginalnych produktów z Niemiec - szybka wysyłka 24h.',
  keywords: ['chemia z Niemiec', 'zabawki z Niemiec', 'import z Niemiec', 'chemia gospodarcza', 'produkty niemieckie'],
  authors: [{ name: 'Sklep MVP' }],
  openGraph: {
    title: 'Sklep MVP - Produkty z Niemiec',
    description: 'Chemia gospodarcza i zabawki z Niemiec w najlepszych cenach',
    url: 'https://stronasklep.vercel.app',
    siteName: 'Sklep MVP',
    locale: 'pl_PL',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
        </PostHogProvider>
      </body>
    </html>
  )
}
