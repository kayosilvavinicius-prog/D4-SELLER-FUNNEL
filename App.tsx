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

const App: React.FC = () => {
  const [currentExp, setCurrentExp] = useState<Experience>('MENU');
  const [isFading, setIsFading] = useState(false);
  const [hasUnlockedAudio, setHasUnlockedAudio] = useState(false);
  const [showDevMenu, setShowDevMenu] = useState(false);
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [quizAnswers, setQuizAnswers] = useState<{ type: string, value: number }[]>([]);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAssetsReady, setIsAssetsReady] = useState(false);
  const [callOutcome, setCallOutcome] = useState<'completed' | 'refused' | 'skipped'>('completed');
  const [isPreloadingVideo, setIsPreloadingVideo] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const keyboardBufferRef = useRef<AudioBuffer | null>(null);
  const sentBufferRef = useRef<AudioBuffer | null>(null);
  const videoPreloadRef = useRef<HTMLVideoElement | null>(null);

  // --- GERADORES DE ÁUDIO SINTÉTICO ---
  
  // Gera um som de digitação (vários cliques curtos de ruído branco em 1s)
  const createKeyboardTypingBuffer = (ctx: AudioContext) => {
    const sampleRate = ctx.sampleRate;
    const duration = 1.0; // 1 segundo de amostra
    const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Acelerado: 10 cliques em intervalos de 0.1s (mais rápido)
    for (let i = 0; i < 10; i++) {
      const startTime = (i * 0.1) + (Math.random() * 0.03); // Intervalo menor + jitter menor
      const startSample = Math.floor(startTime * sampleRate);
      const clickDuration = 0.012; // 12ms de clique (mais seco/rápido)
      const clickSamples = Math.floor(clickDuration * sampleRate);
      
      for (let j = 0; j < clickSamples; j++) {
        if (startSample + j < data.length) {
          const envelope = Math.pow(1 - j / clickSamples, 3);
          // Ruído branco filtrado
          data[startSample + j] = (Math.random() * 2 - 1) * envelope * 0.35;
        }
      }
    }
    return buffer;
  };

  // Gera um som de "Mensagem Enviada" (Bloop harmônico ascendente)
  const createSentMessageBuffer = (ctx: AudioContext) => {
    const sampleRate = ctx.sampleRate;
    const duration = 0.18;
    const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < sampleRate * duration; i++) {
      const t = i / (sampleRate * duration);
      // Sweep de frequência: de 800Hz para 1400Hz
      const freq = 800 + 600 * t;
      const envelope = Math.pow(1 - t, 2);
      data[i] = Math.sin(2 * Math.PI * freq * (i / sampleRate)) * envelope * 0.3;
    }
    return buffer;
  };

  // Validação do formulário
  const isFormValid = 
    userData.name.trim().length > 2 && 
    userData.email.trim().includes('@') && 
    userData.phone.replace(/\D/g, '').length >= 10;

  useEffect(() => {
    if ((userData.name.length > 0 || userData.email.length > 0) && !isPreloadingVideo) {
      setIsPreloadingVideo(true);
      const video = document.createElement('video');
      video.src = VSL_VIDEO_URL;
      video.preload = 'auto';
      videoPreloadRef.current = video;
    }
  }, [userData.name, userData.email, isPreloadingVideo]);

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        setLoadingProgress(10);
        // Preload Imagem (Avatar)
        const img = new Image();
        img.src = EXECUTIVE_AVATAR;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
        setLoadingProgress(40);

        // Inicializar Contexto de Áudio
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
        setLoadingProgress(60);

        // Gerar áudios sintéticos (Instantâneo, sem rede!)
        keyboardBufferRef.current = createKeyboardTypingBuffer(ctx);
        setLoadingProgress(80);
        sentBufferRef.current = createSentMessageBuffer(ctx);
        
        setLoadingProgress(100);
        setTimeout(() => setIsAssetsReady(true), 500);
      } catch (error) {
        console.error("Erro na inicialização de assets:", error);
        setIsAssetsReady(true);
        setLoadingProgress(100);
      }
    };
    preloadAssets();
  }, []);

  const navigate = (next: Experience) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentExp(next);
      setIsFading(false);
      window.scrollTo(0, 0);
    }, 400);
  };

  const jumpTo = (next: Experience) => {
    setUserData({
      name: 'Lead de Teste D4',
      email: 'teste@d4kingdom.com',
      phone: '(11) 98888-7777'
    });
    
    setQuizAnswers([
      { type: 'situation', value: 5 },
      { type: 'problem', value: 4 },
      { type: 'implication', value: 2 },
      { type: 'need', value: 9 },
      { type: 'fit', value: 8 }
    ]);

    if (audioCtxRef.current) audioCtxRef.current.resume();
    
    setHasUnlockedAudio(true);
    setShowDevMenu(false);
    navigate(next);
  };

  const handleStartExperience = () => {
    if (!isFormValid) return;
    
    if (audioCtxRef.current) {
      audioCtxRef.current.resume().then(() => {
        setHasUnlockedAudio(true);
        navigate('1A');
      });
    } else {
      setHasUnlockedAudio(true);
      navigate('1A');
    }
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  return (
    <div className={`min-h-screen bg-transparent transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'} overflow-x-hidden max-w-[100vw]`}>
      <button 
        onClick={() => setShowDevMenu(true)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white transition-all transform hover:scale-110 active:scale-90"
      >
        <Bug size={24} />
      </button>

      {showDevMenu && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-neutral-900 w-full max-w-sm rounded-[3rem] p-8 border border-white/10 shadow-2xl space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-blue-500"><Bug size={18} /><h3 className="font-black uppercase tracking-[0.2em] text-[10px]">Jump to Phase</h3></div>
              <button onClick={() => setShowDevMenu(false)} className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: '0. Menu de Estágios', target: 'MENU' },
                { label: '1. WhatsApp (Start)', target: '1A' },
                { label: '2. Ligação (iOS)', target: '1B' },
                { label: '3. CTA Vídeo', target: '1C' },
                { label: '4. VSL + Quiz SPIN', target: '2-VSL' },
                { label: '5. Diagnóstico 360', target: 'DIAGNOSTICO' },
                { label: '6. Página de Vendas', target: 'SALES' },
              ].map((item) => (
                <button 
                  key={item.target}
                  onClick={() => jumpTo(item.target as Experience)}
                  className="w-full text-left p-5 rounded-2xl bg-white/5 hover:bg-blue-600 text-white font-black text-xs transition-all flex justify-between items-center group border border-white/5 uppercase tracking-widest"
                >
                  {item.label}<ChevronRight size={16} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!hasUnlockedAudio && currentExp === 'MENU' ? (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-white font-sans overflow-y-auto relative z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
          <div className="z-10 text-center space-y-6 max-w-sm w-full py-10">
            <div className="relative inline-block mb-2">
              <div className={`w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30 ${!isAssetsReady ? 'animate-pulse' : ''}`}>
                {!isAssetsReady ? <Loader2 size={32} className="text-blue-500 animate-spin" /> : <Cpu size={32} className="text-blue-500" />}
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">D4 <span className="text-blue-500">Kingdom</span></h1>
              <p className="text-neutral-500 text-[10px] font-bold tracking-[0.3em] uppercase">Acesso ao Mecanismo de Condução de Vendas Inteligente - D4 SELLER</p>
            </div>
            <div className="space-y-4 bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                <input type="text" placeholder="Nome Completo" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-neutral-600" />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                <input type="email" placeholder="Seu melhor E-mail" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-neutral-600" />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                <input type="tel" placeholder="WhatsApp (DDD)" value={userData.phone} onChange={(e) => setUserData({...userData, phone: formatPhone(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-neutral-600" />
              </div>
              <div className="pt-2">
                {!isAssetsReady ? (
                  <div className="space-y-2 text-center">
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${loadingProgress}%` }} /></div>
                    <span className="text-[9px] text-neutral-500 uppercase font-black tracking-widest">Sincronizando... {loadingProgress}%</span>
                  </div>
                ) : (
                  <button 
                    onClick={handleStartExperience} 
                    disabled={!isFormValid}
                    className={`group w-full py-4 rounded-xl font-black text-sm transition-all flex items-center justify-center space-x-2 shadow-xl active:scale-95 ${
                      isFormValid 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/10 animate-pulse-gentle' 
                        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <span>VER O MECANISMO EM AÇÃO</span>
                    <Zap size={16} className="fill-current" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="z-10 relative h-full">
          {currentExp === 'MENU' && <Menu onNavigate={jumpTo} />}
          {currentExp === '1A' && (<Experience1A onComplete={(name, skipCall) => {
            if (skipCall) {
              setCallOutcome('skipped');
              navigate('1C');
            } else {
              setCallOutcome('completed');
              navigate('1B');
            }
          }} userData={userData} preloadedAudioCtx={audioCtxRef.current} preloadedKeyboardBuffer={keyboardBufferRef.current} preloadedSentBuffer={sentBufferRef.current} />)}
          {currentExp === '1B' && (<Experience1B onComplete={(refused) => {
            if (refused) setCallOutcome('refused');
            navigate('1C');
          }} />)}
          {currentExp === '1C' && (<Experience1C userName={userData.name} callOutcome={callOutcome} onComplete={() => navigate('2-VSL')} />)}
          {currentExp === '2-VSL' && (<Experience2VSL onComplete={(answers) => { setQuizAnswers(answers); navigate('DIAGNOSTICO'); }} />)}
          {currentExp === 'DIAGNOSTICO' && (<Diagnostico answers={quizAnswers} onComplete={() => navigate('SALES')} />)}
          {currentExp === 'SALES' && <SalesPage />}
        </div>
      )}
    </div>
  );
};

export default App;