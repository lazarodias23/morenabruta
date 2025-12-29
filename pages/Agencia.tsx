
import React, { useState, useEffect, useRef } from 'react';
import { DataService } from '../services/storage';
import { HOUSE_PHOTOS, QUALITY_SEALS } from '../constants';
import { Model } from '../types';
import ModelCard from '../components/ModelCard';
import ModelModal from '../components/ModelModal';
import { 
  MapPin, 
  Camera, 
  ArrowUpRight, 
  X, 
  MessageCircle, 
  Lock, 
  Award, 
  ShieldCheck, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Info
} from 'lucide-react';

const Agencia: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => {
      // Filtra apenas modelos ativas e marcadas para aparecer na agência
      setModels(DataService.getModels().filter(m => m.active && m.showOnAgency));
    };
    load();
    window.addEventListener('storage_update', load);
    return () => window.removeEventListener('storage_update', load);
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const regions = [
    { name: 'Cachoeirinha', count: 5, image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800' },
    { name: 'Serra Gaúcha', count: 8, image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=800' },
    { name: 'Torres', count: 4, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Florianópolis', count: 12, image: 'https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?auto=format&fit=crop&q=80&w=800' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award size={24} />;
      case 'Lock': return <Lock size={24} />;
      case 'ShieldCheck': return <ShieldCheck size={24} />;
      case 'Users': return <Users size={24} />;
      default: return <Info size={24} />;
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-900/5 blur-[150px] rounded-full -z-10"></div>
      
      <div className="container mx-auto px-4">
        {/* Section: Sobre Nós */}
        <section className="mb-32">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase font-black tracking-[0.5em] text-amber-600 mb-4 block">Institucional Morena Bruta</span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">
              Excelência em <br/> <span className="text-gold italic">Entretenimento.</span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-400 text-xl leading-relaxed">
                A Morena Bruta redefine o mercado de acompanhantes de luxo no sul do Brasil. Nossa agência opera sob os pilares da discrição, curadoria rigorosa e atendimento personalizado, garantindo que cada encontro seja uma experiência memorável e de altíssimo nível.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUALITY_SEALS.map((seal) => (
              <div key={seal.id} className="glass p-8 rounded-3xl border-white/5 hover:border-amber-600/30 transition-all group">
                <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(seal.icon)}
                </div>
                <h4 className="text-white font-black mb-2 uppercase text-xs tracking-widest">{seal.name}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{seal.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Nossas Modelos (Slider) */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Nossas <span className="text-gold italic">Modelos</span></h2>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.4em] mt-4">A Elite Selecionada da Agência</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => scrollCarousel('left')} className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white hover:bg-amber-600 transition-all border-white/10">
                <ChevronLeft size={28} />
              </button>
              <button onClick={() => scrollCarousel('right')} className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white hover:bg-amber-600 transition-all border-white/10">
                <ChevronRight size={28} />
              </button>
            </div>
          </div>

          <div ref={carouselRef} className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 scroll-smooth">
            {models.map((model) => (
              <div key={model.id} className="min-w-[300px] md:min-w-[420px] snap-center">
                <ModelCard model={model} onClick={(m) => setSelectedModel(m)} />
              </div>
            ))}
          </div>
        </section>

        {/* Section: Filial Cachoeira do Sul */}
        <section className="mb-32">
          <div className="glass p-8 md:p-16 rounded-[4rem] border-white/5 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/10 rounded-full border border-amber-600/20 text-amber-500 text-[10px] font-black uppercase tracking-widest">
                  <MapPin size={14}/> Sede Principal: Cachoeira do Sul - RS
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                  Ambiente <br/> <span className="text-gold italic">Exclusivo.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Localizada no coração de Cachoeira do Sul, nossa filial oferece discrição total e luxo absoluto. Um espaço projetado para o seu conforto, com suítes climatizadas, bar privativo e estacionamento interno seguro.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsHouseModalOpen(true)}
                    className="bg-white text-black hover:bg-amber-600 hover:text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95"
                  >
                    <Camera size={20} /> Ver Fotos da Casa
                  </button>
                  <a 
                    href="https://wa.me/5551996554609"
                    target="_blank"
                    className="glass border-white/10 text-white hover:border-amber-600 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                  >
                    <MessageCircle size={20} className="text-green-500" /> Consultar Disponibilidade
                  </a>
                </div>
              </div>

              <div className="h-[500px] rounded-[3rem] overflow-hidden border border-white/10 relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55307.3916055544!2d-52.9248434!3d-30.0336215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9504838641a17141%3A0x6a1575417855b76b!2sCachoeira%20do%20Sul%2C%20RS!5e0!3m2!1spt-BR!2sbr!4v1709123456789!5m2!1spt-BR!2sbr" 
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)' }} loading="lazy" title="Maps Filial"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Outras Regiões */}
        <section className="mb-12">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">Atendimento <span className="text-gold italic">Regional</span></h2>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.4em]">Expandindo o Luxo para Todo o Sul</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region) => (
              <div key={region.name} className="group relative h-96 rounded-[2.5rem] overflow-hidden cursor-pointer glass border-white/5 hover:border-amber-600 transition-all duration-700">
                <img src={region.image} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000" alt={region.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{region.name}</h3>
                  <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest">
                    <span>{region.count} Modelos Disponíveis</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* House Photos Modal */}
      {isHouseModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={() => setIsHouseModalOpen(false)}></div>
          <div className="relative glass w-full max-w-6xl h-[85vh] rounded-[3rem] overflow-hidden flex flex-col md:flex-row border-white/10">
            <button onClick={() => setIsHouseModalOpen(false)} className="absolute top-8 right-8 z-50 p-3 bg-black/50 text-white rounded-full border border-white/10 hover:bg-red-600 transition-colors"><X size={24} /></button>
            <div className="w-full md:w-2/3 h-full overflow-y-auto p-4 space-y-4">
              {HOUSE_PHOTOS.map((photo, i) => <img key={i} src={photo} className="w-full rounded-2xl object-cover border border-white/5" alt="Casa Interior" />)}
            </div>
            <div className="w-full md:w-1/3 p-12 flex flex-col justify-center bg-zinc-950 md:border-l border-white/10">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-6">O <span className="text-gold">Santuário.</span></h3>
              <p className="text-gray-400 leading-relaxed mb-8">Nossa sede em Cachoeira do Sul foi projetada para ser o cenário perfeito dos seus encontros mais íntimos. Cada detalhe foi pensado para oferecer o máximo de requinte e segurança.</p>
              <div className="space-y-4">
                 {['Suítes Luxo', 'Bar Privado', 'Segurança 24h', 'Estacionamento Discreto'].map(item => (
                   <div key={item} className="flex items-center gap-3 text-xs font-black uppercase text-gray-500"><div className="w-2 h-2 bg-amber-600 rounded-full"></div>{item}</div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedModel && <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </div>
  );
};

export default Agencia;
