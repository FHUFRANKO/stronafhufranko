import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Truck, 
  MapPin, 
  Award, 
  CheckCircle, 
  Users, 
  Calendar,
  Target,
  Globe,
  ShieldCheck,
  Star,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ONasPage = () => {
  const navigate = useNavigate();

  const wartosci = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-[#F3BC30]" />,
      title: "Rzetelność",
      description: "Każdy pojazd jest dokładnie sprawdzony i ma pełną dokumentację. Oferujemy tylko pojazdy o potwierdzonej historii."
    },
    {
      icon: <Award className="h-8 w-8 text-[#F3BC30]" />,
      title: "Doświadczenie",
      description: "Lata doświadczenia w imporcie i sprzedaży pojazdów użytkowych z krajów Unii Europejskiej."
    },
    {
      icon: <Users className="h-8 w-8 text-[#F3BC30]" />,
      title: "Indywidualne podejście",
      description: "Każdy klient jest dla nas ważny. Pomagamy dobrać idealny pojazd dopasowany do Twoich potrzeb biznesowych."
    },
    {
      icon: <Target className="h-8 w-8 text-[#F3BC30]" />,
      title: "Specjalizacja",
      description: "Skupiamy się wyłącznie na pojazdach użytkowych - busach, furgonach i samochodach dostawczych."
    }
  ];

  const statystyki = [
    { liczba: "500+", opis: "Sprzedanych pojazdów" },
    { liczba: "15+", opis: "Lat doświadczenia" },
    { liczba: "4", opis: "Kraje importu" },
    { liczba: "100%", opis: "Zadowolonych klientów" }
  ];

  const proces = [
    {
      krok: "01",
      title: "Konsultacja",
      description: "Rozmawiamy o Twoich potrzebach i określamy idealne parametry pojazdu dla Twojej branży."
    },
    {
      krok: "02", 
      title: "Wyszukiwanie",
      description: "Znajdziemy dla Ciebie najlepsze oferty w krajach UE - Niemcy, Holandia, Belgia, Dania."
    },
    {
      krok: "03",
      title: "Sprawdzenie",
      description: "Każdy pojazd przechodzi dokładną kontrolę techniczną i dokumentacyjną przed importem."
    },
    {
      krok: "04",
      title: "Import i dostawa",
      description: "Zajmujemy się całą procedurą importową i dostawą pojazdu bezpośrednio do Ciebie."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#F3BC30]/10 to-[#F3BC30]/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#F3BC30] rounded-xl flex items-center justify-center mr-4">
              <span className="font-bold text-[#222122] text-3xl">F</span>
            </div>
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#222122]">
                FHU FRANKO
              </h1>
              <p className="text-lg text-[#838282] mt-2">
                Autohandel BUSY/LCV
              </p>
            </div>
          </div>
          <p className="text-xl text-[#838282] max-w-3xl mx-auto leading-relaxed">
            Jesteśmy profesjonalną firmą specjalizującą się w imporcie i sprzedaży 
            pojazdów użytkowych z krajów Unii Europejskiej. Pomagamy przedsiębiorcom 
            znaleźć idealne rozwiązania transportowe dla ich biznesu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Kim jesteśmy */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#222122] mb-4">Kim jesteśmy</h2>
            <p className="text-lg text-[#838282] max-w-3xl mx-auto">
              FHU FRANKO to rodzinna firma z wieloletnim doświadczeniem w branży motoryzacyjnej
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="border-[#F3BC30]/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F3BC30]/10 rounded-lg flex items-center justify-center mt-1">
                      <Truck className="h-6 w-6 text-[#F3BC30]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#222122] mb-2">
                        Nasza specjalizacja
                      </h3>
                      <p className="text-[#838282] text-sm">
                        Skupiamy się wyłącznie na pojazdach użytkowych - busach dostawczych, 
                        furgonach, minibusach i pojazdach specjalistycznych. Ta specjalizacja 
                        pozwala nam oferować najwyższą jakość obsługi i najlepsze ceny.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#F3BC30]/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F3BC30]/10 rounded-lg flex items-center justify-center mt-1">
                      <Globe className="h-6 w-6 text-[#F3BC30]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#222122] mb-2">
                        Import z krajów UE
                      </h3>
                      <p className="text-[#838282] text-sm">
                        Importujemy pojazdy bezpośrednio z Niemiec, Holandii, Belgii i Danii. 
                        Dzięki temu możemy oferować najlepsze ceny przy zachowaniu najwyższej 
                        jakości i pełnej dokumentacji.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#F3BC30]/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F3BC30]/10 rounded-lg flex items-center justify-center mt-1">
                      <MapPin className="h-6 w-6 text-[#F3BC30]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#222122] mb-2">
                        Lokalizacja
                      </h3>
                      <p className="text-[#838282] text-sm">
                        Nasza siedziba znajduje się w Smykowie, w województwie świętokrzyskim. 
                        Zapewniamy obsługę klientów z całej Polski oraz pomoc w dostawie 
                        zakupionego pojazdu.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statystyki */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {statystyki.map((stat, index) => (
                  <Card key={index} className="border-[#F3BC30]/20 shadow-lg text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-[#F3BC30] mb-2">
                        {stat.liczba}
                      </div>
                      <div className="text-sm text-[#838282]">
                        {stat.opis}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="border-[#F3BC30]/20 shadow-lg bg-gradient-to-br from-[#F3BC30]/5 to-[#F3BC30]/10">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-[#F3BC30] mx-auto mb-4" />
                  <h3 className="font-semibold text-[#222122] mb-2">
                    Gwarancja jakości
                  </h3>
                  <p className="text-[#838282] text-sm">
                    Każdy pojazd przechodzi dokładną kontrolę techniczną. 
                    Oferujemy pełną transparentność i szczerą opinię o stanie każdego auta.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nasze wartości */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#222122] mb-4">Nasze wartości</h2>
            <p className="text-lg text-[#838282] max-w-3xl mx-auto">
              Wierzymy w uczciwy handel i długoterminowe relacje z klientami
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wartosci.map((wartosc, index) => (
              <Card key={index} className="border-[#F3BC30]/20 shadow-lg text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {wartosc.icon}
                  </div>
                  <h3 className="font-semibold text-[#222122] mb-3">
                    {wartosc.title}
                  </h3>
                  <p className="text-[#838282] text-sm">
                    {wartosc.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Jak pracujemy */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#222122] mb-4">Jak pracujemy</h2>
            <p className="text-lg text-[#838282] max-w-3xl mx-auto">
              Nasz proces zapewnia bezpieczeństwo transakcji i najwyższą jakość obsługi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {proces.map((krok, index) => (
              <Card key={index} className="border-[#F3BC30]/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#F3BC30] rounded-full flex items-center justify-center text-[#222122] font-bold text-lg mr-4">
                      {krok.krok}
                    </div>
                    <h3 className="font-semibold text-[#222122]">
                      {krok.title}
                    </h3>
                  </div>
                  <p className="text-[#838282] text-sm">
                    {krok.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Dlaczego my */}
        <section className="bg-gradient-to-r from-[#F3BC30]/10 to-[#F3BC30]/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#222122] mb-4">Dlaczego FHU FRANKO?</h2>
            <p className="text-lg text-[#838282] max-w-3xl mx-auto">
              Wybierając nas, zyskujesz partnera, który zadba o każdy szczegół Twojego zakupu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F3BC30] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-[#222122]" />
              </div>
              <h3 className="font-semibold text-[#222122] mb-2">Sprawdzone pojazdy</h3>
              <p className="text-[#838282] text-sm">
                Każdy bus przechodzi dokładną kontrolę techniczną i ma pełną historię serwisową
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F3BC30] rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-[#222122]" />
              </div>
              <h3 className="font-semibold text-[#222122] mb-2">Bezpośredni import</h3>
              <p className="text-[#838282] text-sm">
                Importujemy bezpośrednio z Europy, omijając pośredników i zapewniając najlepsze ceny
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F3BC30] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#222122]" />
              </div>
              <h3 className="font-semibold text-[#222122] mb-2">Pełna obsługa</h3>
              <p className="text-[#838282] text-sm">
                Od konsultacji przez import aż po rejestrację - zajmiemy się wszystkimi formalnościami
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate('/kontakt')}
              className="bg-[#F3BC30] hover:bg-[#F3BC30]/90 text-[#222122] font-semibold px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105"
            >
              Skontaktuj się z nami
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* Kontakt sekcja */}
        <section>
          <Card className="border-[#F3BC30]/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#F3BC30]/10 to-[#F3BC30]/5">
              <CardTitle className="text-2xl text-center text-[#222122] flex items-center justify-center">
                <Phone className="h-6 w-6 mr-3" />
                Gotowy na rozmowę?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <p className="text-[#838282] mb-6 text-lg">
                Zadzwoń do nas lub napisz - chętnie odpowiemy na wszystkie pytania 
                i pomożemy w wyborze idealnego pojazdu dla Twojego biznesu.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => window.open('tel:+48697257725')}
                  variant="outline"
                  className="border-[#F3BC30] text-[#F3BC30] hover:bg-[#F3BC30] hover:text-[#222122] font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +48 697 257 725
                </Button>
                
                <Button
                  onClick={() => window.open('mailto:dawidkol@o2.pl')}
                  variant="outline"
                  className="border-[#F3BC30] text-[#F3BC30] hover:bg-[#F3BC30] hover:text-[#222122] font-semibold"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  dawidkol@o2.pl
                </Button>

                <Button
                  onClick={() => navigate('/ogloszenia')}
                  className="bg-[#F3BC30] hover:bg-[#F3BC30]/90 text-[#222122] font-semibold"
                >
                  Zobacz nasze busy
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
};