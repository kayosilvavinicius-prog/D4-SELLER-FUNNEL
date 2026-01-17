
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Phone, Video, MoreVertical, CheckCheck, Send, Paperclip, Smile } from 'lucide-react';
import { WhatsAppMessage } from '../types';
import { EXECUTIVE_AVATAR } from '../constants';

interface Experience1AProps {
  onComplete: (name: string, skipCall?: boolean) => void;
  userData: { name: string, email: string, phone: string };
  audioCtx: AudioContext | null;
  buffers: { typing?: AudioBuffer, sent?: AudioBuffer };
}

const Experience1A: React.FC<Experience1AProps> = ({ onComplete, userData, audioCtx, buffers }) => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputStep, setInputStep] = useState<'confirmation' | 'none'>('none');
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [genderPrefix, setGenderPrefix] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Heurística local de gênero (Economiza 100% de tokens no início do funil)
  useEffect(() => {
    const firstName = userData.name.trim().split(' ')[0].toLowerCase();
    const lastChar = firstName.charAt(firstName.length - 1);
    const commonFemaleEndings = ['a', 'e', 'y', 'i']; // Heurística simples para PT-BR
    
    // Lista de exceções comuns ou nomes que terminam em 'a' mas são masculinos
    const maleExceptions = ['luca', 'bortola', 'garcia', 'paiva', 'sena'];
    
    let detected = 'Prezado';
    if (commonFemaleEndings.includes(lastChar) && !maleExceptions.includes(firstName)) {
      detected = 'Prezada';
    }
    
    setGenderPrefix(detected);
  }, [userData.name]);

  const playTypingSound = () => {
    if (!audioCtx || !buffers.typing || typingSourceRef.current) return;
    const source = audioCtx.createBufferSource();
    source.buffer = buffers.typing;
    source.loop = true;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    source.connect(gain).connect(audioCtx.destination);
    source.start(0);
    typingSourceRef.current = source;
  };

  const stopTypingSound = () => {
    if (typingSourceRef.current) {
      try { typingSourceRef.current.stop(); } catch {}
      typingSourceRef.current = null;
    }
  };

  const playSentSound = () => {
    if (!audioCtx || !buffers.sent) return;
    const source = audioCtx.createBufferSource();
    source.buffer = buffers.sent;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    source.connect(gain).connect(audioCtx.destination);
    source.start(0);
  };

  useEffect(() => {
    if (isTyping) playTypingSound();
    else stopTypingSound();
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
    if (!inputValue.trim() || inputStep === 'none') return;
    const userMsg: WhatsAppMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: "user",
      status: "read",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    playSentSound();
    setInputValue('');
    setInputStep('none');

    const normalized = userMsg.text.toLowerCase();
    const isNegative = /n[ãa]o|not|agora n|nem/i.test(normalized);

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        if (isNegative) {
          addSystemMessage("Entendido. Vamos seguir pelo fluxo de mensagens aqui mesmo.");
          setTimeout(() => onComplete(userData.name, true), 2000);
        } else {
          addSystemMessage("Perfeito. Iniciando conexão de voz criptografada...");
          setTimeout(() => onComplete(userData.name, false), 2000);
        }
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    if (genderPrefix === null) return;
    const firstName = userData.name.split(' ')[0];
    if (sequenceIndex === 0) {
      setTimeout(() => {
        const greeting = `${genderPrefix} ${firstName}.`;
        addSystemMessage(`${greeting} Recebi suas credenciais.`);
        setSequenceIndex(1);
      }, 1500);
    } else if (sequenceIndex === 1) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addSystemMessage("Eu sou o D4 Seller. Vou te transferir agora para a D4 Phone para uma experiência de voz real.");
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              addSystemMessage(`Posso te ligar agora? Dura 30 segundos. Se não puder atender, seguimos aqui. Podemos prosseguir?`);
              setInputStep('confirmation');
            }, 3000);
          }, 3000);
        }, 2500);
      }, 1500);
    }
  }, [sequenceIndex, genderPrefix]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[100dvh] max-w-[430px] mx-auto overflow-hidden font-sans relative wa-doodle-bg">
      <header className="bg-[#f0f2f5]/95 backdrop-blur-md pt-12 pb-2 px-3 flex flex-col shrink-0 z-20 border-b border-black/5 text-[#111b21]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <ChevronLeft className="text-[#007aff] w-8 h-8 -ml-2" />
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border border-black/5">
                <img src={EXECUTIVE_AVATAR} alt="D4 Seller" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#06d755] border-2 border-white rounded-full"></div>
              </div>
              <div className="leading-tight">
                <h2 className="text-[16px] font-bold uppercase tracking-tighter">D4 SELLER</h2>
                <p className={`text-[12px] ${isTyping ? 'text-[#06d755]' : 'text-[#667781]'}`}>{isTyping ? 'digitando...' : 'online'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5 text-[#007aff]"><Video size={22} /><Phone size={20} /><MoreVertical size={22} className="text-[#54656f]" /></div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 z-10 scrollbar-hide pb-10">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`${msg.sender === 'user' ? 'bg-[#DCF8C6]' : 'bg-white'} max-w-[85%] px-3 pt-2 pb-1.5 rounded-xl shadow-sm relative border border-black/[0.03] text-[#111b21]`}>
              <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</div>
              <div className="flex items-center justify-end space-x-1 mt-0.5 opacity-60">
                <span className="text-[10px] uppercase font-bold">{msg.timestamp}</span>
                {msg.sender === 'user' && <CheckCheck size={14} className="text-[#53bdeb]" />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in">
            <div className="bg-white px-4 py-3 rounded-xl shadow-sm flex space-x-1">
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      <footer className="bg-[#f0f2f5] p-2 shrink-0 z-20 border-t border-black/5 flex items-center space-x-2 pb-[env(safe-area-inset-bottom,20px)]">
        <div className="flex items-center space-x-4 text-[#54656f] pl-1"><Smile size={26} /><Paperclip size={24} /></div>
        <div className="flex-1 bg-white rounded-full px-4 py-2 border border-black/5">
          <input 
            type="text" 
            placeholder={inputStep === 'confirmation' ? "Responda aqui..." : "Aguarde..."} 
            disabled={inputStep === 'none'} 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            className="w-full bg-transparent outline-none text-[#111b21]" 
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          />
        </div>
        <button onClick={handleSendMessage} className={`w-11 h-11 flex items-center justify-center rounded-full ${inputValue.trim() ? 'bg-[#00a884] scale-110' : 'bg-[#54656f] opacity-40'} text-white transition-all`}>
          <Send size={18} fill="currentColor" />
        </button>
      </footer>
    </div>
  );
};

export default Experience1A;
