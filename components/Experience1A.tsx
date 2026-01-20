
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
  const [inputStep, setInputStep] = useState<'name' | 'confirmation' | 'none'>('none');
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [capturedName, setCapturedName] = useState('');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingSourceRef = useRef<AudioBufferSourceNode | null>(null);

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

  const addSystemMessage = (text: string, buttons?: string[]) => {
    const msg: WhatsAppMessage = {
      id: Date.now(),
      text,
      sender: "system",
      status: "read",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      buttons
    };
    setMessages(prev => [...prev, msg]);
    playSentSound();
  };

  const handleProcessAnswer = (text: string) => {
    if (inputStep === 'name') {
      const name = text.split(' ')[0]; 
      setCapturedName(text);
      setInputStep('none');
      
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addSystemMessage(`Prazer em te conhecer, ${name}! 👋`);
          
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              addSystemMessage("Eu sou o D4 Seller. Vou te transferir agora para a D4 Phone para uma experiência de atendimento por voz, que você pode ter no seu negócio.");
              
              setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                  setIsTyping(false);
                  addSystemMessage(
                    `Posso te ligar agora? Dura 30 segundos. Se não puder atender, seguimos por mensagem.`,
                    ["Seguir por ligação", "Seguir por mensagem"]
                  );
                  setInputStep('confirmation');
                }, 2000);
              }, 2000);
            }, 2500);
          }, 1500);
        }, 1500);
      }, 800);
      
    } else if (inputStep === 'confirmation') {
      setInputStep('none');
      const normalized = text.toLowerCase();
      const isNegative = /n[ãa]o|not|mensagem|texto|agora n|nem/i.test(normalized);

      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          if (isNegative) {
            addSystemMessage("Entendido. Vamos seguir pelo fluxo de mensagens aqui mesmo.");
            setTimeout(() => onComplete(capturedName, true), 2000);
          } else {
            addSystemMessage("Perfeito. Iniciando conexão de voz...");
            setTimeout(() => onComplete(capturedName, false), 2000);
          }
        }, 2000);
      }, 1000);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || inputStep === 'none') return;
    
    const text = inputValue.trim();
    const userMsg: WhatsAppMessage = {
      id: Date.now(),
      text,
      sender: "user",
      status: "read",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    playSentSound();
    setInputValue('');
    handleProcessAnswer(text);
  };

  const handleButtonClick = (buttonText: string) => {
    if (inputStep === 'none') return;
    
    const userMsg: WhatsAppMessage = {
      id: Date.now(),
      text: buttonText,
      sender: "user",
      status: "read",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    playSentSound();
    handleProcessAnswer(buttonText);
  };

  useEffect(() => {
    if (sequenceIndex === 0) {
      setTimeout(() => {
        addSystemMessage("Seja bem-vindo(a). Recebi sua solicitação de acesso.");
        
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addSystemMessage("Mas antes de mais nada, eu preciso saber o seu nome. Como posso te chamar?");
            setInputStep('name');
          }, 2000);
        }, 1500);
        
        setSequenceIndex(1);
      }, 1500);
    }
  }, [sequenceIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping, inputStep]);

  return (
    <div className="flex flex-col h-[100dvh] max-w-[430px] mx-auto overflow-hidden font-sans relative wa-doodle-bg bg-[#e5ddd5]">
      <header className="bg-[#f0f2f5]/95 backdrop-blur-md pt-10 pb-2 px-3 flex flex-col shrink-0 z-20 border-b border-black/5 text-[#111b21] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <ChevronLeft className="text-[#007aff] w-8 h-8 -ml-2" />
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden relative border border-black/5">
                <img src={EXECUTIVE_AVATAR} alt="D4 Seller" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#06d755] border-2 border-white rounded-full"></div>
              </div>
              <div className="leading-tight">
                <h2 className="text-[15px] sm:text-[16px] font-bold uppercase tracking-tighter text-left">D4 SELLER</h2>
                <p className={`text-[11px] sm:text-[12px] text-left ${isTyping ? 'text-[#06d755]' : 'text-[#667781]'}`}>{isTyping ? 'digitando...' : 'online'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-5 text-[#007aff]">
            <Video size={20} />
            <Phone size={18} />
            <MoreVertical size={20} className="text-[#54656f]" />
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 z-10 scrollbar-hide pb-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`${msg.sender === 'user' ? 'bg-[#DCF8C6]' : 'bg-white'} max-w-[85%] px-3 pt-2 pb-1.5 rounded-xl shadow-sm relative border border-black/[0.03] text-[#111b21]`}>
              <div className="text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-wrap text-left">{msg.text}</div>
              <div className="flex items-center justify-end space-x-1 mt-0.5 opacity-60">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold">{msg.timestamp}</span>
                {msg.sender === 'user' && <CheckCheck size={14} className="text-[#53bdeb]" />}
              </div>
              {msg.sender === 'system' && <div className="absolute top-0 -left-1.5 w-3 h-3 bg-white clip-tail-left"></div>}
              {msg.sender === 'user' && <div className="absolute top-0 -right-1.5 w-3 h-3 bg-[#DCF8C6] clip-tail-right"></div>}
            </div>
            
            {msg.buttons && (
              <div className="flex flex-col space-y-2 mt-2 w-full max-w-[85%] animate-in fade-in duration-500 delay-300">
                {msg.buttons.map((btn, bIdx) => (
                  <button 
                    key={bIdx}
                    onClick={() => handleButtonClick(btn)}
                    className="bg-white hover:bg-[#f0f2f5] text-[#00a884] font-bold py-2.5 px-4 rounded-xl shadow-sm border border-black/5 active:scale-95 transition-all text-center text-sm"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in">
            <div className="bg-white px-3 py-2 rounded-xl shadow-sm flex space-x-1">
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      <footer className="bg-[#f0f2f5] p-2 shrink-0 z-20 border-t border-black/5 flex items-center space-x-2 pb-[env(safe-area-inset-bottom,12px)]">
        <div className="flex items-center space-x-3 text-[#54656f] pl-1">
          <Smile size={24} className="opacity-70" />
          <Paperclip size={22} className="opacity-70" />
        </div>
        <div className="flex-1 bg-white rounded-full px-4 py-2 border border-black/5 shadow-inner">
          <input 
            type="text" 
            placeholder={
              inputStep === 'name' ? "Digite seu nome..." : 
              inputStep === 'confirmation' ? "Escolha uma opção..." : "Aguarde..."
            } 
            disabled={inputStep === 'none'} 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            className="w-full bg-transparent outline-none text-[#111b21] text-[15px]" 
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          />
        </div>
        <button 
          onClick={handleSendMessage} 
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${inputValue.trim() ? 'bg-[#00a884] scale-105 shadow-md' : 'bg-[#54656f] opacity-40'}`}
        >
          <Send size={18} fill="currentColor" className="text-white" />
        </button>
      </footer>
    </div>
  );
};

export default Experience1A;
