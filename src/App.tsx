// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// -----  Sitio público -----
import Header from './components/Header';
import Hero from './components/Hero';
import Cultura from './components/Cultura';
import Experiencias from './components/Experiencias';
import PlanificaVisita from './components/PlanificaVisita';
import Eventos from './components/Eventos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';   // ⬅️ banner de cookies

// -----  Panel de administración -----
import LoginForm from './components/LoginForm';
import Dashboard from './admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// ——————————————————————— Landing ——————————————————————
const LandingPage: React.FC = () => (
  <div className="font-sans">
    <Header />
    <main>
      <Hero />
      <Cultura />
      <Experiencias />
      <PlanificaVisita />
      <Eventos />
      <Contacto />
    </main>
    <Footer />
    <CookieBanner />  {/* banner visible solo en el sitio público */}
  </div>
);

// ——————————————————————— App ——————————————————————
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
