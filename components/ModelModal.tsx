
import React, { useEffect, useState, useRef } from 'react';
import { Model } from '../types';
import { X, Phone, MessageCircle, Heart, ShieldCheck, ChevronLeft, ChevronRight, Share2, Layers } from 'lucide-react';

interface ModelModalProps {
  model: Model;
  onClose: () => void;
}

const ModelModal: React.FC<ModelModalProps> = ({ model, onClose }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % model.photos.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + model.photos.length) % model.photos.length);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-700 cursor-close" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-zinc-950 w-full h-full md:h-[94vh] md:max-w-[1400px] md:rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_120px_rgba(0,0,0,1)] animate-in slide-in-from-bottom-20 duration-700 md:border md:border-white/5">
        
        <div className="absolute top-0 inset-x-0 z-[280] p-6 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <button 
              onClick={onClose}
              className="p-3 bg-black/40 hover:bg-red-600 text-white rounded-full backdrop-blur-xl border border-white/10 transition-all shadow-2xl active:scale-90"
            >
              <X size={20} />
            </button>
            {!model.active && (
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 shadow-lg">Offline</span>
            )}
            {model.active && (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-green-600/20 rounded-full border border-green-600/40 backdrop-blur-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Disponível Online</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <button className="p-3 bg-black/40 hover:bg-white/10 text-white rounded-full backdrop-blur-xl border border-white/10 transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="w-full md:w-[62%] h-[50vh] md:h-full bg-black relative flex flex-col">
          <div className="relative flex-grow flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-10 flex">
              <div className="w-1/2 h-full cursor-prev group" onClick={prevPhoto}>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/0 group-hover:text-white/40 transition-colors hidden md:block">
                  <ChevronLeft size={48} strokeWidth={1} />
                </div>
              </div>
              <div className="w-1/2 h-full cursor-next group" onClick={nextPhoto}>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/0 group-hover:text-white/40 transition-colors hidden md:block">
                  <ChevronRight size={48} strokeWidth={1} />
                </div>
              </div>
            </div>

            <img 
              key={activePhotoIndex}
              src={model.photos[activePhotoIndex] || model.mainPhoto} 
              alt={model.name} 
              className="max-w-full max-h-full object-contain animate-in fade-in zoom-in-95 duration-1000 select-none pointer-events-none"
            />
            
            <div className="absolute bottom-10 left-10 z-20 hidden md:flex items-center gap-4">
              <span className="text-white/40 font-black text-6xl tracking-tighter opacity-20">
                {(activePhotoIndex + 1).toString().padStart(2, '0')}
              </span>
              <div className="h-px w-12 bg-white/20"></div>
              <span className="text-white/40 font-bold text-xs uppercase tracking-[0.4em]">
                Catálogo Morena Bruta
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 md:bottom-10 inset-x-0 z-30 px-6 flex justify-center pointer-events-none">
            <div 
              ref={scrollContainerRef}
              className="glass p-2 rounded-[2rem] flex items-center gap-2.5 overflow-x-auto scrollbar-hide max-w-full md:max-w-md pointer-events-auto snap-x"
            >
              {[model.mainPhoto, ...model.photos.filter(p => p !== model.mainPhoto)].map((photo, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative shrink-0 w-12 h-16 md:w-14 md:h-20 rounded-2xl overflow-hidden transition-all duration-500 snap-center ${
                    activePhotoIndex === idx 
                      ? 'w-16 md:w-24 ring-2 ring-amber-600 ring-offset-2 ring-offset-black scale-105' 
                      : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
                  }`}
                >
                  <img src={photo} className="w-full h-full object-cover" alt="Vista" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[38%] flex flex-col bg-zinc-950 md:border-l border-white/5 overflow-y-auto custom-scrollbar">
          <div className="p-8 md:p-16 flex flex-col min-h-full">
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                   <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></div>
                   <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">{model.category}</span>
                </div>
                {model.verified && (
                  <div className="flex items-center gap-1 text-[9px] font-black text-blue-500 uppercase tracking-widest border border-blue-500/20 px-3 py-1 rounded-full bg-blue-500/5">
                    <ShieldCheck size={12} /> Perfil Verificado
                  </div>
                )}
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-6">
                {model.name}
              </h2>
              
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-gray-500 font-bold text-xs uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2"><Heart size={14} className="text-red-600" /> {model.age} ANOS</span>
                <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                <span>{model.region}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/5 mb-8">
              {[
                { label: 'Bio Metric', val: `${model.height} • ${model.weight}` },
                { label: 'Cabelos', val: model.hair },
                { label: 'Taxa VIP', val: model.price, highlight: true },
                { label: 'Atendimento', val: model.active ? 'Imediato' : 'Agendar', success: model.active }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[9px] uppercase text-white/30 font-black tracking-widest">{stat.label}</p>
                  <p className={`text-lg md:text-xl font-bold tracking-tight ${stat.highlight ? 'text-amber-500' : stat.success ? 'text-green-500' : 'text-white'}`}>
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <h4 className="text-[9px] font-black uppercase text-white/30 tracking-[0.3em] mb-4">Tipos de Atendimento</h4>
              <div className="flex flex-wrap gap-2">
                {model.services.map((service, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-16 flex-grow">
              <p className="text-gray-400 leading-relaxed text-base md:text-lg font-medium selection:bg-amber-600/30">
                {model.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <a 
                href={`https://wa.me/${model.whatsapp}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white py-6 rounded-3xl font-black text-base transition-all shadow-xl hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle size={22} strokeWidth={2.5} /> 
                AGENDAR VIA WHATSAPP
              </a>
              <a 
                href={`tel:${model.whatsapp}`}
                className="flex items-center justify-center gap-3 w-full bg-white/5 hover:bg-white/10 text-white/60 py-5 rounded-3xl font-bold transition-all border border-white/5 uppercase text-[10px] tracking-widest"
              >
                <Phone size={18} /> Ligar para Concierge
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelModal;
