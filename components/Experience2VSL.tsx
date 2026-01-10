
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Maximize, Settings, SkipForward, RotateCcw, AlertCircle, TrendingUp } from 'lucide-react';
import { VSL_STEPS } from '../constants';

const TOTAL_DURATION = 60;

const Experience2VSL: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
  const [viewedQuestions, setViewedQuestions] = useState<Set<number>>(new Set());
  const [isFinished, setIsFinished] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying && !isFinished) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const nextTime = prev + 1;
          const question = VSL_STEPS.find(
            (q) => q.timestamp === nextTime && !viewedQuestions.has(q.id)
          );

          if (question) {
            setIsPlaying(false);
            setActiveQuestionId(question.id);
            return nextTime;
          }

          if (nextTime >= TOTAL_DURATION) {
            setIsFinished(true);
            setIsPlaying(false);
            return TOTAL_DURATION;
          }

          return nextTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isFinished, viewedQuestions]);

  const handleAnswer = (next: number | string, currentId: number) => {
    setViewedQuestions(prev => new Set([...prev, currentId]));
    setActiveQuestionId(null);
    if (next === 'FINISH') {
      setIsFinished(true);
      setCurrentTime(TOTAL_DURATION);
    } else {
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / TOTAL_DURATION) * 100;
  const activeQuestion = VSL_STEPS.find(q => q.id === activeQuestionId);

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4 sm:p-6 font-sans overflow-hidden">
      <div className="w-full max-w-4xl mb-6 text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20">
          <TrendingUp size={14} />
          <span>Fase de Validação Operacional</span>
        </div>
        <h1 className="text-white text-2xl sm:text-4xl font-black tracking-tight leading-tight uppercase italic">
          O Mecanismo de <span className="text-blue-500">Condução Ativa</span>
        </h1>
      </div>

      <div className="w-full max-w-4xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group border border-white/5">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 via-black to-neutral-900 p-8 text-center">
          <div className="space-y-6">
            {!isFinished ? (
              <div className="animate-pulse space-y-6">
                <div className="w-24 h-24 bg-blue-600/20 border border-blue-500/40 rounded-full mx-auto flex items-center justify-center backdrop-blur-sm">
                  <Play size={40} className="text-blue-500 ml-1" />
                </div>
                <div className="space-y-2">
                  <p className="text-white/60 text-lg font-bold tracking-tight">Detectando lacunas de lucro...</p>
                  <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest">Aguardando interação do usuário</p>
                </div>
              </div>
            ) : (
              <div className="space-y-10 animate-in zoom-in duration-700">
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Validação Concluída</h3>
                  <p className="text-neutral-400 max-w-lg mx-auto leading-relaxed text-lg">
                    Sua operação foi identificada com alto grau de reatividade. <br className="hidden sm:block" />
                    O sistema de condução agora é uma necessidade de sobrevivência.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={onComplete}
                    className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all active:scale-95 shadow-xl uppercase tracking-tighter"
                  >
                    Ativar o sistema de condução
                  </button>
                  <button 
                    onClick={onComplete}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all active:scale-95 uppercase tracking-tighter"
                  >
                    Continuar a análise
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {activeQuestion && (
          <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="w-full max-w-lg bg-white rounded-[3rem] p-10 shadow-2xl space-y-8 border border-white/10">
              <div className="space-y-4">
                <div className="h-1.5 w-16 bg-blue-600 rounded-full" />
                <h3 className="text-2xl font-black text-neutral-900 leading-[1.1] tracking-tight">
                  {activeQuestion.text}
                </h3>
              </div>
              <div className="space-y-3">
                {activeQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.next, activeQuestion.id)}
                    className="w-full text-left p-5 rounded-2xl border border-neutral-200 hover:border-blue-600 hover:bg-blue-50 transition-all font-bold text-neutral-800 active:scale-[0.98] group flex justify-between items-center"
                  >
                    <span className="text-lg">{opt.text}</span>
                    <SkipForward size={20} className="text-neutral-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={`absolute bottom-0 left-0 right-0 p-6 pt-16 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <div className="relative h-1.5 w-full bg-white/10 mb-6 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-white/60">
            <div className="flex items-center space-x-8">
              <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white transition-colors">
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
              <div className="text-sm font-mono tracking-[0.2em] tabular-nums">
                {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Settings size={22} className="cursor-pointer hover:text-white transition-colors" />
              <Maximize size={22} className="cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-12 p-10 bg-white/5 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
        <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Conclusão Sistêmica</p>
        <p className="text-white/80 text-xl sm:text-2xl font-light leading-relaxed max-w-3xl mx-auto italic tracking-tight">
          "Eu não sabia que perdia vendas desse jeito. Não quero mais depender da sorte ou do humor do vendedor para bater minhas metas."
        </p>
      </div>
    </div>
  );
};

export default Experience2VSL;
