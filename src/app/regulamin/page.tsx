import { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Regulamin sklepu - SklepMVP',
  description: 'Regulamin sklepu internetowego SklepMVP. Zasady zakupów chemii gospodarczej z Niemiec, dostawy, płatności i zwrotów.',
}

export default function RegulaminPage() {
  return (
    <LegalLayout title="Regulamin sklepu" lastUpdated="21 stycznia 2026">
      <h2>§1. Postanowienia ogólne</h2>
      <p>
        Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego SklepMVP,
        dostępnego pod adresem <strong>stronasklep.vercel.app</strong> (dalej: „Sklep").
      </p>
      <p>
        Sklep prowadzony jest przez:
      </p>
      <ul>
        <li><strong>Nazwa firmy:</strong> [TUTAJ WPISZ NAZWĘ FIRMY]</li>
        <li><strong>Adres:</strong> [TUTAJ WPISZ ADRES SIEDZIBY]</li>
        <li><strong>NIP:</strong> [TUTAJ WPISZ NIP]</li>
        <li><strong>REGON:</strong> [TUTAJ WPISZ REGON]</li>
        <li><strong>Email:</strong> [TUTAJ WPISZ EMAIL KONTAKTOWY]</li>
        <li><strong>Telefon:</strong> [TUTAJ WPISZ NUMER TELEFONU]</li>
      </ul>
      <p>
        Sklep specjalizuje się w sprzedaży <strong>oryginalnej chemii gospodarczej importowanej z Niemiec</strong>,
        w tym proszków do prania, płynów do płukania, środków czystości i innych produktów
        renomowanych marek takich jak Persil, Ariel, Lenor i inne.
      </p>

      <h2>§2. Definicje</h2>
      <ul>
        <li><strong>Klient</strong> – osoba fizyczna posiadająca pełną zdolność do czynności prawnych, osoba prawna lub jednostka organizacyjna dokonująca zakupów w Sklepie.</li>
        <li><strong>Konsument</strong> – Klient będący osobą fizyczną dokonującą zakupu niezwiązanego bezpośrednio z jej działalnością gospodarczą lub zawodową.</li>
        <li><strong>Produkt</strong> – chemia gospodarcza i inne towary oferowane w Sklepie.</li>
        <li><strong>Zamówienie</strong> – oświadczenie woli Klienta zmierzające do zawarcia umowy sprzedaży Produktu.</li>
        <li><strong>Koszyk</strong> – funkcjonalność Sklepu umożliwiająca składanie Zamówień i podgląd wybranych Produktów.</li>
        <li><strong>Dzień roboczy</strong> – każdy dzień od poniedziałku do piątku, z wyłączeniem dni ustawowo wolnych od pracy.</li>
      </ul>

      <h2>§3. Składanie zamówień</h2>
      <ol>
        <li>Zamówienia można składać przez całą dobę, 7 dni w tygodniu za pośrednictwem strony internetowej Sklepu.</li>
        <li>
          W celu złożenia Zamówienia należy:
          <ul>
            <li>wybrać Produkty i dodać je do Koszyka,</li>
            <li>przejść do procesu finalizacji zamówienia,</li>
            <li>podać dane osobowe i adres dostawy,</li>
            <li>wybrać sposób płatności,</li>
            <li>zaakceptować Regulamin,</li>
            <li>potwierdzić Zamówienie przyciskiem „Złóż zamówienie".</li>
          </ul>
        </li>
        <li>Po złożeniu Zamówienia Klient otrzymuje na podany adres e-mail automatyczne potwierdzenie przyjęcia Zamówienia wraz z jego szczegółami.</li>
        <li>Umowa sprzedaży zostaje zawarta z chwilą potwierdzenia przyjęcia Zamówienia do realizacji przez Sklep.</li>
        <li>Sklep zastrzega sobie prawo do odmowy realizacji Zamówienia w przypadku podania nieprawdziwych lub niekompletnych danych.</li>
      </ol>

      <h2>§4. Ceny i płatności</h2>
      <p>
        Wszystkie ceny podane w Sklepie są cenami brutto (zawierają podatek VAT 23%)
        i wyrażone są w złotych polskich (PLN). Ceny nie zawierają kosztów dostawy.
      </p>
      <p><strong>Dostępne formy płatności:</strong></p>
      <ul>
        <li>
          <strong>Przelew tradycyjny</strong> – dane do przelewu zostaną przesłane w wiadomości
          e-mail z potwierdzeniem zamówienia. Realizacja zamówienia rozpoczyna się po
          zaksięgowaniu wpłaty na koncie Sklepu.
        </li>
        <li>
          <strong>Płatność przy odbiorze (pobranie)</strong> – Klient płaci gotówką lub kartą
          kurierowi przy odbiorze przesyłki. Za tę formę płatności naliczana jest dodatkowa
          opłata w wysokości <strong>5,00 zł</strong>.
        </li>
      </ul>
      <p>
        Sklep zastrzega sobie prawo do zmiany cen Produktów, wprowadzania nowych Produktów
        do oferty oraz przeprowadzania akcji promocyjnych. Zmiany nie dotyczą Zamówień
        już złożonych.
      </p>

      <h2>§5. Dostawa</h2>
      <p>
        Dostawa realizowana jest wyłącznie na terenie Rzeczypospolitej Polskiej
        za pośrednictwem profesjonalnych firm kurierskich.
      </p>
      <p><strong>Koszty dostawy:</strong></p>
      <ul>
        <li>Przesyłka kurierska – <strong>15,00 zł</strong></li>
        <li>Opłata za płatność przy odbiorze – <strong>5,00 zł</strong> (doliczana do kosztu dostawy)</li>
      </ul>
      <p><strong>Czas realizacji:</strong></p>
      <ul>
        <li>Zamówienia opłacone przelewem – wysyłka w ciągu 1-2 dni roboczych od zaksięgowania płatności.</li>
        <li>Zamówienia za pobraniem – wysyłka w ciągu 1-2 dni roboczych od potwierdzenia zamówienia.</li>
        <li>Standardowy czas dostawy kurierem wynosi 1-2 dni robocze od momentu nadania przesyłki.</li>
      </ul>
      <p>
        Klient zobowiązany jest do sprawdzenia stanu przesyłki przy odbiorze. W przypadku
        stwierdzenia uszkodzeń mechanicznych powstałych podczas transportu, Klient powinien
        sporządzić protokół szkody w obecności kuriera.
      </p>

      <h2>§6. Specyfika produktów – chemia gospodarcza</h2>
      <p>
        Ze względu na charakter sprzedawanych Produktów (chemia gospodarcza), Klient
        zobowiązany jest do:
      </p>
      <ul>
        <li>Zapoznania się z etykietą i instrukcją użycia przed zastosowaniem produktu.</li>
        <li>Przechowywania produktów zgodnie z zaleceniami producenta (z dala od dzieci, w suchym miejscu, z dala od źródeł ciepła).</li>
        <li>Stosowania produktów zgodnie z ich przeznaczeniem.</li>
      </ul>
      <p>
        Produkty oferowane w Sklepie są oryginalnymi produktami importowanymi z Niemiec.
        Etykiety mogą być w języku niemieckim. Na życzenie Klienta Sklep może dostarczyć
        tłumaczenie instrukcji obsługi.
      </p>

      <h2>§7. Prawo odstąpienia od umowy</h2>
      <p>
        Konsument ma prawo odstąpić od umowy zawartej na odległość <strong>w terminie 14 dni</strong> bez
        podania jakiejkolwiek przyczyny.
      </p>
      <p>
        Termin do odstąpienia od umowy wygasa po upływie 14 dni od dnia, w którym Konsument
        wszedł w posiadanie towaru lub w którym osoba trzecia inna niż przewoźnik i wskazana
        przez Konsumenta weszła w posiadanie towaru.
      </p>
      <p>
        Aby skorzystać z prawa odstąpienia od umowy, Konsument musi poinformować Sklep
        o swojej decyzji o odstąpieniu od umowy w drodze jednoznacznego oświadczenia
        (np. pismo wysłane pocztą lub pocztą elektroniczną na adres: [TUTAJ WPISZ EMAIL]).
      </p>
      <p><strong>Skutki odstąpienia od umowy:</strong></p>
      <ul>
        <li>Sklep zwraca wszystkie otrzymane płatności, w tym koszty dostawy (z wyjątkiem dodatkowych kosztów wynikających z wybranego sposobu dostawy innego niż najtańszy), nie później niż 14 dni od dnia otrzymania oświadczenia o odstąpieniu.</li>
        <li>Konsument ponosi bezpośrednie koszty zwrotu towaru.</li>
        <li>Zwracany towar musi być kompletny, nieużywany, w oryginalnym opakowaniu.</li>
      </ul>
      <p>
        <strong>Uwaga:</strong> Prawo odstąpienia od umowy nie przysługuje w odniesieniu do
        Produktów dostarczanych w zapieczętowanym opakowaniu, których po otwarciu opakowania
        nie można zwrócić ze względu na ochronę zdrowia lub ze względów higienicznych, jeżeli
        opakowanie zostało otwarte po dostarczeniu (np. otwarte opakowania środków czystości).
      </p>

      <h2>§8. Reklamacje i rękojmia</h2>
      <p>
        Sklep zobowiązany jest dostarczyć Klientowi towar wolny od wad. W przypadku
        stwierdzenia wady towaru, Klient może złożyć reklamację.
      </p>
      <p><strong>Procedura reklamacyjna:</strong></p>
      <ol>
        <li>
          Reklamację można złożyć:
          <ul>
            <li>drogą elektroniczną na adres: [TUTAJ WPISZ EMAIL]</li>
            <li>pisemnie na adres siedziby Sklepu: [TUTAJ WPISZ ADRES]</li>
          </ul>
        </li>
        <li>
          Reklamacja powinna zawierać: opis wady, datę jej wykrycia, żądanie Klienta
          (naprawa, wymiana, obniżenie ceny lub odstąpienie od umowy), dane kontaktowe
          oraz numer zamówienia.
        </li>
        <li>Do reklamacji zaleca się dołączenie zdjęć wadliwego produktu.</li>
        <li>Sklep rozpatrzy reklamację w terminie <strong>14 dni</strong> od dnia jej otrzymania i poinformuje Klienta o sposobie jej rozstrzygnięcia.</li>
      </ol>
      <p>
        Sklep odpowiada z tytułu rękojmi, jeżeli wada fizyczna zostanie stwierdzona przed
        upływem dwóch lat od dnia wydania towaru Konsumentowi.
      </p>

      <h2>§9. Ochrona danych osobowych</h2>
      <p>
        Administratorem danych osobowych Klientów jest [TUTAJ WPISZ NAZWĘ FIRMY].
        Szczegółowe informacje dotyczące przetwarzania danych osobowych znajdują się
        w <a href="/polityka-prywatnosci">Polityce Prywatności</a>.
      </p>

      <h2>§10. Postanowienia końcowe</h2>
      <ol>
        <li>
          Sklep zastrzega sobie prawo do zmiany niniejszego Regulaminu. Zmiany wchodzą
          w życie z dniem ich opublikowania na stronie Sklepu.
        </li>
        <li>
          Zamówienia złożone przed wejściem w życie zmian Regulaminu realizowane są
          na podstawie dotychczasowych postanowień.
        </li>
        <li>
          W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy
          prawa polskiego, w szczególności Kodeksu cywilnego, ustawy o prawach konsumenta
          oraz ustawy o świadczeniu usług drogą elektroniczną.
        </li>
        <li>
          Wszelkie spory wynikające z umów zawartych za pośrednictwem Sklepu będą
          rozstrzygane w pierwszej kolejności polubownie. W przypadku braku porozumienia,
          spory będą rozstrzygane przez właściwe sądy powszechne.
        </li>
        <li>
          Konsument ma możliwość skorzystania z pozasądowych sposobów rozpatrywania
          reklamacji i dochodzenia roszczeń, w tym poprzez platformę ODR dostępną pod
          adresem: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
        </li>
      </ol>
    </LegalLayout>
  )
}
