import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CarCard } from '../components/CarCard';
import { 
  Star,
  Truck,
  FileText, 
  Award, 
  Settings, 
  Clock,
  Shield,
  Users,
  ArrowRight,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';
import { mockBuses, mockOpinie, mockPrzewagi, mockUslugi } from '../mock';

export const HomePage = () => {
  const navigate = useNavigate();
  const [featuredBuses, setFeaturedBuses] = useState([]);
  const [savedBuses, setSavedBuses] = useState(new Set());

  useEffect(() => {
    // Get featured and newest buses
    const featured = mockBuses
      .filter(bus => bus.wyrozniowane || bus.nowosc || bus.flotowy)
      .slice(0, 6);
    setFeaturedBuses(featured);
  }, []);

  const handleBusClick = (bus) => {
    navigate(`/ogloszenie/${bus.id}`);
  };

  const handleSaveToggle = (busId) => {
    setSavedBuses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(busId)) {
        newSet.delete(busId);
      } else {
        newSet.add(busId);
      }
      return newSet;
    });
  };

  const IconComponent = ({ name, className }) => {
    const icons = {
      Truck,
      FileText,
      Award,
      Settings,
      Clock,
      Shield,
      Star,
      Users
    };
    const Icon = icons[name];
    return Icon ? <Icon className={className} /> : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-gray-50 to-amber-50 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-[#F3BC30]/5 via-transparent to-[#F3BC30]/3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="text-center lg:text-left">
              <Badge className="bg-[#F3BC30] text-[#222122] hover:bg-[#E0AA2B] mb-6 text-sm font-medium px-4 py-2">
                🚐 Nowe busy w ofercie co tydzień
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-[#222122] mb-6 leading-tight">
                Profesjonalne busy
                <span className="text-[#F3BC30] block">gotowe do pracy</span>
              </h1>
              
              <p className="text-xl text-[#838282] mb-8 max-w-2xl">
                Sprawdzone pojazdy LCV z dokumentacją flotową, VAT 23% i gwarancją. Furgony, brygadowe, chłodnie, minibusy - wszystko dla Twojej branży.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122] font-semibold px-8 py-4 text-lg"
                  onClick={() => navigate('/ogloszenia')}
                >
                  Przeglądaj Busy
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-[#F3BC30]/10 via-white to-[#F3BC30]/5 rounded-2xl shadow-2xl h-[400px] flex items-center justify-center overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                
                {/* Floating decorative elements */}
                <div className="absolute inset-0">
                  {/* Background pattern */}
                  <div className="absolute top-10 left-10 w-20 h-20 bg-[#F3BC30]/20 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
                  <div className="absolute top-32 right-16 w-12 h-12 bg-[#E0AA2B]/30 rounded-full group-hover:scale-110 group-hover:translate-x-2 transition-all duration-500"></div>
                  <div className="absolute bottom-20 left-20 w-16 h-16 bg-[#F3BC30]/15 rounded-full group-hover:scale-150 group-hover:-translate-y-2 transition-all duration-600"></div>
                  <div className="absolute bottom-32 right-12 w-8 h-8 bg-[#E0AA2B]/40 rounded-full group-hover:scale-125 group-hover:translate-y-1 transition-all duration-400"></div>
                </div>

                {/* Main content */}
                <div className="relative z-10 text-center group-hover:scale-105 transition-transform duration-300">
                  
                  {/* Animated bus icons */}
                  <div className="flex justify-center items-center space-x-6 mb-6">
                    <div className="p-4 bg-[#F3BC30] rounded-2xl group-hover:bg-[#E0AA2B] group-hover:rotate-3 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Truck className="h-12 w-12 text-[#222122] group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div className="p-4 bg-white rounded-2xl border-2 border-[#F3BC30] group-hover:border-[#E0AA2B] group-hover:-rotate-2 group-hover:scale-105 transition-all duration-400 shadow-lg">
                      <Users className="h-12 w-12 text-[#F3BC30] group-hover:text-[#E0AA2B] group-hover:scale-110 transition-all duration-200" />
                    </div>
                    <div className="p-4 bg-[#F3BC30] rounded-2xl group-hover:bg-[#E0AA2B] group-hover:rotate-2 group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <Settings className="h-12 w-12 text-[#222122] group-hover:scale-110 transition-transform duration-200" />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#222122] group-hover:text-[#F3BC30] transition-colors duration-300">
                      Busy dla każdej branży
                    </h3>
                    <p className="text-[#838282] group-hover:text-[#222122] transition-colors duration-300">
                      Furgony • Brygadowe • Chłodnie • Minibusy
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="inline-flex items-center text-[#F3BC30] font-medium">
                      <span className="mr-2">Sprawdź naszą ofertę</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>

                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F3BC30]/0 via-[#F3BC30]/20 to-[#F3BC30]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#F3BC30]/20 rounded-2xl -z-0 group-hover:bg-[#F3BC30]/30 transition-colors duration-300"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#F3BC30]/30 rounded-full -z-0 group-hover:bg-[#F3BC30]/40 group-hover:scale-125 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Buses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#222122] mb-2">
                Wyróżnione busy i najnowsze oferty
              </h2>
              <p className="text-[#838282]">
                Sprawdź nasze najlepsze pojazdy LCV gotowe do pracy
              </p>
            </div>
            
            <Button
              variant="outline"
              className="border-[#F3BC30] text-[#F3BC30] hover:bg-[#F3BC30] hover:text-[#222122]"
              onClick={() => navigate('/ogloszenia')}
            >
              Zobacz wszystkie busy
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBuses.map((bus) => (
              <CarCard
                key={bus.id}
                bus={bus}
                onCardClick={handleBusClick}
                onSaveToggle={handleSaveToggle}
                isSaved={savedBuses.has(bus.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#222122] mb-4">
              Dlaczego FHU FRANKO?
            </h2>
            <p className="text-[#838282] max-w-2xl mx-auto">
              Specjalizujemy się w pojazdach użytkowych z wieloletnim doświadczeniem i profesjonalnym podejściem do branży LCV
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPrzewagi.map((przewaga, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#F3BC30]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#F3BC30]/20 transition-colors">
                    <IconComponent name={przewaga.ikona} className="h-8 w-8 text-[#F3BC30]" />
                  </div>
                  <h3 className="font-semibold text-[#222122] mb-2">
                    {przewaga.tytul}
                  </h3>
                  <p className="text-[#838282] text-sm">
                    {przewaga.opis}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#222122] mb-4">
              Opinie naszych klientów
            </h2>
            <p className="text-[#838282]">
              Zobacz co mówią firmy które kupiły u nas busy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockOpinie.map((opinia) => (
              <Card key={opinia.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-[#F3BC30]">
                      {[...Array(opinia.ocena)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-[#838282]">
                      {opinia.data}
                    </span>
                  </div>
                  <p className="text-[#838282] mb-4 italic">
                    "{opinia.komentarz}"
                  </p>
                  <div className="font-medium text-[#222122]">
                    {opinia.autor}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#222122] mb-4">
              Kategorie pojazdów LCV
            </h2>
            <p className="text-[#838282]">
              Znajdź odpowiedni bus dla Twojej branży
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockUslugi.map((usluga) => (
              <Card key={usluga.id} className="group hover:shadow-xl transition-all duration-200 cursor-pointer border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-[#F3BC30]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F3BC30]/20 transition-colors">
                    <IconComponent name={usluga.ikona} className="h-10 w-10 text-[#F3BC30]" />
                  </div>
                  <h3 className="font-semibold text-xl text-[#222122] mb-3">
                    {usluga.tytul}
                  </h3>
                  <p className="text-[#838282] mb-6">
                    {usluga.opis}
                  </p>
                  <Button 
                    className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122] font-medium"
                    onClick={() => navigate(`/ogloszenia?kategoria=${usluga.id}`)}
                  >
                    Zobacz oferty
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="py-12 bg-[#222122]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Potrzebujesz pomocy w wyborze busa?
              </h3>
              <p className="text-gray-300">
                Profesjonalne doradztwo i pomoc w doborze idealnego pojazdu LCV dla Twojej branży
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122] font-semibold flex-1"
                onClick={() => window.open('tel:+48123456789')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Zadzwoń teraz
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#222122] flex-1"
                onClick={() => navigate('/kontakt')}
              >
                <Mail className="mr-2 h-5 w-5" />
                Napisz do nas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mockowy przycisk dostępu do panelu admina */}
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => navigate('/admin')}
          className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
          size="sm"
        >
          🔧 Panel Admina
        </Button>
      </div>
    </div>
  );
};