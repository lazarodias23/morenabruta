
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router';
import Layout from './components/Layout/Layout.tsx';
import Home from './pages/Home.tsx';
import Agencia from './pages/Agencia.tsx';
import Modelos from './pages/ModelsPage.tsx';
import Boates from './pages/ClubsPage.tsx';
import Contato from './pages/ContactPage.tsx';
import Dashboard from './pages/Dashboard.tsx';

const ShortcutHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut: Alt + Shift + A
      if (e.altKey && e.shiftKey && e.code === 'KeyA') {
        navigate('/dashboard');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ShortcutHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agencia" element={<Agencia />} />
          <Route path="/modelos" element={<Modelos />} />
          <Route path="/boates" element={<Boates />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
