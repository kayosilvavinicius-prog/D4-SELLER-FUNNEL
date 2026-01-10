
import React, { useState, useEffect, useRef } from 'react';
import { VSL_BLOCKS } from '../constants';

interface RevelationProps {
  onComplete: () => void;
}

const Revelation: React.FC<RevelationProps> = ({ onComplete }) => {
  const [visibleBlocks, setVisibleBlocks] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleBlocks < VSL_BLOCKS.length) {
      const timer = setTimeout(() => {
        setVisibleBlocks(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [visibleBlocks]);

  useEffect(() => {
    if (containerRef.current) {
      const lastElement = containerRef.current.lastElementChild;
      if (lastElement) {
        lastElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [visibleBlocks]);

  const parseMarkdown = (text: string) => {
    // Basic bolding logic for simulation
    const parts = text.split('**');
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-neutral-900">{part}</strong> : part);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center pt-16 pb-32 px-4 sm:px-6">
      <div ref={containerRef} className="w-full max-w-xl space-y-12">
        {VSL_BLOCKS.slice(0, visibleBlocks).map((block, idx) => (
          <div 
            key={idx} 
            className="animate-in fade-in slide-in-from-bottom-2 duration-1000"
          >
            <p className="text-xl sm:text-2xl text-neutral-600 leading-relaxed font-light break-words">
              {parseMarkdown(block)}
            </p>
          </div>
        ))}

        {visibleBlocks === VSL_BLOCKS.length && (
          <div className="pt-12 animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="p-8 bg-white rounded-3xl border border-neutral-200 shadow-xl space-y-6">
              <h3 className="text-2xl font-bold text-neutral-900 text-center">
                O Próximo Nível da sua Operação
              </h3>
              <p className="text-neutral-600 text-center">
                Não confie apenas em palavras. Veja o mecanismo em ação numa simulação guiada de 7 dias.
              </p>
              <button 
                onClick={onComplete}
                className="w-full min-h-[60px] bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                👉 Testar o D4 SELLER por 7 dias
              </button>
              <p className="text-center text-sm text-neutral-400">
                Experiência de simulação acelerada.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Revelation;
