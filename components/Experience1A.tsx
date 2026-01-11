
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Phone, Video, MoreVertical, CheckCheck, Send, Paperclip, Smile, Camera, Mic } from 'lucide-react';
import { WhatsAppMessage } from '../types';
import { GoogleGenAI } from "@google/genai";
import { EXECUTIVE_AVATAR } from '../constants';

interface Experience1AProps {
  onComplete: (name: string, skipCall?: boolean) => void;
  userData: { name: string, email: string, phone: string };
  preloadedAudioCtx?: AudioContext | null;
  preloadedKeyboardBuffer?: AudioBuffer | null;
  preloadedSentBuffer?: AudioBuffer | null;
}

const Experience1A: React.FC<Experience1AProps> = ({ 
  onComplete, 
  userData,
  preloadedAudioCtx, 
  preloadedKeyboardBuffer,
  preloadedSentBuffer
}) => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputStep, setInputStep] = useState<'confirmation' | 'none'>('none');
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [genderPrefix, setGenderPrefix] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const detectGender = async () => {
      const firstName = userData.name.split(' ')[0];
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Analise o nome "${firstName}". Responda APENAS com uma única letra: "M" para masculino, "F" para feminino ou "U" para nomes unissex.`,
          config: { 
            temperature: 0.1, 
            maxOutputTokens: 2,
            thinkingConfig: { thinkingBudget: 0 }
          }
        });
        const result = response.text?.trim()?.toUpperCase();
        if (result === 'M') setGenderPrefix('Prezado');
        else if (result === 'F') setGenderPrefix('Prezada');
        else setGenderPrefix('');
      } catch (error) {
        setGenderPrefix('');
      }
    };
    detectGender();
  }, [userData.name]);

  const playTypingSound = () => {
    if (!preloadedAudioCtx || !preloadedKeyboardBuffer || typingSourceRef.current) return;
    
    if (preloadedAudioCtx.state === 'suspended') {
      preloadedAudioCtx.resume();
    }

    const source = preloadedAudioCtx.createBufferSource();
    source.buffer = preloadedKeyboardBuffer;
    source.loop = true;
    const gainNode = preloadedAudioCtx.createGain();
    gainNode.gain.setValueAtTime(0.12, preloadedAudioCtx.currentTime); 
    source.connect(gainNode);
    gainNode.connect(preloadedAudioCtx.destination);
    source.start(0);
    typingSourceRef.current = source;
  };

  const stopTypingSound = () => {
    if (typingSourceRef.current) {
      try { 
        typingSourceRef.current.stop(); 
      } catch (e) {}
      typingSourceRef.current = null;
    }
  };

  const playSentSound = () => {
    if (!preloadedAudioCtx || !preloadedSentBuffer) return;
    
    if (preloadedAudioCtx.state === 'suspended') {
      preloadedAudioCtx.resume();
    }

    const source = preloadedAudioCtx.createBufferSource();
    source.buffer = preloadedSentBuffer;
    const gainNode = preloadedAudioCtx.createGain();
    gainNode.gain.setValueAtTime(0.5, preloadedAudioCtx.currentTime);
    source.connect(gainNode);
    gainNode.connect(preloadedAudioCtx.destination);
    source.start(0);
  };

  useEffect(() => {
    if (isTyping) {
      playTypingSound();
    } else {
      stopTypingSound();
    }
    return () => stopTypingSound();
  }, [isTyping]);

  const addSystemMessage = (text: string) => {
    const msg: WhatsAppMessage = {
      id: Date.now(),
      text,
      sender: "system",
      status: "read",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, msg]);
    playSentSound();
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const value = inputValue.trim();
    const userMsg: WhatsAppMessage = {
      id: Date.now(),
      text: value,
      sender: "user",
      status: "read",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    playSentSound();
    setInputValue('');

    if (inputStep === 'confirmation') {
      setInputStep('none');
      const isNegative = /n[ãa]o|not|nem|agora n|n[ãa]o posso/i.test(value);

      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          if (isNegative) {
            addSystemMessage("Tudo bem, eu entendo. Sem problemas, vamos seguir por aqui mesmo então.");
            setTimeout(() => onComplete(userData.name, true), 2000);
          } else {
            addSystemMessage("Excelente. Prepare-se, estou estabelecendo a conexão de voz com o D4 Phone agora...");
            setTimeout(() => onComplete(userData.name, false), 2500);
          }
        }, 2500);
      }, 1000);
    }
  };

  useEffect(() => {
    if (genderPrefix === null) return;
    const firstName = userData.name.split(' ')[0];
    const hour = new Date().getHours();
    const greeting = hour >= 5 && hour < 12 ? "bom dia" : hour >= 12 && hour < 18 ? "boa tarde" : "boa noite";

    if (sequenceIndex === 0) {
      setTimeout(() => {
        const formalGreeting = genderPrefix 
          ? `${genderPrefix} ${firstName}, ${greeting}.` 
          : `Olá, ${firstName}, ${greeting}.`;
        addSystemMessage(`${formalGreeting} Recebi suas credenciais.`);
        setSequenceIndex(1);
      }, 1500);
    } else if (sequenceIndex === 1) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addSystemMessage(`Eu sou o D4 Seller e serei o responsável por guiar a sua jornada de atendimento por aqui hoje.`);
          
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              addSystemMessage("Vou te dar um aviso importante agora.\n\nEm seguida, vou te transferir para a D4 Phone para você ter a experiência de como nossa ferramenta de ligação inteligente pode funcionar no seu negócio.");
              
              setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                  setIsTyping(false);
                  addSystemMessage("Aviso:\nEsta experiência foi desenhada para ser rápida e economizar semanas de reuniões inúteis. Em poucos minutos, você vai entender como o Mecanismo de Condução Inteligente transforma o seu WhatsApp em uma máquina de lucro previsível.");
                  
                  setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                      setIsTyping(false);
                      addSystemMessage(`Eu vou te ligar agora, dura menos de 30 segundos. Mas se não puder atender, seguimos por aqui. Podemos prosseguir, ${firstName}?`);
                      setInputStep('confirmation');
                    }, 3500);
                  }, 5000);

                }, 5000);
              }, 3000);

            }, 4500);
          }, 3000);
        }, 3000);
      }, 1500);
    }
  }, [sequenceIndex, userData, genderPrefix]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen max-w-[430px] mx-auto overflow-hidden font-sans relative bg-transparent">
      {/* iOS Status Bar Restoration - Black on Chat Screens */}
      <div className="absolute top-0 left-0 right-0 h-10 px-6 flex justify-between items-center text-[14px] font-bold text-[#111b21] pointer-events-none z-[100]">
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center space-x-1.5">
          <div className="flex space-x-0.5 items-end">
            <div className="w-0.5 h-1.5 bg-black rounded-full"></div>
            <div className="w-0.5 h-2 bg-black rounded-full"></div>
            <div className="w-0.5 h-3 bg-black rounded-full"></div>
            <div className="w-0.5 h-4 bg-black/20 rounded-full"></div>
          </div>
          <span className="text-[11px] font-black">5G</span>
          <div className="w-6 h-3 border border-black/40 rounded-[3px] relative flex items-center px-0.5 ml-0.5">
            <div className="w-4 h-[70%] bg-black rounded-[1px]"></div>
          </div>
        </div>
      </div>

      <header className="bg-[#f0f2f5]/90 backdrop-blur-md pt-10 pb-2 px-3 flex flex-col shrink-0 z-20 border-b border-black/5 shadow-sm">
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center space-x-1">
            <ChevronLeft className="text-[#007aff] w-8 h-8 -ml-2 cursor-pointer" />
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden relative ring-1 ring-black/5">
                <img src={EXECUTIVE_AVATAR} alt="D4 Seller" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#06d755] border-2 border-[#f0f2f5] rounded-full"></div>
              </div>
              <div className="leading-tight">
                <h2 className="text-[16px] font-bold text-[#111b21]">D4 SELLER</h2>
                <p className={`text-[12px] font-medium transition-colors ${isTyping ? 'text-[#06d755]' : 'text-[#667781]'}`}>
                  {isTyping ? 'digitando...' : 'online'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5 text-[#007aff]">
            <Video size={22} className="stroke-[2px]" />
            <Phone size={20} className="stroke-[2px]" />
            <MoreVertical size={22} className="text-[#54656f]" />
          </div>
        </div>
      </header>

      {/* Main Chat Area - Transparent to show body background */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 z-10 scrollbar-hide pb-24 relative bg-transparent">
        <div className="flex justify-center mb-6 mt-2 relative z-10">
          <span className="bg-[#d1d7db]/80 backdrop-blur-md text-[#54656f] text-[11px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider shadow-sm">Atendimento Ativo</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-10`}>
            <div className={`${msg.sender === 'user' ? 'bg-[#DCF8C6] user-bubble shadow-md' : 'bg-white system-bubble shadow-sm'} max-w-[85%] px-3 pt-2 pb-1.5 rounded-xl relative border border-black/[0.03]`}>
              <div className="text-[14.5px] text-[#111b21] leading-[1.5] pr-12 whitespace-pre-wrap">{msg.text}</div>
              <div className="flex items-center justify-end space-x-1 mt-0.5">
                <span className="text-[9.5px] text-[#667781]/70 font-semibold uppercase">{msg.timestamp}</span>
                {msg.sender === 'user' && <CheckCheck size={14} className="text-[#53bdeb]" />}
              </div>
              <div className={`absolute top-0 w-3 h-3 ${msg.sender === 'user' ? '-right-1.5 bg-[#DCF8C6] clip-tail-right' : '-left-1.5 bg-white clip-tail-left'}`}></div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-in fade-in slide-in-from-left-2 relative z-10">
            <div className="bg-white px-4 py-3 rounded-xl rounded-tl-none shadow-sm flex space-x-1.5 items-center ring-1 ring-black/5">
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      <footer className="bg-[#f0f2f5] p-2.5 shrink-0 z-20 border-t border-black/5 flex items-center space-x-2.5 pb-10">
        <div className="flex items-center space-x-4 text-[#54656f] pl-1 opacity-80">
          <Smile size={26} />
          <Paperclip size={24} className="rotate-45" />
        </div>
        
        <div className="flex-1 bg-white rounded-full px-4 py-2.5 flex items-center shadow-inner border border-black/[0.05]">
          <input 
            type="text"
            placeholder={inputStep === 'confirmation' ? "Responda aqui..." : "Aguarde..."}
            disabled={inputStep === 'none'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[16px] text-[#111b21] placeholder-[#8696a0]"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
        </div>

        <button 
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || inputStep === 'none'}
          className={`w-11 h-11 flex items-center justify-center rounded-full shadow-lg transition-all transform active:scale-90 ${inputValue.trim() ? 'bg-[#00a884] text-white scale-110' : 'bg-[#54656f] text-white opacity-40'}`}
        >
          <Send size={18} fill={inputValue.trim() ? "currentColor" : "none"} className={inputValue.trim() ? 'translate-x-0.5' : ''} />
        </button>
      </footer>
    </div>
  );
};

export default Experience1A;
