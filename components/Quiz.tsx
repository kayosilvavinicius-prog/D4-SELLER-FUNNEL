
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { ChevronRight, BarChart3, ShieldAlert, CheckCircle2, Target, Zap, ArrowRight, Info, HelpCircle } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: { type: string, value: number }[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
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
    const score = 10 - (idx * 2.5); 
    setResponses(prev => ({ ...prev, [step]: score }));
    nextStep(400);
  };

  const finishQuiz = () => {
    const formattedAnswers = [
      { type: 'situation', value: responses[1] || 5 },
      { type: 'problem', value: responses[2] || 5 },
      { type: 'implication', value: responses[3] || 5 },
      { type: 'need', value: responses[4] || 5 },
      { type: 'fit', value: 8 }
    ];
    onComplete(formattedAnswers);
  };

  const diagnosticQuestions = [
    {
      type: 'situation',
      question: "Como você descreveria seu processo atual de vendas?",
      options: [
        "Processo reativo: espero o cliente pedir.",
        "Processo ativo: eu conduzo a conversa.",
        "Processo misto: depende do vendedor.",
        "Não tenho um processo definido."
      ]
    },
    {
      type: 'problem',
      question: "Qual o seu principal gargalo entre o lead e a venda?",
      options: [
        "Lead esfria e não responde mais.",
        "Time não sabe contornar objeções.",
        "Demora muito para o primeiro contato.",
        "Falta de organização e esquecimento."
      ]
    },
    {
      type: 'implication',
      question: "Se nada mudar hoje, como estará seu faturamento em 6 meses?",
      options: [
        "Estagnado ou caindo.",
        "Crescendo, mas com muita dificuldade.",
        "Dependendo de indicações incertas.",
        "Não tenho previsibilidade nenhuma."
      ]
    },
    {
      type: 'need',
      question: "Quanto você estaria disposto a investir para automatizar sua condução?",
      options: [
        "Estou pronto para investir agora.",
        "Preciso de provas de resultado primeiro.",
        "Estou buscando a solução mais barata.",
        "Ainda não sei se preciso de automação."
      ]
    }
  ];

  const renderProgress = () => {
    const totalSteps = diagnosticQuestions.length + 1;
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
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#66FCF1]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className={`w-full max-w-lg space-y-8 transition-all duration-500 transform ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} relative z-10`}>
        
        {step === 0 && (
          <div className="space-y-10 text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#66FCF1]/20 blur-2xl rounded-full animate-pulse"></div>
              <div className="relative w-20 h-20 bg-[#66FCF1]/10 text-[#66FCF1] rounded-3xl border border-[#66FCF1]/20 shadow-glow-cyan flex items-center justify-center animate-float">
                <BarChart3 size={40} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-[#66FCF1]/10 border border-[#66FCF1]/20 rounded-full">
                <span className="text-[10px] font-black text-[#66FCF1] uppercase tracking-[0.3em]">Protocolo D4 Kingdom</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                Diagnóstico de <br/><span className="text-[#66FCF1]">Condução Comercial</span>
              </h1>
              <p className="text-lg text-[#C5C6C7] leading-relaxed font-light">
                Mapeie os gargalos da sua operação e descubra seu <span className="text-white font-bold">Score de Conversão</span> em 60 segundos.
              </p>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => nextStep(100)}
                className="group w-full min-h-[72px] bg-[#66FCF1] text-[#0B0C10] rounded-2xl font-black text-xl hover:scale-[1.02] transition-all shadow-glow-cyan active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-tighter"
              >
                <span>INICIAR AUDITORIA</span>
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="mt-8 flex items-center justify-center space-x-3 text-white/20 text-[10px] uppercase tracking-[0.4em] font-black">
                <div className="w-1 h-1 bg-current rounded-full"></div>
                <span>Análise de 27 Variáveis Ativa</span>
                <div className="w-1 h-1 bg-current rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {step >= 1 && step <= diagnosticQuestions.length && (
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-[2px] w-12 bg-[#66FCF1] shadow-[0_0_10px_#66FCF1]"></div>
                <span className="text-[11px] font-black text-[#66FCF1] uppercase tracking-[0.3em]">
                  Módulo {step} de {diagnosticQuestions.length}
                </span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter italic uppercase leading-tight">
                {diagnosticQuestions[step - 1].question}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {diagnosticQuestions[step - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={isPaused}
                  onClick={() => handleOptionSelect(idx)}
                  className="w-full p-6 text-left bg-white/5 border border-white/10 rounded-2xl hover:border-[#66FCF1]/50 hover:bg-[#66FCF1]/5 transition-all text-white font-medium active:scale-98 disabled:opacity-50 flex items-center justify-between group shadow-xl"
                >
                  <span className="pr-4 text-lg font-bold italic uppercase tracking-tighter">{opt}</span>
                  <div className="w-8 h-8 rounded-xl border border-white/10 group-hover:border-[#66FCF1] flex items-center justify-center shrink-0 transition-colors bg-black/40">
                    <div className="w-2.5 h-2.5 bg-[#66FCF1] rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_10px_#66FCF1] transition-all"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === diagnosticQuestions.length + 1 && (
          <div className="space-y-10 text-center py-12">
            <div className="space-y-8 animate-in fade-in zoom-in duration-1000">
                <div className="w-20 h-20 bg-[#66FCF1]/10 text-[#66FCF1] rounded-[2rem] flex items-center justify-center mx-auto shadow-glow-cyan border border-[#66FCF1]/20">
                  <ShieldAlert size={40} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Auditoria Concluída</h2>
                  <p className="text-[#C5C6C7] leading-relaxed text-lg font-light">
                    O mecanismo processou suas respostas. Clique abaixo para gerar seu <span className="text-[#66FCF1] font-bold uppercase tracking-tighter">Diagnóstico de Condução</span>.
                  </p>
                </div>
                
                <div className="bg-[#1F2833] p-8 rounded-[2.5rem] border border-[#66FCF1]/20 text-left space-y-6 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Target size={80} /></div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-[#66FCF1]">
                      <Zap size={18} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Insights Detectados</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-4">
                        <div className="w-1.5 h-1.5 mt-2 bg-[#66FCF1] rounded-full shadow-[0_0_8px_#66FCF1] shrink-0"></div>
                        <p className="text-xs text-[#C5C6C7] leading-relaxed italic">Identificamos falhas de condução que podem estar reduzindo sua conversão em até 40%.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={finishQuiz}
                  className="group w-full min-h-[72px] bg-[#66FCF1] text-[#0B0C10] rounded-2xl font-black text-xl hover:scale-[1.02] transition-all shadow-glow-cyan active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-tighter"
                >
                  <span>GERAR DIAGNÓSTICO</span>
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Quiz;
