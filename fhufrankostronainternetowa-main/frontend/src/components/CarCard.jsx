import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, MapPin, Fuel, Calendar, Gauge, Truck, Weight, Package } from 'lucide-react';

export const BusCard = ({ bus, onCardClick, onSaveToggle, isSaved = false }) => {
  const handleSaveClick = (e) => {
    e.stopPropagation();
    onSaveToggle(bus.id);
  };

  const formatCena = (cena) => {
    return new Intl.NumberFormat('pl-PL').format(cena) + ' zł';
  };

  const formatPrzebieg = (przebieg) => {
    return new Intl.NumberFormat('pl-PL').format(przebieg) + ' km';
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200"
      onClick={() => onCardClick(bus)}
    >
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            src={bus.zdjecia[0]}
            alt={`${bus.marka} ${bus.model} ${bus.typNadwozia}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {bus.wyroznialone && (
            <Badge className="bg-[#F3BC30] text-[#222122] hover:bg-[#E0AA2B] font-medium text-xs">
              Wyróżnione
            </Badge>
          )}
          {bus.nowosc && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
              Nowość
            </Badge>
          )}
          {bus.flotowy && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
              Flotowy
            </Badge>
          )}
        </div>

        {/* Save button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={handleSaveClick}
        >
          <Heart 
            className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-[#222122] line-clamp-1">
              {bus.marka} {bus.model}
            </h3>
            <div className="text-sm text-[#838282] mb-1">
              {bus.typNadwozia}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl text-[#222122]">
              {formatCena(bus.cenaBrutto)}
            </div>
            {bus.vat && (
              <div className="text-sm text-[#838282]">
                netto: {formatCena(bus.cenaNetto)}
              </div>
            )}
          </div>
        </div>

        {/* Parametry LCV */}
        <div className="grid grid-cols-2 gap-2 text-xs text-[#838282] mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {bus.rok}
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-3 w-3" />
            {formatPrzebieg(bus.przebieg)}
          </div>
          <div className="flex items-center gap-1">
            <Weight className="h-3 w-3" />
            DMC: {bus.dmc} kg
          </div>
          <div className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            {bus.ladownosc} kg
          </div>
          <div className="flex items-center gap-1">
            <Truck className="h-3 w-3" />
            {bus.wymiarL}×{bus.wymiarH}
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-3 w-3" />
            {bus.paliwo}
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#838282] mb-3">
          <MapPin className="h-3 w-3" />
          {bus.lokalizacja}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {bus.vat && (
            <Badge variant="outline" className="text-xs">VAT</Badge>
          )}
          {bus.gwarancja && (
            <Badge variant="outline" className="text-xs">Gwarancja</Badge>
          )}
          {bus.winda && (
            <Badge variant="outline" className="text-xs">Winda</Badge>
          )}
          {bus.hak && (
            <Badge variant="outline" className="text-xs">Hak</Badge>
          )}
          {bus.czterykola && (
            <Badge variant="outline" className="text-xs">4×4</Badge>
          )}
          <Badge variant="outline" className="text-xs">{bus.skrzynia}</Badge>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122] font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(bus);
            }}
          >
            Szczegóły
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Backward compatibility - eksportuj też jako CarCard
export const CarCard = BusCard;