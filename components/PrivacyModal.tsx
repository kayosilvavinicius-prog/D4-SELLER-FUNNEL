
import React from 'react';
import { X, ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-[#1F2833] border border-[#66FCF1]/20 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#0B0C10]/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#66FCF1]/10 rounded-xl flex items-center justify-center text-[#66FCF1]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tighter text-white leading-none">Privacidade</h2>
              <span className="text-[10px] font-bold text-[#66FCF1] uppercase tracking-[0.2em]">D4 Kingdom Protocol</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 scrollbar-hide text-white/70 leading-relaxed font-light text-sm sm:text-base">
          <section className="space-y-4">
            <h3 className="text-[#66FCF1] font-bold uppercase tracking-widest text-xs flex items-center space-x-2">
              <Eye size={14} /> <span>Transparência Total</span>
            </h3>
            <p>
              A <strong>D4 Kingdom</strong> valoriza a sua privacidade. Este documento detalha como tratamos seus dados pessoais coletados através do ecossistema <strong>D4 Seller</strong> e do framework <strong>Receita 360</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold italic uppercase tracking-tighter text-lg">1. Coleta de Dados</h3>
            <p>
              Coletamos informações básicas fornecidas voluntariamente por você para iniciar o diagnóstico comercial: 
              <strong> Nome, E-mail e Número de WhatsApp</strong>. Esses dados são essenciais para a personalização da sua experiência e simulação de condução.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold italic uppercase tracking-tighter text-lg">2. Finalidade do Tratamento</h3>
            <ul className="list-disc pl-5 space-y-2 border-l border-[#66FCF1]/10 ml-2">
              <li>Realizar o Diagnóstico de Condução Comercial 360;</li>
              <li>Personalizar as interações simuladas do D4 Seller e D4 Phone;</li>
              <li>Entrar em contato para apresentação de propostas estratégicas de escala;</li>
              <li>Envio de conteúdos educativos sobre engenharia de vendas.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold italic uppercase tracking-tighter text-lg">3. LGPD e Seus Direitos</h3>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você possui o direito de:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="block font-bold text-white mb-1">Acesso e Correção</span>
                <span className="text-[11px]">Solicitar a visualização ou alteração de seus dados a qualquer momento.</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="block font-bold text-white mb-1">Exclusão</span>
                <span className="text-[11px]">Revogar seu consentimento e solicitar a deleção total de suas informações de nossa base.</span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold italic uppercase tracking-tighter text-lg">4. Segurança Cibernética</h3>
            <p className="flex items-start space-x-3 italic bg-[#66FCF1]/5 p-4 rounded-2xl border border-[#66FCF1]/10">
              <Lock size={18} className="text-[#66FCF1] shrink-0 mt-1" />
              <span>Utilizamos criptografia de ponta e protocolos de segurança de nível industrial (AWS/Cloudinary) para garantir que sua jornada comercial seja protegida contra acessos não autorizados.</span>
            </p>
          </section>

          <div className="pt-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">© 2026 D4 Kingdom Protocol • v1.0.4</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 shrink-0 bg-[#0B0C10]/50 border-t border-white/5 text-center">
          <button 
            onClick={onClose}
            className="px-10 py-4 bg-[#66FCF1] text-[#0B0C10] font-black text-sm uppercase tracking-widest rounded-2xl shadow-glow-cyan active:scale-95 transition-all"
          >
            Entendido e Aceito
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
