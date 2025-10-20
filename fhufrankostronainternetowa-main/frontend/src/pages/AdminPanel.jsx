import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Plus, 
  Edit, 
  Trash2,
  ArrowLeft,
  Truck,
  Star,
  Eye,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { busApi } from '../api/busApi';
import { BusForm } from '../components/BusForm';
import { OpinionForm } from '../components/OpinionForm';
import { toast } from 'sonner';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [opinions, setOpinions] = useState([]);
  const [stats, setStats] = useState({ total: 0, wyrozniowane: 0, nowe: 0, flotowe: 0 });
  const [showForm, setShowForm] = useState(false);
  const [showOpinionForm, setShowOpinionForm] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [editingOpinion, setEditingOpinion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBuses();
    fetchOpinions();
    fetchStats();
  }, []);

  const fetchBuses = async () => {
    try {
      const data = await busApi.getAllBuses();
      setBuses(data);
    } catch (error) {
      console.error('Error fetching buses:', error);
      toast.error('Błąd podczas pobierania ogłoszeń');
    }
  };

  const fetchOpinions = async () => {
    try {
      const data = await busApi.getAllOpinions();
      setOpinions(data);
    } catch (error) {
      console.error('Error fetching opinions:', error);
      toast.error('Błąd podczas pobierania opinii');
    }
  };

  const fetchStats = async () => {
    try {
      const data = await busApi.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddBus = () => {
    setEditingBus(null);
    setShowForm(true);
  };

  const handleEditBus = (bus) => {
    setEditingBus(bus);
    setShowForm(true);
  };

  const handleDeleteBus = async (busId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć to ogłoszenie?')) {
      return;
    }

    try {
      await busApi.deleteBus(busId);
      toast.success('Ogłoszenie zostało usunięte');
      fetchBuses();
      fetchStats();
    } catch (error) {
      console.error('Error deleting bus:', error);
      toast.error('Błąd podczas usuwania ogłoszenia');
    }
  };

  const handleSubmitBus = async (busData) => {
    setLoading(true);
    try {
      if (editingBus) {
        await busApi.updateBus(editingBus.id, busData);
        toast.success('Ogłoszenie zostało zaktualizowane');
      } else {
        await busApi.createBus(busData);
        toast.success('Ogłoszenie zostało dodane');
      }
      setShowForm(false);
      setEditingBus(null);
      fetchBuses();
      fetchStats();
    } catch (error) {
      console.error('Error saving bus:', error);
      toast.error('Błąd podczas zapisywania ogłoszenia');
    } finally {
      setLoading(false);
    }
  };

  // Opinion handlers
  const handleAddOpinion = () => {
    setEditingOpinion(null);
    setShowOpinionForm(true);
  };

  const handleEditOpinion = (opinion) => {
    setEditingOpinion(opinion);
    setShowOpinionForm(true);
  };

  const handleDeleteOpinion = async (opinionId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę opinię?')) {
      return;
    }

    try {
      await busApi.deleteOpinion(opinionId);
      toast.success('Opinia została usunięta');
      fetchOpinions();
    } catch (error) {
      console.error('Error deleting opinion:', error);
      toast.error('Błąd podczas usuwania opinii');
    }
  };

  const handleSubmitOpinion = async (opinionData) => {
    setLoading(true);
    try {
      if (editingOpinion) {
        await busApi.updateOpinion(editingOpinion.id, opinionData);
        toast.success('Opinia została zaktualizowana');
      } else {
        await busApi.createOpinion(opinionData);
        toast.success('Opinia została dodana');
      }
      setShowOpinionForm(false);
      setEditingOpinion(null);
      fetchOpinions();
    } catch (error) {
      console.error('Error saving opinion:', error);
      toast.error('Błąd podczas zapisywania opinii');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOpinionForm = () => {
    setShowOpinionForm(false);
    setEditingOpinion(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBus(null);
  };

  if (showOpinionForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={handleCancelOpinionForm}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do listy
          </Button>
          <OpinionForm
            initialData={editingOpinion}
            onSubmit={handleSubmitOpinion}
            onCancel={handleCancelOpinionForm}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={handleCancelForm}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do listy
          </Button>
          <BusForm
            initialData={editingBus}
            onSubmit={handleSubmitBus}
            onCancel={handleCancelForm}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Powrót do strony
              </Button>
              <h1 className="text-3xl font-bold text-[#222122]">Panel Admina</h1>
              <p className="text-[#838282]">Zarządzanie ogłoszeniami busów FHU FRANKO</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#838282]">Administrator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="ogloszenia">
              <Truck className="h-4 w-4 mr-2" />
              Ogłoszenia
            </TabsTrigger>
            <TabsTrigger value="opinie">
              <MessageSquare className="h-4 w-4 mr-2" />
              Opinie
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#838282]">Wszystkie busy</p>
                      <h3 className="text-3xl font-bold text-[#222122] mt-2">{stats.total}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#838282]">Wyróżnione</p>
                      <h3 className="text-3xl font-bold text-[#222122] mt-2">{stats.wyrozniowane}</h3>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#838282]">Nowe</p>
                      <h3 className="text-3xl font-bold text-[#222122] mt-2">{stats.nowe}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Plus className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#838282]">Flotowe</p>
                      <h3 className="text-3xl font-bold text-[#222122] mt-2">{stats.flotowe}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {buses.length === 0 && (
              <Alert>
                <AlertDescription>
                  Brak ogłoszeń w bazie danych. Dodaj pierwsze ogłoszenie używając przycisku "Dodaj Bus" w zakładce Ogłoszenia.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* Ogłoszenia Tab */}
          <TabsContent value="ogloszenia" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#222122]">Lista ogłoszeń</h2>
              <Button
                onClick={handleAddBus}
                className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Dodaj Bus
              </Button>
            </div>

            {buses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Truck className="h-16 w-16 mx-auto text-[#838282] mb-4" />
                  <h3 className="text-xl font-semibold text-[#222122] mb-2">Brak ogłoszeń</h3>
                  <p className="text-[#838282] mb-6">Dodaj pierwsze ogłoszenie busa</p>
                  <Button
                    onClick={handleAddBus}
                    className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Dodaj Bus
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {buses.map((bus) => (
                  <Card key={bus.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {bus.zdjecia && bus.zdjecia.length > 0 ? (
                            <img
                              src={bus.zdjecia[0]}
                              alt={`${bus.marka} ${bus.model}`}
                              className="w-24 h-24 object-cover rounded"
                            />
                          ) : (
                            <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                              <Truck className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-lg text-[#222122]">
                              {bus.marka} {bus.model}
                            </h3>
                            <p className="text-sm text-[#838282]">
                              {bus.rok} • {bus.typNadwozia} • {bus.przebieg.toLocaleString()} km
                            </p>
                            <p className="text-lg font-bold text-[#F3BC30] mt-1">
                              {bus.cenaBrutto.toLocaleString()} zł
                            </p>
                            <div className="flex gap-2 mt-2">
                              {bus.wyrozniowane && (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                  Wyróżnione
                                </span>
                              )}
                              {bus.nowosc && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  Nowość
                                </span>
                              )}
                              {bus.flotowy && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  Flotowy
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditBus(bus)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edytuj
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBus(bus.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Usuń
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Opinie Tab */}
          <TabsContent value="opinie" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#222122]">Lista opinii</h2>
              <Button
                onClick={handleAddOpinion}
                className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Dodaj Opinię
              </Button>
            </div>

            {opinions.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-16 w-16 mx-auto text-[#838282] mb-4" />
                  <h3 className="text-xl font-semibold text-[#222122] mb-2">Brak opinii</h3>
                  <p className="text-[#838282] mb-6">Dodaj pierwszą opinię klienta</p>
                  <Button
                    onClick={handleAddOpinion}
                    className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Dodaj Opinię
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {opinions.map((opinion) => (
                  <Card key={opinion.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-[#222122]">
                              {opinion.imie}
                            </h3>
                            <div className="flex text-[#F3BC30]">
                              {[...Array(opinion.ocena || 5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                              ))}
                            </div>
                            {!opinion.wyswietlaj && (
                              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                Ukryta
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#838282] mb-2">
                            {opinion.typDzialalnosci}
                            {opinion.zakupionyPojazd && ` • ${opinion.zakupionyPojazd}`}
                          </p>
                          <p className="text-sm text-[#838282] italic">
                            "{opinion.komentarz.substring(0, 150)}
                            {opinion.komentarz.length > 150 ? '...' : ''}"
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditOpinion(opinion)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edytuj
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteOpinion(opinion.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Usuń
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
