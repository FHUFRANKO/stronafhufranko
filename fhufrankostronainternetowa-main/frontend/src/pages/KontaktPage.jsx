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
  ExternalLink,
  Send,
  Truck,
  Globe
} from 'lucide-react';

export const KontaktPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#F3BC30]/10 to-[#F3BC30]/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Truck className="h-12 w-12 text-[#F3BC30] mr-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-[#222122]">
              Kontakt
            </h1>
          </div>
          <p className="text-lg text-[#838282] max-w-2xl mx-auto leading-relaxed">
            Skontaktuj się z nami w sprawie zakupu busa dostawczego. Specjalizujemy się w imporcie 
            z krajów UE oraz sprzedaży pojazdów użytkowych najwyższej jakości.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Company Information */}
          <div className="space-y-8">
            
            {/* Main Company Card */}
            <Card className="border-[#F3BC30]/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#F3BC30]/10 to-[#F3BC30]/5">
                <CardTitle className="text-2xl font-bold text-[#222122] flex items-center">
                  <div className="w-12 h-12 bg-[#F3BC30] rounded-lg flex items-center justify-center mr-4">
                    <span className="font-bold text-[#222122] text-xl">F</span>
                  </div>
                  FHU Franko – Auto Handel
                </CardTitle>
                <p className="text-[#838282] text-lg mt-2">
                  Sprzedaż aut dostawczych, użytkowych, busów. Import z UE (Niemcy, Holandia, Belgia, Dania).
                </p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* Contact Details */}
                <div className="space-y-4">
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-[#F3BC30]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#F3BC30]/20 transition-colors">
                      <MapPin className="h-6 w-6 text-[#F3BC30]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#222122]">Adres</p>
                      <p className="text-[#838282]">26-212 Smyków 88</p>
                    </div>
                  </div>

                  <div className="flex items-center group cursor-pointer" onClick={() => window.open('tel:+48697257725')}>
                    <div className="w-12 h-12 bg-[#F3BC30]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#F3BC30]/20 transition-colors">
                      <Phone className="h-6 w-6 text-[#F3BC30]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#222122]">Telefon</p>
                      <p className="text-[#F3BC30] hover:underline">+48 697 257 725</p>
                    </div>
                  </div>

                  <div className="flex items-center group cursor-pointer" onClick={() => window.open('mailto:dawidkol@o2.pl')}>
                    <div className="w-12 h-12 bg-[#F3BC30]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#F3BC30]/20 transition-colors">
                      <Mail className="h-6 w-6 text-[#F3BC30]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#222122]">E-mail</p>
                      <p className="text-[#F3BC30] hover:underline">dawidkol@o2.pl</p>
                    </div>
                  </div>

                  <div className="flex items-center group cursor-pointer" onClick={() => window.open('https://fhufranko.otomoto.pl', '_blank')}>
                    <div className="w-12 h-12 bg-[#F3BC30]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#F3BC30]/20 transition-colors">
                      <ExternalLink className="h-6 w-6 text-[#F3BC30]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#222122]">Oferta Otomoto</p>
                      <p className="text-[#F3BC30] hover:underline">fhufranko.otomoto.pl</p>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-[#F3BC30]/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#222122] flex items-center">
                  <Clock className="h-6 w-6 text-[#F3BC30] mr-3" />
                  Godziny Otwarcia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#838282]">Poniedziałek - Piątek:</span>
                    <span className="font-medium text-[#222122]">8:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#838282]">Sobota:</span>
                    <span className="font-medium text-[#222122]">9:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#838282]">Niedziela:</span>
                    <span className="font-medium text-[#222122]">Zamknięte</span>
                  </div>
                  <div className="pt-2 border-t border-[#F3BC30]/20">
                    <p className="text-xs text-[#838282]">
                      * Oględziny pojazdów możliwe po wcześniejszym umówieniu
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialization */}
            <Card className="border-[#F3BC30]/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#222122] flex items-center">
                  <Globe className="h-6 w-6 text-[#F3BC30] mr-3" />
                  Nasza Specjalizacja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#F3BC30] rounded-full mr-3"></div>
                    <span className="text-[#838282]">Import busów z Niemiec, Holandii, Belgii, Danii</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#F3BC30] rounded-full mr-3"></div>
                    <span className="text-[#838282]">Samochody dostawcze i użytkowe</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#F3BC30] rounded-full mr-3"></div>
                    <span className="text-[#838282]">Minibusy i pojazdy specjalistyczne</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#F3BC30] rounded-full mr-3"></div>
                    <span className="text-[#838282]">Pomoc w wyborze odpowiedniego pojazdu</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-[#F3BC30]/20 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl text-[#222122] flex items-center">
                  <Send className="h-6 w-6 text-[#F3BC30] mr-3" />
                  Napisz do Nas
                </CardTitle>
                <p className="text-[#838282]">
                  Masz pytania? Potrzebujesz wyceny? Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#222122] font-medium">
                        Imię i nazwisko *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Jan Kowalski"
                        className="border-[#F3BC30]/30 focus:border-[#F3BC30] focus:ring-[#F3BC30]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#222122] font-medium">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+48 123 456 789"
                        className="border-[#F3BC30]/30 focus:border-[#F3BC30] focus:ring-[#F3BC30]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#222122] font-medium">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="jan@example.com"
                      className="border-[#F3BC30]/30 focus:border-[#F3BC30] focus:ring-[#F3BC30]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#222122] font-medium">
                      Temat
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Zapytanie o bus dostawczy"
                      className="border-[#F3BC30]/30 focus:border-[#F3BC30] focus:ring-[#F3BC30]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#222122] font-medium">
                      Wiadomość *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Opisz swoje potrzeby, interesujące Cię parametry pojazdu lub zadaj pytanie..."
                      className="border-[#F3BC30]/30 focus:border-[#F3BC30] focus:ring-[#F3BC30] resize-none"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm font-medium">
                        ✅ Dziękujemy za wiadomość! Skontaktujemy się z Tobą w ciągu 24 godzin.
                      </p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#F3BC30] hover:bg-[#F3BC30]/90 text-[#222122] font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#222122] mr-2"></div>
                        Wysyłanie...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-5 w-5 mr-2" />
                        Wyślij Wiadomość
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-[#838282] text-center">
                    * Pola wymagane. Twoje dane będą wykorzystane wyłącznie do kontaktu w sprawie Twojego zapytania.
                  </p>
                  
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};