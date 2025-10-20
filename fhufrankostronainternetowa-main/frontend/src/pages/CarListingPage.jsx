import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchForm } from '../components/SearchForm';
import { CarCard } from '../components/CarCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { busApi } from '../api/busApi';

export const CarListingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState(location.state?.filters || {});
  const [allBuses, setAllBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [sortBy, setSortBy] = useState('data-desc');
  const [viewMode, setViewMode] = useState('grid');
  const [savedBuses, setSavedBuses] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const busesPerPage = 12;

  useEffect(() => {
    fetchBuses();
  }, []);

  useEffect(() => {
    filterAndSortBuses();
  }, [filters, sortBy, allBuses]);

  const fetchBuses = async () => {
    try {
      const data = await busApi.getAllBuses();
      setAllBuses(data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBuses = () => {
    let filtered = allBuses.filter(bus => {
      const matchesMarka = !filters.marka || bus.marka === filters.marka;
      const matchesModel = !filters.model || bus.model === filters.model;
      const matchesRokOd = !filters.rokOd || bus.rok >= parseInt(filters.rokOd);
      const matchesRokDo = !filters.rokDo || bus.rok <= parseInt(filters.rokDo);
      const matchesCenaOd = !filters.cenaOd || bus.cenaBrutto >= parseInt(filters.cenaOd);
      const matchesCenaDo = !filters.cenaDo || bus.cenaBrutto <= parseInt(filters.cenaDo);
      const matchesPaliwo = !filters.paliwo || bus.paliwo === filters.paliwo;
      const matchesTypNadwozia = !filters.typNadwozia || bus.typNadwozia === filters.typNadwozia;
      const matchesSkrzynia = !filters.skrzynia || bus.skrzynia === filters.skrzynia;
      const matchesPrzebiegOd = !filters.przebiegOd || bus.przebieg >= parseInt(filters.przebiegOd);
      const matchesPrzebiegDo = !filters.przebiegDo || bus.przebieg <= parseInt(filters.przebiegDo);
      const matchesDmcKategoria = !filters.dmcKategoria || bus.dmcKategoria === filters.dmcKategoria;
      const matchesLadownoscOd = !filters.ladownoscOd || bus.ladownosc >= parseInt(filters.ladownoscOd);
      const matchesLadownoscDo = !filters.ladownoscDo || bus.ladownosc <= parseInt(filters.ladownoscDo);
      const matchesWymiarL = !filters.wymiarL || bus.wymiarL === filters.wymiarL;
      const matchesWymiarH = !filters.wymiarH || bus.wymiarH === filters.wymiarH;
      const matchesWinda = !filters.winda || bus.winda === filters.winda;
      const matchesHak = !filters.hak || bus.hak === filters.hak;
      const matchesCzterykola = !filters.czterykola || bus.czterykola === filters.czterykola;

      return matchesMarka && matchesModel && matchesRokOd && matchesRokDo && 
             matchesCenaOd && matchesCenaDo && matchesPaliwo && matchesTypNadwozia && 
             matchesSkrzynia && matchesPrzebiegOd && matchesPrzebiegDo && matchesDmcKategoria &&
             matchesLadownoscOd && matchesLadownoscDo && matchesWymiarL && matchesWymiarH &&
             matchesWinda && matchesHak && matchesCzterykola;
    });

    // Sort buses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'cena-asc':
          return a.cenaBrutto - b.cenaBrutto;
        case 'cena-desc':
          return b.cenaBrutto - a.cenaBrutto;
        case 'rok-asc':
          return a.rok - b.rok;
        case 'rok-desc':
          return b.rok - a.rok;
        case 'przebieg-asc':
          return a.przebieg - b.przebieg;
        case 'przebieg-desc':
          return b.przebieg - a.przebieg;
        case 'ladownosc-asc':
          return a.ladownosc - b.ladownosc;
        case 'ladownosc-desc':
          return b.ladownosc - a.ladownosc;
        case 'kubatura-asc':
          return a.kubatura - b.kubatura;
        case 'kubatura-desc':
          return b.kubatura - a.kubatura;
        case 'data-desc':
        default:
          return new Date(b.dataPublikacji) - new Date(a.dataPublikacji);
      }
    });

    setFilteredBuses(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

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

  const clearFilters = () => {
    setFilters({});
  };

  // Pagination
  const totalPages = Math.ceil(filteredBuses.length / busesPerPage);
  const startIndex = (currentPage - 1) * busesPerPage;
  const currentBuses = filteredBuses.slice(startIndex, startIndex + busesPerPage);

  const sortOptions = [
    { value: 'data-desc', label: 'Najnowsze' },
    { value: 'cena-asc', label: 'Cena: od najniższej' },
    { value: 'cena-desc', label: 'Cena: od najwyższej' },
    { value: 'rok-desc', label: 'Rok: od najnowszego' },
    { value: 'rok-asc', label: 'Rok: od najstarszego' },
    { value: 'przebieg-asc', label: 'Przebieg: od najmniejszego' },
    { value: 'przebieg-desc', label: 'Przebieg: od największego' },
    { value: 'ladownosc-desc', label: 'Ładowność: od największej' },
    { value: 'ladownosc-asc', label: 'Ładowność: od najmniejszej' },
    { value: 'kubatura-desc', label: 'Kubatura: od największej' },
    { value: 'kubatura-asc', label: 'Kubatura: od najmniejszej' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Form */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchForm onSearch={handleSearch} initialFilters={filters} compact={true} />
        </div>
      </section>

      {/* Results Header */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#222122]">
                Busy i samochody dostawcze
              </h1>
              <Badge variant="secondary" className="text-sm">
                {filteredBuses.length} {filteredBuses.length === 1 ? 'bus' : 'busów'}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#838282] whitespace-nowrap">Sortuj:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode */}
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-[#F3BC30] text-[#222122] hover:bg-[#E0AA2B]' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className={`rounded-none ${viewMode === 'list' ? 'bg-[#F3BC30] text-[#222122] hover:bg-[#E0AA2B]' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {Object.keys(filters).some(key => filters[key]) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="whitespace-nowrap"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Wyczyść filtry
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredBuses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚐</div>
              <h3 className="text-xl font-semibold text-[#222122] mb-2">
                Nie znaleźliśmy busów
              </h3>
              <p className="text-[#838282] mb-6">
                Spróbuj zmienić filtry wyszukiwania lub sprawdź wszystkie dostępne busy
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                >
                  Wyczyść filtry
                </Button>
                <Button
                  className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]"
                  onClick={() => navigate('/')}
                >
                  Wróć do strony głównej
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Buses Grid/List */}
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {currentBuses.map((bus) => (
                  <CarCard
                    key={bus.id}
                    bus={bus}
                    onCardClick={handleBusClick}
                    onSaveToggle={handleSaveToggle}
                    isSaved={savedBuses.has(bus.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Poprzednia
                  </Button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          className={currentPage === page ? 'bg-[#F3BC30] text-[#222122] hover:bg-[#E0AA2B]' : ''}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Następna
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};