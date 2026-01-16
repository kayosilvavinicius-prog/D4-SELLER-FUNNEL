
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
  Shield,
  Target,
  Layers,
  ZapOff,
  XCircle,
  MessageSquare,
  Scissors,
  Home,
  Stethoscope,
  HeartPulse,
  Brain,
  Quote,
  Sparkles,
  Calendar,
  Clock,
  Link2,
  Headset,
  FileText,
  Database,
  History,
  Settings2,
  ToggleRight,
  MessageSquareMore,
  UploadCloud,
  Globe2,
  Eye,
  Instagram,
  MapPin,
  Check,
  Zap as ZapIcon,
  CircleDollarSign,
  Gift,
  Frown,
  Scale,
  BadgeDollarSign,
  Building2,
  Utensils,
  Car,
  Plane,
  Plus,
  ShoppingCart
} from 'lucide-react';
import { 
  EXPERT_AVATAR, 
  EXPERT_FAMILY_PHOTO, 
  EXPERT_SALES_CHAMPION_PHOTO, 
  EXPERT_TECHNICAL_PHOTO, 
  EXPERT_TRAINING_PHOTO,
  EXPERT_MISSION_PHOTO 
} from '../constants';
import PrivacyModal from './PrivacyModal';

interface SalesPageProps {
  onTrack?: (eventName: string, extraData?: any) => void;
}

