
import React, { useState, useEffect } from 'react';
import { ShieldAlert, TrendingUp, CheckCircle, Info, AlertTriangle, Zap, Target, BarChart3, ChevronRight, Share2, Sparkles, Brain, Loader2, Search } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

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
    scaleStrategy: '',
    ctaText: 'QUERO ACESSAR A SOLUÇÃO',
    icon: null as any 
  });
  const [isAnimating, setIsAnimating] = useState(true);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [scanStep, setScanStep] = useState(0);

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

      const scanInterval = setInterval(() => {
        setScanStep(prev => (prev < 3 ? prev + 1 : prev));
      }, 1200);

      const timer = setTimeout(() => {
        setScoreFinal(Number(final.toFixed(1)));
        setScoreComercial(Number(sComercial.toFixed(1)));
        setScoreFit(sFit);
        setIsAnimating(false);
        clearInterval(scanInterval);
      }, 4000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(scanInterval);
      };
    }
  }, [answers]);

  useEffect(() => {
    if (!isAnimating && scoreFinal > 0 && !aiInsight && !isGeneratingAi) {
      const generateInsight = async () => {
        setIsGeneratingAi(true);
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Analise estes dados de auditoria comercial:
            - Score de Condução: ${scoreComercial}/10
            - Nível de Risco: ${level.label}
            - Perfil: ${level.name}
            
            Como um Especialista em Engenharia de Vendas da D4 Kingdom, gere um Veredito Curto (máx 280 caracteres).
            FOCO: Perda de lucro por atendimento passivo e a solução através do D4 Seller.
            TOM: Profissional, autoritário, focado em ROI. Use "Você" e "Sua Operação".`,
            config: {
              temperature: 0.8,
              maxOutputTokens: 300,
              thinkingConfig: { thinkingBudget: 0 }
            }
          });
          
          setAiInsight(response.text?.trim() || "Sua operação apresenta vazamentos críticos de receita no WhatsApp. O D4 Seller é o mecanismo de contenção que transformará sua condução reativa em uma máquina de lucro previsível.");
        } catch (error) {
          console.error("AI Insight Error:", error);
          setAiInsight("Sua operação está deixando margem na mesa por falta de condução estruturada. O D4 Seller foi desenhado para assumir o comando e estancar esse vazamento de faturamento imediatamente.");
        } finally {
          setIsGeneratingAi(false);
        }
      };
      generateInsight();
    }
  }, [isAnimating, scoreFinal, scoreComercial, level.name]);

  useEffect(() => {
    const sC = scoreComercial;
    let lvl = { 
      name: '', color: '', label: '', recommendation: '', scaleStrategy: '',
      ctaText: 'QUERO ACESSAR A SOLUÇÃO', icon: Info 
    };

    if (sC <= 3) {
      lvl = { ...lvl, name: 'CAÓTICO', color: '#ef4444', label: 'Risco Máximo', recommendation: "Sua operação é um 'barco furado'. Leads entram e se perdem por falta total de condução ativa.", scaleStrategy: "Ação Imediata: Implementar o D4 Seller para estancar a hemorragia de caixa.", icon: ShieldAlert };
    } else if (sC <= 5) {
      lvl = { ...lvl, name: 'REATIVO', color: '#f97316', label: 'Gargalo Crítico', recommendation: "Você atende, mas não vende. Seu time é refém da vontade do cliente.", scaleStrategy: "Inversão de Lógica: O D4 Seller assume a qualificação para garantir o fechamento.", icon: AlertTriangle };
    } else if (sC <= 7) {
      lvl = { ...lvl, name: 'ESTRUTURADO', color: '#eab308', label: 'Zona de Estagnação', recommendation: "Processo razoável, mas falta escala. O fator humano é seu limitador atual.", scaleStrategy: "Automação de Elite: Implementar cadência agressiva via D4 Seller.", icon: Info };
    } else if (sC <= 9) {
      lvl = { ...lvl, name: 'OTIMIZADO', color: '#3b82f6', label: 'Alta Performance', recommendation: "Operação madura. O foco agora é extrair lucros ocultos na base de dados.", scaleStrategy: "Refinamento de Margem: O Diagnóstico 360 é o próximo passo para o topo.", icon: Zap };
    } else {
      lvl = { ...lvl, name: 'EXCELÊNCIA', color: '#22c55e', label: 'Referência', recommendation: "Liderança absoluta. O desafio agora é manter a soberania e escala global.", scaleStrategy: "Dominação: Replicar o modelo D4 em todos os canais de aquisição.", icon: CheckCircle };
    }
    setLevel(lvl);
  }, [scoreComercial]);

  const radius = 90;
  const circumference = Math.PI * radius;
  const offset = circumference - (scoreFinal / 10) * circumference;

  if (isAnimating) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex flex-col items-center justify-center p-6 text-white font-sans overflow-hidden">
        <div className="absolute inset-0 bg-[#66FCF1]/5 opacity-20 pointer-events-none animate-pulse"></div>
        <div className="relative space-y-12 text-center w-full max-w-sm">
          <div className="relative inline-block">
             <div className="w-24 h-24 bg-[#66FCF1]/10 rounded-3xl flex items-center justify-center border border-[#66FCF1]/30 shadow-glow-cyan animate-bounce">
                <Search size={40} className="text-[#66FCF1]" />
             </div>
             <div className="absolute -inset-4 border border-[#66FCF1]/20 rounded-full animate-ping"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Processando Auditoria</h2>
            <div className="flex flex-col space-y-4">
               <div className={`flex items-center space-x-4 transition-all duration-700 ${scanStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'}`}>
                  <div className="w-2 h-2 bg-[#66FCF1] rounded-full shadow-glow-cyan"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Mapeando Perdas de Receita</span>
               </div>
               <div className={`flex items-center space-x-4 transition-all duration-700 ${scanStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'}`}>
                  <div className="w-2 h-2 bg-[#66FCF1] rounded-full shadow-glow-cyan"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Cruzando Lógica SPIN Selling</span>
               </div>
               <div className={`flex items-center space-x-4 transition-all duration-700 ${scanStep >= 3 ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'}`}>
                  <div className="w-2 h-2 bg-[#66FCF1] rounded-full shadow-glow-cyan"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Gerando Diagnóstico 360</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-32 font-sans overflow-x-hidden selection:bg-[#66FCF1]/30">
      <header className="py-6 px-6 flex justify-between items-center border-b border-white/5 backdrop-blur-3xl sticky top-0 z-[100] bg-[#0B0C10]/80">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-10 h-10 bg-[#66FCF1]/10 rounded-xl flex items-center justify-center border border-[#66FCF1]/20 shadow-glow-cyan shrink-0">
            <BarChart3 size={20} className="text-[#66FCF1]" />
          </div>
          <div className="leading-none">
            <h1 className="text-lg font-black italic tracking-tighter uppercase leading-none">D4 <span className="text-[#66FCF1]">Kingdom</span></h1>
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Auditoria de Condução 360</span>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="bg-[#1F2833] border border-white/10 rounded-[3rem] p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#66FCF1] to-transparent opacity-20"></div>
          <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-8">Performance Comercial</h2>
          <div className="relative w-64 h-32 sm:w-72 sm:h-36 mx-auto mb-8">
            <svg className="w-full h-full rotate-180" viewBox="0 0 200 100">
              <path d="M 10,100 A 90,90 0 0,1 190,100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" strokeLinecap="round" />
              <path d="M 10,100 A 90,90 0 0,1 190,100" fill="none" stroke={level.color} strokeWidth="16" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-[2s] ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <span className="text-6xl sm:text-7xl font-black text-white tracking-tighter leading-none">{scoreFinal}</span>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-2">Score de Escala</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl font-black text-white border border-white/10" style={{ backgroundColor: level.color + '15' }}>
              <div className="w-2 h-2 rounded-full animate-pulse shadow-lg" style={{ backgroundColor: level.color }}></div>
              <span className="uppercase tracking-widest text-sm" style={{ color: level.color }}>STATUS: {level.name}</span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#66FCF1] to-blue-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-[#1F2833] border border-[#66FCF1]/20 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#66FCF1]/10 rounded-full flex items-center justify-center text-[#66FCF1] shrink-0">
                <Brain size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-black italic uppercase tracking-widest text-[#66FCF1]">Diagnóstico 360</h3>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Engenharia de Vendas Ativa</p>
              </div>
            </div>
            <div className="min-h-[100px] flex items-center justify-center text-left">
              {isGeneratingAi ? (
                <div className="flex flex-col items-center space-y-3">
                  <Loader2 className="animate-spin text-[#66FCF1]" size={24} />
                  <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">Processando Insights...</span>
                </div>
              ) : (
                <p className="text-base sm:text-lg text-[#C5C6C7] leading-relaxed italic font-light animate-in fade-in duration-700">
                  "{aiInsight}"
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
           <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <div className="space-y-1 text-left">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Status de Risco</span>
                <p className="text-xl font-black text-white italic tracking-tighter uppercase">{level.label}</p>
              </div>
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#66FCF1] border border-white/10 shrink-0">
                {level.icon && <level.icon size={28} />}
              </div>
           </div>
           <div className="space-y-6 text-left">
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-[#66FCF1] uppercase tracking-[0.4em] flex items-center space-x-2">
                   <Info size={12} /> <span>Análise Estratégica</span>
                 </p>
                 <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                   {level.recommendation}
                 </p>
              </div>
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Solução Recomendada:</p>
                 <p className="text-sm text-[#C5C6C7] leading-relaxed italic font-bold">
                   {level.scaleStrategy}
                 </p>
              </div>
           </div>
        </div>

        <div className="pt-8">
          <div className="bg-[#66FCF1] rounded-[2.5rem] p-10 text-[#0B0C10] relative overflow-hidden shadow-glow-cyan group cursor-pointer" onClick={onComplete}>
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000 pointer-events-none"><TrendingUp size={120} /></div>
             <div className="relative z-10 space-y-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-[#0B0C10]/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                  <span className="animate-pulse">✨</span>
                  <span>Caminho para o Lucro</span>
                </div>
                <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-tight">Implementar <br/>Mecanismo D4</h3>
                <button className="w-full bg-[#0B0C10] text-[#66FCF1] py-6 px-4 rounded-2xl font-black text-base hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 uppercase tracking-tighter shadow-2xl active:scale-95">
                   <span>{level.ctaText}</span>
                   <ChevronRight size={24} />
                </button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;
