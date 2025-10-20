import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Eye, 
  BarChart3, 
  Users, 
  Truck,
  ArrowLeft,
  Save,
  X
} from 'lucide-react';
import { marki, modele, typyNadwozi, paliwa, skrzynie, normyEmisji, miasta, kolory, drzwi } from '../mock';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [newBus, setNewBus] = useState({
    marka: '',
    model: '',
    wersja: '',
    rok: new Date().getFullYear(),
    pierwszaRejestracja: '',
    przebieg: '',
    paliwo: '',
    skrzynia: '',
    naped: 'Przedni (FWD)',
    typNadwozia: '',
    dmc: '',
    ladownosc: '',
    kubatura: '',
    wymiarL: '',
    wymiarH: '',
    moc: '',
    pojemnosc: '',
    kolor: '',
    normaEmisji: '',
    adBlue: false,
    cenaBrutto: '',
    cenaNetto: '',
    vat: true,
    lokalizacja: '',
    gwarancja: true,
    wyrozniowane: false,
    nowosc: true,
    flotowy: false,
    winda: false,
    hak: false,
    klimatyzacjaLadunkowa: false,
    przegroda: false,
    twinWheel: false,
    czterykola: false,
    drzwi: '',
    opis: ''
  });

  // Załaduj busy z localStorage lub użyj domyślnych
  useEffect(() => {
    const savedBuses = localStorage.getItem('adminBuses');
    if (savedBuses) {
      setBuses(JSON.parse(savedBuses));
    } else {
      // Załaduj początkowe 10 busów jako przykład
      const mockBuses = JSON.parse(localStorage.getItem('mockBuses') || '[]').slice(0, 10);
      setBuses(mockBuses);
      localStorage.setItem('adminBuses', JSON.stringify(mockBuses));
    }
  }, []);

  // Zapisz busy do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('adminBuses', JSON.stringify(buses));
  }, [buses]);

  const handleInputChange = (field, value) => {
    setNewBus(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-uzupełnianie pól zależnych
    if (field === 'cenaBrutto' && value) {
      setNewBus(prev => ({
        ...prev,
        cenaNetto: Math.floor(value * 0.81)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const busData = {
      ...newBus,
      id: editingBus ? editingBus.id : Date.now(),
      numerOgloszenia: editingBus ? editingBus.numerOgloszenia : `FKBUS${String(Date.now()).slice(-5)}`,
      dataPublikacji: editingBus ? editingBus.dataPublikacji : new Date(),
      status: 'aktywne',
      zdjecia: [
        'https://customer-assets.emergentagent.com/job_premium-autosite/artifacts/x95quwic_525300848_122105401868956303_2895063514729956344_n.jpg'
      ],
      kontakt: {
        nazwa: 'FHU FRANKO - Busy/LCV',
        telefon: '+48 123 456 789',
        email: 'busy@fhufranko.pl',
        godziny: 'Pn-Pt: 8:00-18:00, Sb: 9:00-15:00'
      },
      wyposazenie: {
        'Bezpieczeństwo': ['ABS', 'ESP', 'Poduszki powietrzne'],
        'Użytkowe': [],
        'Komfort': ['Klimatyzacja kabiny', 'Elektr. szyby', 'Centralny zamek']
      }
    };

    if (editingBus) {
      setBuses(prev => prev.map(bus => bus.id === editingBus.id ? busData : bus));
    } else {
      setBuses(prev => [...prev, busData]);
    }

    // Reset formularza
    setNewBus({
      marka: '',
      model: '',
      wersja: '',
      rok: new Date().getFullYear(),
      pierwszaRejestracja: '',
      przebieg: '',
      paliwo: '',
      skrzynia: '',
      naped: 'Przedni (FWD)',
      typNadwozia: '',
      dmc: '',
      ladownosc: '',
      kubatura: '',
      wymiarL: '',
      wymiarH: '',
      moc: '',
      pojemnosc: '',
      kolor: '',
      normaEmisji: '',
      adBlue: false,
      cenaBrutto: '',
      cenaNetto: '',
      vat: true,
      lokalizacja: '',
      gwarancja: true,
      wyrozniowane: false,
      nowosc: true,
      flotowy: false,
      winda: false,
      hak: false,
      klimatyzacjaLadunkowa: false,
      przegroda: false,
      twinWheel: false,
      czterykola: false,
      drzwi: '',
      opis: ''
    });
    setShowAddForm(false);
    setEditingBus(null);
  };

  const handleEdit = (bus) => {
    setEditingBus(bus);
    setNewBus(bus);
    setShowAddForm(true);
  };

  const handleDelete = (busId) => {
    if (window.confirm('Czy na pewno chcesz usunąć to ogłoszenie?')) {
      setBuses(prev => prev.filter(bus => bus.id !== busId));
    }
  };

  const toggleFeatured = (busId) => {
    setBuses(prev => prev.map(bus => 
      bus.id === busId ? { ...bus, wyrozniowane: !bus.wyrozniowane } : bus
    ));
  };

  const getStats = () => {
    return {
      total: buses.length,
      featured: buses.filter(bus => bus.wyrozniowane).length,
      new: buses.filter(bus => bus.nowosc).length,
      fleet: buses.filter(bus => bus.flotowy).length
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powrót do strony
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel Admina</h1>
              <p className="text-gray-600">Zarządzanie ogłoszeniami busów FHU FRANKO</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-sm">
              👤 Administrator
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="dashboard" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="buses" className="flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Ogłoszenia
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Dodaj Bus
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Użytkownicy
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Wszystkie busy</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Wyróżnione</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Plus className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Nowe</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Flotowe</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.fleet}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Lista Ogłoszeń */}
          <TabsContent value="buses">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Zarządzanie ogłoszeniami busów</CardTitle>
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Dodaj nowe ogłoszenie
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {buses.map((bus) => (
                    <div key={bus.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-lg">
                            {bus.marka} {bus.model}
                          </h3>
                          <Badge variant="outline">{bus.typNadwozia}</Badge>
                          {bus.wyrozniowane && <Badge className="bg-[#F3BC30] text-[#222122]">Wyróżnione</Badge>}
                          {bus.nowosc && <Badge variant="secondary" className="bg-green-100 text-green-800">Nowość</Badge>}
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          {bus.rok} • {bus.przebieg?.toLocaleString()} km • {bus.cenaBrutto?.toLocaleString()} zł • {bus.lokalizacja}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Nr: {bus.numerOgloszenia} • DMC: {bus.dmc} kg • Ładowność: {bus.ladownosc} kg
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(bus.id)}
                          className={bus.wyrozniowane ? 'text-yellow-600' : 'text-gray-400'}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(bus)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(bus.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {buses.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Truck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Brak ogłoszeń busów</p>
                      <p className="text-sm">Dodaj pierwsze ogłoszenie używając przycisku powyżej</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Formularz Dodawania */}
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingBus ? 'Edytuj ogłoszenie busa' : 'Dodaj nowe ogłoszenie busa'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Podstawowe informacje */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="marka">Marka *</Label>
                      <Select value={newBus.marka} onValueChange={(value) => handleInputChange('marka', value)} required>
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
                      <Label htmlFor="model">Model *</Label>
                      <Select 
                        value={newBus.model} 
                        onValueChange={(value) => handleInputChange('model', value)} 
                        disabled={!newBus.marka}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz model" />
                        </SelectTrigger>
                        <SelectContent>
                          {(modele[newBus.marka] || []).map(model => (
                            <SelectItem key={model} value={model}>{model}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="wersja">Wersja</Label>
                      <Input
                        value={newBus.wersja}
                        onChange={(e) => handleInputChange('wersja', e.target.value)}
                        placeholder="np. 2.0 TDI"
                      />
                    </div>
                  </div>

                  {/* Typ nadwozia i rok */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="typNadwozia">Typ nadwozia *</Label>
                      <Select value={newBus.typNadwozia} onValueChange={(value) => handleInputChange('typNadwozia', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz typ nadwozia" />
                        </SelectTrigger>
                        <SelectContent>
                          {typyNadwozi.map(typ => (
                            <SelectItem key={typ} value={typ}>{typ}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="rok">Rok produkcji *</Label>
                      <Input
                        type="number"
                        value={newBus.rok}
                        onChange={(e) => handleInputChange('rok', parseInt(e.target.value))}
                        min="2000"
                        max={new Date().getFullYear() + 1}
                        required
                      />
                    </div>
                  </div>

                  {/* Parametry LCV */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="dmc">DMC (kg) *</Label>
                      <Input
                        type="number"
                        value={newBus.dmc}
                        onChange={(e) => handleInputChange('dmc', parseInt(e.target.value))}
                        placeholder="3500"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="ladownosc">Ładowność (kg) *</Label>
                      <Input
                        type="number"
                        value={newBus.ladownosc}
                        onChange={(e) => handleInputChange('ladownosc', parseInt(e.target.value))}
                        placeholder="1400"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="wymiarL">Długość</Label>
                      <Select value={newBus.wymiarL} onValueChange={(value) => handleInputChange('wymiarL', value)}>
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
                      <Label htmlFor="wymiarH">Wysokość</Label>
                      <Select value={newBus.wymiarH} onValueChange={(value) => handleInputChange('wymiarH', value)}>
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

                  {/* Cena */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cenaBrutto">Cena brutto (PLN) *</Label>
                      <Input
                        type="number"
                        value={newBus.cenaBrutto}
                        onChange={(e) => handleInputChange('cenaBrutto', parseInt(e.target.value))}
                        placeholder="50000"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cenaNetto">Cena netto (PLN)</Label>
                      <Input
                        type="number"
                        value={newBus.cenaNetto}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Checkboxy wyposażenia */}
                  <div>
                    <Label>Wyposażenie użytkowe</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {[
                        { key: 'winda', label: 'Winda załadowcza' },
                        { key: 'hak', label: 'Hak holowniczy' },
                        { key: 'klimatyzacjaLadunkowa', label: 'Klimatyzacja ładunkowa' },
                        { key: 'przegroda', label: 'Przegroda kabiny' },
                        { key: 'twinWheel', label: 'Twin wheel (bliźniaki)' },
                        { key: 'czterykola', label: '4×4' },
                        { key: 'wyrozniowane', label: 'Wyróżnione' },
                        { key: 'flotowy', label: 'Flotowy' }
                      ].map(item => (
                        <label key={item.key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newBus[item.key]}
                            onChange={(e) => handleInputChange(item.key, e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Opis */}
                  <div>
                    <Label htmlFor="opis">Opis</Label>
                    <Textarea
                      value={newBus.opis}
                      onChange={(e) => handleInputChange('opis', e.target.value)}
                      placeholder="Profesjonalny opis busa..."
                      rows={4}
                    />
                  </div>

                  {/* Przyciski */}
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingBus(null);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Anuluj
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingBus ? 'Zapisz zmiany' : 'Dodaj ogłoszenie'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Użytkownicy (mockowy) */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Zarządzanie użytkownikami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Funkcja w przygotowaniu</p>
                  <p className="text-sm">Zarządzanie użytkownikami będzie dostępne wkrótce</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};