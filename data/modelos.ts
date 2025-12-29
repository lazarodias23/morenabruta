
import { Category, Model } from '../types';

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
    // Added missing required showOnAgency property
    showOnAgency: true
  },
  {
    id: '2',
    name: 'Letícia Weber',
    age: 24,
    category: Category.DIAMOND,
    height: '1.75m',
    weight: '59kg',
    hair: 'Loira',
    location: 'Gramado - RS',
    region: 'Serra Gaúcha',
    price: 'R$ 1.200/h',
    description: 'O luxo da Serra Gaúcha personificado. Letícia encanta com seu olhar penetrante e curvas esculpidas.',
    // Adding missing services property
    services: ['Acompanhante', 'Viagens', 'Eventos'],
    photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=1200'],
    mainPhoto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=1200',
    whatsapp: OFFICIAL_WHATSAPP,
    verified: true,
    featured: true,
    active: true,
    // Added missing required showOnAgency property
    showOnAgency: true
  }
];
