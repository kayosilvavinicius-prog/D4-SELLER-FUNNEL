
import React, { useState, useEffect, useRef } from 'react';
import { VSL_STEPS, EXECUTIVE_AVATAR } from '../constants';
import { 
  Search, 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  UserCircle, 
  MoreHorizontal, 
  Globe, 
  ThumbsUp, 
  Repeat, 
  Send, 
  MessageCircle,
  PlayCircle
} from 'lucide-react';

interface Experience2VSLProps {
  onComplete: (answers: { type: string, value: number }[]) => void;
}

const Experience2VSL: React.FC<Experience2VSLProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, { type: string, score: number }>>({});
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const VIDEO_SRC = "https://res.cloudinary.com/dafhibb8s/video/upload/WhatsApp_Video_2026-01-11_at_03.41.56_e51evy.mp4";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(err => console.error("Could not play video", err));
        }
      });
    }

    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video || isFinishing) return;

      const time = video.currentTime;
      setCurrentTime(time);

      VSL_STEPS.forEach((step) => {
        if (Math.abs(time - step.timestamp) < 0.4 && !answers[step.id]) {
          if (currentQuestionId !== step.id) {
            setCurrentQuestionId(step.id);
            setIsOverlayVisible(true);
          }
        }
      });

      if (video.duration > 0 && time >= video.duration - 1.0) {
        setIsFinishing(true);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [answers, currentQuestionId, isFinishing]);

  const handleAnswer = (score: number, type: string) => {
    if (!currentQuestionId) return;
    setAnswers(prev => ({ ...prev, [currentQuestionId]: { type, score } }));
    setIsOverlayVisible(false);
    setTimeout(() => setCurrentQuestionId(null), 800);
  };

  const handleFinalStep = () => {
    const finalAnswers = (Object.values(answers) as { type: string, score: number }[]).map(a => ({ type: a.type, value: a.score }));
    const missing = VSL_STEPS.filter(s => !answers[s.id]).map(s => ({ type: s.type, value: 0 }));
    onComplete([...finalAnswers, ...missing]);
  };

  const activeQuestion = VSL_STEPS.find(q => q.id === currentQuestionId);
  const progressPercentage = videoDuration ? (currentTime / videoDuration) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#f3f2ef] font-sans text-[#1e1e1e] overflow-x-hidden">
      {/* 1️⃣ LINKEDIN HEADER SIMULATION */}
      <header className="sticky top-0 z-[100] bg-white border-b border-[#e8e8e8] shadow-sm h-16 flex items-center px-4 sm:px-12 justify-between">
        <div className="flex items-center space-x-2 flex-1 max-w-[400px]">
          <div className="bg-[#0A66C2] p-1 rounded-sm text-white font-black text-xl flex items-center justify-center w-8 h-8">in</div>
          <div className="hidden sm:flex items-center bg-[#edf3f8] px-3 py-1.5 rounded-md flex-1 ml-2">
            <Search size={16} className="text-[#666]" />
            <input type="text" placeholder="Pesquisar" className="bg-transparent border-none outline-none text-sm ml-2 w-full text-[#1e1e1e]" disabled />
          </div>
          <div className="sm:hidden text-[#666]"><Search size={22} /></div>
        </div>
        <div className="flex items-center space-x-6 sm:space-x-8 text-[#666]">
          <div className="hidden md:flex flex-col items-center cursor-not-allowed opacity-40"><Home size={22} /><span className="text-[10px] mt-1">Início</span></div>
          <div className="hidden md:flex flex-col items-center cursor-not-allowed opacity-40"><Users size={22} /><span className="text-[10px] mt-1">Minha rede</span></div>
          <div className="flex flex-col items-center text-[#1e1e1e] border-b-2 border-[#1e1e1e] pb-1"><Briefcase size={22} /><span className="text-[10px] mt-1">Vagas</span></div>
          <div className="flex flex-col items-center cursor-not-allowed opacity-40"><MessageSquare size={22} /><span className="text-[10px] mt-1">Mensagens</span></div>
          <div className="flex flex-col items-center cursor-not-allowed opacity-40"><Bell size={22} /><span className="text-[10px] mt-1">Notificações</span></div>
          <div className="flex flex-col items-center border-l border-[#e8e8e8] pl-6"><UserCircle size={24} /><span className="text-[10px] mt-1">Eu</span></div>
        </div>
      </header>

      {/* 2️⃣ FEED WRAPPER */}
      <main className="max-w-[680px] mx-auto pt-6 px-0 sm:px-4 pb-20">
        
        {/* 3️⃣ POST CONTAINER */}
        <div className="bg-white rounded-none sm:rounded-xl shadow-md border border-black/5 overflow-hidden">
          
          {/* Post Header */}
          <div className="p-4 flex items-start justify-between">
            <div className="flex space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-black/5">
                <img src={EXECUTIVE_AVATAR} alt="D4 Kingdom" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h3 className="text-sm font-bold hover:text-[#0A66C2] hover:underline cursor-pointer">D4 Kingdom</h3>
                  <span className="text-xs text-[#666] font-normal">• 2º</span>
                </div>
                <p className="text-xs text-[#666] leading-tight">Empreendendo o futuro das vendas digitais</p>
                <div className="flex items-center space-x-1 text-[#666] mt-0.5">
                  <span className="text-xs">1 h</span>
                  <span className="text-[8px]">•</span>
                  <Globe size={12} />
                </div>
              </div>
            </div>
            <button className="text-[#666] p-1 rounded-full hover:bg-black/5"><MoreHorizontal size={20} /></button>
          </div>

          {/* Post Text */}
          <div className="px-4 pb-3 space-y-1">
            <p className="text-sm leading-relaxed">
              Você já imaginou um vendedor digital que conduz decisões — não respostas automáticas?
            </p>
            <p className="text-sm leading-relaxed">
              Foi exatamente isso que criamos.
            </p>
            <p className="text-sm leading-relaxed">
              O D4 Seller é o primeiro sistema de conversas comerciais com lógica de vendas reais, não promessas.
            </p>
          </div>

          {/* 4️⃣ VÍDEO INTERATIVO (DENTRO DO POST) */}
          <div className="relative aspect-square bg-black border-y border-black/5">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              preload="auto"
              onLoadedMetadata={() => setVideoDuration(videoRef.current?.duration || 0)}
            />

            {/* Questions Floating Overlay (Top Half) */}
            {activeQuestion && isOverlayVisible && (
              <div className="absolute inset-x-4 top-4 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#0A66C2] uppercase tracking-[0.2em]">Diagnóstico de Condução</span>
                      <div className="h-1 w-12 bg-[#0A66C2]/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0A66C2] transition-all" style={{ width: `${(currentQuestionId / VSL_STEPS.length) * 100}%` }}></div>
                      </div>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold leading-tight text-[#1e1e1e]">
                      {activeQuestion.question}
                    </h2>
                    <div className="grid grid-cols-1 gap-2">
                      {activeQuestion.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(opt.score, activeQuestion.type)}
                          className="w-full py-2.5 px-3 bg-white border border-[#e8e8e8] rounded-lg text-[#1e1e1e] text-xs hover:border-[#0A66C2] hover:bg-[#edf3f8] transition-all font-medium text-left flex justify-between items-center group active:scale-98"
                        >
                          <span className="flex-1 pr-3 leading-tight">{opt.text}</span>
                          <div className="w-3 h-3 rounded-full border border-[#ccc] group-hover:border-[#0A66C2] shrink-0"></div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* End of Video CTA */}
            {isFinishing && (
              <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-700">
                <div className="w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-2xl scale-110">
                  <div className="w-16 h-16 bg-[#0A66C2] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
                    <ThumbsUp size={32} />
                  </div>
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none mb-3">Condução Finalizada!</h3>
                  <p className="text-[#666] text-sm leading-relaxed mb-6">
                    Mecanismo processado com sucesso. Clique abaixo para gerar seu diagnóstico completo agora.
                  </p>
                  <button 
                    onClick={handleFinalStep}
                    className="w-full bg-[#0A66C2] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-tighter shadow-xl hover:bg-[#004182] transition-all active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <span>QUERO ACESSAR A SOLUÇÃO</span>
                  </button>
                </div>
              </div>
            )}

            {/* Video Progress Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-[60]">
              <div
                className="h-full bg-[#0A66C2] shadow-[0_0_10px_rgba(10,102,194,0.8)] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* 5️⃣ INTERACTION SECTION */}
          <div className="px-4 py-2 flex flex-col">
             <div className="flex items-center justify-between py-2 border-b border-[#f0f0f0] mb-1">
                <div className="flex items-center space-x-1">
                  <div className="flex -space-x-1">
                    <div className="bg-[#0A66C2] rounded-full p-0.5 border border-white text-[8px] text-white"><ThumbsUp size={8} fill="currentColor" /></div>
                    <div className="bg-[#df704d] rounded-full p-0.5 border border-white text-[8px] text-white"><MessageCircle size={8} fill="currentColor" /></div>
                  </div>
                  <span className="text-[11px] text-[#666]">D4 Kingdom e outras 127 pessoas</span>
                </div>
                <div className="text-[11px] text-[#666]">
                  <span>42 comentários</span>
                  <span className="mx-1">•</span>
                  <span>15 compartilhamentos</span>
                </div>
             </div>
             
             <div className="flex items-center justify-between text-[#666] font-semibold py-1">
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-md hover:bg-black/5 transition-colors"><ThumbsUp size={20} /> <span className="text-xs">Gostei</span></button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-md hover:bg-black/5 transition-colors"><MessageCircle size={20} /> <span className="text-xs">Comentar</span></button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-md hover:bg-black/5 transition-colors"><Repeat size={20} /> <span className="text-xs">Compartilhar</span></button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-md hover:bg-black/5 transition-colors"><Send size={20} /> <span className="text-xs">Enviar</span></button>
             </div>
          </div>

          {/* 6️⃣ SIMULATED COMMENTS */}
          <div className="bg-[#f9fafb] p-4 space-y-4">
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-neutral-300 shrink-0 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=1" alt="User 1" />
              </div>
              <div className="flex-1">
                <div className="bg-white p-3 rounded-lg border border-[#e8e8e8] shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold">João M.</h4>
                      <p className="text-[10px] text-[#666]">Diretor Comercial na TechFlow</p>
                    </div>
                    <span className="text-[10px] text-[#666]">45 min</span>
                  </div>
                  <p className="text-xs mt-2 text-[#1e1e1e]">Isso é o futuro das vendas! Impressionante como o framework SPIN está embutido na lógica do bot.</p>
                </div>
                <div className="flex items-center space-x-3 mt-1 ml-1">
                   <button className="text-[10px] font-bold text-[#666] hover:text-[#0A66C2]">Gostei</button>
                   <span className="text-[#ccc] text-[10px]">|</span>
                   <button className="text-[10px] font-bold text-[#666] hover:text-[#0A66C2]">Responder</button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-neutral-300 shrink-0 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=2" alt="User 2" />
              </div>
              <div className="flex-1">
                <div className="bg-white p-3 rounded-lg border border-[#e8e8e8] shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold">Aline S.</h4>
                      <p className="text-[10px] text-[#666]">CEO @ GlowUp Digital</p>
                    </div>
                    <span className="text-[10px] text-[#666]">12 min</span>
                  </div>
                  <p className="text-xs mt-2 text-[#1e1e1e]">Usei o D4 Seller no meu lançamento e o resultado foi absurdo! O follow-up ativo deles não deixa ninguém esfriar.</p>
                </div>
                <div className="flex items-center space-x-3 mt-1 ml-1">
                   <button className="text-[10px] font-bold text-[#666] hover:text-[#0A66C2]">Gostei</button>
                   <span className="text-[#ccc] text-[10px]">|</span>
                   <button className="text-[10px] font-bold text-[#666] hover:text-[#0A66C2]">Responder</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post Footer Decor */}
        <div className="mt-4 text-center opacity-30 select-none">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#666]">Linkedin Experience Simulation • D4 Kingdom</p>
        </div>
      </main>
    </div>
  );
};

export default Experience2VSL;
