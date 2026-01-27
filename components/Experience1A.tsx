
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Phone, Video, MoreVertical, CheckCheck, Send, Paperclip, Smile, Reply } from 'lucide-react';
import { WhatsAppMessage } from '../types';
import { EXECUTIVE_AVATAR } from '../constants';

interface Experience1AProps {
  onComplete: (name: string, skipCall?: boolean) => void;
  userData: { name: string, email: string, phone: string };
  audioCtx: AudioContext | null;
  buffers: { typing?: AudioBuffer, sent?: AudioBuffer, notification?: AudioBuffer };
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
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
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
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    source.connect(gain).connect(audioCtx.destination);
    source.start(0);
  };

  const playNotificationSound = () => {
    if (!audioCtx || !buffers.notification) return;
    const source = audioCtx.createBufferSource();
    source.buffer = buffers.notification;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
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
    playNotificationSound();
  };

  useEffect(() => {
    if (sequenceIndex === 0) {
      const runIntro = async () => {
        await new Promise(r => setTimeout(r, 1000));
        addSystemMessage("Seja bem-vindo(a). Recebi sua solicitação para realizar o diagnóstico de condução.");
        
        await new Promise(r => setTimeout(r, 1500));
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsTyping(false);
        addSystemMessage("Dá uma olhada no que aconteceu com quem seguiu as recomendações do nosso diagnóstico na última semana:");

        await new Promise(r => setTimeout(r, 2000));
        addSystemMessage("➡️ Encaminhada:\n\n\"Segui exatamente a recomendação que o diagnóstico deu sobre a fase de urgência. O lead que estava me ignorando há 3 dias fechou agora! O diagnóstico abriu meus olhos pra esse erro no script.\"");

        await new Promise(r => setTimeout(r, 2000));
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsTyping(false);
        addSystemMessage("➡️ Encaminhada:\n\n\"Impressionante como o diagnóstico detectou que eu estava sendo passivo na conversa. Fiz os ajustes sugeridos e as vendas subiram 30% em 4 dias. Seguir esse plano vale ouro!\"");

        await new Promise(r => setTimeout(r, 2000));
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsTyping(false);
        addSystemMessage("Agora vamos ao seu. Como posso te chamar para darmos início?");
        setInputStep('name');
        setSequenceIndex(1);
      };
      runIntro();
    }
  }, [sequenceIndex]);

  const handleProcessAnswer = (text: string) => {
    if (inputStep === 'name') {
      const name = text.split(' ')[0]; 
      setCapturedName(text);
      setInputStep('none');
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addSystemMessage(`Prazer, ${name}! 👋`);
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              addSystemMessage("Eu sou o D4 Seller. Vou te transferir agora para a D4 Phone para uma experiência de atendimento por voz de 30 segundos.");
              setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                  setIsTyping(false);
                  addSystemMessage("Posso te ligar agora? Se não puder, seguimos por mensagem.", ["Seguir por ligação", "Seguir por mensagem"]);
                  setInputStep('confirmation');
                }, 1500);
              }, 1500);
            }, 2000);
          }, 1200);
        }, 1200);
      }, 500);
    } else if (inputStep === 'confirmation') {
      setInputStep('none');
      const isNegative = /n[ãa]o|mensagem|texto|agora n|nem/i.test(text.toLowerCase());
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          if (isNegative) {
            addSystemMessage("Ok, sem problemas. Vamos seguir por aqui.");
            setTimeout(() => onComplete(capturedName, true), 1500);
          } else {
            addSystemMessage("Perfeito. Iniciando conexão...");
            setTimeout(() => onComplete(capturedName, false), 1500);
          }
        }, 1500);
      }, 800);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || inputStep === 'none') return;
    const userMsg: WhatsAppMessage = { id: Date.now(), text: inputValue.trim(), sender: "user", status: "read", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    playSentSound();
    handleProcessAnswer(inputValue.trim());
    setInputValue('');
  };

  const handleButtonClick = (btn: string) => {
    if (inputStep === 'none') return;
    const userMsg: WhatsAppMessage = { id: Date.now(), text: btn, sender: "user", status: "read", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    playSentSound();
    handleProcessAnswer(btn);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[100dvh] max-w-[430px] mx-auto overflow-hidden font-sans relative wa-doodle-bg bg-[#e5ddd5]">
      <header className="bg-[#f0f2f5]/98 backdrop-blur-xl pt-12 pb-2.5 px-3 flex flex-col shrink-0 z-20 border-b border-black/5 text-[#111b21] shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <ChevronLeft className="text-[#007aff] w-8 h-8 -ml-2" />
            <div className="flex items-center space-x-2.5">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-black/5 shrink-0 relative shadow-sm">
                <img src={EXECUTIVE_AVATAR} alt="D4 Seller" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#06d755] border-2 border-[#f0f2f5] rounded-full"></div>
              </div>
              <div className="leading-tight text-left">
                <h2 className="text-[17px] font-bold uppercase tracking-tighter">D4 SELLER</h2>
                <p className={`text-[12px] font-semibold ${isTyping ? 'text-[#06d755]' : 'text-[#667781]'}`}>{isTyping ? 'digitando...' : 'online'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5 text-[#007aff] pr-1"><Video size={22} /><Phone size={20} /><MoreVertical size={22} className="text-[#54656f]" /></div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 z-10 scrollbar-hide pb-8">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`${msg.sender === 'user' ? 'bg-[#DCF8C6]' : 'bg-white'} max-w-[88%] px-3 pt-2.5 pb-2 rounded-xl shadow-sm relative border border-black/[0.03] text-[#111b21]`}>
              
              {msg.text.includes("➡️ Encaminhada") && (
                <div className="flex items-center space-x-1.5 mb-1.5 opacity-40 italic">
                   <Reply size={11} className="scale-x-[-1]" />
                   <span className="text-[10px] font-black uppercase tracking-tighter">Encaminhada</span>
                </div>
              )}

              <div className={`text-[15.5px] leading-snug whitespace-pre-wrap text-left ${msg.text.includes("Encaminhada") ? 'italic text-[#54656f]' : ''}`}>
                {msg.text.replace("➡️ Encaminhada:\n\n", "")}
              </div>

              <div className="flex items-center justify-end space-x-1 mt-1.5 opacity-60">
                <span className="text-[10px] uppercase font-bold tabular-nums">{msg.timestamp}</span>
                {msg.sender === 'user' && <CheckCheck size={14} className="text-[#53bdeb]" />}
              </div>
              
              {msg.sender === 'system' && <div className="absolute top-0 -left-1.5 w-3 h-3 bg-white clip-tail-left"></div>}
              {msg.sender === 'user' && <div className="absolute top-0 -right-1.5 w-3 h-3 bg-[#DCF8C6] clip-tail-right"></div>}
            </div>
            {msg.buttons && (
              <div className="flex flex-col space-y-2 mt-4 w-full max-w-[85%] animate-in fade-in zoom-in duration-400">
                {msg.buttons.map((btn, bIdx) => (
                  <button key={bIdx} onClick={() => handleButtonClick(btn)} className="bg-white hover:bg-[#f0f2f5] text-[#00a884] font-black py-4 px-4 rounded-xl shadow-md border border-black/5 active:scale-[0.96] transition-all text-sm uppercase tracking-tight italic">{btn}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-xl shadow-sm flex space-x-1.5">
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      <footer className="bg-[#f0f2f5] p-3 shrink-0 z-20 border-t border-black/5 flex items-center space-x-3 pb-[env(safe-area-inset-bottom,16px)]">
        <div className="flex items-center space-x-3.5 text-[#54656f] pl-1"><Smile size={26} className="opacity-60" /><Paperclip size={24} className="opacity-60" /></div>
        <div className="flex-1 bg-white rounded-full px-5 py-2.5 border border-black/5 shadow-inner">
          <input type="text" placeholder={inputStep === 'none' ? "Aguarde..." : "Digite aqui..."} disabled={inputStep === 'none'} value={inputValue} onChange={e => setInputValue(e.target.value)} className="w-full bg-transparent outline-none text-[#111b21] text-[16px]" onKeyDown={e => e.key === 'Enter' && handleSendMessage()} />
        </div>
        <button onClick={handleSendMessage} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${inputValue.trim() ? 'bg-[#00a884] shadow-lg scale-105' : 'bg-[#54656f] opacity-40'}`}>
          <Send size={22} fill="currentColor" className="text-white ml-0.5" />
        </button>
      </footer>
    </div>
  );
};

export default Experience1A;
