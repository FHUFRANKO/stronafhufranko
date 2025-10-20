import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#222122] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#F3BC30] rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold text-[#222122] text-xl">F</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight">
                  FHU FRANKO
                </div>
                <div className="text-sm text-gray-400 leading-tight">
                  Autohandel BUSY/LCV
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Sprzedaż aut dostawczych, użytkowych, busów. Import z krajów UE (Niemcy, Holandia, Belgia, Dania). Sprawdzone pojazdy z pełną dokumentacją.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 text-gray-400 hover:text-[#F3BC30] hover:bg-gray-800"
                onClick={() => handleExternalLink('https://facebook.com')}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 text-gray-400 hover:text-[#F3BC30] hover:bg-gray-800"
                onClick={() => handleExternalLink('https://instagram.com')}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 text-gray-400 hover:text-[#F3BC30] hover:bg-gray-800"
                onClick={() => handleExternalLink('https://twitter.com')}
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Nawigacja</h3>
            <nav className="space-y-2">
              {[
                { label: 'Ogłoszenia', path: '/ogloszenia' },
                { label: 'Opinie', path: '/opinie' },
                { label: 'Kontakt', path: '/kontakt' },
                { label: 'O nas', path: '/o-nas' }
              ].map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="p-0 h-auto text-gray-300 hover:text-[#F3BC30] justify-start"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Nasza Oferta</h3>
            <nav className="space-y-2">
              {[
                { label: 'Busy dostawcze', path: '/ogloszenia?typ=dostawcze' },
                { label: 'Furgony', path: '/ogloszenia?typ=furgony' },
                { label: 'Minibusy', path: '/ogloszenia?typ=minibusy' },
                { label: 'Samochody chłodnie', path: '/ogloszenia?typ=chlodnie' },
                { label: 'Import z UE', path: '/kontakt' },
                { label: 'Oferta Otomoto', path: 'https://fhufranko.otomoto.pl', external: true }
              ].map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="p-0 h-auto text-gray-300 hover:text-[#F3BC30] justify-start"
                  onClick={() => item.external ? handleExternalLink(item.path) : handleNavigation(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#F3BC30] mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <div>26-212 Smyków 88</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#F3BC30] flex-shrink-0" />
                <a 
                  href="tel:+48697257725" 
                  className="text-gray-300 text-sm hover:text-[#F3BC30] transition-colors"
                >
                  +48 697 257 725
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#F3BC30] flex-shrink-0" />
                <a 
                  href="mailto:dawidkol@o2.pl" 
                  className="text-gray-300 text-sm hover:text-[#F3BC30] transition-colors"
                >
                  dawidkol@o2.pl
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-[#F3BC30] mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <div>Pn-Pt: 8:00-17:00</div>
                  <div>Sb: 9:00-15:00</div>
                  <div>Nd: zamknięte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Company Data */}
          <div className="text-center md:text-left">
            <div className="text-gray-400 text-sm">
              © {currentYear} FHU FRANKO. Wszystkie prawa zastrzeżone.
            </div>
            <div className="text-gray-500 text-xs mt-1">
              Smyków 88, 26-212 | Import pojazdów użytkowych z krajów UE
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs">
            {[
              { label: 'Polityka prywatności', path: '/polityka-prywatnosci' },
              { label: 'Regulamin', path: '/regulamin' },
              { label: 'RODO', path: '/rodo' },
              { label: 'Cookies', path: '/cookies' },
              { label: 'Reklamacje', path: '/reklamacje' }
            ].map((item, index) => (
              <React.Fragment key={item.path}>
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-gray-500 hover:text-[#F3BC30] text-xs"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </Button>
                {index < 4 && <span className="text-gray-600">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};