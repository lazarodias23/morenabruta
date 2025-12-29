
import React, { useState, useEffect } from 'react';
import { DataService } from '../services/storage';
import { Club } from '../types';
import ClubCard from '../components/ClubCard';
import ClubModal from '../components/ClubModal';

const ClubsPage: React.FC = () => {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const load = () => setClubs(DataService.getClubs());
    load();
    window.addEventListener('storage_update', load);
    return () => window.removeEventListener('storage_update', load);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">Boates Parceiras</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Ambientes luxuosos e seguros.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {clubs.map((club) => <ClubCard key={club.id} club={club} onClick={(c) => setSelectedClub(c)} />)}
        </div>
      </div>
      {selectedClub && <ClubModal club={selectedClub} onClose={() => setSelectedClub(null)} />}
    </div>
  );
};

export default ClubsPage;
