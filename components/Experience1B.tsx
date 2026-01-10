
import React, { useState, useEffect } from 'react';
import { Phone, MicOff, MoreHorizontal, Video, User, Check, X } from 'lucide-react';
import { CALL_TRANSCRIPT } from '../constants';

const Experience1B: React.FC<{ onComplete: (refused: boolean) => void }> = ({ onComplete }) => {
  const [status, setStatus] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [time, setTime] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (status === 'connected') {
      const timer = setInterval(() => setTime(t => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'connected') {
      if (lineIdx < CALL_TRANSCRIPT.length) {
        const lineTimer = setTimeout(() => {
          setLineIdx(prev => prev + 1);
        }, 3200); // Timing for reading
        return () => clearTimeout(lineTimer);
      } else {
        setTimeout(() => {
          setStatus('ended');
          onComplete(false);
        }, 2000);
      }
    }
  }, [lineIdx, status, onComplete]);

  const handleDecline = () => {
    setStatus('ended');
    onComplete(true);
  };

  const handleAccept = () => {
    setStatus('connected');
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-[#1C1C1E] flex flex-col items-center justify-between py-20 px-6 max-w-[390px] mx-auto relative overflow-hidden text-white font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-blue-500/5 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="text-center space-y-3 mt-10 z-10">
        <div className="w-24 h-24 bg-neutral-800 rounded-full mx-auto flex items-center justify-center mb-6 shadow-2xl border border-white/5">
          <User size={48} className="text-neutral-500" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">D4 PHONE</h1>
        <p className="text-neutral-400 font-medium uppercase tracking-widest text-xs">Ligação WhatsApp</p>
        <p className="text-blue-400 text-sm font-mono">
          {status === 'ringing' ? 'Chamando...' : formatTime(time)}
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full px-6 z-10">
        <div className="w-full space-y-6 text-center">
          {status === 'connected' && CALL_TRANSCRIPT.slice(Math.max(0, lineIdx - 1), lineIdx).map((line, i) => (
            <p key={i} className="text-xl font-light leading-relaxed animate-in fade-in duration-700 italic text-neutral-300">
              "{line}"
            </p>
          ))}
          {status === 'ringing' && (
            <p className="text-neutral-500 animate-pulse text-sm">O D4 Seller solicitou uma conexão de voz...</p>
          )}
        </div>
      </div>

      {status === 'ringing' ? (
        <div className="flex items-center justify-around w-full mb-10 z-10 px-4">
          <div className="flex flex-col items-center space-y-3">
            <button 
              onClick={handleDecline}
              className="w-20 h-20 bg-[#FF3B30] rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
            >
              <X size={32} />
            </button>
            <span className="text-[12px] font-medium text-neutral-400 uppercase tracking-tighter">Recusar</span>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <button 
              onClick={handleAccept}
              className="w-20 h-20 bg-[#4CD964] rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform animate-bounce"
            >
              <Check size={32} />
            </button>
            <span className="text-[12px] font-medium text-neutral-400 uppercase tracking-tighter">Atender</span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-12 mb-10 w-full px-4 z-10">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                <MicOff size={24} />
              </div>
              <span className="text-[11px] font-medium text-neutral-500">mudo</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                <Video size={24} />
              </div>
              <span className="text-[11px] font-medium text-neutral-500">vídeo</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                <MoreHorizontal size={24} />
              </div>
              <span className="text-[11px] font-medium text-neutral-500">mais</span>
            </div>
          </div>

          <button 
            onClick={handleDecline}
            className="w-20 h-20 bg-[#FF3B30] rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform mb-10 z-10"
          >
            <Phone size={32} className="rotate-[135deg]" />
          </button>
        </>
      )}
    </div>
  );
};

export default Experience1B;
