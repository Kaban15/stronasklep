# PROJECT MEMORY - Sklep MVP

> Ten plik służy jako pamięć projektu. Czytaj go PRZED podjęciem działań.

## Status projektu
- [x] KROK 1: Konfiguracja środowiska ✅ UKOŃCZONY
- [x] KROK 2: Struktura bazy Airtable ✅ UKOŃCZONY
- [x] KROK 3: Logika n8n (backend) ✅ UKOŃCZONY
- [x] KROK 4: Frontend Next.js ✅ UKOŃCZONY

## Klucze API
Lokalizacja: `.env.local`
- Airtable Token: ✅ skonfigurowany
- Airtable Base ID: ✅ `appbPeVGuTpCNJ2U8`
- n8n API Key: ✅ skonfigurowany
- n8n URL: ✅ `https://n8n.kaban.click`

## n8n Workflow
- Webhook URL: `https://n8n.kaban.click/webhook/nowe-zamowienie`
- Workflow ID: `lrsNGMzUiAWWmMp9`
- Status: Aktywny

---

## Struktura Airtable

### Tabela: Produkty
| Pole | Typ | Opis |
|------|-----|------|
| Nazwa | Single line text | Nazwa produktu |
| Opis | Long text | Opis produktu |
| Cena | Currency (PLN) | Cena jednostkowa |
| Zdjecia | Attachment | Zdjęcia produktu |
| IloscMagazynowa | Number (integer) | Stan magazynowy |
| Kategoria | Single select | chemia / zabawki |
| Status | Single select | aktywny / nieaktywny / wyprzedany |

### Tabela: Klienci
| Pole | Typ | Opis |
|------|-----|------|
| Email | Email | Email klienta (unikalny) |
| HasloHash | Single line text | Zahashowane hasło |
| Imie | Single line text | Imię |
| Nazwisko | Single line text | Nazwisko |
| Telefon | Phone | Numer telefonu |
| Adres | Long text | Adres dostawy |
| KodPolecajacyWlasny | Single line text | Unikalny kod do polecania |
| KtoPolecil | Link to Klienci | Kto polecił tego klienta |
| PunktyLojalnosciowe | Number | Punkty za polecenia |
| DataRejestracji | Created time | Auto |

### Tabela: Zamowienia
| Pole | Typ | Opis |
|------|-----|------|
| NumerZamowienia | Autonumber | Auto ID |
| Klient | Link to Klienci | Powiązanie (lub null dla gościa) |
| EmailGosc | Email | Email jeśli zakup jako gość |
| Produkty | Link to Produkty | Zamówione produkty |
| IlosciProduktow | Long text | JSON z ilościami |
| KwotaCalkowita | Currency (PLN) | Suma zamówienia |
| Status | Single select | nowe / oplacone / wysłane / dostarczone / anulowane |
| MetodaPlatnosci | Single select | przelew / przy_odbiorze |
| UzytyKodRabatowy | Link to KodyRabatowe | Użyty kod |
| WartoscRabatu | Currency (PLN) | Kwota rabatu |
| AdresDostawy | Long text | Adres |
| DataZamowienia | Created time | Auto |
| Notatki | Long text | Notatki wewnętrzne |

### Tabela: KodyRabatowe
| Pole | Typ | Opis |
|------|-----|------|
| Kod | Single line text | Kod rabatowy (unikalny) |
| Typ | Single select | procent / kwota |
| Wartosc | Number | Wartość (% lub PLN) |
| MinimalnaKwota | Currency (PLN) | Min. wartość zamówienia |
| DataWaznosci | Date | Do kiedy ważny |
| LimitUzyc | Number | Max użyć (null = bez limitu) |
| IleRazyUzyty | Number | Licznik użyć |
| Aktywny | Checkbox | Czy aktywny |
| DlaKlienta | Link to Klienci | Jeśli kod personalny |

---

## Struktura plików projektu
```
stronasklep/
├── .env.local              # Klucze API (NIE COMMITOWAĆ)
├── .claudeignore           # Pliki do ignorowania
├── PROJECT_MEMORY.md       # Ten plik
├── package.json            # Zależności npm
├── next.config.js          # Konfiguracja Next.js
├── tailwind.config.ts      # Konfiguracja Tailwind CSS
├── tsconfig.json           # Konfiguracja TypeScript
│
├── deploy_n8n.js           # Skrypt do deploymentu workflow n8n
├── setup_airtable.js       # Skrypt do tworzenia tabel Airtable
│
├── n8n_workflows/          # Definicje workflow JSON
│   └── nowe_zamowienie.json
│
└── src/
    ├── app/                # Next.js App Router
    │   ├── layout.tsx      # Layout główny
    │   ├── page.tsx        # Strona główna (lista produktów)
    │   ├── globals.css     # Style globalne
    │   │
    │   ├── produkt/[id]/   # Strona pojedynczego produktu
    │   │   ├── page.tsx
    │   │   └── AddToCartButton.tsx
    │   │
    │   ├── koszyk/         # Strona koszyka
    │   │   └── page.tsx
    │   │
    │   ├── checkout/       # Strona finalizacji zamówienia
    │   │   └── page.tsx
    │   │
    │   └── api/
    │       └── zamowienie/ # API endpoint dla zamówień
    │           └── route.ts
    │
    ├── components/         # Komponenty React
    │   ├── CartContext.tsx # Context dla koszyka
    │   ├── Header.tsx      # Nagłówek strony
    │   └── ProductCard.tsx # Karta produktu
    │
    └── lib/
        └── airtable.ts     # Klient API Airtable
```

---

## Kluczowe ustalenia
1. Płatności: tylko przelew i przy odbiorze (bez bramki)
2. Zdjęcia: przechowywane w Airtable (Attachment)
3. System poleceń: klient dostaje unikalny kod, za każde polecenie dostaje rabat
4. n8n: deployment przez API (skrypt deploy_n8n.js)

---

## Komendy

```bash
# Uruchom lokalnie (development)
npm run dev

# Zbuduj produkcję
npm run build

# Uruchom produkcję
npm start

# Wgraj workflow na n8n
npm run deploy:n8n

# Stwórz tabele w Airtable
npm run setup:airtable
```

---

## Następne kroki (TODO)
1. [ ] Dodać testowe produkty w Airtable
2. [ ] Skonfigurować SMTP w n8n (wysyłanie emaili)
3. [ ] Deploy na Vercel
4. [ ] Dodać system rejestracji/logowania klientów
5. [ ] Dodać system poleceń (referral)

---

## Ostatnia aktualizacja
Data: 2026-01-16
Status: MVP UKOŃCZONE! Wszystkie 4 kroki zrealizowane.
