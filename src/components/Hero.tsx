import { motion } from 'framer-motion';
import TypewriterTexts from './TypewriterTexts'; // ← Asegúrate de que la ruta sea correcta

const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center bg-[url('/src/assets/images/tuchin-market.jpg')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
          Descubre <span className="text-accent">Tuchin</span>
        </h1>

        <TypewriterTexts 
          texts={[
            "Cuna del sombrero vueltiao",
            "Patrimonio cultural Zenú",
            "Artesanía y tradición viva",
          ]}
          className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto"
          speed={80}
        />

        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#experiencias" 
            className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105"
          >
            Nuestras Experiencias
          </a>
          <a 
            href="#visita" 
            className="bg-white hover:bg-gray-100 text-dark px-8 py-4 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105"
          >
            Cómo Llegar
          </a>
        </div>
      </motion.div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#cultura" className="text-white text-4xl">
          ↓
        </a>
      </div>
    </section>
  );
};

export default Hero;
