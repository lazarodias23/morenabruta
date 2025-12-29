
import { Model, Club } from '../types.ts';
import { MODELS as INITIAL_MODELS, CLUBS as INITIAL_CLUBS } from '../constants.tsx';

const MODELS_KEY = 'mb_models_v1';
const CLUBS_KEY = 'mb_clubs_v1';

export const DataService = {
  getModels: (): Model[] => {
    const data = localStorage.getItem(MODELS_KEY);
    if (!data) {
      localStorage.setItem(MODELS_KEY, JSON.stringify(INITIAL_MODELS));
      return INITIAL_MODELS;
    }
    return JSON.parse(data);
  },

  saveModels: (models: Model[]) => {
    localStorage.setItem(MODELS_KEY, JSON.stringify(models));
    window.dispatchEvent(new Event('storage_update'));
  },

  getClubs: (): Club[] => {
    const data = localStorage.getItem(CLUBS_KEY);
    if (!data) {
      localStorage.setItem(CLUBS_KEY, JSON.stringify(INITIAL_CLUBS));
      return INITIAL_CLUBS;
    }
    return JSON.parse(data);
  },

  saveClubs: (clubs: Club[]) => {
    localStorage.setItem(CLUBS_KEY, JSON.stringify(clubs));
    window.dispatchEvent(new Event('storage_update'));
  },

  addModel: (model: Model) => {
    const models = DataService.getModels();
    DataService.saveModels([model, ...models]);
  },

  updateModel: (updatedModel: Model) => {
    const models = DataService.getModels();
    DataService.saveModels(models.map(m => m.id === updatedModel.id ? updatedModel : m));
  },

  deleteModel: (id: string) => {
    const models = DataService.getModels();
    DataService.saveModels(models.filter(m => m.id !== id));
  },

  addClub: (club: Club) => {
    const clubs = DataService.getClubs();
    DataService.saveClubs([club, ...clubs]);
  },

  updateClub: (updatedClub: Club) => {
    const clubs = DataService.getClubs();
    DataService.saveClubs(clubs.map(c => c.id === updatedClub.id ? updatedClub : c));
  },

  deleteClub: (id: string) => {
    const clubs = DataService.getClubs();
    DataService.saveClubs(clubs.filter(c => c.id !== id));
  }
};
