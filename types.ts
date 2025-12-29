
export enum Category {
  DIAMOND = 'Diamond',
  GOLD = 'Gold',
  PREMIUM = 'Premium'
}

export interface Model {
  id: string;
  name: string;
  age: number;
  category: Category;
  height: string;
  weight: string;
  hair: string;
  location: string;
  region: string;
  price: string;
  description: string;
  services: string[];
  photos: string[];
  mainPhoto: string;
  whatsapp: string;
  verified: boolean;
  featured: boolean;
  active: boolean; 
  showOnAgency: boolean;
}

export interface Club {
  id: string;
  name: string;
  location: string;
  address: string;
  description: string;
  photos: string[];
  mainPhoto: string;
  rating: number;
  mapsUrl: string;
  openingHours: string;
  verified: boolean; // Novo: Selo de certificação da boate
}

export interface Seal {
  id: string;
  name: string;
  icon: string;
  description: string;
}
