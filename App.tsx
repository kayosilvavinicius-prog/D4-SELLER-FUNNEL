
import React, { useState } from 'react';
import Experience1A from './components/Experience1A';
import Experience1B from './components/Experience1B';
import Experience1C from './components/Experience1C';
import Experience2VSL from './components/Experience2VSL';
import SalesPage from './components/SalesPage';
import Menu from './components/Menu';
import { Experience } from './types';

const App: React.FC = () => {
  const [currentExp, setCurrentExp] = useState<Experience>('MENU');
  const [isFading, setIsFading] = useState(false);
  const [userName, setUserName] = useState('');
  const [callRefused, setCallRefused] = useState(false);

  const navigate = (next: Experience) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentExp(next);
      setIsFading(false);
      window.scrollTo(0, 0);
    }, 400);
  };

  const handle1AComplete = (name: string) => {
    setUserName(name);
    navigate('1B');
  };

  const handle1BComplete = (refused: boolean) => {
    setCallRefused(refused);
    navigate('1C');
  };

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'} overflow-x-hidden max-w-[100vw]`}>
      <nav className="fixed top-2 right-2 z-[1000] flex gap-2">
        <button 
          onClick={() => navigate('MENU')}
          className="bg-black/10 backdrop-blur px-2 py-1 rounded text-[10px] uppercase font-bold text-black/40 hover:bg-black/20"
        >
          Dev Menu
        </button>
      </nav>

      {currentExp === 'MENU' && <Menu onNavigate={navigate} />}
      {currentExp === '1A' && <Experience1A onComplete={handle1AComplete} />}
      {currentExp === '1B' && <Experience1B onComplete={handle1BComplete} />}
      {currentExp === '1C' && <Experience1C userName={userName} callRefused={callRefused} onComplete={() => navigate('2-VSL')} />}
      {currentExp === '2-VSL' && <Experience2VSL onComplete={() => navigate('SALES')} />}
      {currentExp === 'SALES' && <SalesPage />}
    </div>
  );
};

export default App;
