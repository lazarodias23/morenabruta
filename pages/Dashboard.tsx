
import React, { useState, useEffect } from 'react';
import { Model, Club, Category } from '../types';
import { DataService } from '../services/storage';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Settings, 
  Users, 
  Building2, 
  Star, 
  ShieldCheck, 
  Image as ImageIcon,
  MapPin,
  Clock,
  Phone,
  Layers,
  CheckCircle2
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [activeTab, setActiveTab] = useState<'models' | 'clubs'>('models');
  const [editingModel, setEditingModel] = useState<Partial<Model> | null>(null);
  const [editingClub, setEditingClub] = useState<Partial<Club> | null>(null);

  useEffect(() => {
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  const loadData = () => {
    setModels(DataService.getModels());
    setClubs(DataService.getClubs());
  };

  const handleSaveModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModel) return;

    const parseList = (val: any) => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(s => s !== '');
      return [];
    };

    const modelToSave = {
      ...editingModel,
      id: editingModel.id || Date.now().toString(),
      photos: parseList(editingModel.photos),
      services: parseList(editingModel.services),
      featured: editingModel.featured ?? false,
      verified: editingModel.verified ?? false,
      active: editingModel.active ?? true,
      showOnAgency: editingModel.showOnAgency ?? true,
      whatsapp: editingModel.whatsapp || '5551996554609'
    } as Model;

    if (editingModel.id) {
      DataService.updateModel(modelToSave);
    } else {
      DataService.addModel(modelToSave);
    }
    setEditingModel(null);
  };

  const handleSaveClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClub) return;

    const parseList = (val: any) => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(s => s !== '');
      return [];
    };

    const clubToSave = {
      ...editingClub,
      id: editingClub.id || Date.now().toString(),
      photos: parseList(editingClub.photos),
      rating: Number(editingClub.rating) || 5,
      verified: editingClub.verified ?? false,
    } as Club;

    if (editingClub.id) {
      DataService.updateClub(clubToSave);
    } else {
      DataService.addClub(clubToSave);
    }
    setEditingClub(null);
  };

  const handleDeleteModel = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja EXCLUIR DEFINITIVAMENTE a modelo ${name}?`)) {
      DataService.deleteModel(id);
    }
  };

  const handleDeleteClub = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja EXCLUIR DEFINITIVAMENTE a boate ${name}?`)) {
      DataService.deleteClub(id);
    }
  };

  const regions = ["Cachoeira do Sul", "Serra Gaúcha", "Torres", "Florianópolis", "Porto Alegre", "Cachoeirinha"];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black text-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-4">
              <Settings className="text-amber-500" size={40} /> MB <span className="text-amber-600">Admin</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.4em] mt-2">Gestão de Conteúdo Profissional</p>
          </div>
          
          <div className="flex bg-zinc-900 p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setActiveTab('models')}
              className={`px-8 py-3 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'models' ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Users size={16} /> Modelos
            </button>
            <button 
              onClick={() => setActiveTab('clubs')}
              className={`px-8 py-3 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'clubs' ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Building2 size={16} /> Boates
            </button>
          </div>
        </div>

        {activeTab === 'models' ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tight">Catálogo de Modelos</h2>
              <button 
                onClick={() => setEditingModel({ 
                  verified: true, 
                  active: true, 
                  showOnAgency: true, 
                  category: Category.PREMIUM, 
                  region: regions[0], 
                  photos: [],
                  services: ["Acompanhante", "Viagens", "Eventos"],
                  age: 20,
                  height: "1.70m",
                  weight: "60kg",
                  hair: "Morena",
                  price: "R$ 500/h",
                  description: "",
                  mainPhoto: ""
                })}
                className="bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-amber-500 hover:text-white transition-all"
              >
                <Plus size={18} /> Adicionar Modelo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map(model => (
                <div key={model.id} className={`glass p-6 rounded-3xl border-white/5 flex flex-col gap-4 group transition-all ${!model.active ? 'opacity-40 grayscale' : ''}`}>
                  <div className="flex gap-4">
                    <img src={model.mainPhoto} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-lg uppercase leading-none">{model.name}</h3>
                        {model.verified && <ShieldCheck size={14} className="text-blue-500" />}
                      </div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{model.region}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {model.showOnAgency && <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded text-[7px] font-black uppercase">Agência</span>}
                        {model.featured && <span className="bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded text-[7px] font-black uppercase">Destaque</span>}
                        {model.active ? (
                          <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-[7px] font-black uppercase">Online</span>
                        ) : (
                          <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-[7px] font-black uppercase">Offline</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingModel(model)}
                      className="flex-1 bg-white/5 p-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 flex items-center justify-center gap-2"
                    >
                      <Edit2 size={12} /> Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteModel(model.id, model.name)}
                      className="p-3 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tight">Gestão de Boates</h2>
              <button 
                onClick={() => setEditingClub({ 
                  rating: 5, 
                  openingHours: '24h', 
                  photos: [],
                  description: '',
                  address: '',
                  mapsUrl: '',
                  verified: true
                })}
                className="bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-amber-500 hover:text-white transition-all"
              >
                <Plus size={18} /> Adicionar Boate
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map(club => (
                <div key={club.id} className="glass p-6 rounded-3xl border-white/5 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <img src={club.mainPhoto} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-lg uppercase leading-none">{club.name}</h3>
                        {club.verified && <CheckCircle2 size={14} className="text-amber-500" />}
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 mt-1">
                        <Star size={10} fill="currentColor" />
                        <span className="text-[10px] font-black">{club.rating}.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingClub(club)}
                      className="flex-1 bg-white/5 p-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 flex items-center justify-center gap-2"
                    >
                      <Edit2 size={12} /> Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteClub(club.id, club.name)}
                      className="p-3 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Model Edit Modal */}
      {editingModel && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setEditingModel(null)}></div>
          <form 
            onSubmit={handleSaveModel} 
            className="relative glass w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl custom-scrollbar"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
                <Users className="text-amber-500" /> Cadastro Detalhado: {editingModel.name || 'Nova Modelo'}
              </h2>
              <button type="button" onClick={() => setEditingModel(null)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Coluna 1: Dados e Bio */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Nome Artístico</label>
                  <input required value={editingModel.name || ''} onChange={e => setEditingModel({...editingModel, name: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none focus:border-amber-500 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">WhatsApp (Somente Números)</label>
                    <input required value={editingModel.whatsapp || ''} onChange={e => setEditingModel({...editingModel, whatsapp: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" placeholder="5551996554609" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Idade</label>
                    <input type="number" value={editingModel.age || ''} onChange={e => setEditingModel({...editingModel, age: Number(e.target.value)})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                   <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Altura</label>
                    <input value={editingModel.height || ''} onChange={e => setEditingModel({...editingModel, height: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" placeholder="1.70m" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Peso</label>
                    <input value={editingModel.weight || ''} onChange={e => setEditingModel({...editingModel, weight: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" placeholder="60kg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Cabelo</label>
                    <input value={editingModel.hair || ''} onChange={e => setEditingModel({...editingModel, hair: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" placeholder="Morena" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Região de Atendimento</label>
                    <select value={editingModel.region} onChange={e => setEditingModel({...editingModel, region: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none">
                      {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Categoria</label>
                    <select value={editingModel.category} onChange={e => setEditingModel({...editingModel, category: e.target.value as Category})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none">
                      {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Valor da Hora / Taxa</label>
                  <input value={editingModel.price || ''} onChange={e => setEditingModel({...editingModel, price: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none focus:border-amber-500" placeholder="R$ 500/h" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Tipos de Atendimento (separados por vírgula)</label>
                  <input 
                    value={Array.isArray(editingModel.services) ? editingModel.services.join(', ') : editingModel.services || ''} 
                    onChange={e => setEditingModel({...editingModel, services: e.target.value})} 
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" 
                    placeholder="Anal, Oral, Viagens, Eventos, Jantares"
                  />
                </div>
              </div>

              {/* Coluna 2: Galeria, Status e Descrição */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">URL Foto Principal (Card)</label>
                  <input required value={editingModel.mainPhoto || ''} onChange={e => setEditingModel({...editingModel, mainPhoto: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Galeria de Fotos (Múltiplas URLs separadas por vírgula)</label>
                  <textarea 
                    rows={4}
                    value={Array.isArray(editingModel.photos) ? editingModel.photos.join(', ') : editingModel.photos || ''} 
                    onChange={e => setEditingModel({...editingModel, photos: e.target.value})} 
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none resize-none" 
                    placeholder="https://img1.jpg, https://img2.jpg..."
                  />
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 grid grid-cols-2 gap-y-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="m_active" checked={editingModel.active} onChange={e => setEditingModel({...editingModel, active: e.target.checked})} className="accent-amber-500 w-5 h-5" />
                    <label htmlFor="m_active" className="text-xs font-black uppercase cursor-pointer flex items-center gap-2">Status Online <div className={`w-2 h-2 rounded-full ${editingModel.active ? 'bg-green-500' : 'bg-red-500'}`}></div></label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="m_verified" checked={editingModel.verified} onChange={e => setEditingModel({...editingModel, verified: e.target.checked})} className="accent-amber-500 w-5 h-5" />
                    <label htmlFor="m_verified" className="text-xs font-black uppercase cursor-pointer flex items-center gap-1 text-blue-400">Verificada <ShieldCheck size={12}/></label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="m_featured" checked={editingModel.featured} onChange={e => setEditingModel({...editingModel, featured: e.target.checked})} className="accent-amber-500 w-5 h-5" />
                    <label htmlFor="m_featured" className="text-xs font-black uppercase cursor-pointer">Destaque na Home</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="m_agency" checked={editingModel.showOnAgency} onChange={e => setEditingModel({...editingModel, showOnAgency: e.target.checked})} className="accent-amber-500 w-5 h-5" />
                    <label htmlFor="m_agency" className="text-xs font-black uppercase cursor-pointer text-amber-500">Exibir na Agência</label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Descrição Detalhada do Perfil</label>
                  <textarea 
                    rows={5}
                    value={editingModel.description || ''} 
                    onChange={e => setEditingModel({...editingModel, description: e.target.value})} 
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none resize-none" 
                    placeholder="Escreva sobre a personalidade, gostos e especialidades da modelo..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12 border-t border-white/5 pt-8">
              <button type="submit" className="flex-[2] bg-amber-600 hover:bg-amber-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all">
                <Save size={20} /> Finalizar Cadastro
              </button>
              <button type="button" onClick={() => setEditingModel(null)} className="flex-1 bg-white/5 hover:bg-white/10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Club Edit Modal */}
      {editingClub && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setEditingClub(null)}></div>
          <form 
            onSubmit={handleSaveClub} 
            className="relative glass w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl custom-scrollbar"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
                <Building2 className="text-amber-500" /> Configurar Boate: {editingClub.name || 'Nova Casa'}
              </h2>
              <button type="button" onClick={() => setEditingClub(null)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Nome do Estabelecimento</label>
                  <input required value={editingClub.name || ''} onChange={e => setEditingClub({...editingClub, name: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none focus:border-amber-500 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Localização (Cidade - UF)</label>
                    <input required value={editingClub.location || ''} onChange={e => setEditingClub({...editingClub, location: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" placeholder="Cachoeira do Sul - RS" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Avaliação MB (1 a 5 Estrelas)</label>
                    <input type="number" min="1" max="5" value={editingClub.rating || 5} onChange={e => setEditingClub({...editingClub, rating: Number(e.target.value)})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Endereço Público</label>
                  <input value={editingClub.address || ''} onChange={e => setEditingClub({...editingClub, address: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" placeholder="Ex: Av. Brasil, 1234 - Centro" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Horário de Operação</label>
                  <input value={editingClub.openingHours || ''} onChange={e => setEditingClub({...editingClub, openingHours: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" placeholder="Ex: Diariamente, 24h" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Link Compartilhável Google Maps</label>
                  <div className="flex gap-2">
                    <div className="p-4 bg-zinc-800 rounded-xl text-amber-500 shrink-0"><MapPin size={20}/></div>
                    <input value={editingClub.mapsUrl || ''} onChange={e => setEditingClub({...editingClub, mapsUrl: e.target.value})} className="flex-1 bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none focus:border-amber-500" placeholder="https://goo.gl/maps/..." />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <input type="checkbox" id="c_verified" checked={editingClub.verified} onChange={e => setEditingClub({...editingClub, verified: e.target.checked})} className="accent-amber-500 w-5 h-5" />
                  <label htmlFor="c_verified" className="text-xs font-black uppercase cursor-pointer flex items-center gap-2 text-amber-500">Parceiro Certificado <CheckCircle2 size={14}/></label>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">URL Foto Principal da Fachada</label>
                  <input required value={editingClub.mainPhoto || ''} onChange={e => setEditingClub({...editingClub, mainPhoto: e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Galeria de Fotos Internas (Múltiplas URLs separadas por vírgula)</label>
                  <textarea 
                    rows={4}
                    value={Array.isArray(editingClub.photos) ? editingClub.photos.join(', ') : editingClub.photos || ''} 
                    onChange={e => setEditingClub({...editingClub, photos: e.target.value})} 
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none resize-none" 
                    placeholder="Fotos das suítes, bar, lounges..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-1">Descrição Detalhada do Ambiente</label>
                  <textarea 
                    rows={6}
                    value={editingClub.description || ''} 
                    onChange={e => setEditingClub({...editingClub, description: e.target.value})} 
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 outline-none resize-none" 
                    placeholder="Descreva a estrutura, serviços, diferenciais e o que o cliente encontrará na casa..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12 border-t border-white/5 pt-8">
              <button type="submit" className="flex-[2] bg-amber-600 hover:bg-amber-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all">
                <Save size={20} /> Salvar Boate
              </button>
              <button type="button" onClick={() => setEditingClub(null)} className="flex-1 bg-white/5 hover:bg-white/10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
