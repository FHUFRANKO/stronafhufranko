import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone, Menu, X, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Ogłoszenia', path: '/ogloszenia' },
    { label: 'Opinie', path: '/opinie' },
    { label: 'Kontakt', path: '/kontakt' },
    { label: 'O nas', path: '/o-nas' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg h-14' 
            : 'bg-white h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => handleNavigation('/')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#F3BC30] rounded-lg flex items-center justify-center mr-3">
                  <span className="font-bold text-[#222122] text-xl">F</span>
                </div>
                <div>
                  <div className="font-bold text-[#222122] text-lg leading-tight">
                    FHU FRANKO
                  </div>
                  <div className="text-xs text-[#838282] leading-tight">
                    Autohandel BUSY/LCV
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    isActivePage(item.path)
                      ? 'text-[#F3BC30] bg-[#F3BC30]/10'
                      : 'text-[#222122] hover:text-[#F3BC30] hover:bg-[#F3BC30]/5'
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Desktop Actions - usunieto przycisk "Dodaj ogloszenie" */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-[#F3BC30] text-[#F3BC30] hover:bg-[#F3BC30] hover:text-[#222122]"
                onClick={() => window.open('tel:+48697257725')}
              >
                <Phone className="h-4 w-4 mr-2" />
                697 257 725
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-[#222122]" />
              ) : (
                <Menu className="h-6 w-6 text-[#222122]" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="fixed top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={`w-full justify-start text-left px-4 py-3 ${
                      isActivePage(item.path)
                        ? 'text-[#F3BC30] bg-[#F3BC30]/10'
                        : 'text-[#222122] hover:text-[#F3BC30] hover:bg-[#F3BC30]/5'
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>

              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-[#F3BC30] text-[#F3BC30] hover:bg-[#F3BC30] hover:text-[#222122]"
                  onClick={() => window.open('tel:+48697257725')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Zadzwoń: 697 257 725
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className={`${isScrolled ? 'h-14' : 'h-20'} transition-all duration-300`} />
    </>
  );
};