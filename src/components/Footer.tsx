import Link from 'next/link'
import { Mail, Phone, Clock, Facebook, Instagram, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Główna sekcja stopki */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Kolumna 1: O nas */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">O nas</h3>
            <p className="text-sm leading-relaxed mb-4">
              Specjalizujemy się w imporcie wysokiej jakości chemii gospodarczej
              i zabawek prosto z Niemiec. Oferujemy oryginalne produkty w
              najlepszych cenach z szybką dostawą w całej Polsce.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Kolumna 2: Pomoc */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Pomoc</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/status-zamowienia"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  Status zamówienia
                </Link>
              </li>
              <li>
                <Link
                  href="/zwroty"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  Zwroty i reklamacje
                </Link>
              </li>
              <li>
                <Link
                  href="/dostawa"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  Metody dostawy
                </Link>
              </li>
              <li>
                <Link
                  href="/platnosci"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  Formy płatności
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolumna 3: Informacje */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Informacje</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/regulamin"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  Regulamin sklepu
                </Link>
              </li>
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/o-nas"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  O firmie
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolumna 4: Kontakt */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300">E-mail</p>
                  <a
                    href="mailto:kontakt@sklep-mvp.pl"
                    className="text-sm hover:text-emerald-400 transition-colors"
                  >
                    kontakt@sklep-mvp.pl
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300">Telefon</p>
                  <a
                    href="tel:+48123456789"
                    className="text-sm hover:text-emerald-400 transition-colors"
                  >
                    +48 123 456 789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300">Godziny otwarcia</p>
                  <p className="text-sm">Pon-Pt: 9:00 - 17:00</p>
                  <p className="text-sm">Sob: 10:00 - 14:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300">Adres</p>
                  <p className="text-sm">ul. Przykładowa 123</p>
                  <p className="text-sm">00-001 Warszawa</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dolna sekcja - copyright */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-center md:text-left">
              © {currentYear} Sklep MVP. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-500">Płatności:</span>
              <div className="flex items-center gap-2">
                <span className="bg-slate-800 px-2 py-1 rounded text-xs">BLIK</span>
                <span className="bg-slate-800 px-2 py-1 rounded text-xs">Przelew</span>
                <span className="bg-slate-800 px-2 py-1 rounded text-xs">Za pobraniem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
