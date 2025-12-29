
import React from 'react';
import { Model, Category } from '../types';
import { ShieldCheck, MapPin, Star, ArrowUpRight } from 'lucide-react';

interface ModelCardProps {
  model: Model;
  onClick: (model: Model) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.DIAMOND: return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case Category.GOLD: return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-amber-900/10 text-amber-200 border-amber-900/30';
    }
  };

  return (
    <div 
      className="group relative glass rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 p-3 hover:border-amber-500/50"
      onClick={() => onClick(model)}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-[2rem] relative">
        <img 
          src={model.mainPhoto} 
          alt={model.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        
        <div className="absolute top-5 left-5">
          <div className={`px-4 py-1.5 border backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${getCategoryColor(model.category)}`}>
            {model.category}
          </div>
        </div>

        <div className="absolute bottom-5 right-5 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
           <div className="w-14 h-14 bg-amber-600 text-white rounded-2xl flex items-center justify-center shadow-xl">
              <ArrowUpRight size={24} />
           </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            {model.name}
            {model.verified && <ShieldCheck size={18} className="text-amber-500" />}
          </h3>
          <span className="text-sm font-bold text-gray-600">{model.age}y</span>
        </div>
        
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-gray-500">
            <MapPin size={14} className="text-amber-600" /> {model.region}
          </span>
          <span className="flex items-center gap-1.5 text-amber-500">
            <Star size={14} fill="currentColor" /> {model.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
