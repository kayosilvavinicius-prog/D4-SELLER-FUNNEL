
import React, { useState, useEffect, useRef } from 'react';
import { Phone, MicOff, Video, Speaker, User, Grid3X3, Plus, Mic } from 'lucide-react';
import { EXECUTIVE_AVATAR } from '../constants';

const CALL_AUDIO_URL = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/b1d9c5ef8aedf13518fe0042af894d74f9b1d160/LIGA%C3%87%C3%83O%20D4%20SELLER.wav";
const RINGING_AUDIO_URL = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/main/whatsapp_incoming_call.mp3";

const Experience1B: React.FC<{ audioCtx: AudioContext | null, onComplete: (refused: boolean) => void }> = ({ audioCtx, onComplete }) => {
  const [status, setStatus] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [time, setTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  
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
    audio.play();
    audio.onended = () => onComplete(false);
    audioRef.current = audio;
  };

  const handleHangUp = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onComplete(true);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[100dvh] bg-black flex flex-col items-center justify-between max-w-[430px] mx-auto relative overflow-hidden text-white font-sans select-none">
      {/* Background with Blur Effect */}
      <div className="absolute inset-0 z-0">
        <img src={EXECUTIVE_AVATAR} className="w-full h-full object-cover opacity-30 blur-[60px] scale-150" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      {/* Top Header - iPhone Style */}
      <div className={`text-center z-10 w-full space-y-1 animate-in fade-in duration-700 ${status === 'ringing' ? 'pt-16 sm:pt-20' : 'pt-10 sm:pt-12'}`}>
        <div className="space-y-1">
          <h1 className="text-[30px] sm:text-[34px] font-semibold tracking-tight uppercase italic">D4 PHONE</h1>
          <p className="text-[16px] sm:text-[18px] text-white/70 font-normal">
            {status === 'ringing' ? 'WhatsApp áudio...' : formatTime(time)}
          </p>
        </div>
      </div>

      {/* Central Profile Photo - Size adjusts based on status */}
      <div className={`flex items-center justify-center z-10 w-full px-12 transition-all duration-500 ${status === 'ringing' ? 'flex-1' : 'py-3'}`}>
        <div className={`rounded-full overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-500 ${status === 'ringing' ? 'w-40 h-40 sm:w-48 sm:h-48' : 'w-24 h-24 sm:w-28 sm:h-28'}`}>
          <img src={EXECUTIVE_AVATAR} alt="Perfil" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`w-full px-8 z-10 ${status === 'ringing' ? 'pb-16' : 'pb-8 sm:pb-12'}`}>
        {status === 'ringing' ? (
          <div className="flex items-center justify-around w-full mb-8">
            <div className="flex flex-col items-center space-y-3">
              <button 
                onClick={() => onComplete(true)} 
                className="w-18 h-18 sm:w-20 sm:h-20 bg-[#ff3b30] rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              >
                <Phone size={32} className="rotate-[135deg] fill-white text-white" />
              </button>
              <span className="text-[12px] font-medium text-white/90 uppercase tracking-tighter">Recusar</span>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <button 
                onClick={handleAccept} 
                className="w-18 h-18 sm:w-20 sm:h-20 bg-[#34c759] rounded-full flex items-center justify-center shadow-lg active:scale-90 animate-pulse transition-transform"
              >
                <Phone size={32} className="fill-white text-white" />
              </button>
              <span className="text-[12px] font-medium text-white/90 uppercase tracking-tighter">Aceitar</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-6 duration-500">
            <div className="grid grid-cols-3 gap-y-4 gap-x-4 sm:gap-x-6">
              {/* Row 1 */}
              <div className="flex flex-col items-center space-y-1.5">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center backdrop-blur-xl transition-all ${isMuted ? 'bg-white text-black' : 'bg-white/10 text-white border border-white/5'}`}
                >
                  {isMuted ? <Mic size={26} /> : <MicOff size={26} />}
                </button>
                <span className="text-[10px] font-medium text-white/60 uppercase tracking-tighter">mudo</span>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl text-white border border-white/5">
                  <Grid3X3 size={26} />
                </div>
                <span className="text-[10px] font-medium text-white/60 uppercase tracking-tighter">teclado</span>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <button 
                  onClick={() => setIsSpeaker(!isSpeaker)}
                  className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center backdrop-blur-xl transition-all ${isSpeaker ? 'bg-white text-black' : 'bg-white/10 text-white border border-white/5'}`}
                >
                  <Speaker size={26} />
                </button>
                <span className="text-[10px] font-medium text-white/60 uppercase tracking-tighter">alto-falante</span>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl text-white border border-white/5 opacity-40">
                  <Plus size={26} />
                </div>
                <span className="text-[10px] font-medium text-white/30 uppercase tracking-tighter">adicionar</span>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl text-white border border-white/5 opacity-40">
                  <Video size={26} />
                </div>
                <span className="text-[10px] font-medium text-white/30 uppercase tracking-tighter">FaceTime</span>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl text-white border border-white/5">
                  <User size={26} />
                </div>
                <span className="text-[10px] font-medium text-white/60 uppercase tracking-tighter">contatos</span>
              </div>
            </div>

            {/* Hang Up Button - Garantido na tela */}
            <div className="flex justify-center pt-2 sm:pt-4">
              <button 
                onClick={handleHangUp} 
                className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ff3b30] rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all"
              >
                <Phone size={32} className="rotate-[135deg] fill-white text-white" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full"></div>
    </div>
  );
};

export default Experience1B;
