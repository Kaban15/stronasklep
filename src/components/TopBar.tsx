import { Truck, ShieldCheck, Clock } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        {/* Desktop - 3 USP */}
        <div className="hidden md:flex items-center justify-between max-w-5xl mx-auto h-9">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium tracking-wide">
              Darmowa dostawa od 250 zł
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium tracking-wide">
              Oryginalna chemia z Niemiec
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium tracking-wide">
              Wysyłka w 24h
            </span>
          </div>
        </div>

        {/* Mobile - 1 komunikat */}
        <div className="md:hidden flex items-center justify-center h-8">
          <span className="text-xs font-medium tracking-wide">
            🇩🇪 Oryginalna chemia z Niemiec • Wysyłka 24h
          </span>
        </div>
      </div>
    </div>
  )
}
