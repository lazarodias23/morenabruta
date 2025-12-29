
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { DataService } from '../services/storage';
import { Model } from '../types';
import ModelCard from '../components/ModelCard';
import ModelModal from '../components/ModelModal';
import { ChevronDown, Users, Zap, Verified, ArrowRight, Star } from 'lucide-react';

const Home: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const load = () => {
      const allModels = DataService.getModels();
      // Filtrar modelos marcadas como destaque (featured) E que estão ativas (active)
      const featuredAndActive = allModels.filter(m => m.featured && m.active);
      setModels(featuredAndActive);
    };
    load();
    window.addEventListener('storage_update', load);
    return () => window.removeEventListener('storage_update', load);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Hero Video Section */}
      <div className="absolute inset-0 w-full h-screen -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10"></div>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]">
          <source src="https://www.pexels.com/pt-br/download/video/4052186/" type="video/mp4" />
        </video>
      </div>

      <section className="relative h-screen flex flex-col items-center justify-center px-4">
        <div className="relative animate-float-slow flex items-center justify-center">
          <div className="absolute w-[160%] h-[160%] border border-dashed border-amber-900/20 rounded-full animate-spin-slow"></div>
          <div className="relative z-10 group cursor-pointer">
             <img src="https://morenabrutacanais.vercel.app/logo.png" alt="Morena Bruta" className="w-56 h-56 md:w-[280px] md:h-[280px] object-contain group-hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20 hover:opacity-100 transition-opacity cursor-pointer animate-bounce">
           <ChevronDown size={32} strokeWidth={1.5} className="text-amber-500" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 glass border-x-0 border-white/5 mx-4 md:mx-auto max-w-7xl rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-8 px-12 relative z-20 -mt-20 shadow-2xl">
        {[
          { label: 'Curadoria VIP', val: 'Exclusiva' },
          { label: 'Concierge VIP', val: '24/7' },
          { label: 'Cidades', val: 'RS/SC' },
          { label: 'Privacidade', val: '100%' }
        ].map((stat, i) => (
          <div key={i} className={`text-center ${i !== 3 ? 'md:border-r border-white/5' : ''}`}>
             <p className="text-2xl md:text-3xl font-black text-white">{stat.val}</p>
             <p className="text-[10px] uppercase font-bold text-amber-600 mt-1 tracking-widest">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Introduction */}
      <section className="py-32 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-amber-600/10 blur-3xl opacity-20"></div>
            <div className="relative glass p-4 rounded-[2.5rem] border-white/10">
               <img src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=1200" className="rounded-[2rem] w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Luxury Lifestyle" />
               <div className="absolute top-10 right-10 bg-black/80 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-3">
                  <div className="p-2 bg-amber-600 rounded-xl shadow-lg shadow-amber-900/40"><Verified size={24} className="text-white" /></div>
                  <div>
                    <p className="text-sm font-bold text-white">Elite Verified</p>
                    <p className="text-[10px] text-amber-500 font-bold uppercase tracking-tighter">Security Protocol</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter text-white">O Novo <br/> <span className="text-gold italic">Padrão Elite.</span></h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">A Morena Bruta redefine o conceito de agência de acompanhantes, unindo sofisticação digital à curadoria humana mais rigorosa.</p>
            <div className="space-y-6">
               <div className="flex items-start gap-5 p-8 glass rounded-[2rem] hover:border-amber-600/50 transition-all group">
                  <div className="p-4 bg-amber-600/10 text-amber-500 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-all"><Users size={28} /></div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-1">Curadoria Manual</h4>
                    <p className="text-gray-500 leading-relaxed">Seleção pessoal baseada em estética, intelecto e postura social.</p>
                  </div>
               </div>
               <div className="flex items-start gap-5 p-8 glass rounded-[2rem] hover:border-amber-600/50 transition-all group">
                  <div className="p-4 bg-amber-600/10 text-amber-500 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-all"><Zap size={28} /></div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-1">Instant Concierge</h4>
                    <p className="text-gray-500 leading-relaxed">Agendamentos via WhatsApp com discrição e suporte 24h.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Models Section (Filtered dynamically) */}
      <section className="py-24 bg-gradient-to-b from-transparent to-amber-950/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <Star size={16} className="text-amber-500" fill="currentColor" />
                 <p className="text-amber-600 font-bold uppercase tracking-[0.4em] text-[10px]">Seleção em Destaque</p>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">Diamond <span className="text-gold">Selection</span></h2>
            </div>
            <Link to="/modelos" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 hover:text-white transition-colors group">
              Ver Catálogo Completo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {models.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {models.map((model) => (
                <ModelCard key={model.id} model={model} onClick={(m) => setSelectedModel(m)} />
              ))}
            </div>
          ) : (
            <div className="glass p-12 rounded-[2rem] text-center border-white/5">
               <p className="text-gray-500 uppercase font-black tracking-widest">Nenhuma modelo em destaque disponível.</p>
            </div>
          )}
        </div>
      </section>

      {selectedModel && <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </div>
  );
};

export default Home;
