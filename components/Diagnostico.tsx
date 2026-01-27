
import React, { useState, useEffect } from 'react';
import { ShieldAlert, TrendingUp, CheckCircle, Info, AlertTriangle, Zap, Target, BarChart3, ChevronRight, Share2, Sparkles, Brain, Loader2, Search, MessageSquare, Mail, FileText } from 'lucide-react';
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
  const [level, setLevel] = useState({ 
    name: 'PROCESSANDO', color: '#333', label: 'Analítico', recommendation: '', scaleStrategy: '', ctaText: 'QUERO ACESSAR A SOLUÇÃO', icon: null as any 
  });
  const [isAnimating, setIsAnimating] = useState(true);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  useEffect(() => {
    if (answers.length > 0) {
      const scores: Record<string, number> = {};
      answers.forEach(a => { scores[a.type] = a.value; });
      const sComercial = (((scores['situation'] || 0) * 0.20) + ((scores['problem'] || 0) * 0.20) + ((scores['implication'] || 0) * 0.25) + ((scores['need'] || 0) * 0.15)) / 0.8; 
      const sFit = scores['fit'] || 0;
      const final = (sComercial * 0.8) + (sFit * 0.2);

      const scanInterval = setInterval(() => setScanStep(p => (p < 3 ? p + 1 : p)), 1200);
      setTimeout(() => {
        setScoreFinal(Number(final.toFixed(1)));
        setScoreComercial(Number(sComercial.toFixed(1)));
        setIsAnimating(false);
        clearInterval(scanInterval);
      }, 4000);
      return () => clearInterval(scanInterval);
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
            contents: `Analise estes dados de auditoria comercial: Score de Condução: ${scoreComercial}/10, Nível de Risco: ${level.label}, Perfil: ${level.name}. Gere um Diagnóstico Curto (máx 280 caracteres) focado em perda de lucro por atendimento passivo e a solução D4 Seller.`,
            config: { temperature: 0.8, maxOutputTokens: 300 }
          });
          setAiInsight(response.text?.trim() || "Sua operação apresenta vazamentos críticos de receita no WhatsApp. O D4 Seller transformará sua condução reativa em uma máquina de lucro previsível.");
        } catch {
          setAiInsight("Sua operação está deixando margem na mesa por falta de condução estruturada. O D4 Seller foi desenhado para assumir o comando e estancar esse vazamento imediatamente.");
        } finally { setIsGeneratingAi(false); }
      };
      generateInsight();
    }
  }, [isAnimating, scoreFinal, scoreComercial, level.name]);

  useEffect(() => {
    const sC = scoreComercial;
    let lvl = { name: '', color: '', label: '', recommendation: '', scaleStrategy: '', ctaText: 'QUERO ACESSAR A SOLUÇÃO', icon: Info };
    if (sC <= 3) lvl = { ...lvl, name: 'CAÓTICO', color: '#ef4444', label: 'Risco Máximo', recommendation: "Operação 'barco furado'. Leads se perdem por falta total de condução ativa.", scaleStrategy: "Ação Imediata: Implementar o D4 Seller para estancar a hemorragia.", icon: ShieldAlert };
    else if (sC <= 5) lvl = { ...lvl, name: 'REATIVO', color: '#f97316', label: 'Gargalo Crítico', recommendation: "Você atende, mas não vende. Seu time é refém da vontade do cliente.", scaleStrategy: "Inversão de Lógica: O D4 Seller assume a qualificação para fechar mais.", icon: AlertTriangle };
    else if (sC <= 7) lvl = { ...lvl, name: 'ESTRUTURADO', color: '#eab308', label: 'Zona de Estagnação', recommendation: "Processo razoável, mas sem escala. O fator humano é o limitador.", scaleStrategy: "Automação de Elite: Implementar cadência agressiva via D4 Seller.", icon: Info };
    else lvl = { ...lvl, name: 'OTIMIZADO', color: '#22c55e', label: 'Alta Performance', recommendation: "Operação madura. O foco agora é extrair lucros ocultos na base.", scaleStrategy: "Dominação: Replicar o modelo D4 em todos os canais de aquisição.", icon: CheckCircle };
    setLevel(lvl);
  }, [scoreComercial]);

  const radius = 90;
  const circumference = Math.PI * radius;
  const offset = circumference - (scoreFinal / 10) * circumference;

  if (isAnimating) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-24 h-24 bg-[#66FCF1]/10 rounded-3xl flex items-center justify-center border border-[#66FCF1]/30 shadow-glow-cyan animate-bounce"><Search size={40} className="text-[#66FCF1]" /></div>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mt-8">Analisando sua Operação...</h2>
        <div className="flex flex-col space-y-4 mt-6">
           <div className={`flex items-center space-x-4 transition-all ${scanStep >= 1 ? 'opacity-100' : 'opacity-20'}`}><div className="w-2 h-2 bg-[#66FCF1] rounded-full shadow-glow-cyan"></div><span className="text-[10px] font-black uppercase tracking-widest">Mapeando Perdas</span></div>
           <div className={`flex items-center space-x-4 transition-all ${scanStep >= 2 ? 'opacity-100' : 'opacity-20'}`}><div className="w-2 h-2 bg-[#66FCF1] rounded-full shadow-glow-cyan"></div><span className="text-[10px] font-black uppercase tracking-widest">Auditando Conversas</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-32 font-sans overflow-x-hidden">
      <header className="py-6 px-6 border-b border-white/5 backdrop-blur-3xl sticky top-0 z-[100] bg-[#0B0C10]/80">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-10 h-10 bg-[#66FCF1]/10 rounded-xl flex items-center justify-center border border-[#66FCF1]/20 shadow-glow-cyan"><BarChart3 size={20} className="text-[#66FCF1]" /></div>
          <div className="leading-none text-left"><h1 className="text-lg font-black italic tracking-tighter uppercase">D4 <span className="text-[#66FCF1]">Kingdom</span></h1><span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Auditoria de Condução</span></div>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-6 space-y-8 animate-in fade-in duration-1000">
        <div className="bg-[#1F2833] border border-white/10 rounded-[3rem] p-10 text-center relative shadow-2xl">
          <h2 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-8">Performance Comercial</h2>
          <div className="relative w-64 h-32 mx-auto mb-8">
            <svg className="w-full h-full rotate-180" viewBox="0 0 200 100">
              <path d="M 10,100 A 90,90 0 0,1 190,100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" strokeLinecap="round" />
              <path d="M 10,100 A 90,90 0 0,1 190,100" fill="none" stroke={level.color} strokeWidth="16" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-[2s]" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1"><span className="text-6xl font-black text-white tracking-tighter">{scoreFinal}</span><span className="text-[10px] font-black text-white/20 uppercase mt-2">Score de Escala</span></div>
          </div>
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl font-black border border-white/10" style={{ backgroundColor: level.color + '15' }}><span className="uppercase tracking-widest text-sm" style={{ color: level.color }}>STATUS: {level.name}</span></div>
        </div>

        <div className="bg-[#1F2833] border border-[#66FCF1]/20 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="flex items-center space-x-3 mb-6"><div className="w-10 h-10 bg-[#66FCF1]/10 rounded-full flex items-center justify-center text-[#66FCF1]"><Brain size={20} /></div><h3 className="text-sm font-black italic uppercase text-[#66FCF1]">Diagnóstico IA 360</h3></div>
          <div className="min-h-[100px] flex items-center text-left">
            {isGeneratingAi ? <div className="flex flex-col items-center space-y-3 mx-auto"><Loader2 className="animate-spin text-[#66FCF1]" /><span className="text-[10px] text-white/20 uppercase">Processando...</span></div> : <p className="text-lg text-[#C5C6C7] leading-relaxed italic font-light animate-in fade-in">"{aiInsight}"</p>}
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex justify-between items-center px-2"><span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Resultados Reais</span><div className="flex items-center space-x-1 text-[#66FCF1]"><Sparkles size={10} /><span className="text-[9px] font-bold uppercase">LIVE FEED</span></div></div>
           <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#00a884]/20 rounded-full flex items-center justify-center text-[#00a884]"><MessageSquare size={18} /></div>
              <div className="text-left"><p className="text-[10px] text-white/30 uppercase font-black tracking-widest">WhatsApp Win • Agora</p><p className="text-xs text-white/80">"Kayo, recuperei 14 vendas que esfriaram com a nova lógica do D4 Seller!"</p></div>
           </div>
           <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400"><Mail size={18} /></div>
              <div className="text-left"><p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Email Alert • 5 min</p><p className="text-xs text-white/80">"Novo contrato de High Ticket fechado via automação D4."</p></div>
           </div>
        </div>

        <div className="bg-[#66FCF1] rounded-[2.5rem] p-10 text-[#0B0C10] relative shadow-glow-cyan group cursor-pointer" onClick={onComplete}>
          <div className="absolute top-0 right-0 p-8 opacity-10"><TrendingUp size={120} /></div>
          <div className="relative z-10 text-center space-y-6">
            <h3 className="text-3xl font-black italic tracking-tighter uppercase">Implementar Mecanismo D4</h3>
            <button className="w-full bg-[#0B0C10] text-[#66FCF1] py-6 px-4 rounded-2xl font-black flex items-center justify-center space-x-3 uppercase shadow-2xl active:scale-95"><span>ACESSAR SOLUÇÃO</span><ChevronRight size={24} /></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;
