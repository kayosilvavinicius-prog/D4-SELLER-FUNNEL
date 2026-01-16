
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { ChevronRight, BarChart3, ShieldAlert, CheckCircle2, Target, Zap, ArrowRight } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: { type: string, value: number }[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [responses, setResponses] = useState<Record<number, number>>({});

  const nextStep = (delay = 0) => {
    if (isPaused) return;
    setIsPaused(true);
    setIsFading(true);
    
    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsFading(false);
      setIsPaused(false);
    }, 300 + delay);
  };

  const handleOptionSelect = (idx: number) => {
    const score = 10 - (idx * 2.5); // Lógica simples de score para o diagnóstico
    setResponses(prev => ({ ...prev, [step]: score }));
    nextStep(400);
  };

  const finishQuiz = () => {
    // Mapeia as respostas para o formato esperado pelo Diagnostico
    const formattedAnswers = [
      { type: 'situation', value: responses[1] || 5 },
      { type: 'problem', value: responses[2] || 5 },
      { type: 'implication', value: responses[1] || 5 }, // Reutilizando para simulação
      { type: 'need', value: responses[2] || 5 },
      { type: 'fit', value: 8 } // Valor padrão de fit para o quiz
    ];
    onComplete(formattedAnswers);
  };

  const renderProgress = () => {
    const totalSteps = QUESTIONS.length + 1;
    const progress = (step / totalSteps) * 100;
    return (
      <div className="fixed top-0 left-0 w-full h-1.5 bg-white/5 z-[100]">
        <div 
          className="h-full bg-[#66FCF1] shadow-[0_0_15px_#66FCF1] transition-all duration-700 ease-in-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0C10] px-6 py-12 text-white font-sans overflow-hidden">
      {renderProgress()}
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#66FCF1]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className={`w-full max-w-lg space-y-8 transition-all duration-500 transform ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} relative z-10`}>
        
        {/* TELA 0 — ABERTURA */}
        {step === 0 && (
          <div className="space-y-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#66FCF1]/10 text-[#66FCF1] rounded-3xl border border-[#66FCF1]/20 shadow-glow-cyan mb-4 animate-float">
              <BarChart3 size={40} />
            </div>
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-[#66FCF1]/10 border border-[#66FCF1]/20 rounded-full">
                <span className="text-[10px] font-black text-[#66FCF1] uppercase tracking-[0.3em]">Protocolo de Auditoria D4</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                Diagnóstico de <br/><span className="text-[#66FCF1]">Condução Comercial</span>
              </h1>
              <p className="text-lg text-[#C5C6C7] leading-relaxed font-light">
                Descubra em 60 segundos se o seu time está <span className="text-white font-bold">vendendo</span> ou apenas <span className="text-white font-bold">atendendo</span>.
              </p>
            </div>
            <div className="pt-8">
              <button 
                onClick={() => nextStep(100)}
                className="group w-full min-h-[72px] bg-[#66FCF1] text-[#0B0C10] rounded-2xl font-black text-xl hover:scale-[1.02] transition-all shadow-glow-cyan active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-tighter"
              >
                <span>INICIAR ANÁLISE</span>
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-white/20 mt-8 uppercase tracking-[0.4em] font-black">
                🔒 Mecanismo de Proteção D4 Kingdom Ativo
              </p>
            </div>
          </div>
        )}

        {/* PERGUNTAS DINÂMICAS */}
        {step >= 1 && step <= QUESTIONS.length && (
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-[2px] w-12 bg-[#66FCF1] shadow-[0_0_10px_#66FCF1]"></div>
                <span className="text-[11px] font-black text-[#66FCF1] uppercase tracking-[0.3em]">
                  Módulo {step} de {QUESTIONS.length}
                </span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter italic uppercase leading-tight">
                {QUESTIONS[step - 1].question}
              </h2>
            </div>
            <div className="space-y-4">
              {QUESTIONS[step - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={isPaused}
                  onClick={() => handleOptionSelect(idx)}
                  className="w-full p-6 text-left bg-white/5 border border-white/10 rounded-2xl hover:border-[#66FCF1]/50 hover:bg-[#66FCF1]/5 transition-all text-white font-medium active:scale-98 disabled:opacity-50 flex items-center justify-between group shadow-xl"
                >
                  <span className="pr-4 text-lg">{opt}</span>
                  <div className="w-8 h-8 rounded-xl border border-white/10 group-hover:border-[#66FCF1] flex items-center justify-center shrink-0 transition-colors bg-black/40">
                    <div className="w-2.5 h-2.5 bg-[#66FCF1] rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_10px_#66FCF1] transition-all"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TELA RESULTADO / PROCESSAMENTO */}
        {step === QUESTIONS.length + 1 && (
          <div className="space-y-10 text-center py-12">
            {!analysisComplete ? (
              <div className="space-y-8 animate-in fade-in duration-700">
                <div className="relative w-24 h-24 mx-auto">
                   <div className="absolute inset-0 border-4 border-[#66FCF1]/10 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-[#66FCF1] border-t-transparent rounded-full animate-spin shadow-glow-cyan"></div>
                   <div className="absolute inset-0 flex items-center justify-center text-[#66FCF1]">
                     <Zap size={32} />
                   </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Cruzando Variáveis</h2>
                  <p className="text-[#C5C6C7] text-sm uppercase tracking-widest font-light">Detectando gargalos na sua condução...</p>
                </div>
                {setTimeout(() => setAnalysisComplete(true), 2500) && null}
              </div>
            ) : (
              <div className="space-y-10 animate-in zoom-in fade-in duration-1000">
                <div className="w-20 h-20 bg-[#66FCF1]/10 text-[#66FCF1] rounded-[2rem] flex items-center justify-center mx-auto shadow-glow-cyan border border-[#66FCF1]/20">
                  <ShieldAlert size={40} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Análise Concluída</h2>
                  <p className="text-[#C5C6C7] leading-relaxed text-lg font-light">
                    Detectamos inconsistências críticas no seu <span className="text-[#66FCF1] font-bold">Mecanismo de Escala</span>. Seu diagnóstico completo está pronto.
                  </p>
                </div>
                
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 text-left space-y-5 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Target size={80} /></div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 mt-2 bg-[#66FCF1] rounded-full shadow-[0_0_8px_#66FCF1] shrink-0"></div>
                    <p className="text-sm text-[#C5C6C7] leading-relaxed italic"><strong>Vazamento de Leads:</strong> Seu processo atual permite que 40% dos interessados esfriem no primeiro contato.</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 mt-2 bg-[#66FCF1] rounded-full shadow-[0_0_8px_#66FCF1] shrink-0"></div>
                    <p className="text-sm text-[#C5C6C7] leading-relaxed italic"><strong>Inversão de Comando:</strong> O cliente está conduzindo a negociação através de perguntas sobre preço.</p>
                  </div>
                </div>

                <button 
                  onClick={finishQuiz}
                  className="group w-full min-h-[72px] bg-[#66FCF1] text-[#0B0C10] rounded-2xl font-black text-xl hover:scale-[1.02] transition-all shadow-glow-cyan active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-tighter"
                >
                  <span>VER MEU SCORE FINAL</span>
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Quiz;
