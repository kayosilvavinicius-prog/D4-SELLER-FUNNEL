
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
  PhoneCall,
  ChevronRight,
  Mic2,
  Presentation,
  Users2,
  GraduationCap,
  Trophy,
  Rocket,
  Shield
} from 'lucide-react';
import { 
  EXPERT_AVATAR, 
  EXPERT_FAMILY_PHOTO, 
  EXPERT_SALES_CHAMPION_PHOTO, 
  EXPERT_TECHNICAL_PHOTO, 
  EXPERT_TRAINING_PHOTO,
  EXPERT_MISSION_PHOTO 
} from '../constants';

const SalesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isExpertExpanded, setIsExpertExpanded] = useState(false);

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
        </div>
      </section>

      {/* 4. EXPERT SECTION - KAYO VINÍCIUS */}
      <section id="hero-expert" className="bg-[#0B0C10] py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter italic">
            Por trás da Receita 360, existe um engenheiro que decidiu aplicar <span className="text-[#66FCF1]">lógica, propósito e vendas</span> para transformar o mercado.
          </h2>
          <p className="text-xl text-[#C5C6C7] font-light max-w-3xl mx-auto leading-relaxed">
            Depois de quase duas décadas ajudando grandes multinacionais a vender mais, ele decidiu usar essa mesma engenharia para escalar pequenas e médias empresas.
          </p>

          <div className="bg-[#1F2833]/50 backdrop-blur-xl rounded-[3.5rem] p-10 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
               <Briefcase size={200} />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-12 text-left relative z-10">
              <div className="w-44 h-44 sm:w-56 sm:h-56 shrink-0 rounded-[2.5rem] overflow-hidden border-2 border-[#66FCF1]/30 shadow-2xl bg-black">
                <img src={EXPERT_AVATAR} alt="Kayo Vinícius" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
              </div>
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-[#C5C6C7]">
                  Meu nome é <strong>Kayo Vinícius</strong>, sou <strong>Engenheiro Eletricista</strong> (Unicamp), <strong>mentor, palestrante e consultor de empresas</strong>. Sou o criador do método <strong>Receita 360</strong>.
                </p>
                <p className="text-sm leading-relaxed text-[#C5C6C7]/80 italic border-l-2 border-[#66FCF1] pl-4">
                  Formado em Vendas por <strong>Flávio Augusto e Caio Carneiro</strong>, além de integrar o <strong>Mastermind de Marketing Digital do Érico Rocha</strong>.
                </p>
                <p className="text-sm leading-relaxed text-[#C5C6C7]/80">
                  Com 18 anos de experiência em multinacionais, já fechei mais de <strong>R$ 50 milhões em vendas complexas</strong>. Hoje, sou fundador da <strong>D4 Kingdom</strong> ao lado de <strong>Daniel Fernandhes</strong>.
                </p>
              </div>
            </div>

            {!isExpertExpanded && (
              <button 
                onClick={() => setIsExpertExpanded(true)}
                className="mt-12 px-12 py-5 bg-[#66FCF1] text-[#0B0C10] font-black text-sm uppercase tracking-widest rounded-full shadow-glow-cyan hover:scale-105 transition-all flex items-center mx-auto space-x-3"
              >
                <span>Conheça mais do expert</span>
                <ChevronDown size={20} />
              </button>
            )}

            {isExpertExpanded && (
              <div className="mt-12 space-y-12 animate-in fade-in slide-in-from-top-6 duration-700 border-t border-white/5 pt-12 text-left">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tighter italic text-center mb-8">
                  Da Engenharia Elétrica à Elite das Vendas Corporativas.
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h3 className="text-[#66FCF1] font-black uppercase text-xs tracking-[0.3em] flex items-center space-x-2">
                       <span className="w-5 h-5 bg-[#66FCF1]/20 rounded-full flex items-center justify-center text-[10px]">1</span>
                       <span>A Base Técnica — COTUCA Unicamp</span>
                    </h3>
                    <p className="text-[#C5C6C7] text-sm leading-relaxed">
                      Iniciei com formação técnica pelo <strong>Colégio da Unicamp</strong> e graduação em <strong>Engenharia Elétrica</strong>. Trago a precisão e o rigor analítico para cada processo comercial que desenho.
                    </p>
                    <div className="h-64 w-full rounded-3xl overflow-hidden ring-1 ring-white/10 bg-black/50 flex items-center justify-center">
                      <img 
                        src={EXPERT_TECHNICAL_PHOTO} 
                        alt="Formação Técnica Unicamp" 
                        className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[#66FCF1] font-black uppercase text-xs tracking-[0.3em] flex items-center space-x-2">
                       <span className="w-5 h-5 bg-[#66FCF1]/20 rounded-full flex items-center justify-center text-[10px]">2</span>
                       <span>O Marco dos R$ 50 Milhões</span>
                    </h3>
                    <p className="text-[#C5C6C7] text-sm leading-relaxed">
                      Em multinacionais como <strong>Sony, LG, OTIS e Carrier</strong>, liderei negociações complexas em 25 estados, ultrapassando a marca de <strong>R$ 50 milhões em vendas fechadas</strong>.
                    </p>
                    <div className="h-64 w-full rounded-3xl overflow-hidden ring-1 ring-white/10 bg-black/50 flex items-center justify-center">
                      <img 
                        src={EXPERT_SALES_CHAMPION_PHOTO} 
                        alt="Campeão de Vendas" 
                        className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[#66FCF1] font-black uppercase text-xs tracking-[0.3em] flex items-center space-x-2">
                       <span className="w-5 h-5 bg-[#66FCF1]/20 rounded-full flex items-center justify-center text-[10px]">3</span>
                       <span>Treinado pelos Melhores</span>
                    </h3>
                    <p className="text-[#C5C6C7] text-sm leading-relaxed">
                      Formado em Vendas por <strong>Flávio Augusto e Caio Carneiro</strong>. Integrante do <strong>Mastermind de Marketing Digital do Érico Rocha</strong>, unindo o melhor do offline e do online.
                    </p>
                    <div className="h-64 w-full rounded-3xl overflow-hidden ring-1 ring-white/10 bg-black/50 flex items-center justify-center">
                      <img 
                        src={EXPERT_TRAINING_PHOTO} 
                        alt="Treinamentos de Elite" 
                        className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[#66FCF1] font-black uppercase text-xs tracking-[0.3em] flex items-center space-x-2">
                       <span className="w-5 h-5 bg-[#66FCF1]/20 rounded-full flex items-center justify-center text-[10px]">4</span>
                       <span>A Missão D4 Kingdom</span>
                    </h3>
                    <p className="text-[#C5C6C7] text-sm leading-relaxed">
                      Fundei a <strong>D4 Kingdom</strong> junto ao <strong>Daniel Fernandhes</strong> com o intuito de transformar a realidade das vendas das pequenas e médias empresas no Brasil através de método e dados.
                    </p>
                    <div className="h-64 w-full rounded-3xl overflow-hidden ring-1 ring-white/10 bg-black/50 flex items-center justify-center">
                      <img 
                        src={EXPERT_MISSION_PHOTO} 
                        alt="A Missão D4 Kingdom" 
                        className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Expertise Icons */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-10 pt-6">
                   <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                      <Users2 className="text-[#66FCF1]" size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#C5C6C7]">Mentor de Empresas</span>
                   </div>
                   <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                      <Presentation className="text-[#66FCF1]" size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#C5C6C7]">Palestrante B2B</span>
                   </div>
                   <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                      <Briefcase className="text-[#66FCF1]" size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#C5C6C7]">Consultor Estratégico</span>
                   </div>
                </div>

                <div className="text-center pt-10 border-t border-white/5">
                   <button className="px-12 py-5 bg-[#66FCF1] text-[#0B0C10] font-black rounded-full shadow-glow-cyan active:scale-95 transition-all uppercase tracking-tighter text-sm">
                      QUERO ACESSAR O D4 SELLER E AGENDAR DIAGNÓSTICO 360
                   </button>
                   <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] mt-4">🔒 Sem compromisso, apenas clareza.</p>
                </div>
              </div>
            )}
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
            <span className="text-[#66FCF1]"><Star size={40} className="fill-current" /></span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">Sem Risco. <span className="text-[#66FCF1]">Só Resultado.</span></h2>
            <p className="text-xl text-[#66FCF1] font-bold uppercase tracking-widest">Garantia 30 Dias D4 Kingdom</p>
          </div>

          <p className="text-[#C5C6C7] leading-relaxed text-lg max-w-2xl mx-auto">
            Nós confiamos tanto na eficiência do D4 Seller e da metodologia Receita 360 que decidimos eliminar completamente o risco da sua decisão. Se dentro de 30 dias você não perceber evolução na sua operação, devolvemos 100% do seu investmento.
          </p>
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
              Engenharia de Vendas que Move o País. Transformando empresas reais em operações comerciais previsíveis.
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
          <button className="flex-1 py-4 bg-[#66FCF1] text-[#0B0C10] font-black text-xs uppercase tracking-tighter rounded-xl shadow-glow-cyan active:scale-95 transition-all">
            GERAR MEU DIAGNÓSTICO GRATUITO
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
