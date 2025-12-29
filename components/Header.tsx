
import React, { useState, useEffect } from 'react';
// Changed import from react-router-dom to react-router to resolve missing export errors in newer versions
import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Agência', path: '/agencia' },
    { name: 'Modelos', path: '/modelos' },
    { name: 'Boates', path: '/boates' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header 
      className={`fixed top-8 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 transition-all duration-700 rounded-3xl ${
        scrolled ? 'glass py-3 px-8 shadow-2xl translate-y-[-10px]' : 'bg-transparent py-4 px-4'
      }`}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-amber-900/40">
            <span className="text-white font-black text-xl">M</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white hidden sm:inline-block">
            MORENA <span className="text-amber-500">BRUTA</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl ${
                location.pathname === link.path 
                  ? 'bg-amber-600/20 text-amber-500' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link to="/contato" className="hidden md:flex bg-white text-black px-7 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:bg-amber-600 hover:text-white items-center gap-2 group">
          CONCIERGE
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <button 
          className="md:hidden text-white glass p-3 rounded-2xl" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-4 glass rounded-[2.5rem] p-8 animate-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-black uppercase tracking-widest text-gray-300 hover:text-amber-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10" />
            <Link 
              to="/contato" 
              onClick={() => setIsOpen(false)}
              className="bg-amber-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest shadow-xl"
            >
              AGENDAR AGORA
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
