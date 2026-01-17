
import React, { useState, useEffect, useRef } from 'react';
import { Phone, MicOff, Video, Check, X, Speaker, User, Grid3X3, Plus } from 'lucide-react';
import { CALL_TRANSCRIPT_TIMED, EXECUTIVE_AVATAR } from '../constants';

const CALL_AUDIO_URL = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/b1d9c5ef8aedf13518fe0042af894d74f9b1d160/LIGA%C3%87%C3%83O%20D4%20SELLER.wav";
const RINGING_AUDIO_URL = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/main/whatsapp_incoming_call.mp3";

const Experience1B: React.FC<{ audioCtx: AudioContext | null, onComplete: (refused: boolean) => void }> = ({ audioCtx, onComplete }) => {
  const [status, setStatus] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [time, setTime] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ringingRef = useRef<HTMLAudioElement | null>(null);
  const vibrationOscRef = useRef<OscillatorNode | null>(null);

  const startVibration = () => {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'square';
    osc.frequency.setValueAtTime(80, audioCtx.currentTime); 
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, audioCtx.currentTime);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    for(let i = 0; i < 60; i++) {
      const start = audioCtx.currentTime + i;
      gain.gain.setTargetAtTime(0.1, start, 0.02);
      gain.gain.setTargetAtTime(0, start + 0.5, 0.02);
    }

    osc.connect(filter).connect(gain).connect(audioCtx.destination);
    osc.start();
    vibrationOscRef.current = osc;
  };

  const stopVibration = () => {
    if (vibrationOscRef.current) {
      try { vibrationOscRef.current.stop(); } catch {}
      vibrationOscRef.current = null;
    }
  };

  useEffect(() => {
    if (status === 'ringing') {
      const audio = new Audio(RINGING_AUDIO_URL);
      audio.loop = true;
      audio.play().catch(() => {});
      ringingRef.current = audio;
      startVibration();
      if ("vibrate" in navigator) navigator.vibrate([500, 500]);
    } else {
      if (ringingRef.current) ringingRef.current.pause();
      stopVibration();
    }
    return () => {
      if (ringingRef.current) ringingRef.current.pause();
      stopVibration();
    };
  }, [status]);

  useEffect(() => {
    if (status === 'connected') {
      const timer = setInterval(() => setTime(t => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const handleAccept = () => {
    setStatus('connected');
    const audio = new Audio(CALL_AUDIO_URL);
    audio.ontimeupdate = () => {
      const ct = audio.currentTime;
      let idx = 0;
      for (let i = 0; i < CALL_TRANSCRIPT_TIMED.length; i++) {
        if (ct >= CALL_TRANSCRIPT_TIMED[i].start) idx = i;
        else break;
      }
      setLineIdx(idx);
    };
    audio.play();
    audio.onended = () => onComplete(false);
    audioRef.current = audio;
  };

  return (
    <div className="h-[100dvh] bg-black flex flex-col items-center justify-between max-w-[430px] mx-auto relative overflow-hidden text-white font-sans">
      <div className="absolute inset-0 z-0 bg-[#0B0C10]">
        <img src={EXECUTIVE_AVATAR} className="w-full h-full object-cover opacity-30 blur-[20px] scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60"></div>
      </div>

      <div className="pt-20 text-center z-10 w-full px-8 space-y-4">
        <div className="w-28 h-28 bg-white/5 rounded-full mx-auto flex items-center justify-center shadow-2xl border border-white/10 overflow-hidden backdrop-blur-md">
          <img src={EXECUTIVE_AVATAR} alt="D4 Seller" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight uppercase italic">D4 PHONE</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs">
            {status === 'ringing' ? 'Chamada de áudio WhatsApp...' : `EM LIGAÇÃO • ${Math.floor(time/60)}:${(time%60).toString().padStart(2,'0')}`}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full px-8 z-10 text-center">
        {status === 'connected' && (
           <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 animate-in fade-in duration-500">
             <p className="text-lg sm:text-xl font-bold italic leading-relaxed text-white drop-shadow-md">
               "{CALL_TRANSCRIPT_TIMED[lineIdx].text}"
             </p>
           </div>
        )}
      </div>

      <div className="w-full px-10 pb-16 z-10">
        {status === 'ringing' ? (
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center space-y-3">
              <button onClick={() => onComplete(true)} className="w-18 h-18 bg-red-600 rounded-full flex items-center justify-center shadow-xl active:scale-90"><X size={32} /></button>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Recusar</span>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <button onClick={handleAccept} className="w-18 h-18 bg-green-500 rounded-full flex items-center justify-center shadow-xl active:scale-90 animate-bounce"><Check size={32} /></button>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Atender</span>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-3 gap-y-8 gap-x-4">
              {[MicOff, Grid3X3, Speaker, Plus, Video, User].map((Icon, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10"><Icon size={24} /></div>
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">Opção</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button onClick={() => onComplete(true)} className="w-18 h-18 bg-red-600 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all"><Phone size={32} className="rotate-[135deg]" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience1B;
