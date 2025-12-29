
import React, { useState, useMemo, useEffect } from 'react';
import { DataService } from '../services/storage';
import { Model, Category } from '../types';
import ModelCard from '../components/ModelCard';
import ModelModal from '../components/ModelModal';
import { Search } from 'lucide-react';

const ModelsPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const load = () => {
      // Carregar todas as modelos e filtrar apenas as ATIVAS para o site público
      const allModels = DataService.getModels();
      setModels(allModels.filter(m => m.active));
    };
    load();
    window.addEventListener('storage_update', load);
    return () => window.removeEventListener('storage_update', load);
  }, []);

  const filteredModels = useMemo(() => {
    return models.filter(model => {
      const matchesCategory = filterCategory === 'All' || model.category === filterCategory;
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           model.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchQuery, models]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">Modelos de Elite</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Beleza, inteligência e exclusividade.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap justify-center gap-3">
            {['All', Category.DIAMOND, Category.GOLD, Category.PREMIUM].map((cat) => (
              <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filterCategory === cat ? 'bg-amber-600 text-white' : 'bg-zinc-900 text-gray-500 hover:text-white border border-white/5'}`}>{cat === 'All' ? 'Todas' : cat}</button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-amber-600 transition-all" />
          </div>
        </div>

        {filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredModels.map((model) => <ModelCard key={model.id} model={model} onClick={(m) => setSelectedModel(m)} />)}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-500 text-xl">Nenhuma modelo disponível no momento.</div>
        )}
      </div>
      {selectedModel && <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </div>
  );
};

export default ModelsPage;
