import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  ExternalLink,
  Truck,
  Globe,
  CheckCircle
} from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Symulacja wysyłania formularza
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message po 5 sekundach
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header sekcja */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#222122] mb-4">
              Skontaktuj się z nami
            </h1>
            <p className="text-xl text-[#838282] max-w-2xl mx-auto">
              Jesteśmy do Twojej dyspozycji. Skontaktuj się z nami w sprawie zakupu busa lub importu pojazdu z UE.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Informacje kontaktowe */}
          <div className="space-y-8">
            
            {/* Główne informacje */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Truck className="h-6 w-6 text-[#F3BC30] mr-3" />
                  FHU Franko – Auto Handel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-[#F3BC30]/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#222122] mb-2">Nasza specjalizacja</h3>
                  <p className="text-[#838282]">
                    Sprzedaż aut dostawczych, użytkowych, busów. Import z UE (Niemcy, Holandia, Belgia, Dania).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-[#F3BC30]/10 rounded-full">
                      <MapPin className="h-5 w-5 text-[#F3BC30]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#222122]">Adres</h4>
                      <p className="text-[#838282]">26-212 Smyków 88</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-[#F3BC30]/10 rounded-full">
                      <Phone className="h-5 w-5 text-[#F3BC30]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#222122]">Telefon</h4>
                      <a 
                        href="tel:+48697257725" 
                        className="text-[#F3BC30] hover:text-[#E0AA2B] font-medium"
                      >
                        +48 697 257 725
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-[#F3BC30]/10 rounded-full">
                      <Mail className="h-5 w-5 text-[#F3BC30]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#222122]">E-mail</h4>
                      <a 
                        href="mailto:dawidkol@o2.pl" 
                        className="text-[#F3BC30] hover:text-[#E0AA2B] font-medium"
                      >
                        dawidkol@o2.pl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-[#F3BC30]/10 rounded-full">
                      <Clock className="h-5 w-5 text-[#F3BC30]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#222122]">Godziny pracy</h4>
                      <div className="text-[#838282] text-sm">
                        <div>Pn-Pt: 8:00-18:00</div>
                        <div>Sb: 9:00-15:00</div>
                        <div>Nd: zamknięte</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Import z UE */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 text-[#F3BC30] mr-2" />
                  Import pojazdów z UE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#838282] mb-4">
                  Specjalizujemy się w imporcie busów i samochodów dostawczych z krajów Unii Europejskiej.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['Niemcy', 'Holandia', 'Belgia', 'Dania'].map((country) => (
                    <div key={country} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-[#222122] font-medium">{country}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    💡 Pomagamy w kompleksowym procesie importu - od znalezienia pojazdu po rejestrację w Polsce.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Otomoto */}
            <Card>
              <CardHeader>
                <CardTitle>Nasza oferta online</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#838282] mb-4">
                  Zobacz wszystkie nasze aktualne ogłoszenia na platformie Otomoto.
                </p>
                <a 
                  href="https://fhufranko.otomoto.pl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Button className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    fhufranko.otomoto.pl
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Formularz kontaktowy */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Wyślij zapytanie</CardTitle>
                <p className="text-[#838282]">
                  Masz pytania o konkretny pojazd lub chcesz dowiedzieć się więcej o imporcie? Napisz do nas.
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Wiadomość wysłana!
                    </h3>
                    <p className="text-green-700">
                      Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Imię i nazwisko *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Jan Kowalski"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+48 123 456 789"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Adres e-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="jan.kowalski@example.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Temat</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="np. Zapytanie o Mercedes Sprinter"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Wiadomość *</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Opisz swoje zapytanie..."
                        required
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-[#838282]">
                        * Pola wymagane. Wysyłając formularz, wyrażasz zgodę na przetwarzanie 
                        danych osobowych w celu udzielenia odpowiedzi na zapytanie.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122] font-semibold py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#222122] mr-2"></div>
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Wyślij wiadomość
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Mapa (mockowa) */}
            <Card>
              <CardHeader>
                <CardTitle>Lokalizacja</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-[#838282]">
                    <MapPin className="h-12 w-12 mx-auto mb-4" />
                    <p className="font-medium">26-212 Smyków 88</p>
                    <p className="text-sm">Mapa zostanie wkrótce dodana</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://maps.google.com/?q=26-212+Smyków+88`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Otwórz w Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};