
import React, { useState, useEffect, useRef } from 'react';
import Experience1A from './components/Experience1A';
import Experience1B from './components/Experience1B';
import Experience1C from './components/Experience1C';
import Experience2VSL from './components/Experience2VSL';
import Diagnostico from './components/Diagnostico';
import SalesPage from './components/SalesPage';
import { KEYBOARD_SOUND_URL, SENT_SOUND_URL } from './constants';
import { Loader2 } from 'lucide-react';
import { Experience as ExperienceType } from './types';

// URL do Webhook Atualizada conforme fornecido pelo usuário
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxQau-SChwXppRxOgxYKP87Rr52lKekDUikue5sssEtzhXFwknqxfEvYSr7ioHmn_p4bA/exec"; 
const META_TEST_CODE = "TEST61117"; 

type AppExperience = ExperienceType;

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
    // Payload simplificado para garantir a ordem correta na planilha via appendRow
    const payload = { 
      data_hora: new Date().toLocaleString('pt-BR'),
      etapa: eventName,
      nome: userData.name,
      email: userData.email,
      whatsapp: userData.phone,
      ...utms, 
      ...extraData 
    };

    if (WEBHOOK_URL) {
      // Envio como text/plain para evitar erros de CORS no Google Apps Script
      fetch(WEBHOOK_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' }, 
        body: JSON.stringify(payload) 
      }).catch((err) => console.error("Webhook Error:", err));
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const fbq = (window as any).fbq;
      const options = META_TEST_CODE ? { test_event_code: META_TEST_CODE } : {};

      if (eventName === 'CADASTRO_INICIAL') {
        fbq('track', 'Lead', { content_name: 'Cadastro Inicial', email: userData.email, phone: userData.phone }, options);
      } else if (eventName === 'ETAPA_SALES_PAGE_VIEW') {
        fbq('track', 'ViewContent', { content_name: 'Página de Vendas' }, options);
      } else if (eventName === 'CLIQUE_BOTAO_COMPRA') {
        const isDiagnostico = extraData.plano === 'D4_SELLER_DIAGNOSTICO_147';
        fbq('track', 'InitiateCheckout', {
          content_name: isDiagnostico ? 'D4 Seller + Diagnóstico' : 'D4 Seller Mensal',
          value: isDiagnostico ? 147.00 : 94.00,
          currency: 'BRL'
        }, options);
      } else {
        fbq('trackCustom', eventName, { email: userData.email }, options);
      }
    }
  };

  const unlockAudioAndStart = async () => {
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    await ctx.resume();
    audioCtxRef.current = ctx;
    await preloadAudios(ctx);
    setHasUnlockedAudio(true);
    navigateTo('1A');
  };

  const handleStartExperience = async () => {
    if (!userData.name || !userData.email || !userData.phone) {
      return;
    }
    setIsSubmitting(true);
    // Registro imediato na planilha
    await trackMilestone('CADASTRO_INICIAL');
    await unlockAudioAndStart();
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
          <div className="z-10 text-center space-y-8 max-w-sm w-full">
            <div className="space-y-0 flex flex-col items-center">
              <h1 className="text-5xl font-black uppercase italic tracking-tighter">D4 <span className="text-[#66FCF1]">Kingdom</span></h1>
              <p className="text-[10px] font-bold text-[#66FCF1] uppercase tracking-[0.4em] opacity-80 mt-1">Soluções Inteligentes em Vendas</p>
            </div>
            
            <div className="space-y-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl">
              <input 
                type="text" 
                placeholder="Nome Completo" 
                value={userData.name} 
                onChange={e => setUserData({...userData, name: e.target.value})} 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1]" 
              />
              <input 
                type="email" 
                placeholder="E-mail" 
                value={userData.email} 
                onChange={e => setUserData({...userData, email: e.target.value})} 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1]" 
              />
              <input 
                type="tel" 
                placeholder="WhatsApp" 
                value={userData.phone} 
                onChange={e => setUserData({...userData, phone: e.target.value})} 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm outline-none focus:border-[#66FCF1]" 
              />
              
              <button 
                onClick={handleStartExperience} 
                disabled={isSubmitting || !isFormValid} 
                className={`w-full py-5 rounded-xl font-black text-sm transition-all duration-500 flex items-center justify-center ${
                  isFormValid && !isSubmitting
                    ? 'bg-[#66FCF1] text-[#0B0C10] shadow-glow-cyan active:scale-95' 
                    : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'
                }`}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "INICIAR EXPERIÊNCIA"}
              </button>
            </div>
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Ambiente Seguro e Criptografado</p>
          </div>
        </div>
      ) : (
        <div className="h-[100dvh] relative">
          {currentExp === '1A' && (
            <Experience1A 
              onComplete={(n, skip) => {
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
                navigateTo('DIAGNOSTICO', 'ETAPA_QUIZ_VSL_CONCLUIDO');
              }} 
            />
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
