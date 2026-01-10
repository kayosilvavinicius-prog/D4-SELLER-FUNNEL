
import React from 'react';
import { Experience } from '../types';
import { Layout, PhoneCall, Zap, ShoppingCart } from 'lucide-react';

const Menu: React.FC<{ onNavigate: (e: Experience) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase italic">D4 KINGDOM</h1>
          <p className="text-neutral-400 text-sm font-medium mt-1 uppercase tracking-widest">Painel de Visualização</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => onNavigate('1A')}
            className="group flex items-center p-6 bg-white border border-neutral-200 rounded-2xl hover:border-black transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-black group-hover:text-white transition-colors">
              <Layout size={24} />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">Exp 1A: WhatsApp</h3>
              <p className="text-xs text-neutral-500">Simulação de mensagens ativa</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('1B')}
            className="group flex items-center p-6 bg-white border border-neutral-200 rounded-2xl hover:border-black transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-black group-hover:text-white transition-colors">
              <PhoneCall size={24} />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">Exp 1B: Ligação</h3>
              <p className="text-xs text-neutral-500">Interface de chamada iOS 17</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('2-VSL')}
            className="group flex items-center p-6 bg-white border border-neutral-200 rounded-2xl hover:border-black transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-black group-hover:text-white transition-colors">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">Exp 2: Mini-VSL</h3>
              <p className="text-xs text-neutral-500">Diagnóstico Interativo</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('SALES')}
            className="group flex items-center p-6 bg-white border border-neutral-200 rounded-2xl hover:border-black transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-black group-hover:text-white transition-colors">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">Final: Sales Page</h3>
              <p className="text-xs text-neutral-500">Página de conversão limpa</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
