'use client'

import { useState } from 'react'
import { ChevronDown, FileText, AlertTriangle, Truck } from 'lucide-react'

interface Props {
  opis: string
  kategoria: string
}

interface AccordionItemProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ title, icon, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left hover:bg-gray-50 transition-colors px-1"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-400">{icon}</span>
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <div className="px-1 text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ProductTabs({ opis, kategoria }: Props) {
  const [openItem, setOpenItem] = useState<string | null>('opis')

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item)
  }

  // Informacje o składzie w zależności od kategorii
  const skladInfo = kategoria === 'chemia'
    ? {
        title: 'Skład i bezpieczeństwo',
        content: (
          <div className="space-y-4">
            <p>
              Szczegółowy skład produktu znajduje się na opakowaniu. Produkt importowany
              z Niemiec może mieć etykietę w języku niemieckim.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">Ostrzeżenie</p>
                  <p>
                    Przechowywać w miejscu niedostępnym dla dzieci. Przed użyciem
                    zapoznać się z instrukcją na opakowaniu. W przypadku kontaktu
                    z oczami natychmiast przemyć dużą ilością wody.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    : {
        title: 'Informacje o produkcie',
        content: (
          <div className="space-y-4">
            <p>
              Produkt importowany z Niemiec. Instrukcja może być w języku niemieckim.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Materiały zgodne z normami EU</li>
              <li>Odpowiednie dla określonej grupy wiekowej (sprawdź opakowanie)</li>
              <li>Przed użyciem sprawdź kompletność zestawu</li>
            </ul>
          </div>
        )
      }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6">
        {/* Opis produktu */}
        <AccordionItem
          title="Opis produktu"
          icon={<FileText className="w-5 h-5" />}
          isOpen={openItem === 'opis'}
          onToggle={() => toggleItem('opis')}
        >
          <p className="whitespace-pre-line">{opis}</p>
        </AccordionItem>

        {/* Skład / Info */}
        <AccordionItem
          title={skladInfo.title}
          icon={<AlertTriangle className="w-5 h-5" />}
          isOpen={openItem === 'sklad'}
          onToggle={() => toggleItem('sklad')}
        >
          {skladInfo.content}
        </AccordionItem>

        {/* Dostawa */}
        <AccordionItem
          title="Dostawa i płatność"
          icon={<Truck className="w-5 h-5" />}
          isOpen={openItem === 'dostawa'}
          onToggle={() => toggleItem('dostawa')}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Metody dostawy</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span>Kurier DPD</span>
                  <span className="font-medium">od 15 zł</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span>InPost Paczkomaty</span>
                  <span className="font-medium">od 12 zł</span>
                </li>
                <li className="flex items-center justify-between py-2">
                  <span>Odbiór osobisty</span>
                  <span className="font-medium text-emerald-600">bezpłatnie</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Metody płatności</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Przelew bankowy</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Płatność przy odbiorze (+ 5 zł)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <p className="font-semibold text-gray-900 mb-1">Czas realizacji</p>
              <p className="text-gray-600">
                Zamówienia złożone do godziny 14:00 wysyłamy tego samego dnia roboczego.
                Standardowy czas dostawy to 1-2 dni robocze.
              </p>
            </div>
          </div>
        </AccordionItem>
      </div>
    </div>
  )
}
