
import React from 'react';
import { Model, Category, Club, Seal } from './types';

export const HOUSE_PHOTOS = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1571508601891-ca5c7a71ad5f?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=1200'
];

export const QUALITY_SEALS = [
  { id: '1', name: 'Curadoria Elite', description: 'Seleção rigorosa de cada perfil do nosso catálogo.', icon: 'Award' },
  { id: '2', name: 'Sigilo Absoluto', description: 'Protocolos de segurança e discrição nível bancário.', icon: 'Lock' },
  { id: '3', name: 'Perfil Verificado', description: 'Fotos 100% reais validadas pela nossa equipe.', icon: 'ShieldCheck' },
  { id: '4', name: 'Atendimento VIP', description: 'Concierge dedicado disponível 24 horas por dia.', icon: 'Users' }
];

const OFFICIAL_WHATSAPP = '5551996554609';

export const MODELS: Model[] = [
  {
    id: '1',
    name: 'Valentina Rossi',
    age: 23,
    category: Category.DIAMOND,
    height: '1.72m',
    weight: '58kg',
    hair: 'Morena',
    location: 'Cachoeira do Sul - RS',
    region: 'Cachoeira do Sul',
    price: 'R$ 1.500/h',
    description: 'Elegância e sofisticação definem Valentina. Uma companhia perfeita para jantares de negócios e eventos sociais.',
    // Adding missing services property
    services: ['Acompanhante', 'Eventos', 'Jantares'],
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?auto=format&fit=crop&q=80&w=1200'
    ],
    mainPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
    whatsapp: OFFICIAL_WHATSAPP,
    verified: true,
    featured: true,
    active: true,
    showOnAgency: true
  }
];

export const CLUBS: Club[] = [
  {
    id: 'c1',
    name: 'Morena Bruta Private',
    location: 'Cachoeira do Sul - RS',
    address: 'Centro, Cachoeira do Sul - RS',
    description: 'Nosso espaço exclusivo para encontros e eventos privados com total discrição.',
    photos: ['https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=1200'],
    mainPhoto: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=1200',
    rating: 5.0,
    mapsUrl: 'https://goo.gl/maps/placeholder',
    openingHours: 'Todos os dias: 24h',
    // Fix: Added missing verified property
    verified: true
  }
];
