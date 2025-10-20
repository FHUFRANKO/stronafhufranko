import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings,
  Shield,
  FileText,
  Award,
  ChevronLeft,
  ChevronRight,
  Clock,
  Car,
  Wrench
} from 'lucide-react';
import { busApi } from '../api/busApi';

export const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    nazwa: '',
    telefon: '',
    email: '',
    wiadomosc: ''
  });

  useEffect(() => {
    fetchBusDetails();
  }, [id]);

  const fetchBusDetails = async () => {
    try {
      const data = await busApi.getBusById(id);
      setCar(data);
    } catch (error) {
      console.error('Error fetching bus details:', error);
      // If not found, redirect to listings
      navigate('/ogloszenia');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F3BC30] mx-auto"></div>
          <p className="mt-4 text-[#838282]">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#222122] mb-2">Nie znaleziono ogłoszenia</h2>
          <Button onClick={() => navigate('/ogloszenia')}>Powrót do ogłoszeń</Button>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? car.zdjecia.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === car.zdjecia.length - 1 ? 0 : prev + 1
    );
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Wiadomość została wysłana! Skontaktujemy się z Tobą wkrótce.');
    setContactForm({ nazwa: '', telefon: '', email: '', wiadomosc: '' });
    setShowContactForm(false);
  };

  const formatCena = (cena) => {
    return new Intl.NumberFormat('pl-PL').format(cena) + ' zł';
  };

  const formatPrzebieg = (przebieg) => {
    return new Intl.NumberFormat('pl-PL').format(przebieg) + ' km';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#838282]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/ogloszenia')}
              className="text-[#838282] hover:text-[#222122] p-0"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Wróć do listy
            </Button>
            <span>/</span>
            <span>{car.marka}</span>
            <span>/</span>
            <span className="text-[#222122] font-medium">{car.model}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Title and Actions */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-[#222122]">
                    {car.marka} {car.model}
                  </h1>
                  {car.wyroznialone && (
                    <Badge className="bg-[#F3BC30] text-[#222122] hover:bg-[#E0AA2B]">
                      Wyróżnione
                    </Badge>
                  )}
                  {car.nowosc && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Nowość
                    </Badge>
                  )}
                </div>
                <p className="text-[#838282]">{car.wersja}</p>
                <p className="text-sm text-[#838282]">
                  Nr ogłoszenia: {car.numerOgloszenia}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                  className={isSaved ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={car.zdjecia[currentImageIndex]}
                  alt={`${car.marka} ${car.model} - zdjęcie ${currentImageIndex + 1}`}
                  className="w-full h-[500px] object-cover"
                />
                
                {car.zdjecia.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {car.zdjecia.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Car Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-[#F3BC30]" />
                  Szczegóły techniczne
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-[#F3BC30]" />
                    <div>
                      <div className="text-sm text-[#838282]">Rok produkcji</div>
                      <div className="font-medium text-[#222122]">{car.rok}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Gauge className="h-4 w-4 text-[#F3BC30]" />
                    <div>
                      <div className="text-sm text-[#838282]">Przebieg</div>
                      <div className="font-medium text-[#222122]">{formatPrzebieg(car.przebieg)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Fuel className="h-4 w-4 text-[#F3BC30]" />
                    <div>
                      <div className="text-sm text-[#838282]">Paliwo</div>
                      <div className="font-medium text-[#222122]">{car.paliwo}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4 text-[#F3BC30]" />
                    <div>
                      <div className="text-sm text-[#838282]">Skrzynia</div>
                      <div className="font-medium text-[#222122]">{car.skrzynia}</div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-[#838282]">Moc: </span>
                    <span className="font-medium text-[#222122]">{car.moc} KM</span>
                  </div>
                  <div>
                    <span className="text-[#838282]">Pojemność: </span>
                    <span className="font-medium text-[#222122]">{car.pojemnosc} cm³</span>
                  </div>
                  <div>
                    <span className="text-[#838282]">Napęd: </span>
                    <span className="font-medium text-[#222122]">{car.naped}</span>
                  </div>
                  <div>
                    <span className="text-[#838282]">Nadwozie: </span>
                    <span className="font-medium text-[#222122]">{car.nadwozie}</span>
                  </div>
                  <div>
                    <span className="text-[#838282]">Kolor: </span>
                    <span className="font-medium text-[#222122]">{car.kolor}</span>
                  </div>
                  <div>
                    <span className="text-[#838282]">Pierwsza rej.: </span>
                    <span className="font-medium text-[#222122]">{car.pierwszaRejestracja}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#F3BC30]" />
                  Wyposażenie
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.entries(car.wyposazenie).map(([kategoria, elementy]) => (
                  <div key={kategoria} className="mb-6 last:mb-0">
                    <h4 className="font-medium text-[#222122] mb-3">{kategoria}</h4>
                    <div className="flex flex-wrap gap-2">
                      {elementy.map((element, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {element}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Opis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#838282] leading-relaxed">{car.opis}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Price */}
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#222122] mb-2">
                  {formatCena(car.cenaBrutto)}
                </div>
                {car.vat && (
                  <div className="text-sm text-[#838282] mb-4">
                    Netto: {formatCena(car.cenaNetto)}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {car.vat && <Badge variant="outline">Faktura VAT</Badge>}
                  {car.gwarancja && <Badge variant="outline">Gwarancja</Badge>}
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122] font-semibold"
                    onClick={() => window.open(`tel:${car.kontakt.telefon}`)}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Zadzwoń teraz
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowContactForm(!showContactForm)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Napisz wiadomość
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            {showContactForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Wyślij wiadomość</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="nazwa">Imię i nazwisko *</Label>
                      <Input
                        id="nazwa"
                        value={contactForm.nazwa}
                        onChange={(e) => setContactForm(prev => ({ ...prev, nazwa: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="telefon">Telefon *</Label>
                      <Input
                        id="telefon"
                        type="tel"
                        value={contactForm.telefon}
                        onChange={(e) => setContactForm(prev => ({ ...prev, telefon: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="wiadomosc">Wiadomość</Label>
                      <Textarea
                        id="wiadomosc"
                        rows={4}
                        placeholder={`Dzień dobry, interesuje mnie ${car.marka} ${car.model} z ogłoszenia nr ${car.numerOgloszenia}. Proszę o kontakt.`}
                        value={contactForm.wiadomosc}
                        onChange={(e) => setContactForm(prev => ({ ...prev, wiadomosc: e.target.value }))}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]">
                      Wyślij wiadomość
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#F3BC30]" />
                  Sprzedający
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="font-medium text-[#222122]">
                    {car.kontakt.nazwa}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-[#838282]">
                    <MapPin className="h-4 w-4" />
                    {car.lokalizacja}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-[#838282]">
                    <Clock className="h-4 w-4" />
                    {car.kontakt.godziny}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-[#222122] text-sm">Legalne pochodzenie</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="text-[#222122] text-sm">Pełna dokumentacja</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-[#F3BC30]" />
                    <span className="text-[#222122] text-sm">Gwarancja jakości</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wrench className="h-5 w-5 text-purple-600" />
                    <span className="text-[#222122] text-sm">Wsparcie serwisowe</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};