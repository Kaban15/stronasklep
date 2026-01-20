import { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight, ArrowLeft } from 'lucide-react'

interface LegalLayoutProps {
  children: ReactNode
  title: string
  lastUpdated?: string
}

export default function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
              Sklep
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-medium">{title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {title}
            </h1>
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Ostatnia aktualizacja: {lastUpdated}
              </p>
            )}
          </div>

          {/* Prose content */}
          <article className="prose prose-slate prose-lg max-w-none">
            {children}
          </article>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do sklepu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