const SalesPage: React.FC<SalesPageProps> = ({ onTrack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isExpertExpanded, setIsExpertExpanded] = useState(false);
  const [showMecanismoVideo, setShowMecanismoVideo] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToOffers = () => {
    // Tracking do clique no CTA
    if (onTrack) onTrack('CLIQUE_CTA_PAGINA_VENDAS');
    
    const element = document.getElementById('offer-147');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExternalOfferClick = (plano: string) => {
    if (onTrack) onTrack('CLIQUE_BOTAO_COMPRA', { plano });
    // Aqui viria o link do checkout (Hotmart, Kiwify, etc)
    console.log(`Redirecionando para checkout: ${plano}`);
  };

  const testimonials = [
    {
      niche: "Barbearia",
      icon: Scissors,
      text: "O D4 Seller mapeou a recorrência dos meus clientes. Se o cliente não agenda em 20 dias, o mecanismo entra em ação e recupera a venda sozinho. Agenda lotada sem esforço manual.",
      author: "Marcio • Barber Shop de Elite"
    },
    {
      niche: "Imobiliária",
      icon: Home,
      text: "A engenharia de condução resolveu o problema do lead 'curioso'. O sistema filtra renda e intenção real antes de passar para o corretor. Eficiência pura no fechamento.",
      author: "Roberto • Diretor Comercial"
    },
    {
      niche: "Clínica Odontológica",
      icon: Stethoscope,
      text: "O SPIN Selling aplicado à saúde. O mecanismo entende a dor do paciente e cria a urgência do tratamento antes mesmo da primeira consulta. Reduzimos as faltas em 40%.",
      author: "Dra. Juliana • Odonto Premium"
    },
    {
      niche: "Emagrecimento",
      icon: HeartPulse,
      text: "Qualificação Cirúrgica. Minha taxa de conversão em mentorias subiu 35% porque o lead já chega 'quente' e decidido. O bot faz a triagem emocional perfeita.",
      author: "Renata • Mentoria de Emagrecimento"
    },
    {
      niche: "Psicologia",
      icon: Brain,
      text: "Triagem técnica com acolhimento. O sistema garante que eu atenda apenas campos da minha especialidade, alinhando expectativas e otimizando 100% da minha agenda clínica.",
      author: "Dra. Beatriz • Psicologia Clínica"
    }
  ];

  const niches = [
    { name: "Infoprodutores", icon: GraduationCap },
    { name: "Clínicas & Saúde", icon: HeartPulse },
    { name: "Estética & Beleza", icon: Scissors },
    { name: "Imobiliárias", icon: Home },
    { name: "Advocacia", icon: Scale },
    { name: "SaaS & Tech", icon: Cpu },
    { name: "E-commerce", icon: ShoppingCart },
    { name: "Serviços B2B", icon: Briefcase },
  ];

  const faqs = [
    { 
      q: "O cliente vai perceber que é um robô?", 
      a: "Não. Diferente de chatbots comuns que usam botões engessados, o D4 Seller utiliza Processamento de Linguagem Natural (NLP) e lógica SPIN Selling. A conversa flui como um diálogo humano, focado em entender a dor do lead antes de oferecer a solução." 
    },
    { 
      q: "Meu número de WhatsApp corre risco de ser banido?", 
      a: "Nossa tecnologia utiliza protocolos de 'Engenharia de Condução' que respeitam os limites de cadência e comportamento humano do WhatsApp. Além disso, trabalhamos com as melhores práticas para garantir a integridade do seu canal oficial de vendas." 
    },
    { 
      q: "Quanto tempo demora para o sistema estar rodando?", 
      a: "Em menos de 30 minutos seu sistema já pode estar rodando. É só assistir as aulas rápidas de orientação e começar a vender." 
    },
    { 
      q: "Funciona para qualquer tipo de negócio?", 
      a: "Sim. O framework Receita 360 foi validado em mais de 40 nichos diferentes, desde prestação de serviços locais (clínicas, estética) até vendas complexas (B2B, consultorias) e infoprodutos." 
    },
    { 
      q: "Preciso saber programar ou ter conhecimentos técnicos?", 
      a: "Absolutamente não. O D4 Seller é plug-and-play. Nossa equipe de engenharia de vendas cuida de toda a parte técnica. Sua única função é gerir o fluxo de oportunidades que chegará no CRM." 
    },
    { 
      q: "Tenho um time de vendas, o D4 Seller substitui meus vendedores?", 
      a: "Não, ele os empodera. O D4 Seller atua como o 'SDR Perfeito' (Pré-vendedor), qualificando e aquecendo o lead. O seu vendedor recebe apenas leads prontos para o fechamento, aumentando drasticamente a produtividade do time." 
    },
    { 
      q: "Como o sistema entende meu negócio específico?", 
      a: "Através de um mapeamento inicial de condução. Traduzimos seu roteiro atual (ou criamos um do zero baseado nos seus melhores fechamentos) para a lógica SPIN dentro da nossa inteligência." 
    }
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
            Durma tranquilo sabendo que cada conversa, ligação e decisão do seu negócio está sob controle. Nosso sistema cuida do fluxo — para que você cuide do que realmente importa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button 
              onClick={scrollToOffers}
              className="group relative px-8 py-5 bg-[#66FCF1] text-[#0B0C10] font-black text-lg rounded-xl shadow-glow-cyan transition-all flex items-center space-x-3 active:scale-95"
            >
              <span>QUERO ACESSAR A SOLUÇÃO</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center space-x-2 text-[#45A29E] text-xs font-bold uppercase tracking-widest">
              <Lock size={14} />
              <span>Sem compromisso, apenas clareza.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O MECANISMO D4 SELLER */}
      <section className="py-24 px-6 bg-[#0B0C10] relative overflow-hidden border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase">
              O Mecanismo <span className="text-[#66FCF1]">D4 SELLER</span>
            </h2>
            <p className="text-[#C5C6C7] text-lg max-w-2xl mx-auto font-light">
              Não é um chatbot de perguntas e respostas. É a automação da lógica de vendas complexas (SPIN Selling) dentro do seu fluxo de atendimento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6 flex flex-col items-center lg:items-center">
              <div className="relative group w-full max-w-[260px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#66FCF1] to-blue-500 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative aspect-[9/16] bg-[#1F2833] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center cursor-pointer">
                  {!showMecanismoVideo ? (
                    <div 
                      onClick={() => setShowMecanismoVideo(true)}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all"
                    >
                      <div className="w-16 h-16 bg-[#66FCF1] text-[#0B0C10] rounded-full flex items-center justify-center shadow-glow-cyan group-hover:scale-110 transition-transform">
                        <PlayCircle size={32} className="fill-current" />
                      </div>
                      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-white text-center px-4">Demonstração Prática</p>
                      <img 
                        src="https://res.cloudinary.com/dafhibb8s/image/upload/v1768168506/CAPA_D4_SELLER_dcprpi.jpg" 
                        alt="Capa D4 Seller" 
                        className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-105 transition-all duration-1000"
                      />
                    </div>
                  ) : (
                    <iframe 
                      src="https://player.cloudinary.com/embed/?cloud_name=dafhibb8s&public_id=D4_SELLER_NA_PRATICA_m4solp&profile=cld-default&autoplay=true"
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                  )}
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 space-y-3 w-full max-w-[260px] text-center">
                <h3 className="text-lg font-bold flex items-center justify-center space-x-2 italic">
                  <Target className="text-[#66FCF1]" size={18} />
                  <span>D4 SELLER NA PRÁTICA</span>
                </h3>
                <p className="text-[12px] text-[#C5C6C7] leading-relaxed">
                  O sistema não apenas responde, ele <strong>conduz</strong> o lead ao fechamento através de lógica SPIN nativa.
                </p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4 text-center lg:text-left">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Motivos para ter o <span className="text-[#66FCF1]">D4 Seller</span> na Sua Empresa</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#66FCF1]/10 border border-[#66FCF1]/20 p-6 rounded-3xl space-y-3 shadow-glow-cyan text-left">
                    <div className="flex items-center space-x-2 text-[#66FCF1]">
                      <BadgeDollarSign size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Economia Real</span>
                    </div>
                    <p className="text-xs text-white/90 font-medium">Livre de salários, encargos ou comissões. Um "vendedor" de elite com custo fixo irrisório para sua operação.</p>
                  </div>
                  <div className="bg-[#66FCF1]/10 border border-[#66FCF1]/20 p-6 rounded-3xl space-y-3 shadow-glow-cyan text-left">
                    <div className="flex items-center space-x-2 text-[#66FCF1]">
                      <Frown size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Sem Variação de Humor</span>
                    </div>
                    <p className="text-xs text-white/90 font-medium">Diferente de humanos, o sistema não cansa e não depende do humor para vender bem. Performance 100% constante.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#66FCF1]/10 border border-[#66FCF1]/20 p-6 rounded-3xl space-y-3 shadow-glow-cyan text-left">
                    <div className="flex items-center space-x-2 text-[#66FCF1]">
                      <Scale size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Fidelidade ao Script</span>
                    </div>
                    <p className="text-xs text-white/90 font-medium">O mecanismo segue 100% da lógica SPIN Selling e do seu processo validado, sem atalhos ou esquecimentos.</p>
                  </div>
                  <div className="bg-[#66FCF1]/10 border border-[#66FCF1]/20 p-6 rounded-3xl space-y-3 shadow-glow-cyan text-left">
                    <div className="flex items-center space-x-2 text-[#66FCF1]">
                      <PhoneCall size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Condução Ativa 360</span>
                    </div>
                    <p className="text-xs text-white/90 font-medium">O sistema assume o controle. Se o lead parar de responder, o D4 Seller sabe exatamente como trazê-lo de volta.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex items-start space-x-4 text-sm text-[#C5C6C7] bg-[#1F2833] p-8 rounded-[2rem] border border-[#66FCF1]/20 shadow-glow-cyan/10 text-left">
                  <ShieldCheck className="text-[#66FCF1] shrink-0" size={28} />
                  <p className="leading-relaxed italic">O D4 Seller integra a <strong>Engenharia de Vendas da D4 Kingdom</strong> e lógica SPIN Selling nativa. Junto ao D4 Phone, compõe o pacote <strong>Receita 360</strong>, a solução completa para automação comercial.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AGENDAMENTO INTELIGENTE */}
      <section className="py-24 px-6 bg-[#0B0C10] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-12 text-center lg:text-left">
            <div className="space-y-6 max-w-3xl mx-auto lg:mx-0">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-[#66FCF1] font-black uppercase text-[10px] tracking-[0.3em] bg-[#66FCF1]/10 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>Agendamento & Sincronização</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase leading-tight">
                  Automatize o <span className="text-[#66FCF1]">agendamento</span> de consultas e lembretes.
                </h2>
                <p className="text-[#C5C6C7] text-lg font-light relaxed font-light leading-relaxed">
                  Clínicas odontológicas, salões de beleza, concessionárias e outros prestadores de serviços que precisam fazer agendamentos em calendários agora podem respirar aliviados.
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-4 hover:border-[#66FCF1]/30 transition-colors">
                <div className="w-12 h-12 bg-[#66FCF1]/10 rounded-xl flex items-center justify-center text-[#66FCF1] shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#66FCF1] mb-1 italic text-lg">Conexão em Tempo Real</h4>
                  <p className="text-sm text-[#C5C6C7]">O D4 Seller se conecta a qualquer calendário em tempo real e automatiza os agendamentos pra você, sem conflitos de horário.</p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-2 bg-[#66FCF1]/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="relative bg-[#1F2833] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-10 animate-float">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">31</div>
                        <span className="font-bold text-lg">Janeiro 2026</span>
                      </div>
                      <div className="flex space-x-1.5">
                        {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-white/10" />)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-[9px] text-white/30 font-black text-center mb-4 uppercase tracking-[0.2em]">
                      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2 sm:gap-4">
                      {[...Array(31)].map((_, i) => {
                        const isBooked = [14, 15, 20, 21, 22, 28].includes(i + 1);
                        const isCurrent = i + 1 === 18;
                        return (
                          <div 
                            key={i} 
                            className={`aspect-square rounded-xl flex items-center justify-center text-xs sm:text-sm font-black transition-all cursor-default ${
                              isBooked ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_15px_rgba(102,252,241,0.6)] scale-110' : 
                              isCurrent ? 'border-2 border-[#66FCF1] text-[#66FCF1]' : 'bg-white/5 text-white/30'
                            }`}
                          >
                            {i + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEPOIMENTOS */}
      <section className="py-24 px-6 bg-[#0B0C10] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase">
              Quem usa <span className="text-[#66FCF1]">confia</span>
            </h2>
            <p className="text-[#C5C6C7] text-lg max-w-2xl mx-auto font-light">
              Resultados reais de quem aplicou a Engenharia de Vendas no dia a dia do seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#1F2833]/40 p-8 rounded-[2.5rem] border border-white/5 hover:border-[#66FCF1]/20 transition-all group">
                <div className="w-12 h-12 bg-[#66FCF1]/10 rounded-xl flex items-center justify-center text-[#66FCF1] mb-6 group-hover:scale-110 transition-transform">
                  <t.icon size={24} />
                </div>
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#66FCF1] bg-[#66FCF1]/5 px-3 py-1 rounded-full">
                    {t.niche}
                  </span>
                </div>
                <p className="text-[#C5C6C7] leading-relaxed italic mb-8 font-light italic">
                  "{t.text}"
                </p>
                <div className="flex items-center space-x-3 border-t border-white/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-[#66FCF1]/20 flex items-center justify-center text-[#66FCF1] font-bold text-xs italic">
                    {t.author.charAt(0)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">{t.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NICHOS VALIDADOS */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase">
              Nichos <span className="text-[#66FCF1]">Validados</span>
            </h2>
            <p className="text-[#C5C6C7] text-lg max-w-2xl mx-auto font-light">
              O Framework Receita 360 já escalou operações em diversos setores.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {niches.map((n, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col items-center text-center space-y-4 hover:bg-[#66FCF1]/5 hover:border-[#66FCF1]/20 transition-all cursor-default">
                <n.icon size={32} className="text-[#66FCF1]" />
                <span className="text-xs font-black uppercase tracking-widest">{n.name}</span>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-[#1F2833]/40 border-2 border-dashed border-[#66FCF1]/20 rounded-[3rem] p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-[#66FCF1]/10 rounded-full flex items-center justify-center mx-auto text-[#66FCF1]">
              <Plus size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Não encontrou seu nicho aqui?</h3>
            <p className="text-[#C5C6C7] font-light leading-relaxed max-w-xl mx-auto">
              Nossa engenharia de vendas é altamente adaptável. Se você vende pelo WhatsApp, nós podemos otimizar seu processo transformando atendimentos em lucro previsível através do nosso método validado.
            </p>
            <div className="pt-4">
              <button 
                onClick={scrollToOffers}
                className="px-8 py-5 bg-[#66FCF1] text-[#0B0C10] font-black text-sm rounded-2xl shadow-glow-cyan hover:scale-[1.03] transition-all uppercase tracking-[0.2em] active:scale-95 flex items-center justify-center space-x-3 mx-auto"
              >
                <span>QUERO ACESSAR A SOLUÇÃO</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OFERTAS IRRESISTÍVEIS */}
      <section id="offers" className="py-24 px-6 bg-[#050505] relative overflow-hidden border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center space-x-2 text-[#66FCF1] font-black uppercase text-[10px] tracking-[0.4em] bg-[#66FCF1]/10 px-4 py-2 rounded-full mb-4">
              <CircleDollarSign size={16} />
              <span>OFERTA DE LANÇAMENTO</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
              Durma tranquilo com suas <span className="text-[#66FCF1]">vendas sob controle</span>
            </h2>
            <p className="text-[#C5C6C7] text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Selecione o plano D4 Seller adequado a seu momento atual e sinta a tranquilidade de ter cada etapa das suas vendas conduzida com método e precisão 24 horas por dia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* PLANO 1: D4 SELLER MENSAL */}
            <div className="group relative bg-[#1F2833]/40 p-10 rounded-[3rem] border border-white/10 hover:border-[#66FCF1]/40 transition-all duration-500 flex flex-col justify-between shadow-2xl">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">D4 SELLER</h3>
                  <div className="inline-block px-3 py-1 bg-white/5 rounded-full">
                     <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em]">Plano Mensal Recorrente</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm text-red-500/80 font-bold line-through tracking-widest">DE R$ 247,00/mês</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm text-white/40 font-bold uppercase">POR</span>
                    <span className="text-6xl font-black text-[#66FCF1] shadow-glow-cyan/20 tracking-tighter">R$ 94,00</span>
                    <span className="text-xs text-white/40 uppercase font-bold tracking-widest">/ mês</span>
                  </div>
                </div>

                <div className="space-y-5 pt-8 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#66FCF1] flex items-center space-x-2">
                    <Check size={14} /> <span>O que você recebe:</span>
                  </p>
                  <ul className="grid grid-cols-1 gap-4">
                    {[
                      "CRM - D4 KINGDOM",
                      "Agente de Condução Ativa (WhatsApp)",
                      "Template com Lógica SPIN para implementação",
                      "Template com Configuração de Identidade e Tom",
                      "Painel de Dados em Tempo Real",
                      "Aulas gravadas para uso do CRM",
                      "Gestão de Conversas e Oportunidades",
                      "Gestão de Tarefas da Equipe de Vendas",
                      "Integração com sistemas externos",
                      "500 Conversas mensais"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors">
                        <div className="w-5 h-5 bg-[#66FCF1]/10 rounded-md flex items-center justify-center text-[#66FCF1] shrink-0 mt-0.5"><Check size={12} /></div>
                        <span className="leading-tight font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-12">
                <button 
                  onClick={() => handleExternalOfferClick('D4_SELLER_MENSAL')}
                  className="w-full py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white hover:text-[#0B0C10] transition-all uppercase tracking-widest text-xs active:scale-95 shadow-xl"
                >
                  CONTRATAR D4 SELLER MENSAL
                </button>
              </div>
            </div>

            {/* PLANO 2: D4 SELLER + DIAGNÓSTICO (ESTRELA) */}
            <div id="offer-147" className="group relative bg-[#0B0C10] p-10 rounded-[3rem] border-2 border-[#66FCF1] shadow-glow-cyan transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#66FCF1] text-[#0B0C10] px-8 py-3 font-black text-[11px] uppercase tracking-widest rounded-bl-[2rem] shadow-lg z-10">
                MELHOR CUSTO BENEFÍCIO
              </div>
              
              <div className="space-y-10 relative z-10">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">D4 SELLER + DIAGNÓSTICO</h3>
                  <div className="inline-block px-3 py-1 bg-[#66FCF1]/10 rounded-full">
                     <p className="text-[10px] text-[#66FCF1] font-bold uppercase tracking-[0.2em]">Receita 360 Experience</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm text-red-500 font-bold line-through tracking-widest">DE R$ 399,00</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm text-white/40 font-bold uppercase">POR APENAS</span>
                    <span className="text-6xl font-black text-[#66FCF1] tracking-tighter">R$ 147,00</span>
                    <span className="text-xs text-white/40 uppercase font-bold tracking-widest">/ taxa única</span>
                  </div>
                  <p className="text-[10px] text-white/40 font-bold italic tracking-widest">*Inclui 1º mês do D4 Seller</p>
                </div>

                <div className="space-y-6 pt-8 border-t border-white/10">
                  <div className="bg-[#66FCF1]/5 p-5 rounded-2xl border border-[#66FCF1]/20">
                     <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#66FCF1] mb-4 flex items-center space-x-2">
                        <Star size={14} className="fill-current" /> <span>Entregáveis da Reunião de Diagnóstico:</span>
                     </p>
                     <ul className="space-y-4">
                        {[
                          "Reunião de 1h com Especialista D4",
                          "Mapeamento de Funil Receita 360",
                          "Auditoria de Processos Comerciais",
                          "Plano de Escala Personalizado",
                          "Identificação de Gargalos de Conversão",
                          "Definição de Script de Atendimento Estratégico",
                          "Apresentação do Plano Receita 360 + D4 Phone."
                        ].map((item, i) => (
                          <li key={i} className="flex items-start space-x-3 text-sm text-white">
                            <ZapIcon size={16} className="text-[#66FCF1] shrink-0 mt-0.5 fill-current" />
                            <span className="font-bold italic">{item}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] text-white/70 font-medium leading-relaxed uppercase tracking-tighter">
                      + Todos os entregáveis técnicos do plano D4 Seller incluídos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-12 relative z-10">
                <button 
                  onClick={() => handleExternalOfferClick('D4_SELLER_DIAGNOSTICO_147')}
                  className="w-full py-6 bg-[#66FCF1] text-[#0B0C10] font-black rounded-2xl shadow-glow-cyan hover:scale-[1.03] transition-all uppercase tracking-[0.2em] text-sm active:scale-95 flex items-center justify-center space-x-3"
                >
                  <span>RESERVAR MEU DIAGNÓSTICO 360</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* NOTAS E POLÍTICAS DE VALOR */}
          <div className="mt-20 max-w-2xl mx-auto">
             <div className="bg-[#1F2833]/30 rounded-[2.5rem] p-10 border border-[#66FCF1]/10 flex flex-col space-y-4 hover:border-[#66FCF1]/30 transition-all group">
                <div className="w-14 h-14 bg-[#66FCF1]/10 rounded-2xl flex items-center justify-center text-[#66FCF1] shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
                </div>
                <div className="space-y-3">
                   <h4 className="text-lg font-black uppercase tracking-widest text-[#66FCF1] italic">Reembolso Garantido na Migração</h4>
                   <p className="text-sm text-white/60 leading-relaxed font-light italic">
                     Se você contratar o <strong>D4 SELLER + DIAGNÓSTICO</strong> e, após a nossa reunião estratégica, decidir migrar para o plano completo <strong>RECEITA 360</strong>, o valor de <strong>R$ 147,00 será INTEGRALMENTE DEVOLVIDO</strong> ou abatido como crédito no seu novo contrato. Risco zero.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. GARANTIA */}
      <section className="py-24 px-6 bg-[#0B0C10] border-y border-white/5">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1F2833] to-[#0B0C10] p-12 sm:p-20 rounded-[4rem] border border-white/5 text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12">
            <ShieldCheck size={200} className="text-[#66FCF1]" />
          </div>

          <div className="w-24 h-24 bg-[#66FCF1]/10 rounded-full flex items-center justify-center mx-auto border border-[#66FCF1]/20">
            <span className="text-[#66FCF1]"><Star size={40} className="fill-current" /></span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic text-center">Sem Risco. <span className="text-[#66FCF1]">Só Resultado.</span></h2>
            <p className="text-xl text-[#66FCF1] font-bold uppercase tracking-widest text-center">Garantia 30 Dias D4 Kingdom</p>
          </div>

          <p className="text-[#C5C6C7] leading-relaxed text-lg max-w-2xl mx-auto text-center font-light">
            Nós confiamos tanto na eficiência do D4 Seller e da metodologia Receita 360 que decidimos eliminar completamente o risco da sua decisão. Se dentro de 30 dias você não perceber evolução na sua operação, devolvemos 100% do seu investment.
          </p>
        </div>
      </section>

      {/* 8. PERGUNTAS FREQUENTES (REPOSICIONADO E REDESENHADO) */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-center">
            Perguntas <span className="text-[#66FCF1]">Frequentes</span>
          </h2>
          <p className="text-[#C5C6C7] font-light max-w-xl mx-auto">
            Esclareça suas dúvidas técnicas e operacionais sobre o ecossistema D4 Seller.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                openFaq === i 
                ? 'bg-[#1F2833] border-[#66FCF1]/40 shadow-glow-cyan/10' 
                : 'bg-[#1F2833]/30 border-white/5 hover:border-white/10 hover:bg-[#1F2833]/50'
              }`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-7 text-left group"
              >
                <span className={`font-bold text-lg transition-colors duration-300 ${openFaq === i ? 'text-[#66FCF1]' : 'text-white/90'}`}>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  openFaq === i ? 'bg-[#66FCF1] text-[#0B0C10] rotate-180 shadow-glow-cyan' : 'bg-white/5 text-white/40'
                }`}>
                  <ChevronDown size={22} className="stroke-[2.5px]" />
                </div>
              </button>
              {openFaq === i && (
                <div className="px-7 pb-8 text-[#C5C6C7] leading-relaxed animate-in fade-in slide-in-from-top-4 duration-500 text-left font-light border-t border-white/5 pt-6">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. EXPERT SECTION - KAYO VINÍCIUS */}
      <section id="hero-expert" className="bg-[#0B0C10] py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter italic">
            Por trás da Receita 360, existe um engenheiro que decidiu aplicar <span className="text-[#66FCF1]">lógica, propósito e vendas</span> para transformar o mercado.
          </h2>
          <p className="text-xl text-[#C5C6C7] font-light max-w-3xl mx-auto leading-relaxed">
            Depois de quase duas décadas ajudando grandes multinacionais a vender mais, ele decidiu usar essa mesma engenharia para escalar pequenas e médias empresas.
          </p>

          <div className="bg-[#1F2833]/50 backdrop-blur-xl rounded-[3.5rem] p-10 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden group text-left">
            <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
               <Briefcase size={200} />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-12 text-left relative z-10">
              <div className="w-44 h-44 sm:w-56 sm:h-56 shrink-0 rounded-[2.5rem] overflow-hidden border-2 border-[#66FCF1]/30 shadow-2xl bg-black">
                <img src={EXPERT_AVATAR} alt="Kayo Vinícius" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
              </div>
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-[#C5C6C7]">
                  Meu nome é <strong>Kayo Vinícius</strong>, sou <strong>esposo da Aline Neves e pai da Alicia, Matteo e Maya</strong>, <strong>Técnico em Eletrônica (Unicamp)</strong>, <strong>Engenheiro Eletricista</strong>, mentor, palestrante e consultor de empresas. Ao descobrir, na prática, o poder do conhecimento técnico aplicado às vendas, desenvolvi o método <strong>Receita 360</strong>.
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
                    <p className="text-[#C5C6C7] text-sm leading-relaxed text-left">
                      Em multinacionais como <strong>OTIS e Carrier</strong>, liderei negociações complexas em <strong>25 estados brasileiros</strong>, ultrapassando a marca de <strong>R$ 50 milhões em vendas fechadas em serviços</strong>. Premiado pelo melhor desempenho em vendas da America Latina no segmento de Engenharia Industrial em 2025.
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
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="pt-24 pb-12 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 text-center md:text-left">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">D4 <span className="text-[#66FCF1]">Kingdom</span></h1>
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] max-w-[300px]">
                Engenharia de Vendas que Move o País. Transformando empresas reais em operações comerciais previsíveis.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center justify-center md:justify-start">
                <MapPin size={10} className="mr-1.5" /> Campinas - SP
              </p>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">CNPJ: 54.706.912/0001-02</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">
              <a href="https://instagram.com/d4_kingdom" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-[#66FCF1] transition-colors">
                <Instagram size={14} />
                <span>@d4_kingdom</span>
              </a>
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Termos de Privacidade</button>
            </div>
            <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-20">© 2026 D4 Kingdom • Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-[#0B0C10]/90 backdrop-blur-xl border-t border-white/10 z-[100] transition-all duration-500 transform ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <button 
            onClick={scrollToOffers}
            className="flex-1 py-4 bg-[#66FCF1] text-[#0B0C10] font-black text-xs uppercase tracking-tighter rounded-xl shadow-glow-cyan active:scale-95 transition-all"
          >
            QUERO ACESSAR A SOLUÇÃO
          </button>
        </div>
      </div>

      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
    </div>
  );
};

export default SalesPage;
