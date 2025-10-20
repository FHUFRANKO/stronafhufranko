import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { marki, modele, paliwa, typyNadwozi, skrzynie } from '../mock';

export const SearchForm = ({ onSearch, initialFilters = {}, compact = false }) => {
  const [filters, setFilters] = useState({
    marka: '',
    model: '',
    rokOd: '',
    rokDo: '',
    cenaOd: '',
    cenaDo: '',
    paliwo: '',
    typNadwozia: '',
    skrzynia: '',
    przebiegOd: '',
    przebiegDo: '',
    dmcKategoria: '',
    ladownoscOd: '',
    ladownoscDo: '',
    wymiarL: '',
    wymiarH: '',
    winda: false,
    hak: false,
    czterykola: false,
    normaEmisji: '',
    ...initialFilters
  });
  
  const [availableModels, setAvailableModels] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(!compact);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    if (filters.marka && modele[filters.marka]) {
      setAvailableModels(modele[filters.marka]);
    } else {
      setAvailableModels([]);
      setFilters(prev => ({ ...prev, model: '' }));
    }
  }, [filters.marka]);

  useEffect(() => {
    const count = Object.entries(filters).filter(([key, value]) => {
      if (typeof value === 'boolean') return value;
      return value && value !== '';
    }).length;
    setActiveFiltersCount(count);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({
      marka: '',
      model: '',
      rokOd: '',
      rokDo: '',
      cenaOd: '',
      cenaDo: '',
      paliwo: '',
      typNadwozia: '',
      skrzynia: '',
      przebiegOd: '',
      przebiegDo: '',
      dmcKategoria: '',
      ladownoscOd: '',
      ladownoscDo: '',
      wymiarL: '',
      wymiarH: '',
      winda: false,
      hak: false,
      czterykola: false,
      normaEmisji: ''
    });
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 15 }, (_, i) => currentYear - i); // 2010-2024

  if (compact) {
    return (
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="marka" className="text-sm font-medium text-[#222122] mb-2 block">
                Marka
              </Label>
              <Select value={filters.marka} onValueChange={(value) => handleFilterChange('marka', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz markę" />
                </SelectTrigger>
                <SelectContent>
                  {marki.map(marka => (
                    <SelectItem key={marka} value={marka}>{marka}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="typNadwozia" className="text-sm font-medium text-[#222122] mb-2 block">
                Typ nadwozia
              </Label>
              <Select 
                value={filters.typNadwozia} 
                onValueChange={(value) => handleFilterChange('typNadwozia', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Typ busa" />
                </SelectTrigger>
                <SelectContent>
                  {typyNadwozi.map(typ => (
                    <SelectItem key={typ} value={typ}>{typ}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-[#222122] mb-2 block">
                DMC
              </Label>
              <Select value={filters.dmcKategoria} onValueChange={(value) => handleFilterChange('dmcKategoria', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Masa całkowita" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="do 3.5t">do 3.5t</SelectItem>
                  <SelectItem value="3.5-7.5t">3.5-7.5t</SelectItem>
                  <SelectItem value="powyżej 7.5t">powyżej 7.5t</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col justify-end">
              <Button 
                onClick={handleSearch}
                className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122] font-medium mb-2"
              >
                <Search className="h-4 w-4 mr-2" />
                Szukaj ({activeFiltersCount})
              </Button>
              
              {!showAdvanced && (
                <Button
                  variant="outline"
                  onClick={() => setShowAdvanced(true)}
                  className="text-sm"
                >
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Więcej filtrów
                </Button>
              )}
            </div>
          </div>

          {showAdvanced && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium text-[#222122] mb-2 block">
                    Model
                  </Label>
                  <Select 
                    value={filters.model} 
                    onValueChange={(value) => handleFilterChange('model', value)}
                    disabled={!filters.marka}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz model" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map(model => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-[#222122] mb-2 block">
                    Paliwo
                  </Label>
                  <Select value={filters.paliwo} onValueChange={(value) => handleFilterChange('paliwo', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Dowolne" />
                    </SelectTrigger>
                    <SelectContent>
                      {paliwa.map(paliwo => (
                        <SelectItem key={paliwo} value={paliwo}>{paliwo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm font-medium text-[#222122] mb-2 block">
                      Wymiar L
                    </Label>
                    <Select value={filters.wymiarL} onValueChange={(value) => handleFilterChange('wymiarL', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="L" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L1">L1</SelectItem>
                        <SelectItem value="L2">L2</SelectItem>
                        <SelectItem value="L3">L3</SelectItem>
                        <SelectItem value="L4">L4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#222122] mb-2 block">
                      Wymiar H
                    </Label>
                    <Select value={filters.wymiarH} onValueChange={(value) => handleFilterChange('wymiarH', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="H" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="H1">H1</SelectItem>
                        <SelectItem value="H2">H2</SelectItem>
                        <SelectItem value="H3">H3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm font-medium text-[#222122] mb-2 block">
                      Cena od (zł)
                    </Label>
                    <Input
                      placeholder="30 000"
                      value={filters.cenaOd}
                      onChange={(e) => handleFilterChange('cenaOd', e.target.value)}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#222122] mb-2 block">
                      Cena do (zł)
                    </Label>
                    <Input
                      placeholder="200 000"
                      value={filters.cenaDo}
                      onChange={(e) => handleFilterChange('cenaDo', e.target.value)}
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowAdvanced(false)}
                    className="mb-2"
                  >
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Zwiń
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Wyczyść
                  </Button>
                </div>
              </div>

              {/* Checkboxes dla wyposażenia */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.winda}
                    onChange={(e) => handleFilterChange('winda', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-[#222122]">Winda załadowcza</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.hak}
                    onChange={(e) => handleFilterChange('hak', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-[#222122]">Hak holowniczy</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.czterykola}
                    onChange={(e) => handleFilterChange('czterykola', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-[#222122]">4×4</span>
                </label>
              </div>

              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => {
                    if (!value || (typeof value === 'boolean' && !value)) return null;
                    const labels = {
                      marka: 'Marka',
                      model: 'Model',
                      typNadwozia: 'Typ',
                      dmcKategoria: 'DMC',
                      wymiarL: 'Długość',
                      wymiarH: 'Wysokość',
                      winda: 'Winda',
                      hak: 'Hak',
                      czterykola: '4×4',
                      normaEmisji: 'Norma'
                    };
                    return (
                      <Badge key={key} variant="secondary" className="flex items-center gap-1">
                        {labels[key] || key}: {typeof value === 'boolean' ? 'tak' : value}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleFilterChange(key, typeof value === 'boolean' ? false : '')}
                        />
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-[#222122] mb-6">Znajdź idealny bus dla Twojej firmy</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <Label htmlFor="marka" className="text-sm font-medium text-[#222122] mb-2 block">
              Marka
            </Label>
            <Select value={filters.marka} onValueChange={(value) => handleFilterChange('marka', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz markę" />
              </SelectTrigger>
              <SelectContent>
                {marki.map(marka => (
                  <SelectItem key={marka} value={marka}>{marka}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="typNadwozia" className="text-sm font-medium text-[#222122] mb-2 block">
              Typ nadwozia
            </Label>
            <Select 
              value={filters.typNadwozia} 
              onValueChange={(value) => handleFilterChange('typNadwozia', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Typ busa" />
              </SelectTrigger>
              <SelectContent>
                {typyNadwozi.map(typ => (
                  <SelectItem key={typ} value={typ}>{typ}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-[#222122] mb-2 block">
              DMC
            </Label>
            <Select value={filters.dmcKategoria} onValueChange={(value) => handleFilterChange('dmcKategoria', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Masa całkowita" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="do 3.5t">do 3.5t</SelectItem>
                <SelectItem value="3.5-7.5t">3.5-7.5t</SelectItem>
                <SelectItem value="powyżej 7.5t">powyżej 7.5t</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-sm font-medium text-[#222122] mb-2 block">
                Cena od (zł)
              </Label>
              <Input
                placeholder="30 000"
                value={filters.cenaOd}
                onChange={(e) => handleFilterChange('cenaOd', e.target.value)}
                type="number"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#222122] mb-2 block">
                Cena do (zł)
              </Label>
              <Input
                placeholder="200 000"
                value={filters.cenaDo}
                onChange={(e) => handleFilterChange('cenaDo', e.target.value)}
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <Button 
              onClick={handleSearch}
              className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122] font-semibold text-lg py-3"
              size="lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Szukaj Busa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Label className="text-sm font-medium text-[#222122] mb-2 block">
              Model
            </Label>
            <Select 
              value={filters.model} 
              onValueChange={(value) => handleFilterChange('model', value)}
              disabled={!filters.marka}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map(model => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-[#222122] mb-2 block">
              Paliwo
            </Label>
            <Select value={filters.paliwo} onValueChange={(value) => handleFilterChange('paliwo', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Dowolne" />
              </SelectTrigger>
              <SelectContent>
                {paliwa.map(paliwo => (
                  <SelectItem key={paliwo} value={paliwo}>{paliwo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-[#222122] mb-2 block">
              Skrzynia
            </Label>
            <Select value={filters.skrzynia} onValueChange={(value) => handleFilterChange('skrzynia', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Dowolna" />
              </SelectTrigger>
              <SelectContent>
                {skrzynie.map(skrzynia => (
                  <SelectItem key={skrzynia} value={skrzynia}>{skrzynia}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Wyczyść filtry
            </Button>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-[#838282]">Aktywne filtry:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (!value || (typeof value === 'boolean' && !value)) return null;
              const labels = {
                marka: 'Marka',
                model: 'Model',
                typNadwozia: 'Typ',
                dmcKategoria: 'DMC',
                wymiarL: 'Długość',
                wymiarH: 'Wysokość',
                winda: 'Winda',
                hak: 'Hak',
                czterykola: '4×4'
              };
              return (
                <Badge key={key} variant="secondary" className="flex items-center gap-1">
                  {labels[key] || key}: {typeof value === 'boolean' ? 'tak' : value}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleFilterChange(key, typeof value === 'boolean' ? false : '')}
                  />
                </Badge>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};