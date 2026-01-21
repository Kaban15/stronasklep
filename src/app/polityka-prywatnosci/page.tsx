import { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Polityka Prywatności - SklepMVP',
  description: 'Polityka prywatności sklepu SklepMVP. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
}

export default function PolitykaPrywatnosciPage() {
  return (
    <LegalLayout title="Polityka Prywatności" lastUpdated="21 stycznia 2026">
      <h2>1. Administrator danych osobowych</h2>
      <p>
        Administratorem Twoich danych osobowych jest:
      </p>
      <ul>
        <li><strong>Nazwa firmy:</strong> [TUTAJ WPISZ NAZWĘ FIRMY]</li>
        <li><strong>Adres siedziby:</strong> [TUTAJ WPISZ ADRES SIEDZIBY]</li>
        <li><strong>NIP:</strong> [TUTAJ WPISZ NIP]</li>
        <li><strong>Email kontaktowy:</strong> [TUTAJ WPISZ EMAIL]</li>
        <li><strong>Telefon:</strong> [TUTAJ WPISZ NUMER TELEFONU]</li>
      </ul>
      <p>
        (dalej: „Administrator" lub „my")
      </p>
      <p>
        W sprawach związanych z ochroną danych osobowych możesz kontaktować się z nami
        za pośrednictwem poczty elektronicznej lub tradycyjnej na powyższe adresy.
      </p>

      <h2>2. Jakie dane zbieramy?</h2>
      <p>
        W ramach działalności sklepu internetowego SklepMVP zbieramy następujące kategorie
        danych osobowych:
      </p>
      <h3>Dane podawane przy składaniu zamówienia:</h3>
      <ul>
        <li><strong>Dane identyfikacyjne:</strong> imię i nazwisko</li>
        <li><strong>Dane kontaktowe:</strong> adres e-mail, numer telefonu</li>
        <li><strong>Dane adresowe:</strong> ulica, numer domu/mieszkania, kod pocztowy, miasto</li>
      </ul>
      <h3>Dane zbierane automatycznie:</h3>
      <ul>
        <li><strong>Dane techniczne:</strong> adres IP, typ przeglądarki, system operacyjny</li>
        <li><strong>Dane o aktywności:</strong> przeglądane produkty, czas spędzony na stronie (anonimowo, za zgodą)</li>
      </ul>

      <h2>3. W jakim celu przetwarzamy Twoje dane?</h2>
      <p>
        Twoje dane osobowe przetwarzamy wyłącznie w określonych, zgodnych z prawem celach:
      </p>

      <h3>A) Realizacja zamówienia</h3>
      <p>
        <strong>Cel:</strong> Przyjęcie zamówienia, skompletowanie paczki, wysyłka produktów,
        kontakt w sprawie realizacji zamówienia.
      </p>
      <p>
        <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. b RODO – wykonanie umowy sprzedaży.
      </p>
      <p>
        <strong>Okres przechowywania:</strong> Przez czas realizacji zamówienia oraz okres
        niezbędny do obsługi ewentualnych reklamacji i zwrotów.
      </p>

      <h3>B) Wysyłka zamówienia</h3>
      <p>
        <strong>Cel:</strong> Przekazanie danych adresowych firmie kurierskiej w celu doręczenia przesyłki.
      </p>
      <p>
        <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. b RODO – wykonanie umowy sprzedaży.
      </p>

      <h3>C) Prowadzenie księgowości</h3>
      <p>
        <strong>Cel:</strong> Wystawianie dokumentów księgowych, prowadzenie ewidencji sprzedaży,
        rozliczenia podatkowe.
      </p>
      <p>
        <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. c RODO – wypełnienie obowiązku prawnego
        (przepisy podatkowe i rachunkowe).
      </p>
      <p>
        <strong>Okres przechowywania:</strong> 5 lat od końca roku kalendarzowego, w którym
        powstał obowiązek podatkowy.
      </p>

      <h3>D) Obsługa reklamacji i zwrotów</h3>
      <p>
        <strong>Cel:</strong> Rozpatrywanie reklamacji, realizacja prawa odstąpienia od umowy.
      </p>
      <p>
        <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. c RODO – wypełnienie obowiązku prawnego
        (ustawa o prawach konsumenta).
      </p>

      <h3>E) Kontakt z Klientem</h3>
      <p>
        <strong>Cel:</strong> Odpowiadanie na pytania, informowanie o statusie zamówienia.
      </p>
      <p>
        <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes
        Administratora (obsługa klienta).
      </p>

      <h2>4. Komu udostępniamy Twoje dane?</h2>
      <p>
        Twoje dane osobowe mogą być przekazywane następującym kategoriom odbiorców:
      </p>
      <ul>
        <li>
          <strong>Firmy kurierskie</strong> – w celu doręczenia zamówienia
          (imię, nazwisko, adres dostawy, numer telefonu).
        </li>
        <li>
          <strong>Operatorzy płatności</strong> – w przypadku płatności elektronicznych
          (dane niezbędne do realizacji transakcji).
        </li>
        <li>
          <strong>Biuro rachunkowe / księgowość</strong> – w celu prowadzenia dokumentacji
          księgowej i podatkowej.
        </li>
        <li>
          <strong>Dostawcy usług IT</strong> – hosting, utrzymanie strony internetowej
          (na podstawie umowy powierzenia przetwarzania danych).
        </li>
        <li>
          <strong>Organy państwowe</strong> – wyłącznie na żądanie uprawnionych organów
          i na podstawie przepisów prawa.
        </li>
      </ul>
      <p>
        Nie sprzedajemy Twoich danych osobowych podmiotom trzecim. Nie przekazujemy danych
        poza Europejski Obszar Gospodarczy (EOG).
      </p>

      <h2>5. Jak długo przechowujemy Twoje dane?</h2>
      <p>
        Okres przechowywania danych zależy od celu przetwarzania:
      </p>
      <ul>
        <li>
          <strong>Dane związane z zamówieniem:</strong> 5 lat od końca roku kalendarzowego,
          w którym dokonano transakcji (wymogi przepisów podatkowych).
        </li>
        <li>
          <strong>Dane związane z reklamacją:</strong> 1 rok po zakończeniu procedury
          reklamacyjnej lub upływie okresu rękojmi.
        </li>
        <li>
          <strong>Dane kontaktowe (korespondencja):</strong> Do czasu załatwienia sprawy
          lub do momentu wniesienia sprzeciwu.
        </li>
      </ul>
      <p>
        Po upływie okresu przechowywania dane są usuwane lub anonimizowane.
      </p>

      <h2>6. Twoje prawa (RODO)</h2>
      <p>
        Zgodnie z Rozporządzeniem RODO przysługują Ci następujące prawa:
      </p>
      <ul>
        <li>
          <strong>Prawo dostępu do danych (art. 15 RODO)</strong> – możesz uzyskać informację,
          jakie Twoje dane przetwarzamy i otrzymać ich kopię.
        </li>
        <li>
          <strong>Prawo do sprostowania danych (art. 16 RODO)</strong> – możesz żądać
          poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych.
        </li>
        <li>
          <strong>Prawo do usunięcia danych (art. 17 RODO)</strong> – tzw. „prawo do bycia
          zapomnianym" – możesz żądać usunięcia swoich danych, gdy nie są już niezbędne
          do celów, dla których zostały zebrane.
        </li>
        <li>
          <strong>Prawo do ograniczenia przetwarzania (art. 18 RODO)</strong> – możesz żądać
          ograniczenia przetwarzania danych w określonych sytuacjach.
        </li>
        <li>
          <strong>Prawo do przenoszenia danych (art. 20 RODO)</strong> – możesz otrzymać
          swoje dane w ustrukturyzowanym formacie (np. CSV, JSON) i przekazać je innemu
          administratorowi.
        </li>
        <li>
          <strong>Prawo do sprzeciwu (art. 21 RODO)</strong> – możesz wnieść sprzeciw wobec
          przetwarzania danych na podstawie prawnie uzasadnionego interesu.
        </li>
        <li>
          <strong>Prawo do wniesienia skargi</strong> – jeśli uważasz, że przetwarzanie
          Twoich danych narusza przepisy RODO, możesz złożyć skargę do Prezesa Urzędu
          Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl).
        </li>
      </ul>
      <p>
        Aby skorzystać z powyższych praw, skontaktuj się z nami na adres e-mail:
        [TUTAJ WPISZ EMAIL] lub pisemnie na adres siedziby firmy.
      </p>
      <p>
        Odpowiemy na Twoje żądanie bez zbędnej zwłoki, nie później niż w ciągu miesiąca
        od jego otrzymania.
      </p>

      <h2>7. Pliki cookies</h2>
      <p>
        Nasz sklep wykorzystuje pliki cookies (ciasteczka) – małe pliki tekstowe zapisywane
        na Twoim urządzeniu podczas korzystania ze strony.
      </p>

      <h3>Rodzaje wykorzystywanych cookies:</h3>
      <ul>
        <li>
          <strong>Cookies niezbędne</strong> – wymagane do prawidłowego funkcjonowania
          sklepu (obsługa koszyka, proces składania zamówienia, zapamiętywanie sesji).
          Nie wymagają zgody.
        </li>
        <li>
          <strong>Cookies funkcjonalne</strong> – zapamiętują Twoje preferencje
          (np. zawartość koszyka między wizytami). Wymagają zgody.
        </li>
        <li>
          <strong>Cookies analityczne</strong> – pomagają nam zrozumieć, jak użytkownicy
          korzystają ze strony (anonimowe statystyki). Wymagają zgody.
        </li>
      </ul>

      <h3>Zarządzanie cookies:</h3>
      <p>
        Przy pierwszej wizycie na stronie wyświetlamy baner z informacją o cookies,
        gdzie możesz wyrazić lub odmówić zgody na poszczególne kategorie plików.
      </p>
      <p>
        Możesz również zarządzać cookies poprzez ustawienia swojej przeglądarki
        internetowej. Pamiętaj, że wyłączenie cookies niezbędnych może uniemożliwić
        prawidłowe działanie sklepu (np. składanie zamówień).
      </p>

      <h2>8. Bezpieczeństwo danych</h2>
      <p>
        Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane
        osobowe przed nieuprawnionym dostępem, utratą lub zniszczeniem:
      </p>
      <ul>
        <li><strong>Szyfrowanie SSL/TLS</strong> – cała komunikacja ze sklepem jest szyfrowana.</li>
        <li><strong>Bezpieczne hasła</strong> – systemy są zabezpieczone silnymi hasłami.</li>
        <li><strong>Ograniczony dostęp</strong> – dostęp do danych mają tylko upoważnione osoby.</li>
        <li><strong>Regularne aktualizacje</strong> – oprogramowanie jest regularnie aktualizowane.</li>
        <li><strong>Kopie zapasowe</strong> – wykonujemy regularne kopie bezpieczeństwa.</li>
      </ul>

      <h2>9. Dane dzieci</h2>
      <p>
        Nasz sklep nie jest przeznaczony dla osób poniżej 16 roku życia. Świadomie nie
        zbieramy danych osobowych dzieci. Jeśli jesteś rodzicem lub opiekunem i uważasz,
        że Twoje dziecko przekazało nam swoje dane osobowe, skontaktuj się z nami,
        a niezwłocznie je usuniemy.
      </p>

      <h2>10. Zmiany Polityki Prywatności</h2>
      <p>
        Zastrzegamy sobie prawo do aktualizacji niniejszej Polityki Prywatności. O istotnych
        zmianach poinformujemy poprzez zamieszczenie nowej wersji na stronie sklepu.
      </p>
      <p>
        Zalecamy regularne zapoznawanie się z treścią Polityki Prywatności.
      </p>
      <p>
        Data ostatniej aktualizacji widnieje na początku dokumentu.
      </p>

      <h2>11. Kontakt</h2>
      <p>
        Jeśli masz pytania dotyczące przetwarzania Twoich danych osobowych, skontaktuj się z nami:
      </p>
      <ul>
        <li><strong>Email:</strong> [TUTAJ WPISZ EMAIL]</li>
        <li><strong>Telefon:</strong> [TUTAJ WPISZ NUMER TELEFONU]</li>
        <li><strong>Adres korespondencyjny:</strong> [TUTAJ WPISZ ADRES]</li>
      </ul>
      <p>
        Odpowiemy na Twoje zapytanie tak szybko, jak to możliwe.
      </p>
    </LegalLayout>
  )
}
