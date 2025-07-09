import { useState } from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-dark shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img
        src="/images/sombrero.png"
        alt="Logo Tuchín Zenú"
        className="h-10 w-10 object-contain"
        />
        <div className="text-2xl font-bold text-white">
        <span className="text-primary">Tuchín</span>
        <span className="text-secondary">Zenú</span>
        </div>
      </div>
        
        {/* Menú desktop */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#inicio" className="text-white hover:text-accent transition">Inicio</a>
          <a href="#cultura" className="text-white hover:text-accent transition">Cultura</a>
          <a href="#experiencias" className="text-white hover:text-accent transition">Experiencias</a>
          <a href="#visita" className="text-white hover:text-accent transition">Visítanos</a>
          <a 
            href="#contacto" 
            className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-full transition flex items-center gap-2"
          >
            <FaWhatsapp /> Contacto
          </a>
        </nav>
        
        {/* Menú móvil */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Menú móvil desplegable */}
      <div className={`md:hidden fixed inset-0 bg-dark bg-opacity-95 z-40 transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container mx-auto px-4 py-16 flex flex-col space-y-8 text-center">
          <a href="#inicio" className="text-2xl text-white hover:text-accent" onClick={() => setIsOpen(false)}>Inicio</a>
          <a href="#cultura" className="text-2xl text-white hover:text-accent" onClick={() => setIsOpen(false)}>Cultura</a>
          <a href="#experiencias" className="text-2xl text-white hover:text-accent" onClick={() => setIsOpen(false)}>Experiencias</a>
          <a href="#visita" className="text-2xl text-white hover:text-accent" onClick={() => setIsOpen(false)}>Visítanos</a>
          <a 
            href="#contacto" 
            className="text-2xl bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full mx-auto w-3/4 flex items-center justify-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <FaWhatsapp /> Contacto
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;