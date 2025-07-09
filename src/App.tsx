import Header from './components/Header';
import Hero from './components/Hero';
import Cultura from './components/Cultura';
import Experiencias from './components/Experiencias';
import PlanificaVisita from './components/PlanificaVisita';
import Eventos from './components/Eventos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

function App() {
  return (
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
    </div>
  );
}

export default App;