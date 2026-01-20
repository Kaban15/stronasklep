import { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Regulamin sklepu - Sklep MVP',
  description: 'Regulamin sklepu internetowego Sklep MVP. Zasady zakupów, dostawy, płatności i zwrotów.',
}

export default function RegulaminPage() {
  return (
    <LegalLayout title="Regulamin sklepu" lastUpdated="20 stycznia 2026">
      <h2>§1. Postanowienia ogólne</h2>
      <p>
        Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego Sklep MVP,
        dostępnego pod adresem stronasklep.vercel.app (dalej: „Sklep").
      </p>
      <p>
        Sklep prowadzony jest przez firmę Sklep MVP z siedzibą w Warszawie,
        ul. Przykładowa 123, 00-001 Warszawa, NIP: 1234567890.
      </p>

      <h2>§2. Definicje</h2>
      <ul>
        <li><strong>Klient</strong> – osoba fizyczna, prawna lub jednostka organizacyjna dokonująca zakupów w Sklepie.</li>
        <li><strong>Konsument</strong> – Klient będący osobą fizyczną dokonującą zakupu niezwiązanego z działalnością gospodarczą.</li>
        <li><strong>Produkt</strong> – towary oferowane w Sklepie.</li>
        <li><strong>Zamówienie</strong> – oświadczenie woli Klienta zmierzające do zawarcia umowy sprzedaży.</li>
        <li><strong>Koszyk</strong> – funkcjonalność Sklepu umożliwiająca składanie Zamówień.</li>
      </ul>

      <h2>§3. Zasady składania zamówień</h2>
      <ol>
        <li>Zamówienia można składać 24 godziny na dobę, 7 dni w tygodniu.</li>
        <li>
          W celu złożenia Zamówienia należy:
          <ul>
            <li>wybrać Produkty i dodać je do Koszyka,</li>
            <li>podać dane do dostawy,</li>
            <li>wybrać sposób płatności,</li>
            <li>potwierdzić Zamówienie przyciskiem „Zamawiam z obowiązkiem zapłaty".</li>
          </ul>
        </li>
        <li>Po złożeniu Zamówienia Klient otrzymuje e-mail z potwierdzeniem.</li>
        <li>Umowa sprzedaży zostaje zawarta z chwilą otrzymania przez Klienta potwierdzenia przyjęcia Zamówienia.</li>
      </ol>

      <h2>§4. Ceny i płatności</h2>
      <p>
        Wszystkie ceny podane w Sklepie są cenami brutto (zawierają podatek VAT)
        i wyrażone są w złotych polskich (PLN).
      </p>
      <p>Dostępne formy płatności:</p>
      <ul>
        <li><strong>Przelew bankowy</strong> – realizacja po zaksięgowaniu wpłaty.</li>
        <li><strong>Płatność przy odbiorze</strong> – gotówką lub kartą u kuriera.</li>
      </ul>

      <h2>§5. Dostawa</h2>
      <p>Dostawa realizowana jest na terenie Polski za pośrednictwem firm kurierskich.</p>
      <p>Koszty dostawy:</p>
      <ul>
        <li>Kurier – 15,00 zł</li>
        <li>Darmowa dostawa przy zamówieniach powyżej 200 zł</li>
      </ul>
      <p>
        Czas realizacji zamówienia wynosi od 1 do 3 dni roboczych od momentu
        zaksięgowania płatności lub potwierdzenia zamówienia (dla płatności przy odbiorze).
      </p>

      <h2>§6. Prawo odstąpienia od umowy</h2>
      <p>
        Konsument ma prawo odstąpić od umowy w terminie 14 dni bez podania przyczyny.
        Termin do odstąpienia od umowy wygasa po upływie 14 dni od dnia, w którym
        Konsument wszedł w posiadanie towaru.
      </p>
      <p>
        Aby skorzystać z prawa odstąpienia od umowy, Konsument musi poinformować Sklep
        o swojej decyzji w drodze jednoznacznego oświadczenia (np. pismo wysłane pocztą
        lub pocztą elektroniczną).
      </p>

      <h2>§7. Reklamacje</h2>
      <p>
        Sklep zobowiązany jest dostarczyć towar wolny od wad. W przypadku stwierdzenia
        wady towaru, Klient może złożyć reklamację.
      </p>
      <p>
        Reklamacje należy składać drogą elektroniczną na adres: kontakt@sklep-mvp.pl
        lub pisemnie na adres siedziby Sklepu.
      </p>
      <p>Reklamacja zostanie rozpatrzona w terminie 14 dni od dnia jej otrzymania.</p>

      <h2>§8. Ochrona danych osobowych</h2>
      <p>
        Administratorem danych osobowych Klientów jest Sklep MVP. Szczegółowe informacje
        dotyczące przetwarzania danych osobowych znajdują się w{' '}
        <a href="/polityka-prywatnosci">Polityce Prywatności</a>.
      </p>

      <h2>§9. Postanowienia końcowe</h2>
      <p>
        Sklep zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodzą w życie
        w momencie ich opublikowania na stronie Sklepu.
      </p>
      <p>
        W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają
        przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy
        o prawach konsumenta.
      </p>
      <p>
        Wszelkie spory wynikające z umów zawartych za pośrednictwem Sklepu będą
        rozstrzygane przez właściwe sądy powszechne.
      </p>
    </LegalLayout>
  )
}
