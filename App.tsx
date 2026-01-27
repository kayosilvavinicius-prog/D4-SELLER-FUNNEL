
import React, { useState, useEffect, useRef } from 'react';
import Experience1A from './components/Experience1A';
import Experience1B from './components/Experience1B';
import Experience1C from './components/Experience1C';
import Experience2VSL from './components/Experience2VSL';
import Diagnostico from './components/Diagnostico';
import SalesPage from './components/SalesPage';
import Menu from './components/Menu';
import { KEYBOARD_SOUND_URL, SENT_SOUND_URL, NOTIFICATION_SOUND_URL, UNLOCK_SOUND_URL, EXECUTIVE_AVATAR } from './constants';
import { Loader2, ArrowRight, ShieldCheck, Settings, CheckCircle2, AlertCircle, FileText, Sparkles, X, Zap } from 'lucide-react';
import { Experience as ExperienceType } from './types';

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxQau-SChwXppRxOgxYKP87Rr52lKekDUikue5sssEtzhXFwknqxfEvYSr7ioHmn_p4bA/exec"; 

type AppExperience = ExperienceType | 'LEAD_GATE' | 'MENU';

const App: React.FC = () => {
  const [currentExp, setCurrentExp] = useState<AppExperience>('1A');
  const [lastExpBeforeMenu, setLastExpBeforeMenu] = useState<AppExperience>('1A');
  const [isFading, setIsFading] = useState(false);
  const [hasUnlockedAudio, setHasUnlockedAudio] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [utms, setUtms] = useState({
    utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', utm_term: ''
  });

  const [quizAnswers, setQuizAnswers] = useState<{ type: string, value: number }[]>([]);
  const [callOutcome, setCallOutcome] = useState<'completed' | 'refused' | 'skipped'>('completed');
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBuffers = useRef<{ typing?: AudioBuffer, sent?: AudioBuffer, notification?: AudioBuffer, unlock?: AudioBuffer }>({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const params = new URLSearchParams(window.location.search);
    const capturedUtms = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || ''
    };
    setUtms(capturedUtms);

    if (params.get('step') === 'sales') { setHasUnlockedAudio(true); setCurrentExp('SALES'); }
    else if (params.get('step') === 'diagnostico') { setHasUnlockedAudio(true); setCurrentExp('DIAGNOSTICO'); }

    return () => clearInterval(timer);
  }, []);

  const preloadAudios = async (ctx: AudioContext) => {
    const load = async (url: string) => {
      try {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        return await ctx.decodeAudioData(arrayBuffer);
      } catch (e) {
        console.error("Erro ao carregar áudio:", url, e);
        return undefined;
      }
    };
    try {
      audioBuffers.current.typing = await load(KEYBOARD_SOUND_URL);
      audioBuffers.current.sent = await load(SENT_SOUND_URL);
      audioBuffers.current.notification = await load(NOTIFICATION_SOUND_URL);
      audioBuffers.current.unlock = await load(UNLOCK_SOUND_URL);
    } catch (e) { console.error(e); }
  };

  const playUnlockSound = () => {
    if (audioCtxRef.current && audioBuffers.current.unlock) {
      const source = audioCtxRef.current.createBufferSource();
      source.buffer = audioBuffers.current.unlock;
      source.connect(audioCtxRef.current.destination);
      source.start(0);
    }
  };

  const trackMilestone = async (eventName: string, extraData: any = {}) => {
    const payload = { 
      data_hora: new Date().toLocaleString('pt-BR'),
      etapa: eventName,
      nome: userData.name || "Visitante",
      email: userData.email || "aguardando@leadhub.com",
      whatsapp: userData.phone || "000000000",
      ...utms, ...extraData 
    };
    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) }).catch(() => {});
    }
  };

  const toggleMenu = () => {
    if (currentExp === 'MENU') {
      setCurrentExp(lastExpBeforeMenu);
    } else {
      setLastExpBeforeMenu(currentExp);
      setCurrentExp('MENU');
    }
  };

  const unlockAudioAndStart = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    await ctx.resume();
    audioCtxRef.current = ctx;
    await preloadAudios(ctx);
    playUnlockSound();
    setHasUnlockedAudio(true);
    setIsSubmitting(false);
    navigateTo('1A', 'INICIO_EXPERIENCIA_CONFIRMADO');
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

  const formattedDate = currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const formattedTime = currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`min-h-[100dvh] bg-[#0B0C10] transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'} relative`}>
      
      {/* MENU GLOBAL PERSISTENTE - OCULTO PARA LANÇAMENTO AO PÚBLICO */}
      {/* 
      <div className="fixed top-6 right-6 z-[1000]">
        <button 
          onClick={toggleMenu}
          className={`p-3.5 backdrop-blur-2xl rounded-2xl border transition-all active:scale-90 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
            currentExp === 'MENU' 
            ? 'bg-red-500/20 border-red-500/30 text-red-500' 
            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
          }`}
        >
          {currentExp === 'MENU' ? <X size={20} /> : <Settings size={20} />}
        </button>
      </div>
      */}

      {!hasUnlockedAudio && currentExp !== 'MENU' ? (
        <div className="min-h-[100dvh] relative overflow-hidden flex flex-col items-center bg-black">
          {/* Fundo com efeito Premium */}
          <div className="absolute inset-0 bg-cover bg-center opacity-40 scale-105" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200)' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/95"></div>

          {/* Topo - Brand */}
          <div className="z-[60] w-full px-8 py-8 flex justify-start items-center">
            <div className="flex items-center space-x-2 text-white/90">
              <Sparkles size={16} className="text-[#66FCF1] animate-pulse" />
              <span className="text-[12px] font-black tracking-[0.4em] uppercase">D4 KINGDOM</span>
            </div>
          </div>

          {/* Relógio Centralizado */}
          <div className="z-20 mt-2 text-center text-white space-y-1 animate-in fade-in duration-1000">
            <p className="text-[13px] font-medium capitalize opacity-40 tracking-[0.2em]">{formattedDate}</p>
            <h1 className="text-8xl font-thin tracking-tighter tabular-nums">{formattedTime}</h1>
          </div>
          
          {/* Card Principal - Enquadramento Melhorado */}
          <div className="z-20 w-full max-w-sm px-6 flex-1 flex flex-col justify-center pb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div onClick={unlockAudioAndStart} className="group relative cursor-pointer active:scale-[0.99] transition-all duration-300">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#66FCF1]/40 to-blue-500/40 rounded-[2.8rem] blur opacity-30 group-hover:opacity-60 transition duration-700"></div>
              
              <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.8rem] p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00a884] to-[#00c99d] rounded-2xl flex items-center justify-center overflow-hidden border border-white/20 shadow-xl">
                      <img src={EXECUTIVE_AVATAR} alt="D4" className="w-full h-full object-cover" />
                    </div>
                    <div className="leading-tight text-left">
                      <h3 className="text-[17px] font-black text-white italic tracking-tighter uppercase">D4 SELLER</h3>
                      <p className="text-[10px] font-bold text-[#66FCF1] uppercase tracking-[0.2em] mt-0.5 opacity-80">Analista de Atendimento Comercial</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-[#66FCF1] uppercase tracking-widest bg-[#66FCF1]/10 px-4 py-2 rounded-full border border-[#66FCF1]/20">Online</div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-[22px] font-bold leading-tight text-white text-left tracking-tight">
                    Descubra onde o seu atendimento está travando suas vendas.
                  </h2>
                  <p className="text-sm text-white/50 text-left leading-relaxed font-medium">
                    Entenda como o seu atendimento influencia a decisão do cliente, em poucos minutos.
                  </p>
                  
                  <div className="space-y-3.5 pt-5 border-t border-white/5">
                    <div className="flex items-center space-x-3 text-white/70">
                      <div className="w-6 h-6 bg-[#66FCF1]/10 rounded-lg flex items-center justify-center border border-[#66FCF1]/20 shrink-0">
                        <CheckCircle2 size={14} className="text-[#66FCF1]" />
                      </div>
                      <span className="text-[12px] font-medium uppercase tracking-tight">Diagnóstico rápido e objetivo</span>
                    </div>
                    <div className="flex items-center space-x-3 text-white/70">
                      <div className="w-6 h-6 bg-[#66FCF1]/10 rounded-lg flex items-center justify-center border border-[#66FCF1]/20 shrink-0">
                        <Zap size={14} className="text-[#66FCF1]" />
                      </div>
                      <span className="text-[12px] font-medium uppercase tracking-tight">Análise focada em tomada de decisão</span>
                    </div>
                  </div>

                  <div className="bg-[#66FCF1]/5 border border-[#66FCF1]/20 rounded-[1.5rem] p-4 flex items-center space-x-4 mt-4">
                    <div className="w-10 h-10 bg-[#66FCF1]/10 rounded-xl flex items-center justify-center shrink-0">
                      <FileText size={20} className="text-[#66FCF1]" />
                    </div>
                    <p className="text-[11px] font-bold text-white/60 leading-snug text-left">
                      Resultados apresentados ao final <span className="text-[#66FCF1]">desta experiência.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <button 
                onClick={unlockAudioAndStart} 
                className="group w-full py-6 bg-gradient-to-r from-[#66FCF1] to-[#34D399] text-[#0B0C10] rounded-[1.25rem] font-black text-lg shadow-[0_15px_40px_rgba(102,252,241,0.3)] hover:shadow-[0_20px_50px_rgba(102,252,241,0.4)] active:scale-[0.97] transition-all flex items-center justify-center space-x-3 uppercase tracking-tighter animate-pulse-gentle"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <span>INICIAR DIAGNÓSTICO GRATUITO</span>
                    <ArrowRight size={24} className="group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.5em] text-center">Protocolo D4 Kingdom Experience</p>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-white/10 rounded-full"></div>
        </div>
      ) : (
        <div className="h-[100dvh]">
          {currentExp === 'MENU' && <Menu onNavigate={(target) => { setHasUnlockedAudio(true); navigateTo(target); }} />}
          {currentExp === '1A' && <Experience1A onComplete={(n, skip) => { setUserData(p => ({ ...p, name: n })); setCallOutcome(skip ? 'skipped' : 'completed'); navigateTo(skip ? '1C' : '1B', skip ? 'WHATSAPP_CONCLUIDO' : 'CALL_INICIADA'); }} userData={userData} audioCtx={audioCtxRef.current} buffers={audioBuffers.current} />}
          {currentExp === '1B' && <Experience1B audioCtx={audioCtxRef.current} onComplete={(ref) => { setCallOutcome(ref ? 'refused' : 'completed'); navigateTo('1C', ref ? 'CALL_RECUSADA' : 'CALL_ATENDIDA'); }} />}
          {currentExp === '1C' && <Experience1C userName={userData.name} callOutcome={callOutcome} onComplete={() => navigateTo('2-VSL', 'VSL_INICIADA')} />}
          {currentExp === '2-VSL' && <Experience2VSL onComplete={(ans) => { setQuizAnswers(ans); navigateTo('LEAD_GATE', 'VSL_CONCLUIDA'); }} />}
          {currentExp === 'LEAD_GATE' && (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0B0C10] text-white">
              <div className="max-w-md w-full space-y-8 text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="w-20 h-20 bg-[#66FCF1]/10 rounded-3xl flex items-center justify-center mx-auto border border-[#66FCF1]/20 shadow-glow-cyan"><ShieldCheck size={40} className="text-[#66FCF1]" /></div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Acesse seu Diagnóstico</h2>
                <div className="space-y-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                  <input type="text" placeholder="Nome Completo" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1]" />
                  <input type="email" placeholder="Seu melhor e-mail" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1]" />
                  <input type="tel" placeholder="WhatsApp" value={userData.phone} onChange={e => setUserData({...userData, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1]" />
                  <button onClick={() => navigateTo('DIAGNOSTICO', 'CADASTRO_CONCLUIDO')} disabled={!userData.name || !userData.email || !userData.phone} className="w-full py-5 bg-[#66FCF1] text-[#0B0C10] rounded-xl font-black shadow-glow-cyan">DESBLOQUEAR DIAGNÓSTICO</button>
                </div>
              </div>
            </div>
          )}
          {currentExp === 'DIAGNOSTICO' && <Diagnostico answers={quizAnswers} onComplete={() => navigateTo('SALES', 'VIEW_VENDAS')} />}
          {currentExp === 'SALES' && <SalesPage onTrack={trackMilestone} />}
        </div>
      )}
    </div>
  );
};

export default App;
