import React, { useState, useEffect, useRef } from 'react';
import { Phone, MicOff, MoreHorizontal, Video, Check, X, Speaker, User, Grid3X3, Plus, Mic } from 'lucide-react';
import { CALL_TRANSCRIPT_TIMED, EXECUTIVE_AVATAR } from '../constants';

const CALL_AUDIO_URL = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/b1d9c5ef8aedf13518fe0042af894d74f9b1d160/LIGA%C3%87%C3%83O%20D4%20SELLER.wav";
const RINGING_AUDIO_URL = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/main/whatsapp_incoming_call.mp3";

const Experience1B: React.FC<{ onComplete: (refused: boolean) => void }> = ({ onComplete }) => {
  const [status, setStatus] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [time, setTime] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ringingRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (status === 'ringing') {
      const audio = new Audio(RINGING_AUDIO_URL);
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch(() => console.log("Aguardando interação para áudio"));
      ringingRef.current = audio;
    } else {
      if (ringingRef.current) {
        ringingRef.current.pause();
        ringingRef.current = null;
      }
    }
    return () => {
      if (ringingRef.current) ringingRef.current.pause();
    };
  }, [status]);

  useEffect(() => {
    if (status === 'connected') {
      const timer = setInterval(() => setTime(t => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const handleDecline = () => {
    if (audioRef.current) audioRef.current.pause();
    if (ringingRef.current) ringingRef.current.pause();
    setStatus('ended');
    onComplete(true);
  };

  const handleAccept = () => {
    setStatus('connected');
    const audio = new Audio(CALL_AUDIO_URL);
    audio.preload = "auto";
    audio.ontimeupdate = () => {
      const currentTime = audio.currentTime;
      let currentIdx = 0;
      for (let i = 0; i < CALL_TRANSCRIPT_TIMED.length; i++) {
        if (currentTime >= CALL_TRANSCRIPT_TIMED[i].start) {
          currentIdx = i;
        } else {
          break;
        }
      }
      setLineIdx(currentIdx);
    };
    audio.play().catch(e => console.error("Falha ao tocar áudio:", e));
    audio.onended = () => {
      setStatus('ended');
      onComplete(false);
    };
    audioRef.current = audio;
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-between max-w-[430px] mx-auto relative overflow-hidden text-white font-sans">
      {/* iOS 17 Contact Poster Background */}
      <div className="absolute inset-0 z-0">
        <img src={EXECUTIVE_AVATAR} className="w-full h-full object-cover opacity-60 scale-110 blur-[40px] transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
      </div>

      {/* Header Info */}
      <div className="pt-24 text-center z-10 w-full px-8 space-y-2">
        <div className="w-32 h-32 bg-white/10 rounded-full mx-auto flex items-center justify-center mb-8 shadow-2xl border border-white/20 overflow-hidden backdrop-blur-md ring-4 ring-white/10">
          <img src={EXECUTIVE_AVATAR} alt="D4 Seller" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 drop-shadow-lg">D4 PHONE</h1>
        <p className="text-white/70 font-medium text-lg drop-shadow-md">
          {status === 'ringing' ? 'WhatsApp de voz...' : `em ligação • ${formatTime(time)}`}
        </p>
      </div>

      {/* Captions Area */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-10 z-10 text-center">
        <div className="min-h-[160px] flex items-center justify-center w-full">
          {status === 'connected' && (
             <div key={lineIdx} className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white/10 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
               <p className="text-xl sm:text-2xl font-medium leading-relaxed italic text-white drop-shadow-lg">
                 "{CALL_TRANSCRIPT_TIMED[lineIdx].text}"
               </p>
             </div>
          )}
          {status === 'ringing' && (
            <div className="flex flex-col items-center space-y-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse [animation-delay:200ms]"></div>
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse [animation-delay:400ms]"></div>
              </div>
              <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-black">Aguardando atendimento</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Controls */}
      {status === 'ringing' ? (
        <div className="flex items-center justify-between w-full mb-16 z-10 px-12">
          <div className="flex flex-col items-center space-y-4">
            <button 
              onClick={handleDecline}
              className="w-20 h-20 bg-[#FF3B30] rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform ring-4 ring-white/5"
            >
              <X size={40} className="stroke-[3px]" />
            </button>
            <span className="text-[12px] font-bold text-white/60 uppercase tracking-widest">Recusar</span>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button 
              onClick={handleAccept}
              className="w-20 h-20 bg-[#4CD964] rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform animate-bounce ring-4 ring-white/5"
            >
              <Check size={40} className="stroke-[3px]" />
            </button>
            <span className="text-[12px] font-bold text-white/60 uppercase tracking-widest">Atender</span>
          </div>
        </div>
      ) : (
        <div className="w-full px-8 pb-16 z-10 space-y-12">
          {/* Connected Call Grid */}
          <div className="grid grid-cols-3 gap-y-10 gap-x-4">
            {[
              { icon: MicOff, label: 'mudo' },
              { icon: Grid3X3, label: 'teclado' },
              { icon: Speaker, label: 'alto-falante' },
              { icon: Plus, label: 'adicionar' },
              { icon: Video, label: 'vídeo' },
              { icon: User, label: 'contatos' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-3">
                <div className="w-18 h-18 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-2xl ring-1 ring-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                  <item.icon size={30} className="text-white opacity-90" />
                </div>
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleDecline}
              className="w-20 h-20 bg-[#FF3B30] rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform ring-4 ring-white/10"
            >
              <Phone size={36} className="rotate-[135deg] stroke-[2.5px]" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Status Bar Mask */}
      <div className="absolute top-0 left-0 right-0 h-12 z-50 flex justify-between items-center px-8 text-sm font-semibold text-white/80">
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center space-x-1.5">
          <div className="flex space-x-0.5 items-end">
            <div className="w-0.5 h-1.5 bg-white/80 rounded-full"></div>
            <div className="w-0.5 h-2.5 bg-white/80 rounded-full"></div>
            <div className="w-0.5 h-3.5 bg-white/80 rounded-full"></div>
            <div className="w-0.5 h-4.5 bg-white/20 rounded-full"></div>
          </div>
          <div className="w-6 h-3 border border-white/40 rounded-sm relative flex items-center px-0.5">
            <div className="w-4 h-full bg-white/80 rounded-px"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience1B;
