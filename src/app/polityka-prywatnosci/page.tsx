import { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Polityka Prywatności - Sklep MVP',
  description: 'Polityka prywatności sklepu internetowego Sklep MVP. Informacje o przetwarzaniu danych osobowych i cookies.',
}

export default function PolitykaPrywatnosciPage() {
  return (
    <LegalLayout title="Polityka Prywatności" lastUpdated="20 stycznia 2026">
      <h2>1. Informacje ogólne</h2>
      <p>
        Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych
        osobowych przekazanych przez Użytkowników w związku z korzystaniem ze sklepu
        internetowego Sklep MVP.
      </p>
      <p>
        Administratorem danych osobowych jest Sklep MVP z siedzibą w Warszawie,
        ul. Przykładowa 123, 00-001 Warszawa (dalej: „Administrator").
      </p>

      <h2>2. Jakie dane zbieramy?</h2>
      <p>W ramach działalności Sklepu zbieramy następujące dane:</p>
      <ul>
        <li><strong>Dane identyfikacyjne:</strong> imię, nazwisko</li>
        <li><strong>Dane kontaktowe:</strong> adres e-mail, numer telefonu</li>
        <li><strong>Dane adresowe:</strong> adres dostawy (ulica, numer domu/mieszkania, kod pocztowy, miasto)</li>
        <li><strong>Dane transakcyjne:</strong> informacje o zamówieniach, historii zakupów</li>
      </ul>

      <h2>3. Cel przetwarzania danych</h2>
      <p>Dane osobowe przetwarzane są w celu:</p>
      <ol>
        <li><strong>Realizacji zamówień</strong> – na podstawie art. 6 ust. 1 lit. b RODO (wykonanie umowy)</li>
        <li><strong>Obsługi reklamacji i zwrotów</strong> – na podstawie art. 6 ust. 1 lit. c RODO (obowiązek prawny)</li>
        <li><strong>Prowadzenia księgowości</strong> – na podstawie art. 6 ust. 1 lit. c RODO (obowiązek prawny)</li>
        <li><strong>Kontaktu z Klientem</strong> – na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)</li>
      </ol>

      <h2>4. Okres przechowywania danych</h2>
      <p>Dane osobowe przechowywane są przez okres:</p>
      <ul>
        <li>Dane związane z zamówieniami – 5 lat od końca roku, w którym dokonano transakcji (wymogi podatkowe)</li>
        <li>Dane związane z reklamacjami – 1 rok po zakończeniu procedury reklamacyjnej</li>
        <li>Dane kontaktowe – do momentu wycofania zgody lub wniesienia sprzeciwu</li>
      </ul>

      <h2>5. Pliki cookies</h2>
      <p>
        Sklep wykorzystuje pliki cookies (ciasteczka) – małe pliki tekstowe zapisywane
        na urządzeniu Użytkownika.
      </p>

      <h3>Rodzaje cookies:</h3>
      <ul>
        <li>
          <strong>Cookies niezbędne</strong> – wymagane do prawidłowego działania Sklepu
          (obsługa koszyka, proces zamówienia)
        </li>
        <li>
          <strong>Cookies funkcjonalne</strong> – zapamiętują preferencje Użytkownika
          (np. zawartość koszyka)
        </li>
      </ul>

      <p>
        Użytkownik może zarządzać cookies poprzez ustawienia swojej przeglądarki
        internetowej. Wyłączenie cookies może wpłynąć na funkcjonalność Sklepu.
      </p>

      <h2>6. Prawa Użytkownika</h2>
      <p>Każdy Użytkownik ma prawo do:</p>
      <ul>
        <li><strong>Dostępu do danych</strong> – uzyskania informacji o przetwarzanych danych</li>
        <li><strong>Sprostowania danych</strong> – poprawienia nieprawidłowych danych</li>
        <li><strong>Usunięcia danych</strong> – żądania usunięcia danych („prawo do bycia zapomnianym")</li>
        <li><strong>Ograniczenia przetwarzania</strong> – żądania ograniczenia przetwarzania danych</li>
        <li><strong>Przenoszenia danych</strong> – otrzymania danych w ustrukturyzowanym formacie</li>
        <li><strong>Sprzeciwu</strong> – wniesienia sprzeciwu wobec przetwarzania danych</li>
        <li><strong>Skargi</strong> – wniesienia skargi do Prezesa UODO</li>
      </ul>

      <h2>7. Udostępnianie danych</h2>
      <p>Dane osobowe mogą być udostępniane następującym podmiotom:</p>
      <ul>
        <li>Firmy kurierskie – w celu realizacji dostawy</li>
        <li>Operatorzy płatności – w celu obsługi transakcji</li>
        <li>Dostawcy usług IT – w celu utrzymania infrastruktury technicznej</li>
        <li>Organy państwowe – na podstawie przepisów prawa</li>
      </ul>

      <h2>8. Bezpieczeństwo danych</h2>
      <p>
        Administrator stosuje odpowiednie środki techniczne i organizacyjne
        zapewniające ochronę przetwarzanych danych osobowych, w szczególności:
      </p>
      <ul>
        <li>Szyfrowanie połączenia (SSL/TLS)</li>
        <li>Regularne aktualizacje oprogramowania</li>
        <li>Ograniczony dostęp do danych</li>
        <li>Kopie zapasowe</li>
      </ul>

      <h2>9. Kontakt</h2>
      <p>
        W sprawach związanych z ochroną danych osobowych można kontaktować się
        z Administratorem:
      </p>
      <ul>
        <li>E-mail: <a href="mailto:kontakt@sklep-mvp.pl">kontakt@sklep-mvp.pl</a></li>
        <li>Telefon: +48 123 456 789</li>
        <li>Adres: ul. Przykładowa 123, 00-001 Warszawa</li>
      </ul>

      <h2>10. Zmiany Polityki Prywatności</h2>
      <p>
        Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności.
        O wszelkich zmianach Użytkownicy zostaną poinformowani poprzez publikację
        nowej wersji na stronie Sklepu.
      </p>
    </LegalLayout>
  )
}
