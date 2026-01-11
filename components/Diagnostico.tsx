import React, { useState, useEffect } from 'react';
import { ShieldAlert, TrendingUp, CheckCircle, Info, AlertTriangle, Zap, Target, BarChart3, ChevronRight, Share2 } from 'lucide-react';

interface Response {
  type: string;
  value: number;
}

interface DiagnosticoProps {
  answers: Response[];
  onComplete: () => void;
}

const Diagnostico: React.FC<DiagnosticoProps> = ({ answers, onComplete }) => {
  const [scoreFinal, setScoreFinal] = useState(0);
  const [scoreComercial, setScoreComercial] = useState(0);
  const [scoreFit, setScoreFit] = useState(0);
  const [level, setLevel] = useState({ 
    name: 'PROCESSANDO', 
    color: '#333', 
    label: 'Analítico',
    recommendation: '',
    icon: null as any 
  });
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (answers.length > 0) {
      const scores: Record<string, number> = {};
      answers.forEach(a => { scores[a.type] = a.value; });

      const sComercial = (
        ((scores['situation'] || 0) * 0.20) + 
        ((scores['problem'] || 0) * 0.20) + 
        ((scores['implication'] || 0) * 0.25) + 
        ((scores['need'] || 0) * 0.15)
      ) / 0.8; 

      const sFit = scores['fit'] || 0;
      const final = (sComercial * 0.8) + (sFit * 0.2);

      const timer = setTimeout(() => {
        setScoreFinal(Number(final.toFixed(1)));
        setScoreComercial(Number(sComercial.toFixed(1)));
        setScoreFit(sFit);
        setIsAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [answers]);

  useEffect(() => {
    const sC = scoreComercial;
    const sF = scoreFit;

    let lvl = { name: '', color: '', label: '', recommendation: '', icon: Info };

    if (sC <= 2) lvl = { name: 'CAÓTICO', color: '#ef4444', label: 'Alto Risco', recommendation: '', icon: ShieldAlert };
    else if (sC <= 4) lvl = { name: 'REATIVO', color: '#f97316', label: 'Modo Garçom', recommendation: '', icon: AlertTriangle };
    else if (sC <= 6) lvl = { name: 'ESTRUTURADO', color: '#eab308', label: 'Operação Base', recommendation: '', icon: Info };
    else if (sC <= 8) lvl = { name: 'OTIMIZADO', color: '#3b82f6', label: 'Previsível', recommendation: '', icon: Zap };
    else lvl = { name: 'EXCELÊNCIA', color: '#22c55e', label: 'Benchmark', recommendation: '', icon: CheckCircle };

    if (sC <= 6 && sF < 6) {
      lvl.recommendation = "D4 Seller: Sua operação exige automação de condução imediata. O D4 Seller resolverá o gargalo do nível atual.";
    } else if (sC <= 6 && sF >= 6) {
      lvl.recommendation = "D4 Seller + Diagnóstico 360: Comece estruturando com o D4 Seller e agende seu Diagnóstico 360 para mapear a transição completa.";
    } else if (sC > 6 && sF < 6) {
      lvl.recommendation = "D4 Seller + Diagnóstico 360: Sua performance é boa, mas falha no braço operacional. O combo D4 Seller + Diagnóstico 360 é o ideal.";
    } else if (sC > 6 && sF >= 6 && sF < 8) {
      lvl.recommendation = "Diagnóstico 360: Sua operação está madura para escala real. O Diagnóstico 360 removerá os limites de crescimento.";
    } else {
      lvl.recommendation = "Diagnóstico 360 Premium: Você já é benchmark no setor. O Diagnóstico 360 Premium focará em otimização de lucro e novos canais.";
    }

    setLevel(lvl);
  }, [scoreFinal, scoreComercial, scoreFit]);

  const radius = 90;
  const circumference = Math.PI * radius;
  const offset = circumference - (scoreFinal / 10) * circumference;

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32 font-sans overflow-x-hidden">
      <header className="py-6 px-6 flex justify-between items-center border-b border-white/5 backdrop-blur-3xl sticky top-0 z-[100] bg-black/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <BarChart3 size={20} />
          </div>
          <div className="leading-none">
            <h1 className="text-lg font-black italic tracking-tighter uppercase leading-none">D4 <span className="text-blue-500">Kingdom</span></h1>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Diagnóstico 360</span>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl backdrop-blur-sm">
          <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-8">Performance Comercial Real</h2>
          
          <div className="relative w-64 h-32 sm:w-72 sm:h-36 mx-auto mb-8">
            <svg className="w-full h-full rotate-180" viewBox="0 0 200 100">
              <path d="M 10,100 A 90,90 0 0,1 190,100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" strokeLinecap="round" />
              <path d="M 10,100 A 90,90 0 0,1 190,100" fill="none" stroke={level.color} strokeWidth="14" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={isAnimating ? circumference : offset} className="transition-all duration-[2.5s] ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <span className="text-6xl sm:text-7xl font-black text-white tracking-tighter leading-none">{scoreFinal}</span>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">Score / 10</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-xl font-black text-white border border-white/10" style={{ backgroundColor: level.color + '22' }}>
              {level.icon && <level.icon size={18} style={{ color: level.color }} />}
              <span className="uppercase tracking-widest text-xs" style={{ color: level.color }}>STATUS: {level.name}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-6">
           <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Maturidade Financeira</span>
              <span className="text-lg font-black text-blue-500 italic">
                {scoreFit <= 2 ? "Até R$10k" : scoreFit <= 5 ? "R$10k - R$15k" : scoreFit <= 8 ? "R$15k - R$50k" : "Acima de R$50k"}
              </span>
           </div>
           
           <div className="space-y-4">
              <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                 <p className="text-[9px] font-black text-white/30 uppercase block mb-3 tracking-widest">💬 Recomendação Estratégica:</p>
                 <p className="text-sm sm:text-base font-medium text-white/80 leading-relaxed italic">
                   "{level.recommendation.split(': ')[1] || level.recommendation}"
                 </p>
              </div>
           </div>
        </div>

        <div className="space-y-6 pb-20">
          <div className="bg-blue-600 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-[0_20px_60px_rgba(37,99,235,0.4)]">
             <div className="absolute top-0 right-0 p-8 opacity-10"><TrendingUp size={100} /></div>
             <div className="relative z-10 space-y-5">
                <h3 className="text-xl sm:text-2xl font-black italic tracking-tighter uppercase leading-tight">Mecanismo de Escala</h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  Com base no seu nível <strong>{level.name}</strong>, a solução mandatória é a ativação do D4 Seller em conjunto com o nosso <strong>Diagnóstico 360</strong>.
                </p>
                
                <button 
                  onClick={onComplete} 
                  className="w-full bg-white text-black py-5 px-4 rounded-2xl font-black text-sm sm:text-base hover:bg-neutral-100 transition-all flex items-center justify-center space-x-2 uppercase tracking-tighter shadow-2xl active:scale-95 leading-tight text-center"
                >
                   <span className="flex-1">
                     CONTRATAR D4 SELLER E AGENDAR DIAGNÓSTICO 360
                   </span>
                   <ChevronRight size={22} className="shrink-0" />
                </button>
             </div>
          </div>
          
          <div className="text-center opacity-20">
            <p className="text-[8px] font-black uppercase tracking-[0.4em]">Protocolo D4 Kingdom • Diagnóstico 360</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;