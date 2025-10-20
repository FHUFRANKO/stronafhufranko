import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Loader2 } from 'lucide-react';

const typyDzialalnosci = [
  'Firma kurierska',
  'Budownictwo',
  'Transport',
  'Catering',
  'Handel',
  'Usługi remontowe',
  'Elektryk',
  'Hydraulik',
  'Ogrodnictwo',
  'Sprzątanie',
  'Firma transportowa',
  'Inne'
];

export const OpinionForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    imie: '',
    typDzialalnosci: 'Firma kurierska',
    komentarz: '',
    ocena: 5,
    zakupionyPojazd: '',
    wyswietlaj: true,
    ...initialData
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.imie || !formData.typDzialalnosci || !formData.komentarz) {
      alert('Wypełnij wszystkie wymagane pola');
      return;
    }

    const submitData = {
      ...formData,
      ocena: parseInt(formData.ocena)
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? 'Edytuj opinię' : 'Dodaj nową opinię'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imie">Imię *</Label>
              <Input
                type="text"
                id="imie"
                value={formData.imie}
                onChange={(e) => handleChange('imie', e.target.value)}
                placeholder="np. Jan"
                required
              />
            </div>

            <div>
              <Label htmlFor="typDzialalnosci">Typ działalności *</Label>
              <Select 
                value={formData.typDzialalnosci} 
                onValueChange={(val) => handleChange('typDzialalnosci', val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typyDzialalnosci.map(typ => (
                    <SelectItem key={typ} value={typ}>{typ}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="zakupionyPojazd">Zakupiony pojazd</Label>
              <Input
                type="text"
                id="zakupionyPojazd"
                value={formData.zakupionyPojazd}
                onChange={(e) => handleChange('zakupionyPojazd', e.target.value)}
                placeholder="np. Mercedes Sprinter 2020"
              />
            </div>

            <div>
              <Label htmlFor="ocena">Ocena (1-5)</Label>
              <Select 
                value={formData.ocena.toString()} 
                onValueChange={(val) => handleChange('ocena', val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>
                  <SelectItem value="2">⭐⭐ (2)</SelectItem>
                  <SelectItem value="1">⭐ (1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="komentarz">Komentarz *</Label>
            <Textarea
              id="komentarz"
              value={formData.komentarz}
              onChange={(e) => handleChange('komentarz', e.target.value)}
              placeholder="Pozytywny komentarz o zakupionym pojeździe i procesie zakupu..."
              rows={6}
              required
            />
            <p className="text-xs text-[#838282] mt-1">
              Napisz pozytywny komentarz o zakupionym busie i procesie zakupu
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="wyswietlaj"
              checked={formData.wyswietlaj}
              onCheckedChange={(checked) => handleChange('wyswietlaj', checked)}
            />
            <Label htmlFor="wyswietlaj">Wyświetlaj na stronie</Label>
          </div>

          <div className="flex gap-4 pt-4">
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
                initialData ? 'Zapisz zmiany' : 'Dodaj opinię'
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
