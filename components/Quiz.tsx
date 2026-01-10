
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { ChevronRight, BarChart3, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface QuizProps {
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

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

  const handleOptionSelect = () => {
    nextStep(400);
  };

  const renderProgress = () => {
    const totalSteps = QUESTIONS.length + 3; // Intro, Questions, Results, Finish
    const progress = (step / totalSteps) * 100;
    return (
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-100 z-[90]">
        <div 
          className="h-full bg-neutral-900 transition-all duration-700 ease-in-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-12">
      {renderProgress()}
      
      <div className={`w-full max-w-md space-y-8 transition-all duration-500 transform ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        
        {/* TELA 0 — ABERTURA */}
        {step === 0 && (
          <div className="space-y-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 text-white rounded-2xl shadow-xl mb-4">
              <BarChart3 size={32} />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold text-neutral-900 leading-tight">
                Diagnóstico de <span className="text-neutral-500">Condução</span>
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed font-light">
                Em 2 minutos, vamos identificar se você tem um time de vendas ou um balcão de informações.
              </p>
            </div>
            <div className="pt-8">
              <button 
                onClick={() => nextStep(100)}
                className="group w-full min-h-[64px] bg-neutral-900 text-white rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3"
              >
                <span>Começar análise gratuita</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-neutral-400 mt-6 uppercase tracking-widest font-bold">
                🔒 Dados protegidos pela D4 Kingdom
              </p>
            </div>
          </div>
        )}

        {/* PERGUNTAS DINÂMICAS */}
        {step >= 1 && step <= QUESTIONS.length && (
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="h-[2px] w-8 bg-neutral-900"></span>
                <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">
                  Fase {step} de {QUESTIONS.length}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 leading-snug">
                {QUESTIONS[step - 1].question}
              </h2>
              {QUESTIONS[step - 1].microcopy && (
                <p className="text-sm text-neutral-400 italic font-medium">
                  "{QUESTIONS[step - 1].microcopy}"
                </p>
              )}
            </div>
            <div className="space-y-3">
              {QUESTIONS[step - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={isPaused}
                  onClick={handleOptionSelect}
                  className="w-full p-5 text-left bg-white border border-neutral-200 rounded-2xl hover:border-neutral-900 hover:shadow-md transition-all text-neutral-700 font-medium active:bg-neutral-50 disabled:opacity-50 flex items-center justify-between group"
                >
                  <span className="pr-4">{opt}</span>
                  <div className="w-6 h-6 rounded-full border border-neutral-200 group-hover:border-neutral-900 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-neutral-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TELA RESULTADO / ANÁLISE */}
        {step === QUESTIONS.length + 1 && (
          <div className="space-y-8 text-center py-12">
            {!analysisComplete ? (
              <div className="space-y-6 animate-pulse">
                <div className="w-12 h-12 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h2 className="text-xl font-bold text-neutral-900">Cruzando dados operacionais...</h2>
                <div className="space-y-2 max-w-[200px] mx-auto">
                  <div className="h-2 bg-neutral-100 rounded"></div>
                  <div className="h-2 bg-neutral-100 rounded w-2/3 mx-auto"></div>
                </div>
                {setTimeout(() => setAnalysisComplete(true), 2500) && null}
              </div>
            ) : (
              <div className="space-y-8 animate-in zoom-in fade-in duration-700">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <ShieldAlert size={32} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-black text-neutral-900 uppercase italic tracking-tighter">Diagnóstico: Reativo</h2>
                  <p className="text-neutral-600 leading-relaxed">
                    Sua operação está no <span className="text-red-600 font-bold">Modo Garçom</span>. Você não conduz a venda, você apenas atende pedidos de quem já estava decidido a comprar.
                  </p>
                </div>
                <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 text-left space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-1 bg-red-500 rounded-full shrink-0"></div>
                    <p className="text-sm text-neutral-700"><strong>Perda de Margem:</strong> Clientes assumem o controle e forçam descontos.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-1 bg-red-500 rounded-full shrink-0"></div>
                    <p className="text-sm text-neutral-700"><strong>Vácuo de Follow-up:</strong> 70% dos seus leads morrem sem uma resposta definitiva.</p>
                  </div>
                </div>
                <button 
                  onClick={() => nextStep(100)}
                  className="w-full min-h-[64px] bg-neutral-900 text-white rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-all shadow-xl active:scale-95"
                >
                  Ver Solução Estruturada
                </button>
              </div>
            )}
          </div>
        )}

        {/* TELA FINAL */}
        {step === QUESTIONS.length + 2 && (
          <div className="space-y-8 text-center">
            <div className="p-10 bg-neutral-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl font-black leading-tight">O Fim da Sorte. <br/><span className="text-neutral-400">O Início da Condução.</span></h2>
                <p className="text-neutral-300 leading-relaxed font-light">
                  Vamos te mostrar como o framework D4 inverte essa lógica e coloca o lucro no seu comando.
                </p>
                <button 
                  onClick={onComplete}
                  className="w-full min-h-[64px] bg-white text-neutral-900 rounded-2xl font-black text-xl hover:bg-neutral-100 transition-all active:scale-95 shadow-lg"
                >
                  ACESSAR MECANISMO
                </button>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-medium uppercase tracking-[0.2em]">
              Próxima etapa: O Mecanismo D4 Seller
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Quiz;
