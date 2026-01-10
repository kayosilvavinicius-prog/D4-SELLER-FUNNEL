
import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCheck, PlayCircle } from 'lucide-react';

interface Experience1CProps {
  userName: string;
  callRefused: boolean;
  onComplete: () => void;
}

const Experience1C: React.FC<Experience1CProps> = ({ userName, callRefused, onComplete }) => {
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowMessages(true), 800);
  }, []);

  return (
    <div className="h-screen bg-[#efeae2] max-w-[390px] mx-auto flex flex-col font-sans" style={{ backgroundImage: 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)' }}>
      <header className="bg-[#f6f6f6] border-b border-[#e5e5ea] px-4 py-2 flex items-center h-[60px] shrink-0">
        <ChevronLeft className="text-[#007aff] w-6 h-6 mr-2" />
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-400 overflow-hidden">
            <img src="https://picsum.photos/id/1/100/100" alt="D4" />
          </div>
          <h2 className="text-[16px] font-semibold">D4 SELLER</h2>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {showMessages && (
          <>
            {callRefused && (
              <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white max-w-[85%] p-3 rounded-xl rounded-tl-none shadow-sm relative border border-black/5">
                  <p className="text-[15px] text-black">
                    A ligação caiu, mas tudo bem. Seguimos por aqui 🙂
                  </p>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-[10px] text-[#667781]">Agora</span>
                    <CheckCheck size={14} className="text-[#34B7F1]" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500" style={{animationDelay: callRefused ? '1s' : '0s'}}>
              <div className="bg-white max-w-[85%] p-3 rounded-xl rounded-tl-none shadow-sm relative border border-black/5">
                <p className="text-[15px] text-black">
                  {userName ? `${userName}, precisamos` : "Precisamos"} agora entender se nossos serviços e ferramentas se aplicariam ao seu negócio e, claro, te explicar como funcionamos.
                </p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <span className="text-[10px] text-[#667781]">Agora</span>
                  <CheckCheck size={14} className="text-[#34B7F1]" />
                </div>
              </div>
            </div>

            <div className="flex justify-center py-6">
              <div className="bg-[#d1e4fc] text-[#4a5e75] text-[11px] px-4 py-1.5 rounded-full font-bold shadow-sm uppercase tracking-tighter">
                ⬇️ Clique no botão abaixo para avançar
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-neutral-200 space-y-4">
        <button 
          onClick={onComplete}
          className="group w-full bg-[#34B7F1] text-white font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center space-x-3 text-lg"
        >
          <PlayCircle size={24} />
          <span>ASSISTIR O VÍDEO CURTO</span>
        </button>
        <p className="text-[10px] text-neutral-400 text-center font-bold uppercase tracking-widest">
          Iniciando Framework de Diagnóstico D4
        </p>
      </div>
    </div>
  );
};

export default Experience1C;
