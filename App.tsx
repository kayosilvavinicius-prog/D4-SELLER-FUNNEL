
import React, { useState, useEffect, useRef } from 'react';
import Experience1A from './components/Experience1A';
import Experience1B from './components/Experience1B';
import Experience1C from './components/Experience1C';
import Experience2VSL from './components/Experience2VSL';
import Diagnostico from './components/Diagnostico';
import SalesPage from './components/SalesPage';
import { KEYBOARD_SOUND_URL, SENT_SOUND_URL } from './constants';
import { Loader2, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { Experience as ExperienceType } from './types';

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxQau-SChwXppRxOgxYKP87Rr52lKekDUikue5sssEtzhXFwknqxfEvYSr7ioHmn_p4bA/exec"; 
const META_TEST_CODE = "TEST61117"; 

type AppExperience = ExperienceType | 'LEAD_GATE';

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

  const trackMilestone = async (eventName: string, extraData: any = {}) => {
    const payload = { 
      data_hora: new Date().toLocaleString('pt-BR'),
      etapa: eventName,
      nome: userData.name || "Interesse Inicial",
      email: userData.email || "aguardando@leadhub.com",
      whatsapp: userData.phone || "000000000",
      ...utms, 
      ...extraData 
    };

    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' }, 
        body: JSON.stringify(payload) 
      }).catch((err) => console.error("Webhook Error:", err));
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      const fbq = (window as any).fbq;
      const options = META_TEST_CODE ? { test_event_code: META_TEST_CODE } : {};
      fbq('trackCustom', eventName, { email: userData.email, name: userData.name }, options);
    }
  };

  const unlockAudioAndStart = async () => {
    setIsSubmitting(true);
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    await ctx.resume();
    audioCtxRef.current = ctx;
    await preloadAudios(ctx);
    setHasUnlockedAudio(true);
    setIsSubmitting(false);
    navigateTo('1A', 'INICIO_EXPERIENCIA_ANONIMA');
  };

  const handleLeadSubmit = async () => {
    if (!userData.name || !userData.email || !userData.phone) return;
    setIsSubmitting(true);
    await trackMilestone('CADASTRO_CONCLUIDO_POS_VSL');
    navigateTo('DIAGNOSTICO', 'ETAPA_DIAGNOSTICO_VIEW');
    setIsSubmitting(false);
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

  const isFormValid = userData.name.trim().length > 0 && 
                      userData.email.trim().length > 0 && 
                      userData.phone.trim().length >= 8;

  return (
    <div className={`min-h-[100dvh] bg-[#0B0C10] transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      
      {!hasUnlockedAudio ? (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#66FCF1]/5 rounded-full blur-[120px]"></div>
          <div className="z-10 text-center space-y-12 max-w-sm w-full animate-in fade-in zoom-in duration-1000">
            <div className="space-y-2 flex flex-col items-center">
              <h1 className="text-6xl font-black uppercase italic tracking-tighter">D4 <span className="text-[#66FCF1]">Kingdom</span></h1>
              <p className="text-[11px] font-bold text-[#66FCF1] uppercase tracking-[0.5em] opacity-80 mt-1">Engenharia de Vendas</p>
            </div>
            
            <div className="space-y-6">
              <p className="text-white/60 text-sm font-medium leading-relaxed uppercase tracking-widest">
                Você está prestes a iniciar uma simulação de condução comercial acelerada.
              </p>
              <button 
                onClick={unlockAudioAndStart} 
                disabled={isSubmitting}
                className="group w-full py-6 bg-[#66FCF1] text-[#0B0C10] rounded-2xl font-black text-lg shadow-glow-cyan active:scale-95 transition-all flex items-center justify-center space-x-3"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : (
                  <>
                    <span>INICIAR EXPERIÊNCIA</span>
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">Ambiente Seguro e Criptografado</p>
          </div>
        </div>
      ) : (
        <div className="h-[100dvh] relative">
          {currentExp === '1A' && (
            <Experience1A 
              onComplete={(capturedName, skip) => {
                setUserData(prev => ({ ...prev, name: capturedName }));
                setCallOutcome(skip ? 'skipped' : 'completed');
                navigateTo(skip ? '1C' : '1B', skip ? 'ETAPA_WHATSAPP_CONCLUIDO' : 'ETAPA_CALL_INICIADA');
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
                navigateTo('1C', refused ? 'ETAPA_CALL_RECUSADA' : 'ETAPA_CALL_ATENDIDA');
              }} 
            />
          )}
          {currentExp === '1C' && (
            <Experience1C 
              userName={userData.name} 
              callOutcome={callOutcome} 
              onComplete={() => navigateTo('2-VSL', 'ETAPA_VSL_INICIADA')} 
            />
          )}
          {currentExp === '2-VSL' && (
            <Experience2VSL 
              onComplete={(ans) => {
                setQuizAnswers(ans);
                navigateTo('LEAD_GATE', 'VSL_CONCLUIDA_AGUARDANDO_LEAD');
              }} 
            />
          )}
          {currentExp === 'LEAD_GATE' && (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0B0C10] text-white">
              <div className="max-w-md w-full space-y-8 text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="w-20 h-20 bg-[#66FCF1]/10 rounded-3xl flex items-center justify-center mx-auto border border-[#66FCF1]/20 shadow-glow-cyan">
                  <ShieldCheck size={40} className="text-[#66FCF1]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Acesse seu Diagnóstico</h2>
                  <p className="text-white/50 text-sm font-light">Confirme seus dados para que nossa IA gere o relatório personalizado para <strong>{userData.name.split(' ')[0]}</strong>.</p>
                </div>
                <div className="space-y-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                  <input 
                    type="text" 
                    placeholder="Seu Nome Completo" 
                    value={userData.name} 
                    onChange={e => setUserData({...userData, name: e.target.value})} 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1] transition-colors" 
                  />
                  <input 
                    type="email" 
                    placeholder="Seu Melhor E-mail" 
                    value={userData.email} 
                    onChange={e => setUserData({...userData, email: e.target.value})} 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1] transition-colors" 
                  />
                  <input 
                    type="tel" 
                    placeholder="WhatsApp com DDD" 
                    value={userData.phone} 
                    onChange={e => setUserData({...userData, phone: e.target.value})} 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1] transition-colors" 
                  />
                  <button 
                    onClick={handleLeadSubmit} 
                    disabled={isSubmitting || !isFormValid} 
                    className={`w-full py-5 rounded-xl font-black text-sm transition-all duration-500 flex items-center justify-center space-x-2 ${
                      isFormValid && !isSubmitting
                        ? 'bg-[#66FCF1] text-[#0B0C10] shadow-glow-cyan active:scale-95' 
                        : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : (
                      <>
                        <span>DESBLOQUEAR DIAGNÓSTICO</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center space-x-2 text-[9px] text-white/20 font-bold uppercase tracking-widest pt-2">
                    <Lock size={10} />
                    <span>Dados Protegidos via LGPD</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentExp === 'DIAGNOSTICO' && (
            <Diagnostico answers={quizAnswers} onComplete={() => navigateTo('SALES', 'ETAPA_PAGINA_VENDAS_VIEW')} />
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
