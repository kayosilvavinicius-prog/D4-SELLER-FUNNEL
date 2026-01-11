
import React, { useState, useEffect, useRef } from 'react';
import { Check, CheckCheck, MoreHorizontal, ChevronLeft, Info, Phone, Video } from 'lucide-react';
import { WHATSAPP_SIMULATION } from '../constants';

const WhatsAppSim: React.FC = () => {
  const [messages, setMessages] = useState<{ day: number, text: string, xp?: string, time: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentStep < WHATSAPP_SIMULATION.length) {
      const stepData = WHATSAPP_SIMULATION[currentStep];
      
      const typingTimer = setTimeout(() => {
        setIsTyping(true);
        
        const messageTimer = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            ...stepData,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          setCurrentStep(prev => prev + 1);
        }, 2000);

        return () => clearTimeout(messageTimer);
      }, 1500);

      return () => clearTimeout(typingTimer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen wa-doodle-bg max-w-[100vw] overflow-hidden">
      {/* iOS Header */}
      <header className="bg-neutral-50 border-b border-neutral-200 px-4 py-3 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="text-blue-500 w-6 h-6" />
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/id/64/100/100" alt="D4 Seller" />
            </div>
            <div>
              <h2 className="font-semibold text-neutral-900 text-sm">D4 SELLER</h2>
              <p className="text-[10px] text-green-500 font-medium">online • Digitando...</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5 text-blue-500">
          <Video size={20} />
          <Phone size={18} />
        </div>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scrollbar-hide"
      >
        <div className="text-center my-6 relative z-10">
          <span className="bg-white/80 backdrop-blur-sm text-neutral-500 text-[11px] px-3 py-1 rounded-md shadow-sm uppercase tracking-wider font-medium">
            Hoje
          </span>
        </div>

        {messages.map((msg, idx) => (
          <div key={idx} className="space-y-1 animate-in slide-in-from-left-2 duration-300 relative z-10">
            {/* Day Divider */}
            <div className="flex justify-center my-4">
              <span className="bg-blue-100/80 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                DIA {msg.day}
              </span>
            </div>
            
            {/* Bubble */}
            <div className="max-w-[85%] relative">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-black/5">
                <p className="text-neutral-800 text-[15px] leading-relaxed break-words">
                  {msg.text}
                </p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <span className="text-[10px] text-neutral-400">{msg.time}</span>
                  <CheckCheck size={14} className="text-blue-400" />
                </div>
              </div>
              
              {msg.xp && (
                <div className="mt-2 inline-flex items-center space-x-1 bg-yellow-100 border border-yellow-200 px-2 py-0.5 rounded text-[10px] font-bold text-yellow-700 animate-bounce">
                  <span>✨</span>
                  <span>{msg.xp}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="max-w-[85%] animate-in fade-in duration-300 relative z-10">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm w-16 flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {currentStep === WHATSAPP_SIMULATION.length && !isTyping && (
          <div className="pt-8 pb-24 animate-in fade-in zoom-in duration-1000 relative z-10">
            <div className="bg-white/90 backdrop-blur p-6 rounded-3xl border border-neutral-200 shadow-xl text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Simulação Concluída</h3>
              <p className="text-neutral-600 text-sm mb-6">
                Você viu como a condução estruturada muda o jogo. Está pronto para aplicar isso na sua operação real?
              </p>
              <button 
                className="w-full min-h-[56px] bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>👉 Manter assinatura — R$94/mês</span>
              </button>
              <p className="text-[10px] text-neutral-400 mt-3 font-medium uppercase tracking-tighter">
                Cancele quando quiser. Acesso vitalício ao framework D4.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* iOS Keyboard Placeholder / Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-200 p-4 shrink-0 flex items-center space-x-3 z-20">
        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
          <span className="text-xl">+</span>
        </div>
        <div className="flex-1 bg-white border border-neutral-300 rounded-full px-4 py-2 text-neutral-300 text-sm">
          Sua mensagem...
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <MoreHorizontal size={20} />
        </div>
      </footer>
    </div>
  );
};

export default WhatsAppSim;
