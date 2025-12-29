
import React from 'react';
import { Club } from '../types';
import { X, MapPin, Clock, Star, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface ClubModalProps {
  club: Club;
  onClose: () => void;
}

const ClubModal: React.FC<ClubModalProps> = ({ club, onClose }) => {
  return (
    <div className="fixed inset-0 z-[250] flex items-end md:items-center justify-center p-0 md:p-4 lg:p-8">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      
      <div className="relative bg-zinc-950 w-full max-w-6xl h-[95vh] md:h-auto md:max-h-[90vh] rounded-t-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-500 border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-3 bg-black/50 text-white rounded-full hover:bg-red-600 transition-all border border-white/10 backdrop-blur-md"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto custom-scrollbar">
          <div className="w-full h-[40vh] md:h-[50vh] relative">
             <img src={club.mainPhoto} className="w-full h-full object-cover" alt={club.name} />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
             
             {/* Verified Seal on Image */}
             {club.verified && (
               <div className="absolute top-6 left-6 flex items-center gap-3 px-5 py-2.5 bg-amber-600 rounded-2xl border border-white/20 shadow-2xl animate-pulse">
                 <ShieldCheck size={20} className="text-white" />
                 <div>
                   <p className="text-[10px] font-black uppercase text-white tracking-[0.2em] leading-none mb-0.5">Parceiro Certificado</p>
                   <p className="text-[8px] font-bold text-amber-100 uppercase tracking-widest leading-none">Morena Bruta Quality</p>
                 </div>
               </div>
             )}
          </div>

          <div className="p-8 md:p-16 relative -mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">{club.name}</h2>
                  {club.verified && <CheckCircle2 size={24} className="text-amber-500" />}
                </div>
                <div className="flex flex-wrap gap-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-amber-600" /> {club.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-amber-600" /> {club.openingHours}</span>
                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20">
                    <Star size={12} fill="currentColor" /> <span className="text-xs">{club.rating}.0 Rating</span>
                  </div>
                </div>
              </div>
              <a 
                href="https://wa.me/5551996554609"
                target="_blank"
                className="w-full md:w-auto bg-white text-black hover:bg-amber-600 hover:text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                Reservar Lounge <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-6 block">Sobre o Estabelecimento</h4>
                  <p className="text-gray-400 leading-relaxed text-lg md:text-xl font-medium">{club.description}</p>
                </div>

                {club.photos && club.photos.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-6 block">Galeria da Casa</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {club.photos.map((p, idx) => (
                        <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-white/5 hover:border-amber-600/50 transition-all cursor-pointer">
                          <img src={p} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Vista da Boate" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="glass p-8 rounded-3xl border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 blur-3xl -z-10"></div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">Como Chegar</h4>
                  <div className="space-y-2 mb-8">
                    <p className="text-sm text-white font-black uppercase tracking-tight">{club.name}</p>
                    <p className="text-xs text-gray-500 font-bold leading-relaxed">{club.address}</p>
                  </div>
                  
                  <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden relative border border-white/10 group-hover:border-amber-600/30 transition-all">
                    {/* Placeholder for real Map or logic for MapsUrl integration */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-8">
                      <div className="w-16 h-16 bg-amber-600/10 rounded-full flex items-center justify-center text-amber-500 animate-bounce">
                        <MapPin size={32} />
                      </div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Acesso Seguro via Google Maps</p>
                    </div>
                    {/* In a real app, you'd render a mini-map here if possible, or just the link below */}
                  </div>
                  
                  <a 
                    href={club.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-8 flex items-center justify-center gap-3 w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-amber-600 hover:text-white shadow-lg active:scale-95"
                  >
                    Abrir no Navegador <MapPin size={16} />
                  </a>
                </div>

                {club.verified && (
                  <div className="p-8 border border-amber-600/20 rounded-3xl bg-amber-600/5 flex items-start gap-4">
                    <ShieldCheck size={24} className="text-amber-500 shrink-0" />
                    <div>
                      <h5 className="text-xs font-black text-white uppercase mb-1">Local Auditado</h5>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter leading-relaxed">
                        Este local foi verificado fisicamente pela equipe Morena Bruta, garantindo segurança e a veracidade das informações.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubModal;
