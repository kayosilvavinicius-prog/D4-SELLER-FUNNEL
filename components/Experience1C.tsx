
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, PlayCircle, MoreVertical, Video, Phone } from 'lucide-react';
import { EXECUTIVE_AVATAR } from '../constants';

interface Experience1CProps {
  userName: string;
  callOutcome: 'completed' | 'refused' | 'skipped';
  onComplete: () => void;
}

const Experience1C: React.FC<Experience1CProps> = ({ userName, callOutcome, onComplete }) => {
  const [showMessages, setShowMessages] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setShowMessages(true), 800);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [showMessages]);

  const shouldShowFallMessage = callOutcome === 'refused';

  return (
    <div className="h-screen bg-[#E5DDD5] max-w-[430px] mx-auto flex flex-col font-sans relative overflow-hidden shadow-2xl">
      {/* Authentic WhatsApp Background Pattern - Doodle lines */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)', 
          backgroundSize: '360px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <header className="bg-[#f0f2f5] pt-12 pb-2 px-3 flex flex-col shrink-0 z-20 border-b border-black/5 shadow-sm">
        <div className="absolute top-0 left-0 right-0 px-6 py-2 flex justify-between items-center text-[13px] font-semibold text-[#111b21] pointer-events-none">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <div className="flex items-center space-x-1.5">
            <div className="flex space-x-0.5 items-end">
              <div className="w-0.5 h-1.5 bg-black/80 rounded-full"></div>
              <div className="w-0.5 h-2.5 bg-black/80 rounded-full"></div>
              <div className="w-0.5 h-3.5 bg-black/80 rounded-full"></div>
              <div className="w-0.5 h-4.5 bg-black/20 rounded-full"></div>
            </div>
            <span className="font-bold">5G</span>
            <div className="w-6 h-3 border border-black/40 rounded-sm relative flex items-center px-0.5">
              <div className="w-4 h-full bg-black/80 rounded-px"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            <ChevronLeft className="text-[#007aff] w-7 h-7 -ml-2 cursor-pointer" />
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden relative ring-1 ring-black/5">
                <img src={EXECUTIVE_AVATAR} alt="D4 Seller" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#06d755] border-2 border-[#f0f2f5] rounded-full"></div>
              </div>
              <div className="leading-tight">
                <h2 className="text-[16px] font-bold text-[#111b21]">D4 SELLER</h2>
                <p className="text-[12px] text-[#667781] font-medium">online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5 text-[#007aff]">
            <Video size={20} className="stroke-[2.5px]" />
            <Phone size={19} className="stroke-[2.5px]" />
            <MoreVertical size={20} className="text-[#54656f]" />
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 z-10 scrollbar-hide pb-24">
        <div className="flex justify-center mb-6 mt-2">
          <span className="bg-[#d1d7db]/90 backdrop-blur-md text-[#54656f] text-[11px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider shadow-sm">Atendimento Ativo</span>
        </div>

        {showMessages && (
          <div className="space-y-4">
            {shouldShowFallMessage && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white system-bubble max-w-[85%] px-3 pt-2 pb-1.5 rounded-xl shadow-sm relative border border-black/[0.03]">
                  <div className="text-[14.5px] text-[#111b21] leading-[1.5] pr-12">
                    A ligação caiu, mas tudo bem. Seguimos por aqui 🙂
                  </div>
                  <div className="flex items-center justify-end space-x-1 mt-0.5">
                    <span className="text-[9.5px] text-[#667781]/70 font-semibold">Agora</span>
                  </div>
                  <div className="absolute top-0 -left-1.5 w-3 h-3 bg-white clip-tail-left"></div>
                </div>
              </div>
            )}

            <div 
              className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-500" 
              style={{animationDelay: shouldShowFallMessage ? '0.8s' : '0s'}}
            >
              <div className="bg-white system-bubble max-w-[85%] px-3 pt-2 pb-1.5 rounded-xl shadow-sm relative border border-black/[0.03]">
                <div className="text-[14.5px] text-[#111b21] leading-[1.5] whitespace-pre-wrap pr-12">
                  {userName ? `${userName.split(' ')[0]}, precisamos` : "Precisamos"} agora entender se nossos serviços e ferramentas se aplicariam ao seu negócio e, claro, te explicar como funcionamos.
                  {"\n\n"}
                  Acesse o vídeo curto, você poderá interagir, respondendo um quiz e no final ainda terá um diagnóstico da sua operação atual e acesso às ferramentas.
                </div>
                <div className="flex items-center justify-end space-x-1 mt-0.5">
                  <span className="text-[9.5px] text-[#667781]/70 font-semibold">Agora</span>
                </div>
                <div className="absolute top-0 -left-1.5 w-3 h-3 bg-white clip-tail-left"></div>
              </div>
            </div>

            <div className="flex justify-center py-6 animate-in zoom-in duration-700 delay-700">
              <div className="bg-[#d1d7db]/80 backdrop-blur-sm text-[#4a5e75] text-[11px] px-4 py-2 rounded-full font-black shadow-sm uppercase tracking-tighter">
                ⬇️ Clique no botão abaixo para avançar
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-[#f0f2f5] p-3 shrink-0 z-20 border-t border-black/5 space-y-4 pb-10">
        <button 
          onClick={onComplete}
          className="group w-full bg-[#00a884] text-white font-black py-5 rounded-[1.25rem] shadow-xl active:scale-95 transition-all flex items-center justify-center space-x-3 text-lg hover:bg-[#008f72] ring-4 ring-[#00a884]/20"
        >
          <PlayCircle size={26} fill="currentColor" className="text-[#f0f2f5]" />
          <span className="tracking-tighter">ASSISTIR O VÍDEO CURTO</span>
        </button>
        <div className="flex items-center justify-center space-x-2 text-[#8696a0]">
          <div className="h-px w-8 bg-black/5"></div>
          <p className="text-[10px] font-black uppercase tracking-widest">
            Framework D4 Kingdom
          </p>
          <div className="h-px w-8 bg-black/5"></div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .system-bubble { border-radius: 0 12px 12px 12px; }
        .clip-tail-left {
          clip-path: polygon(100% 0, 100% 100%, 0 0);
        }
      `}} />
    </div>
  );
};

export default Experience1C;
