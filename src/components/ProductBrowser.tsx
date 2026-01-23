'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X, ChevronDown, ChevronUp, ArrowUpDown, Search } from 'lucide-react'
import ProductCard from './ProductCard'
import type { Produkt } from '@/lib/airtable'

interface ProductBrowserProps {
  products: Produkt[]
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc'

export default function ProductBrowser({ products }: ProductBrowserProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true
  })

  // Extract unique categories and brands from products
  const { categories, brands } = useMemo(() => {
    const cats = new Set<string>()
    const brs = new Set<string>()

    products.forEach((p) => {
      if (p.category) cats.add(p.category)
      if (p.brand) brs.add(p.brand)
    })

    return {
      categories: Array.from(cats).sort(),
      brands: Array.from(brs).sort()
    }
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by search query (has priority - ignores category/brand filters when searching)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((p) =>
        p.nazwa.toLowerCase().includes(query) ||
        p.opis?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query)
      )
    } else {
      // Only apply category/brand filters when not searching
      // Filter by category
      if (selectedCategories.length > 0) {
        result = result.filter((p) => p.category && selectedCategories.includes(p.category))
      }

      // Filter by brand
      if (selectedBrands.length > 0) {
        result = result.filter((p) => p.brand && selectedBrands.includes(p.brand))
      }
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.cena - b.cena)
        break
      case 'price-desc':
        result.sort((a, b) => b.cena - a.cena)
        break
      case 'name-asc':
        result.sort((a, b) => a.nazwa.localeCompare(b.nazwa, 'pl'))
        break
    }

    return result
  }, [products, selectedCategories, selectedBrands, sortBy, searchQuery])

  // Get available options based on current filters (dynamic counting)
  const availableOptions = useMemo(() => {
    // Products after brand filter only (for category counts)
    const afterBrandFilter = selectedBrands.length > 0
      ? products.filter((p) => p.brand && selectedBrands.includes(p.brand))
      : products

    // Products after category filter only (for brand counts)
    const afterCategoryFilter = selectedCategories.length > 0
      ? products.filter((p) => p.category && selectedCategories.includes(p.category))
      : products

    const categoryCounts: Record<string, number> = {}
    const brandCounts: Record<string, number> = {}

    afterBrandFilter.forEach((p) => {
      if (p.category) {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1
      }
    })

    afterCategoryFilter.forEach((p) => {
      if (p.brand) {
        brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1
      }
    })

    return { categoryCounts, brandCounts }
  }, [products, selectedCategories, selectedBrands])

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSortBy('default')
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0

  const toggleSection = (section: 'categories' | 'brands') => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // Filter sidebar content (shared between desktop and mobile)
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h3 className="text-sm font-semibold text-slate-900">Kategoria</h3>
            {expandedSections.categories ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>
          {expandedSections.categories && (
            <div className="space-y-2">
              {categories.map((cat) => {
                const count = availableOptions.categoryCounts[cat] || 0
                const isDisabled = count === 0 && !selectedCategories.includes(cat)

                return (
                  <label
                    key={cat}
                    className={`flex items-center gap-2 cursor-pointer ${
                      isDisabled ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => !isDisabled && toggleCategory(cat)}
                      disabled={isDisabled}
                      className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700 flex-1">{cat}</span>
                    <span className="text-xs text-slate-400">({count})</span>
                  </label>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('brands')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h3 className="text-sm font-semibold text-slate-900">Marka</h3>
            {expandedSections.brands ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>
          {expandedSections.brands && (
            <div className="space-y-2">
              {brands.map((brand) => {
                const count = availableOptions.brandCounts[brand] || 0
                const isDisabled = count === 0 && !selectedBrands.includes(brand)

                return (
                  <label
                    key={brand}
                    className={`flex items-center gap-2 cursor-pointer ${
                      isDisabled ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => !isDisabled && toggleBrand(brand)}
                      disabled={isDisabled}
                      className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700 flex-1">{brand}</span>
                    <span className="text-xs text-slate-400">({count})</span>
                  </label>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Clear filters button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors"
        >
          Wyczyść filtry
        </button>
      )}
    </div>
  )

  return (
    <div>
      {/* Mobile Filter Bar */}
      <div className="md:hidden mb-4 flex gap-2">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            hasActiveFilters
              ? 'bg-emerald-600 text-white'
              : 'bg-white border border-slate-200 text-slate-700'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtruj
          {hasActiveFilters && (
            <span className="bg-white text-emerald-600 text-xs font-bold px-1.5 py-0.5 rounded">
              {selectedCategories.length + selectedBrands.length}
            </span>
          )}
        </button>

        {/* Mobile Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="flex-1 px-3 py-2.5 rounded-lg text-sm border border-slate-200 bg-white text-slate-700"
        >
          <option value="default">Domyślne</option>
          <option value="price-asc">Cena: rosnąco</option>
          <option value="price-desc">Cena: malejąco</option>
          <option value="name-asc">Nazwa: A-Z</option>
        </select>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer - from bottom, above mobile nav */}
          <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Filtry</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Filter content */}
            <div className="p-4">
              <FilterContent />
            </div>

            {/* Apply button */}
            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
              >
                Pokaż {filteredProducts.length} produktów
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-4 bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Filtry</h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Wyczyść
                </button>
              )}
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Desktop Sort & Results Count */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <p className="text-sm text-slate-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produkt' : filteredProducts.length < 5 ? 'produkty' : 'produktów'}
            </p>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm border-0 bg-transparent text-slate-700 cursor-pointer focus:ring-0"
              >
                <option value="default">Domyślne</option>
                <option value="price-asc">Cena: rosnąco</option>
                <option value="price-desc">Cena: malejąco</option>
                <option value="name-asc">Nazwa: A-Z</option>
              </select>
            </div>
          </div>

          {/* Search Results Banner */}
          {searchQuery && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Wyniki wyszukiwania dla: <strong>&quot;{searchQuery}&quot;</strong>
                </span>
              </div>
              <a
                href="/"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Wyczyść
              </a>
            </div>
          )}

          {/* Active Filters Pills */}
          {hasActiveFilters && !searchQuery && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full hover:bg-emerald-100 transition-colors"
                >
                  {cat}
                  <X className="w-3 h-3" />
                </button>
              ))}
              {selectedBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-colors"
                >
                  {brand}
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} produkt={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-slate-100">
              <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-2">Brak produktów</p>
              <p className="text-slate-400 text-sm mb-4">
                Spróbuj zmienić kryteria filtrowania
              </p>
              <button
                onClick={clearFilters}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
