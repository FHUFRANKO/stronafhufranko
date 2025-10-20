import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Star, Quote } from 'lucide-react';
import { busApi } from '../api/busApi';

export const OpiniePage = () => {
  const [opinions, setOpinions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpinions();
  }, []);

  const fetchOpinions = async () => {
    try {
      const data = await busApi.getPublicOpinions();
      setOpinions(data);
    } catch (error) {
      console.error('Error fetching opinions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F3BC30] mx-auto"></div>
          <p className="mt-4 text-[#838282]">Ładowanie opinii...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#222122] mb-4">
            Opinie naszych klientów
          </h1>
          <p className="text-xl text-[#838282] max-w-3xl mx-auto">
            Zobacz co mówią firmy, które kupiły u nas busy. Profesjonalne doradztwo i sprawdzone pojazdy to nasza specjalność.
          </p>
        </div>
      </section>

      {/* Opinions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {opinions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Quote className="h-16 w-16 mx-auto text-[#838282] mb-4" />
                <h3 className="text-xl font-semibold text-[#222122] mb-2">
                  Brak opinii
                </h3>
                <p className="text-[#838282]">
                  Wkrótce pojawią się tu opinie naszych klientów
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {opinions.map((opinion) => (
                <Card key={opinion.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    {/* Stars */}
                    <div className="flex items-center mb-4">
                      <div className="flex text-[#F3BC30]">
                        {[...Array(opinion.ocena || 5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Quote Icon */}
                    <Quote className="h-8 w-8 text-[#F3BC30]/20 mb-3" />

                    {/* Comment */}
                    <p className="text-[#838282] mb-6 italic leading-relaxed">
                      "{opinion.komentarz}"
                    </p>

                    {/* Vehicle Info */}
                    {opinion.zakupionyPojazd && (
                      <div className="mb-4 pb-4 border-b border-gray-100">
                        <p className="text-sm text-[#838282]">
                          Zakupiony pojazd:
                        </p>
                        <p className="text-sm font-semibold text-[#222122]">
                          {opinion.zakupionyPojazd}
                        </p>
                      </div>
                    )}

                    {/* Author Info */}
                    <div>
                      <p className="font-semibold text-[#222122] text-lg">
                        {opinion.imie}
                      </p>
                      <p className="text-sm text-[#838282]">
                        {opinion.typDzialalnosci}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#222122]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Dołącz do grona zadowolonych klientów
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Profesjonalne busy LCV z gwarancją, pełną dokumentacją i wsparciem na każdym etapie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ogloszenia"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#F3BC30] hover:bg-[#E0AA2B] text-[#222122] font-semibold rounded-md transition-colors"
            >
              Zobacz nasze busy
            </a>
            <a
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#222122] font-semibold rounded-md transition-colors"
            >
              Skontaktuj się z nami
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
