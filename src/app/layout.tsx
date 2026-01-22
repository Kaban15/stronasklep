import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSheet from '@/components/CartSheet'
import CookieConsent from '@/components/CookieConsent'
import { PostHogProvider } from '@/providers/PostHogProvider'
import { PostHogPageView } from '@/providers/PostHogPageView'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'SklepMVP - Oryginalna Chemia z Niemiec | Import DE',
  description: 'Najlepsze proszki, płyny i środki czystości prosto z Niemiec. Persil, Ariel, Lenor. Szybka wysyłka w 24h.',
  keywords: ['chemia z Niemiec', 'Persil', 'Ariel', 'Lenor', 'proszki do prania', 'środki czystości', 'import z Niemiec'],
  authors: [{ name: 'SklepMVP' }],
  openGraph: {
    title: 'SklepMVP - Oryginalna Chemia z Niemiec | Import DE',
    description: 'Najlepsze proszki, płyny i środki czystości prosto z Niemiec. Persil, Ariel, Lenor. Szybka wysyłka w 24h.',
    url: 'https://stronasklep.vercel.app',
    siteName: 'SklepMVP',
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
        <GoogleAnalytics gaId="G-Q3GVLLDCR3" />
      </body>
    </html>
  )
}
