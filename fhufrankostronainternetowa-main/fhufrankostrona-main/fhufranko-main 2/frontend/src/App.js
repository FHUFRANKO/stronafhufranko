import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { CarListingPage } from "./pages/CarListingPage";
import { CarDetailPage } from "./pages/CarDetailPage";
import { AdminPanel } from "./pages/AdminPanel";
import { KontaktPage } from "./pages/KontaktPage";
import { ONasPage } from "./pages/ONasPage";

// Placeholder components for other pages
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-[#222122] mb-4">{title}</h1>
      <p className="text-[#838282] mb-6">Ta strona jest w budowie</p>
      <div className="text-6xl mb-4">🚧</div>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin Panel - bez Header/Footer */}
          <Route path="/admin" element={<AdminPanel />} />
          
          {/* Strony z Header/Footer */}
          <Route path="/" element={
            <>
              <Header />
              <main><HomePage /></main>
              <Footer />
            </>
          } />
          <Route path="/ogloszenia" element={
            <>
              <Header />
              <main><CarListingPage /></main>
              <Footer />
            </>
          } />
          <Route path="/ogloszenie/:id" element={
            <>
              <Header />
              <main><CarDetailPage /></main>
              <Footer />
            </>
          } />
          <Route path="/poszukuje" element={
            <>
              <Header />
              <main><PlaceholderPage title="Poszukuję Busa" /></main>
              <Footer />
            </>
          } />
          <Route path="/opinie" element={
            <>
              <Header />
              <main><PlaceholderPage title="Opinie Klientów" /></main>
              <Footer />
            </>
          } />
          <Route path="/kontakt" element={
            <>
              <Header />
              <main><KontaktPage /></main>
              <Footer />
            </>
          } />
          <Route path="/logowanie" element={
            <>
              <Header />
              <main><PlaceholderPage title="Logowanie" /></main>
              <Footer />
            </>
          } />
          <Route path="/o-nas" element={
            <>
              <Header />
              <main><ONasPage /></main>
              <Footer />
            </>
          } />
          <Route path="/polityka-prywatnosci" element={
            <>
              <Header />
              <main><PlaceholderPage title="Polityka Prywatności" /></main>
              <Footer />
            </>
          } />
          <Route path="/regulamin" element={
            <>
              <Header />
              <main><PlaceholderPage title="Regulamin" /></main>
              <Footer />
            </>
          } />
          <Route path="/rodo" element={
            <>
              <Header />
              <main><PlaceholderPage title="RODO" /></main>
              <Footer />
            </>
          } />
          <Route path="/cookies" element={
            <>
              <Header />
              <main><PlaceholderPage title="Polityka Cookies" /></main>
              <Footer />
            </>
          } />
          <Route path="/reklamacje" element={
            <>
              <Header />
              <main><PlaceholderPage title="Reklamacje" /></main>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;