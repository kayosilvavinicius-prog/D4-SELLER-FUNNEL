import React from 'react';
import { Experience } from '../types';
import { Layout, PhoneCall, Zap, ShoppingCart, BarChart3, MessageSquare, ChevronRight, Play } from 'lucide-react';

interface MenuProps {
  onNavigate: (target: Experience) => void;
}

const Menu: React.FC<MenuProps> = ({ onNavigate }) => {
  const steps = [
    { 
      id: '1A', 
      label: 'Fase 1: WhatsApp Chat', 
      desc: 'Simulação de mensagens e detecção de gênero.',
      icon: MessageSquare,
      color: 'bg-[#00a884]'
    },
    { 
      id: '1B', 
      label: 'Fase 2: Chamada de Voz', 
      desc: 'Interface iOS 17 com D4 Phone.',
      icon: PhoneCall,
      color: 'bg-blue-600'
    },
    { 
      id: '2-VSL', 
      label: 'Fase 3: VSL Interativa', 
      desc: 'Vídeo curto sincronizado com Quiz SPIN.',
      icon: Play,
      color: 'bg-neutral-800'
    },
    { 
      id: 'DIAGNOSTICO', 
      label: 'Fase 4: Diagnóstico Comercial', 
      desc: 'Resultado dinâmico com score e gauge dinâmico.',
      icon: BarChart3,
      color: 'bg-blue-500'
    },
    { 
      id: 'SALES', 
      label: 'Fase 5: Página de Oferta', 
      desc: 'Checkout e encerramento do funil.',
      icon: ShoppingCart,
      color: 'bg-neutral-900'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full space-y-10 animate-in fade-in zoom-in duration-700 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-full">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Painel de Controle do Funil</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            D4 <span className="text-blue-500">Mecanismo</span>
          </h1>
          <p className="text-neutral-500 text-sm font-medium">Navegue pelas etapas injetando dados automáticos.</p>
        </div>

        <div className="space-y-3">
          {steps.map((step) => (
            <button 
              key={step.id}
              onClick={() => onNavigate(step.id as Experience)}
              className="w-full group bg-white/[0.03] border border-white/5 p-5 rounded-[2.5rem] hover:bg-white/[0.08] hover:border-blue-500/30 transition-all flex items-center space-x-5 text-left active:scale-[0.98] shadow-xl"
            >
              <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-2xl shrink-0 group-hover:scale-110 transition-transform`}>
                <step.icon size={26} />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-white text-sm uppercase tracking-tight italic group-hover:text-blue-400 transition-colors">{step.label}</h3>
                <p className="text-[11px] text-neutral-500 leading-tight mt-1 font-medium">{step.desc}</p>
              </div>
              <ChevronRight className="text-white/10 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={24} />
            </button>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5 text-center space-y-2">
          <p className="text-[9px] text-neutral-600 font-black uppercase tracking-[0.5em]">
            Protocolo D4 Kingdom • © 2024
          </p>
          <p className="text-[8px] text-blue-500/30 font-bold uppercase tracking-[0.2em]">Developer Mode: Enabled</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;