import { motion } from 'framer-motion';

const Experiencias = () => {
  const experiences = [
    {
      title: "Taller de Tejeduría",
      description: "Participa en talleres vivenciales con maestros artesanos del sombrero vueltiao. Aprende las técnicas ancestrales de tejido en caña flecha.",
      image: "/images/weaving-workshop.jpg"
    },
    {
      title: "Ruta del Sombrero Vueltiao",
      description: "Recorre los talleres artesanales y conoce el proceso completo de elaboración del símbolo cultural de Colombia, desde la materia prima hasta el producto final.",
      image: "/images/hat-route.jpg"
    },
    {
      title: "Cerro de Tofeme",
      description: "Disfruta de una caminata ecológica por este cerro sagrado para la comunidad Zenú, con impresionantes vistas panorámicas de la región.",
      image: "/images/tofeme-hill.jpg"
    }
  ];

  return (
    <section id="experiencias" className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-dark mb-4"
          >
            Experiencias Auténticas
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Vive la cultura Zenú a través de estas experiencias únicas</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="card bg-white rounded-xl overflow-hidden shadow-xl"
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{exp.description}</p>
                <a href="#" className="text-primary font-semibold hover:text-secondary flex items-center">
                  Reservar experiencia
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiencias;