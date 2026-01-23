import Image from 'next/image'
import Link from 'next/link'
import { Truck } from 'lucide-react'

export default function HeroGrid() {
  return (
    <section className="bg-gray-50 py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[500px]">

            {/* Main Banner - 2 cols x 2 rows */}
            <Link
              href="/#produkty"
              className="relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden group min-h-[280px] md:min-h-0 cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=1200"
                alt="Niemiecka jakość prania"
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 w-fit">
                  Bestseller
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  Niemiecka Jakość Prania
                </h2>
                <p className="text-white/80 text-sm md:text-base mb-4 max-w-md">
                  Oryginalne proszki i żele Persil, Ariel.
                </p>
                <span className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors w-fit text-sm">
                  Zobacz ofertę
                </span>
              </div>
            </Link>

            {/* Top Right Banner - 2 cols x 1 row */}
            <Link
              href="/#produkty"
              className="relative md:col-span-2 rounded-xl overflow-hidden group min-h-[200px] md:min-h-0 cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
                alt="Dom lśniący czystością"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                <span className="inline-block bg-emerald-500/90 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded mb-2 w-fit">
                  Nowości
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Dom lśniący czystością
                </h3>
                <p className="text-white/70 text-sm">
                  Środki do sprzątania premium
                </p>
              </div>
            </Link>

            {/* Bottom Right Banner - 2 cols x 1 row (Dark background) */}
            <Link
              href="/#produkty"
              className="relative md:col-span-2 rounded-xl overflow-hidden bg-slate-900 min-h-[160px] md:min-h-0 cursor-pointer group"
            >
              {/* Truck watermark icon */}
              <div className="absolute right-4 bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Truck className="w-32 h-32 md:w-40 md:h-40 text-white" strokeWidth={1} />
              </div>

              {/* Content */}
              <div className="relative h-full p-5 md:p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                    Promocja
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Darmowa Dostawa
                </h3>
                <p className="text-slate-400 text-sm">
                  Przy zamówieniach powyżej 250 zł
                </p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}
