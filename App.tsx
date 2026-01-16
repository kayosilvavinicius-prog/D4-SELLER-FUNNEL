
import React, { useState, useEffect, useRef } from 'react';
import Experience1A from './components/Experience1A';
import Experience1B from './components/Experience1B';
import Experience1C from './components/Experience1C';
import Experience2VSL from './components/Experience2VSL';
import Diagnostico from './components/Diagnostico';
import SalesPage from './components/SalesPage';
import Menu from './components/Menu';
import { Experience } from './types';
import { Zap, Cpu, Loader2, User, Mail, Phone, Settings, X, ChevronRight, Bug } from 'lucide-react';
import { EXECUTIVE_AVATAR } from './constants';

const VSL_VIDEO_URL = "https://res.cloudinary.com/dafhibb8s/video/upload/WhatsApp_Video_2026-01-11_at_03.41.56_e51evy.mp4";
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyyIrs2tO1SenLzEms_XdY9Ve2sPLfwbeDhcZ-2m7EL3lMa_uAHykKy3MQNs8mmUX-4Zw/exec"; 

const App: React.FC = () => {
  const [currentExp, setCurrentExp] = useState<Experience>('MENU');
  const [isFading, setIsFading] = useState(false);
  const [hasUnlockedAudio, setHasUnlockedAudio] = useState(false);
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [utms, setUtms] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: ''
  });

  const [quizAnswers, setQuizAnswers] = useState<{ type: string, value: number }[]>([]);
  const [isAssetsReady, setIsAssetsReady] = useState(false);
  const [callOutcome, setCallOutcome] = useState<'completed' | 'refused' | 'skipped'>('completed');
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const keyboardBufferRef = useRef<AudioBuffer | null>(null);
  const sentBufferRef = useRef<AudioBuffer | null>(null);

  // 1. Captura de UTMs na entrada
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

  // 2. Função Unificada de Rastreamento (Planilha + Meta Pixel)
  const trackMilestone = async (eventName: string, extraData = {}) => {
    const payload = {
      event: eventName,
      ...userData,
      ...utms,
      ...extraData,
      timestamp: new Date().toLocaleString('pt-BR')
    };

    // Envio para Planilha
    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      }).catch(e => console.error("Sheets Track Error:", e));
    }

    // Disparo Meta Pixel (se o script estiver no index.html)
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', eventName, payload);
      // Eventos padrão para otimização de Ads
      if (eventName === 'CADASTRO_INICIAL') (window as any).fbq('track', 'Lead', payload);
      if (eventName === 'SALES_PAGE_VIEW') (window as any).fbq('track', 'ViewContent', payload);
    }
    
    console.log(`[TRACKING]: ${eventName}`, payload);
  };

  const navigateWithTrack = (next: Experience, trackName?: string) => {
    if (trackName) trackMilestone(trackName);
    setIsFading(true);
    setTimeout(() => {
      setCurrentExp(next);
      setIsFading(false);
      window.scrollTo(0, 0);
    }, 400);
  };

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
        // Mock buffers... (simplificado para o exemplo)
        setIsAssetsReady(true);
      } catch (e) { setIsAssetsReady(true); }
    };
    preloadAssets();
  }, []);

  const handleStartExperience = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Primeiro rastro importante: O Lead se cadastrou
    await trackMilestone('CADASTRO_INICIAL');

    if (audioCtxRef.current) await audioCtxRef.current.resume();
    setHasUnlockedAudio(true);
    setIsSubmitting(false);
    navigateWithTrack('1A', 'ETAPA_WHATSAPP_START');
  };

  const handleQuizCompletion = async (answers: { type: string, value: number }[]) => {
    setQuizAnswers(answers);
    const answersMap: Record<string, number> = {};
    answers.forEach(a => { answersMap[a.type] = a.value; });

    // Rastro do Quiz Completo
    await trackMilestone('QUIZ_SPIN_COMPLETED', answersMap);
    navigateWithTrack('DIAGNOSTICO', 'ETAPA_DIAGNOSTICO_VIEW');
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) return digits.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    return digits;
  };

  return (
    <div className={`min-h-screen bg-transparent transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <button onClick={() => setShowDevMenu(true)} className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white shadow-2xl"><Bug size={24} /></button>

      {showDevMenu && (
        <div className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-6">
          <div className="bg-neutral-900 w-full max-w-sm rounded-[3rem] p-8 border border-white/10 space-y-4">
            <h3 className="text-white font-black uppercase text-xs tracking-widest text-center">Dev Jump</h3>
            {['MENU', '1A', '1B', '1C', '2-VSL', 'DIAGNOSTICO', 'SALES'].map(target => (
              <button key={target} onClick={() => { setUserData({name:'Teste', email:'t@t.com', phone:'11999'}); navigateWithTrack(target as Experience); setShowDevMenu(false); }} className="w-full p-4 bg-white/5 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all uppercase">{target}</button>
            ))}
            <button onClick={() => setShowDevMenu(false)} className="w-full p-2 text-white/40 text-[10px] uppercase">Fechar</button>
          </div>
        </div>
      )}

      {!hasUnlockedAudio && currentExp === 'MENU' ? (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-white font-sans">
          <div className="z-10 text-center space-y-6 max-w-sm w-full">
            <h1 className="text-3xl font-black uppercase">D4 <span className="text-blue-500">Kingdom</span></h1>
            <div className="space-y-4 bg-white/5 p-6 rounded-[2rem] border border-white/10">
              <input type="text" placeholder="Nome Completo" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-blue-500" />
              <input type="email" placeholder="E-mail" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-blue-500" />
              <input type="tel" placeholder="WhatsApp" value={userData.phone} onChange={(e) => setUserData({...userData, phone: formatPhone(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-blue-500" />
              <button onClick={handleStartExperience} className="w-full py-4 bg-blue-600 rounded-xl font-black text-sm hover:bg-blue-500 transition-all">INICIAR EXPERIÊNCIA</button>
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-widest">UTM detectada: {utms.utm_source || 'Nenhuma'}</p>
          </div>
        </div>
      ) : (
        <div className="z-10 relative h-full">
          {currentExp === 'MENU' && <Menu onNavigate={(t) => navigateWithTrack(t)} />}
          {currentExp === '1A' && <Experience1A onComplete={(n, skip) => {
            if (skip) { setCallOutcome('skipped'); navigateWithTrack('1C', 'ETAPA_CALL_SKIPPED'); }
            else { setCallOutcome('completed'); navigateWithTrack('1B', 'ETAPA_CALL_STARTED'); }
          }} userData={userData} preloadedAudioCtx={audioCtxRef.current} />}
          {currentExp === '1B' && <Experience1B onComplete={(refused) => {
            setCallOutcome(refused ? 'refused' : 'completed');
            navigateWithTrack('1C', refused ? 'ETAPA_CALL_REFUSED' : 'ETAPA_CALL_SUCCESS');
          }} />}
          {currentExp === '1C' && <Experience1C userName={userData.name} callOutcome={callOutcome} onComplete={() => navigateWithTrack('2-VSL', 'ETAPA_VSL_STARTED')} />}
          {currentExp === '2-VSL' && <Experience2VSL onComplete={handleQuizCompletion} />}
          {currentExp === 'DIAGNOSTICO' && <Diagnostico answers={quizAnswers} onComplete={() => navigateWithTrack('SALES', 'ETAPA_SALES_PAGE_VIEW')} />}
          {currentExp === 'SALES' && <SalesPage />}
        </div>
      )}
    </div>
  );
};

export default App;
