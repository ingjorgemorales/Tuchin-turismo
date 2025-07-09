import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';


const Contacto = () => {
  return (
    <section id="contacto" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Contáctanos
          </motion.h2>
          <p className="text-xl text-accent max-w-3xl mx-auto">¿Listo para vivir la experiencia Tuchín?</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-dark mb-6">Envíanos un mensaje</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Mensaje</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Cuéntanos sobre tu interés en visitar Tuchín"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-full font-semibold transition duration-300"
              >
                Enviar mensaje
              </button>
            </form>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Dirección</h4>
                  <p>Alcaldía Municipal de Tuchín, Córdoba, Colombia</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">
                  <FaPhone />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Teléfono</h4>
                  <p>+57 (4) 789 0123</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <p>turismo@tuchinartesanal.co</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">WhatsApp</h4>
                  <p>+57 312 687 7265</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="font-bold text-lg mb-4">Síguenos en redes sociales</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition">
                  <FaFacebook className="text-white" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition">
                  <FaInstagram className="text-white" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition">
                  <FaYoutube className="text-white" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition">
                  <FaTiktok className="text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;