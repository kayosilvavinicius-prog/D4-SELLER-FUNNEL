
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  PlayCircle, 
  Star,
  Globe,
  Users,
  Briefcase,
  Lock,
  Cpu,
  BarChart3,
  PhoneCall
} from 'lucide-react';
import { EXECUTIVE_AVATAR } from '../constants';

const SalesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    { q: "Funciona para qualquer tipo de negócio?", a: "Sim. O framework Receita 360 foi validado em mais de 40 nichos diferentes, desde prestação de serviços locais até SaaS de alta complexidade." },
    { q: "Preciso saber programar?", a: "Absolutamente não. O D4 Seller é plug-and-play. Nossa engenharia de vendas cuida da lógica, você cuida do fechamento." },
    { q: "Como o sistema entende meu negócio?", a: "Através de um mapeamento inicial de condução. Traduzimos seu roteiro atual (ou criamos um do zero) para a lógica SPIN dentro do D4 Seller." },
    { q: "E se eu não tiver equipe de vendas?", a: "Melhor ainda. O sistema automatiza o papel do pré-vendedor (SDR), entregando o lead pronto para você apenas assinar o contrato." },
    { q: "Posso testar o D4 Seller antes da consultoria?", a: "Sim, oferecemos o acesso de teste para você sentir o poder da condução ativa antes de escalar para o Receita 360." }
  ];

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#66FCF1]/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Animated BG Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#66FCF1]/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center z-10 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#66FCF1]/10 border border-[#66FCF1]/20 rounded-full mb-4">
            <Cpu size={14} className="text-[#66FCF1]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#66FCF1]">Powered by D4 Kingdom | Engenharia de Vendas</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight md:leading-none">
            Transforme seu WhatsApp em uma máquina de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] to-blue-400">decisões</span> — não de mensagens.
          </h1>

          <p className="text-xl text-[#C5C6C7] max-w-2xl mx-auto leading-relaxed font-light">
            Conheça o sistema que integra conversas, ligações e lógica de vendas reais em um único fluxo previsível.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button className="group relative px-8 py-5 bg-[#66FCF1] text-[#0B0C10] font-black text-lg rounded-xl shadow-glow-cyan transition-all flex items-center space-x-3 active:scale-95">
              <span>GERAR DIAGNÓSTICO COMERCIAL</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center space-x-2 text-[#45A29E] text-xs font-bold uppercase tracking-widest">
              <Lock size={14} />
              <span>Sem compromisso, apenas clareza.</span>
            </div>
          </div>

          <div className="pt-12 animate-float">
            <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
                alt="Dashboard Simulation" 
                className="w-full h-auto opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <PlayCircle size={80} className="text-[#66FCF1] opacity-80 cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DOR DO EMPRESÁRIO */}
      <section className="py-24 px-6 bg-[#1F2833]/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              Você não sofre com falta de leads, e sim com <span className="text-red-500">falta de processo.</span>
            </h2>
            <div className="h-1 w-20 bg-[#66FCF1] rounded-full"></div>
            <p className="text-[#C5C6C7] leading-relaxed text-lg">
              A maioria das empresas não sofre com falta de clientes interessados. 
              Sofre porque não tem um processo comercial previsível. 
              O dono investe, o time atende, envia preço… e espera.
            </p>
            <p className="text-[#66FCF1] font-bold italic text-lg">
              “Enquanto espera, o cliente esfria. E a venda morre no meio do caminho.”
            </p>
          </div>
          <div className="flex-1 w-full bg-[#0B0C10] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
            <div className="flex justify-between items-end h-64 space-x-4">
              <div className="flex-1 bg-white/5 rounded-t-xl relative group">
                <div className="absolute inset-x-0 bottom-0 bg-[#66FCF1] rounded-t-xl transition-all h-[100%]"></div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase whitespace-nowrap">100 Leads</span>
              </div>
              <div className="flex-1 bg-white/5 rounded-t-xl relative group">
                <div className="absolute inset-x-0 bottom-0 bg-[#66FCF1]/40 rounded-t-xl transition-all h-[15%]"></div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase text-red-400 whitespace-nowrap">15 Vendas</span>
              </div>
              <div className="flex-1 bg-red-500/10 rounded-t-xl relative group border-t-2 border-red-500/50">
                 <div className="absolute inset-0 flex items-center justify-center text-center p-2">
                   <span className="text-[10px] font-black text-red-500 uppercase leading-tight">95% morrem por falta de condução</span>
                 </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Diagnóstico de Gargalo Operacional</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MECANISMO SPIN */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black">A Engenharia por trás do <span className="text-[#66FCF1]">Receita 360</span></h2>
          <p className="text-[#C5C6C7]">Cada conversa é guiada por lógica — não improviso.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: 1, name: 'Situação', desc: 'Identifica seu cenário atual e limitações.', color: 'text-blue-400' },
            { step: 2, name: 'Problema', desc: 'Mapeia gargalos ocultos de venda.', color: 'text-[#66FCF1]' },
            { step: 3, name: 'Implicação', desc: 'Mostra o impacto real da ineficiência.', color: 'text-purple-400' },
            { step: 4, name: 'Necessidade', desc: 'Conduz o cliente à decisão certa.', color: 'text-green-400' }
          ].map((item) => (
            <div key={item.step} className="bg-[#1F2833] p-8 rounded-3xl border border-white/5 hover:border-[#66FCF1]/30 transition-all group">
              <div className={`text-4xl font-black mb-4 ${item.color} opacity-20 group-hover:opacity-100 transition-opacity`}>0{item.step}</div>
              <h3 className="text-xl font-black mb-2 uppercase italic tracking-tighter">{item.name}</h3>
              <p className="text-sm text-[#C5C6C7] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-[#66FCF1]/20 p-1 rounded-3xl">
          <div className="bg-[#0B0C10] p-10 rounded-[1.4rem] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4">
              <h4 className="text-2xl font-black italic">Mecanismo Conectado</h4>
              <p className="text-[#C5C6C7] text-sm">O fluxo perfeito: D4 Phone inicia, D4 Seller qualifica, nosso Diagnóstico valida e a Receita 360 escala seu lucro.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#66FCF1]"><PhoneCall size={20} /></div>
              <div className="h-px w-8 bg-white/20"></div>
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#66FCF1]"><Zap size={20} /></div>
              <div className="h-px w-8 bg-white/20"></div>
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#66FCF1]"><BarChart3 size={20} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AUTORIDADE */}
      <section className="py-24 px-6 bg-white text-[#0B0C10]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-[400px] shrink-0">
            <div className="aspect-[4/5] bg-neutral-200 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <img 
                src={EXECUTIVE_AVATAR} 
                alt="Kayo Vinícius" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-black/5">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-blue-600">Cofundador D4 Kingdom</p>
                <p className="text-lg font-black tracking-tighter italic uppercase">Kayo Vinícius</p>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight italic">
              Criado por quem vive de vendas, <br/><span className="text-blue-600">não de hype.</span>
            </h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-neutral-600">
                <strong>Kayo Vinícius</strong> é Engenheiro Eletricista pela <strong>Unicamp</strong>, Especialista em Vendas B2B formado por Flávio Augusto e Caio Carneiro, e mentorado por Érico Rocha.
              </p>
              <p className="text-lg leading-relaxed text-neutral-600">
                Desenvolveu a metodologia Receita 360 e validou com mais de <strong>R$ 50 milhões em vendas reais</strong>. Nada aqui foi criado por influenciadores. Foi construído por quem entende o campo de batalha das vendas — e aplicou engenharia em cada conversa.
              </p>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <p className="text-2xl font-black">+50M</p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Vendas Reais</p>
              </div>
              <div className="h-8 w-px bg-neutral-200"></div>
              <div className="text-center">
                <p className="text-2xl font-black">40+</p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Nichos Atendidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. GARANTIA */}
      <section className="py-24 px-6 bg-[#0B0C10]">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1F2833] to-[#0B0C10] p-12 sm:p-20 rounded-[4rem] border border-white/5 text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12">
            <ShieldCheck size={200} className="text-[#66FCF1]" />
          </div>

          <div className="w-24 h-24 bg-[#66FCF1]/10 rounded-full flex items-center justify-center mx-auto border border-[#66FCF1]/20">
            <Star size={40} className="text-[#66FCF1] fill-current" />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">Sem Risco. <span className="text-[#66FCF1]">Só Resultado.</span></h2>
            <p className="text-xl text-[#66FCF1] font-bold uppercase tracking-widest">Garantia 30 Dias D4 Kingdom</p>
          </div>

          <p className="text-[#C5C6C7] leading-relaxed text-lg max-w-2xl mx-auto">
            Nós confiamos tanto na eficiência do D4 Seller e da metodologia Receita 360 que decidimos eliminar completamente o risco da sua decisão. Se dentro de 30 dias você não perceber evolução na sua operação, devolvemos 100% do seu investimento.
          </p>

          <div className="flex flex-col items-center space-y-2 pt-6">
             <div className="flex items-center space-x-2 text-[10px] font-bold text-[#45A29E] uppercase tracking-[0.2em]">
               <Lock size={12} />
               <span>Garantia incondicional válida para todas as licenças.</span>
             </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-16 italic uppercase tracking-tighter">Objeções Técnicas</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#1F2833] rounded-3xl border border-white/5 overflow-hidden transition-all">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className="font-bold text-lg group-hover:text-[#66FCF1] transition-colors">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform ${openFaq === i ? 'rotate-180 text-[#66FCF1]' : ''}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-8 text-[#C5C6C7] leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="pt-24 pb-12 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">D4 <span className="text-[#66FCF1]">Kingdom</span></h1>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] max-w-[250px]">
              Engenharia de Vendas que Move o País. Transformando empresas reais em operações previsíveis.
            </p>
          </div>
          <div className="flex space-x-8 text-[10px] font-bold text-white/40 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
        <div className="mt-20 text-center opacity-20">
          <p className="text-[8px] font-black uppercase tracking-[0.5em]">© 2026 D4 Kingdom • Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-[#0B0C10]/90 backdrop-blur-xl border-t border-white/10 z-[100] transition-all duration-500 transform ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-[10px] font-black uppercase text-[#66FCF1]">Acesso Imediato</p>
            <p className="text-xs text-white/60">Gere seu diagnóstico</p>
          </div>
          <button className="flex-1 py-4 bg-[#66FCF1] text-[#0B0C10] font-black text-xs uppercase tracking-tighter rounded-xl shadow-glow-cyan active:scale-95 transition-all">
            GERAR MEU DIAGNÓSTICO GRATUITO
          </button>
        </div>
      </div>

      {/* FLOATING GUARANTEE BADGE */}
      <div className={`fixed bottom-24 right-6 z-[110] transition-all duration-700 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
        <div className="bg-[#66FCF1] text-[#0B0C10] p-3 rounded-full shadow-2xl flex flex-col items-center justify-center animate-bounce-slow">
          <ShieldCheck size={20} />
          <span className="text-[7px] font-black uppercase">30 Dias</span>
        </div>
      </div>

    </div>
  );
};

export default SalesPage;
