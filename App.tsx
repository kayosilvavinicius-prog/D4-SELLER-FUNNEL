
import React, { useState, useEffect, useRef } from 'react';
import Experience1A from './components/Experience1A';
import Experience1B from './components/Experience1B';
import Experience1C from './components/Experience1C';
import Experience2VSL from './components/Experience2VSL';
import Diagnostico from './components/Diagnostico';
import SalesPage from './components/SalesPage';
import { KEYBOARD_SOUND_URL, SENT_SOUND_URL } from './constants';
import { Loader2 } from 'lucide-react';

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyyIrs2tO1SenLzEms_XdY9Ve2sPLfwbeDhcZ-2m7EL3lMa_uAHykKy3MQNs8mmUX-4Zw/exec"; 

type AppExperience = '1A' | '1B' | '1C' | '2-VSL' | 'DIAGNOSTICO' | 'SALES';

const App: React.FC = () => {
  const [currentExp, setCurrentExp] = useState<AppExperience>('1A');
  const [isFading, setIsFading] = useState(false);
  const [hasUnlockedAudio, setHasUnlockedAudio] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [utms, setUtms] = useState({
    utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', utm_term: ''
  });

  const [quizAnswers, setQuizAnswers] = useState<{ type: string, value: number }[]>([]);
  const [callOutcome, setCallOutcome] = useState<'completed' | 'refused' | 'skipped'>('completed');
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBuffers = useRef<{ typing?: AudioBuffer, sent?: AudioBuffer }>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtms({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || ''
    });
  }, []);

  const preloadAudios = async (ctx: AudioContext) => {
    const load = async (url: string) => {
      const res = await fetch(url);
      const arrayBuffer = await res.arrayBuffer();
      return await ctx.decodeAudioData(arrayBuffer);
    };
    try {
      audioBuffers.current.typing = await load(KEYBOARD_SOUND_URL);
      audioBuffers.current.sent = await load(SENT_SOUND_URL);
    } catch (e) {
      console.error("Audio Load Error:", e);
    }
  };

  const trackMilestone = async (eventName: string, extraData = {}) => {
    const payload = { event: eventName, ...userData, ...utms, ...extraData, timestamp: new Date().toLocaleString('pt-BR') };
    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) }).catch(() => {});
    }
    if ((window as any).fbq) (window as any).fbq('trackCustom', eventName, payload);
  };

  const handleStartExperience = async () => {
    if (!userData.name || !userData.email || !userData.phone) {
      alert("Preencha todos os campos.");
      return;
    }
    setIsSubmitting(true);
    
    // Desbloqueio crucial para iOS
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    await ctx.resume();
    audioCtxRef.current = ctx;
    await preloadAudios(ctx);
    
    await trackMilestone('CADASTRO_INICIAL');
    setHasUnlockedAudio(true);
    setIsSubmitting(false);
    setCurrentExp('1A');
  };

  const navigateTo = (next: AppExperience, trackName?: string) => {
    if (trackName) trackMilestone(trackName);
    setIsFading(true);
    setTimeout(() => {
      setCurrentExp(next);
      setIsFading(false);
      window.scrollTo(0, 0);
    }, 400);
  };

  return (
    <div className={`min-h-[100dvh] bg-[#0B0C10] transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      {!hasUnlockedAudio ? (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#66FCF1]/5 rounded-full blur-[120px]"></div>
          <div className="z-10 text-center space-y-8 max-w-sm w-full">
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">D4 <span className="text-[#66FCF1]">Kingdom</span></h1>
            <div className="space-y-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl">
              <input type="text" placeholder="Nome Completo" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1]" />
              <input type="email" placeholder="E-mail" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1]" />
              <input type="tel" placeholder="WhatsApp" value={userData.phone} onChange={e => setUserData({...userData, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1]" />
              <button onClick={handleStartExperience} disabled={isSubmitting} className="w-full py-5 bg-[#66FCF1] text-[#0B0C10] rounded-xl font-black text-sm shadow-glow-cyan active:scale-95 flex items-center justify-center">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "INICIAR EXPERIÊNCIA"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[100dvh]">
          {currentExp === '1A' && (
            <Experience1A 
              onComplete={(n, skip) => {
                setCallOutcome(skip ? 'skipped' : 'completed');
                navigateTo(skip ? '1C' : '1B', skip ? 'ETAPA_CALL_SKIPPED' : 'ETAPA_CALL_STARTED');
              }} 
              userData={userData} 
              audioCtx={audioCtxRef.current} 
              buffers={audioBuffers.current}
            />
          )}
          {currentExp === '1B' && (
            <Experience1B 
              audioCtx={audioCtxRef.current}
              onComplete={(refused) => {
                setCallOutcome(refused ? 'refused' : 'completed');
                navigateTo('1C', refused ? 'ETAPA_CALL_REFUSED' : 'ETAPA_CALL_SUCCESS');
              }} 
            />
          )}
          {currentExp === '1C' && (
            <Experience1C 
              userName={userData.name} 
              callOutcome={callOutcome} 
              onComplete={() => navigateTo('2-VSL', 'ETAPA_VSL_STARTED')} 
            />
          )}
          {currentExp === '2-VSL' && (
            <Experience2VSL 
              onComplete={(ans) => {
                setQuizAnswers(ans);
                navigateTo('DIAGNOSTICO', 'ETAPA_DIAGNOSTICO_VIEW');
              }} 
            />
          )}
          {currentExp === 'DIAGNOSTICO' && (
            <Diagnostico answers={quizAnswers} onComplete={() => navigateTo('SALES', 'ETAPA_SALES_PAGE_VIEW')} />
          )}
          {currentExp === 'SALES' && (
            <SalesPage onTrack={trackMilestone} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
