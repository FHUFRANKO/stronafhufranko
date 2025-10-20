import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Upload, X, Loader2 } from 'lucide-react';
import { busApi } from '../api/busApi';
import { marki, modele, paliwa, skrzynie, napedy, typyNadwozi, dmcKategorie, normyEmisji, kolory, miasta } from '../constants/formOptions';
import { toast } from 'sonner';

export const BusForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    marka: '',
    model: '',
    rok: new Date().getFullYear(),
    przebieg: '',
    paliwo: 'Diesel',
    skrzynia: 'Manualna',
    naped: 'Przedni (FWD)',
    cenaBrutto: '',
    cenaNetto: '',
    vat: true,
    typNadwozia: 'Furgon',
    moc: '',
    kubatura: '',
    normaSpalania: '',
    normaEmisji: 'Euro 6',
    dmcKategoria: 'do 3.5t',
    ladownosc: '',
    wymiarL: 'L2',
    wymiarH: 'H2',
    pojemnoscSkrzyni: '',
    winda: false,
    hak: false,
    czterykola: false,
    klimatyzacja: false,
    tempomat: false,
    kamera: false,
    czujnikiParkowania: false,
    wyrozniowane: false,
    nowosc: false,
    flotowy: false,
    gwarancja: false,
    kolor: 'Biały',
    pierwszaRejestracja: '',
    miasto: 'Warszawa',
    opis: '',
    zdjecia: [],
    ...initialData
  });

  const [availableModels, setAvailableModels] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (formData.marka) {
      setAvailableModels(modele[formData.marka] || []);
    }
  }, [formData.marka]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    try {
      const uploadPromises = files.map(file => busApi.uploadImage(file));
      const results = await Promise.all(uploadPromises);
      const imageUrls = results.map(result => result.url);
      
      setFormData(prev => ({
        ...prev,
        zdjecia: [...prev.zdjecia, ...imageUrls]
      }));
      
      toast.success(`Dodano ${files.length} zdjęć`);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Błąd podczas przesyłania zdjęć');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      zdjecia: prev.zdjecia.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.marka || !formData.model || !formData.typNadwozia) {
      toast.error('Wypełnij wszystkie wymagane pola');
      return;
    }

    // Convert string numbers to integers
    const submitData = {
      ...formData,
      rok: parseInt(formData.rok),
      przebieg: parseInt(formData.przebieg) || 0,
      cenaBrutto: parseInt(formData.cenaBrutto) || 0,
      cenaNetto: formData.cenaNetto ? parseInt(formData.cenaNetto) : null,
      moc: parseInt(formData.moc) || 0,
      kubatura: formData.kubatura ? parseInt(formData.kubatura) : null,
      ladownosc: parseInt(formData.ladownosc) || 0,
      pojemnoscSkrzyni: formData.pojemnoscSkrzyni ? parseInt(formData.pojemnoscSkrzyni) : null,
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? 'Edytuj ogłoszenie' : 'Dodaj nowe ogłoszenie'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Podstawowe informacje */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Podstawowe informacje</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marka">Marka *</Label>
                <Select value={formData.marka} onValueChange={(val) => handleChange('marka', val)}>
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
                <Select value={formData.model} onValueChange={(val) => handleChange('model', val)}>
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
                <Label htmlFor="rok">Rok produkcji *</Label>
                <Input
                  type="number"
                  id="rok"
                  value={formData.rok}
                  onChange={(e) => handleChange('rok', e.target.value)}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                />
              </div>

              <div>
                <Label htmlFor="pierwszaRejestracja">Pierwsza rejestracja</Label>
                <Input
                  type="text"
                  id="pierwszaRejestracja"
                  value={formData.pierwszaRejestracja}
                  onChange={(e) => handleChange('pierwszaRejestracja', e.target.value)}
                  placeholder="np. 2020-05"
                />
              </div>

              <div>
                <Label htmlFor="przebieg">Przebieg (km) *</Label>
                <Input
                  type="number"
                  id="przebieg"
                  value={formData.przebieg}
                  onChange={(e) => handleChange('przebieg', e.target.value)}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="miasto">Lokalizacja</Label>
                <Select value={formData.miasto} onValueChange={(val) => handleChange('miasto', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {miasta.map(miasto => (
                      <SelectItem key={miasto} value={miasto}>{miasto}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Silnik i napęd */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Silnik i napęd</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paliwo">Paliwo</Label>
                <Select value={formData.paliwo} onValueChange={(val) => handleChange('paliwo', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paliwa.map(paliwo => (
                      <SelectItem key={paliwo} value={paliwo}>{paliwo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="moc">Moc (KM)</Label>
                <Input
                  type="number"
                  id="moc"
                  value={formData.moc}
                  onChange={(e) => handleChange('moc', e.target.value)}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="kubatura">Pojemność (cm³)</Label>
                <Input
                  type="number"
                  id="kubatura"
                  value={formData.kubatura}
                  onChange={(e) => handleChange('kubatura', e.target.value)}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="normaSpalania">Spalanie</Label>
                <Input
                  type="text"
                  id="normaSpalania"
                  value={formData.normaSpalania}
                  onChange={(e) => handleChange('normaSpalania', e.target.value)}
                  placeholder="np. 8.5 l/100km"
                />
              </div>

              <div>
                <Label htmlFor="skrzynia">Skrzynia biegów</Label>
                <Select value={formData.skrzynia} onValueChange={(val) => handleChange('skrzynia', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skrzynie.map(skrzynia => (
                      <SelectItem key={skrzynia} value={skrzynia}>{skrzynia}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="naped">Napęd</Label>
                <Select value={formData.naped} onValueChange={(val) => handleChange('naped', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {napedy.map(naped => (
                      <SelectItem key={naped} value={naped}>{naped}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="normaEmisji">Norma emisji</Label>
                <Select value={formData.normaEmisji} onValueChange={(val) => handleChange('normaEmisji', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {normyEmisji.map(norma => (
                      <SelectItem key={norma} value={norma}>{norma}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="kolor">Kolor</Label>
                <Select value={formData.kolor} onValueChange={(val) => handleChange('kolor', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {kolory.map(kolor => (
                      <SelectItem key={kolor} value={kolor}>{kolor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Nadwozie i wymiary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nadwozie i wymiary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="typNadwozia">Typ nadwozia *</Label>
                <Select value={formData.typNadwozia} onValueChange={(val) => handleChange('typNadwozia', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {typyNadwozi.map(typ => (
                      <SelectItem key={typ} value={typ}>{typ}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dmcKategoria">DMC</Label>
                <Select value={formData.dmcKategoria} onValueChange={(val) => handleChange('dmcKategoria', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dmcKategorie.map(kategoria => (
                      <SelectItem key={kategoria} value={kategoria}>{kategoria}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ladownosc">Ładowność (kg)</Label>
                <Input
                  type="number"
                  id="ladownosc"
                  value={formData.ladownosc}
                  onChange={(e) => handleChange('ladownosc', e.target.value)}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="pojemnoscSkrzyni">Pojemność skrzyni (m³)</Label>
                <Input
                  type="number"
                  id="pojemnoscSkrzyni"
                  value={formData.pojemnoscSkrzyni}
                  onChange={(e) => handleChange('pojemnoscSkrzyni', e.target.value)}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="wymiarL">Długość</Label>
                <Select value={formData.wymiarL} onValueChange={(val) => handleChange('wymiarL', val)}>
                  <SelectTrigger>
                    <SelectValue />
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
                <Select value={formData.wymiarH} onValueChange={(val) => handleChange('wymiarH', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="H1">H1</SelectItem>
                    <SelectItem value="H2">H2</SelectItem>
                    <SelectItem value="H3">H3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Cena */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cena</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cenaBrutto">Cena brutto (PLN) *</Label>
                <Input
                  type="number"
                  id="cenaBrutto"
                  value={formData.cenaBrutto}
                  onChange={(e) => handleChange('cenaBrutto', e.target.value)}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="cenaNetto">Cena netto (PLN)</Label>
                <Input
                  type="number"
                  id="cenaNetto"
                  value={formData.cenaNetto}
                  onChange={(e) => handleChange('cenaNetto', e.target.value)}
                  min="0"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="vat"
                  checked={formData.vat}
                  onCheckedChange={(checked) => handleChange('vat', checked)}
                />
                <Label htmlFor="vat">VAT marża</Label>
              </div>
            </div>
          </div>

          {/* Wyposażenie */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Wyposażenie dodatkowe</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="winda"
                  checked={formData.winda}
                  onCheckedChange={(checked) => handleChange('winda', checked)}
                />
                <Label htmlFor="winda">Winda</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="hak"
                  checked={formData.hak}
                  onCheckedChange={(checked) => handleChange('hak', checked)}
                />
                <Label htmlFor="hak">Hak</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="czterykola"
                  checked={formData.czterykola}
                  onCheckedChange={(checked) => handleChange('czterykola', checked)}
                />
                <Label htmlFor="czterykola">4x4</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="klimatyzacja"
                  checked={formData.klimatyzacja}
                  onCheckedChange={(checked) => handleChange('klimatyzacja', checked)}
                />
                <Label htmlFor="klimatyzacja">Klimatyzacja</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="tempomat"
                  checked={formData.tempomat}
                  onCheckedChange={(checked) => handleChange('tempomat', checked)}
                />
                <Label htmlFor="tempomat">Tempomat</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="kamera"
                  checked={formData.kamera}
                  onCheckedChange={(checked) => handleChange('kamera', checked)}
                />
                <Label htmlFor="kamera">Kamera</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="czujnikiParkowania"
                  checked={formData.czujnikiParkowania}
                  onCheckedChange={(checked) => handleChange('czujnikiParkowania', checked)}
                />
                <Label htmlFor="czujnikiParkowania">Czujniki parkowania</Label>
              </div>
            </div>
          </div>

          {/* Status i oznaczenia */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status i oznaczenia</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="wyrozniowane"
                  checked={formData.wyrozniowane}
                  onCheckedChange={(checked) => handleChange('wyrozniowane', checked)}
                />
                <Label htmlFor="wyrozniowane">Wyróżnione</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="nowosc"
                  checked={formData.nowosc}
                  onCheckedChange={(checked) => handleChange('nowosc', checked)}
                />
                <Label htmlFor="nowosc">Nowość</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="flotowy"
                  checked={formData.flotowy}
                  onCheckedChange={(checked) => handleChange('flotowy', checked)}
                />
                <Label htmlFor="flotowy">Flotowy</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="gwarancja"
                  checked={formData.gwarancja}
                  onCheckedChange={(checked) => handleChange('gwarancja', checked)}
                />
                <Label htmlFor="gwarancja">Gwarancja</Label>
              </div>
            </div>
          </div>

          {/* Opis */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Opis</h3>
            <Textarea
              id="opis"
              value={formData.opis}
              onChange={(e) => handleChange('opis', e.target.value)}
              placeholder="Dodatkowe informacje o pojeździe..."
              rows={6}
            />
          </div>

          {/* Zdjęcia */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Zdjęcia</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer">
                {uploadingImages ? (
                  <Loader2 className="h-12 w-12 mx-auto text-gray-400 animate-spin" />
                ) : (
                  <Upload className="h-12 w-12 mx-auto text-gray-400" />
                )}
                <p className="mt-2 text-sm text-gray-600">
                  {uploadingImages ? 'Przesyłanie...' : 'Kliknij aby dodać zdjęcia lub przeciągnij tutaj'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG do 10MB</p>
              </label>
            </div>

            {formData.zdjecia.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.zdjecia.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Zdjęcie ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              className="bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                initialData ? 'Zapisz zmiany' : 'Dodaj ogłoszenie'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Anuluj
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};