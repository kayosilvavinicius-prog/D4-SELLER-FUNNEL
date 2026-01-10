
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Phone, Video, MoreVertical, CheckCheck, Send, Paperclip, Smile } from 'lucide-react';
import { WHATSAPP_1A_MESSAGES } from '../constants';
import { WhatsAppMessage } from '../types';

const EXECUTIVE_AVATAR = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&auto=format&fit=crop";

const Experience1A: React.FC<{ onComplete: (name: string) => void }> = ({ onComplete }) => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputStep, setInputStep] = useState<'name' | 'phone' | 'none'>('none');
  const [userName, setUserName] = useState('');
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "bom dia";
    if (hour >= 12 && hour < 18) return "boa tarde";
    return "boa noite";
  };

  useEffect(() => {
    if (sequenceIndex === 0) {
      const timer = setTimeout(() => {
        addSystemMessage(`Prezada(o), ${getGreeting()}. Seja bem-vindo(a).`);
        setSequenceIndex(1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (sequenceIndex === 1) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        const typingTimer = setTimeout(() => {
          setIsTyping(false);
          addSystemMessage("Eu sou o D4 SELLER e sou responsável pelo seu atendimento aqui.\n\nMas antes de mais nada, eu preciso saber o seu nome.\nPode me responder, por gentileza?");
          setInputStep('name');
          setSequenceIndex(2);
        }, 1800);
        return () => clearTimeout(typingTimer);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [sequenceIndex]);

  const addSystemMessage = (text: string) => {
    const msg: WhatsAppMessage = {
      id: Date.now(),
      text,
      sender: "system",
      status: "read",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, msg]);
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
    setInputValue('');

    if (inputStep === 'name') {
      setUserName(value);
      setInputStep('none');
      
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addSystemMessage(`${value.toUpperCase()}, muito obrigado por informar.`);
          
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              addSystemMessage("Agora, para eu te ligar rapidinho e você conhecer uma das minhas muitas vozes no atendimento por ligação, qual o seu melhor número de WhatsApp com DDD?");
              setInputStep('phone');
            }, 1800);
          }, 800);
        }, 1200);
      }, 1000);
    } else if (inputStep === 'phone') {
      setInputStep('none');
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addSystemMessage("Perfeito. Prepare-se, estou estabelecendo a conexão de voz agora...");
          setTimeout(() => onComplete(userName), 2000);
        }, 1500);
      }, 800);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen bg-[#efeae2] max-w-[430px] mx-auto shadow-2xl overflow-hidden font-sans relative">
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)', backgroundSize: '400px' }}
      ></div>

      <header className="bg-[#f0f2f5] px-4 py-2 flex items-center justify-between h-[64px] shrink-0 z-10 border-b border-black/5 shadow-sm">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="text-[#007aff] w-6 h-6 cursor-pointer" />
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-neutral-300 flex items-center justify-center overflow-hidden border border-white/40 shadow-sm">
               <img src={EXECUTIVE_AVATAR} alt="D4 Executive" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <h2 className="text-[16px] font-bold text-[#111b21] tracking-tight">D4 SELLER</h2>
              <p className="text-[12px] text-[#06d755] font-semibold">{isTyping ? 'digitando...' : 'online'}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5 text-[#54656f]">
          <Video size={20} className="cursor-pointer" />
          <Phone size={18} className="cursor-pointer" />
          <MoreVertical size={20} className="cursor-pointer" />
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 z-10 scrollbar-hide">
        <div className="flex justify-center mb-6">
          <span className="bg-[#d1d7db]/80 backdrop-blur-sm text-[#54656f] text-[11px] px-3 py-1 rounded-lg font-bold uppercase tracking-[0.15em] shadow-sm">
            Hoje
          </span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-300`}>
            <div className={`
              ${msg.sender === 'user' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'} 
              max-w-[85%] px-3 py-2 rounded-xl shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] relative border border-black/[0.03]
            `}>
              <p className="text-[14.5px] text-[#111b21] leading-[1.45] break-words pr-12 whitespace-pre-wrap font-medium">
                {msg.text}
              </p>
              <div className="absolute bottom-1 right-2 flex items-center space-x-1">
                <span className="text-[10px] text-[#667781] leading-none">{msg.timestamp}</span>
                {msg.sender === 'user' && <CheckCheck size={14} className="text-[#53bdeb]" />}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-3 py-2.5 rounded-xl rounded-tl-none shadow-sm flex space-x-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      <footer className="bg-[#f0f2f5] p-3 shrink-0 z-10 border-t border-black/5 flex items-center space-x-2">
        <div className="flex items-center space-x-3 text-[#54656f]">
          <Smile size={24} className="cursor-pointer" />
          <Paperclip size={22} className="cursor-pointer rotate-45" />
        </div>
        
        <div className="flex-1 bg-white rounded-xl px-4 py-3 flex items-center shadow-sm border border-black/[0.02]">
          <input 
            type="text"
            placeholder={inputStep === 'name' ? "Digite seu nome..." : inputStep === 'phone' ? "Qual o seu WhatsApp com DDD?" : "Aguarde..."}
            disabled={inputStep === 'none'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#111b21] placeholder-[#8696a0]"
          />
        </div>

        <button 
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || inputStep === 'none'}
          className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md active:scale-95 transition-all ${inputValue.trim() ? 'bg-[#00a884] text-white' : 'bg-[#54656f] text-white opacity-40'}`}
        >
          <Send size={20} fill={inputValue.trim() ? "currentColor" : "none"} />
        </button>
      </footer>
    </div>
  );
};

export default Experience1A;
