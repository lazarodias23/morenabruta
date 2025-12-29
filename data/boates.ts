
import { Club } from '../types';

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
