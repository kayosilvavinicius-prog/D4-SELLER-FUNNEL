
export const EXECUTIVE_AVATAR = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/d9cf14d6887c1cad630073a55c3aa042c398ca0e/D4%20PHONE.png";
export const EXPERT_AVATAR = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/25a4ca20f8a07aafbdab8bad0043f426da8be2c9/ENGENHEIRO%20DE%20VENDAS.jpeg"; 
export const EXPERT_SALES_CHAMPION_PHOTO = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/b041099a9a31c47f100cb2f568266a07da45bfab/CAMPEAO%20DE%20VENDAS.jpeg";
export const EXPERT_TECHNICAL_PHOTO = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/7176d938a53acf0159d224f920973e5e1fc6c620/TECNICO.png";
export const EXPERT_TRAINING_PHOTO = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/866ed3a59638ceb158f4cc5a9aff530242add4ef/ChatGPT%20Image%20Jan%2011%2C%202026%2C%2002_13_54%20PM.png";
export const EXPERT_MISSION_PHOTO = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/b4202db17d38e3005f86963fecaf863a31685438/KAYO%20PALESTRANDO.jpeg";
export const EXPERT_FAMILY_PHOTO = "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800";

export const KEYBOARD_SOUND_URL = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/main/mixkit-keyboard-typing-1386.wav";
export const SENT_SOUND_URL = "https://raw.githubusercontent.com/kayosilvavinicius-prog/D4-SELLER-FUNNEL/main/whatsapp_sent_sound.mp3";

export const WHATSAPP_1A_MESSAGES = [
  "seja bem-vindo(a).",
  "Eu sou o D4 SELLER e sou responsável pelo seu atendimento aqui.\n\nMas antes de mais nada, eu preciso saber o seu nome.\nPode me responder, por gentileza?"
];

export const CALL_TRANSCRIPT_TIMED = [
  { text: "Oi, aqui é o D4 Phone.", start: 0 },
  { text: "Quem passou o seu contato foi o D4 Seller, que estava falando com você agora há pouco pelo WhatsApp.", start: 2.2 },
  { text: "Só pra te dar um contexto rápido:", start: 8.8 },
  { text: "o D4 Seller e eu somos ferramentas desenvolvidas pela D4 Kingdom e, juntos, fazemos parte de um pacote de consultoria de marketing e vendas para empresas, prestadores de serviço e negócios locais, chamado Receita 360.", start: 11.0 },
  { text: "Em outro momento, você vai ter a oportunidade de conhecer melhor a nossa empresa — e vai ser um prazer te apresentar tudo com mais calma.", start: 24.8 },
  { text: "Mas agora eu vou desligar.", start: 33.5 },
  { text: "A gente precisa entender se essa ferramenta realmente faz sentido para o seu negócio e, claro, te explicar como funciona.", start: 35.8 },
  { text: "Fica nessa tela.", start: 42.5 },
  { text: "Em instantes, a gente vai te explicar tudo em um vídeo curto, de poucos minutos.", start: 44.2 }
];

export const VSL_STEPS = [
  {
    id: 1,
    type: "situation",
    timestamp: 44,
    question: "Quando um cliente interessado entra em contato, o que normalmente acontece primeiro?",
    options: [
      { text: "Respondemos rápido, mas cada vendedor/atendente conduz a conversa do seu jeito.", score: 5 },
      { text: "Seguimos um roteiro básico, mas adaptamos muito conforme a situação", score: 7 },
      { text: "Temos etapas claras: qualificação → apresentação → proposta → fechamento", score: 10 },
      { text: "Respondemos quando dá e vamos levando a conversa", score: 2 }
    ]
  },
  {
    id: 2,
    type: "problem",
    timestamp: 86,
    question: "Qual é o maior gargalo entre o cliente demonstrar interesse e você fechar a venda?",
    options: [
      { text: "Demora na resposta ou follow-up inconsistente", score: 3 },
      { text: "Cliente esfria no meio da negociação e some", score: 5 },
      { text: "Time não sabe como conduzir objeções ou dúvidas", score: 4 },
      { text: "Falta clareza sobre quando e como ‘apertar’ para o fechamento", score: 6 }
    ]
  },
  {
    id: 3,
    type: "implication",
    timestamp: 120,
    question: "Se você continuar perdendo vendas ‘no meio do caminho’ pelos próximos 6 meses, o que isso significa para o seu negócio?",
    options: [
      { text: "Vou continuar crescendo devagar, mas poderia ser muito mais rápido", score: 5 },
      { text: "Vou perder espaço para concorrentes que vendem melhor", score: 4 },
      { text: "Posso comprometer metas, investimentos e até a saúde financeira da empresa", score: 2 },
      { text: "Vou continuar dependendo de ‘sorte’ ao invés de previsibilidade", score: 3 }
    ]
  },
  {
    id: 4,
    type: "need",
    timestamp: 159,
    question: "A maioria dos empresários foca em atrair mais gente interessada. Mas e se você pudesse converter 30-50% mais das pessoas que já chegam até você, sem custo adicional de equipe ou marketing — o que isso mudaria no seu negócio?",
    options: [
      { text: "Aumentaria meu lucro sem aumentar minha estrutura", score: 10 },
      { text: "Me daria mais estabilidade para tomar decisões maiores", score: 9 },
      { text: "É onde está meu maior gargalo agora", score: 10 },
      { text: "Quero entender melhor como aplicar isso no meu negócio", score: 6 }
    ]
  },
  {
    id: 5,
    type: "fit",
    timestamp: 207,
    question: "Hoje, qual é o faturamento médio mensal do seu negócio?",
    options: [
      { text: "Até R$10.000", score: 2 },
      { text: "De R$10.001 a R$15.000", score: 5 },
      { text: "De R$15.001 a R$50.000", score: 8 },
      { text: "Acima de R$50.000", score: 10 }
    ]
  }
];

export const SALES_PAGE_CONTENT = {
  headline: "Assuma o controle total do lucro no seu WhatsApp.",
  subheadline: "O D4 SELLER não é um CRM. É a inteligência de condução que falta na sua operação.",
  benefits: [
    "Redução de 60% no tempo de atendimento",
    "Aumento imediato na taxa de conversão",
    "Previsibilidade total de fechamento"
  ],
  faq: [
    { q: "Preciso trocar de CRM?", a: "Não. O D4 funciona em paralelo a qualquer estrutura atual." }
  ]
};

export const QUESTIONS = [
  {
    question: "Como você descreveria seu processo atual de vendas?",
    microcopy: "Seja sincero, ninguém está olhando.",
    options: [
      "Processo reativo: espero o cliente pedir.",
      "Processo ativo: eu conduzua conversa.",
      "Processo misto: depende do vendedor.",
      "Não tenho um processo definido."
    ]
  },
  {
    question: "Qual o seu principal canal de aquisição de clientes?",
    options: [
      "Indicação e boca a boca.",
      "Tráfego pago (Ads).",
      "Redes sociais orgânico.",
      "Outros."
    ]
  }
];

export const VSL_BLOCKS = [
  "O mercado mudou. **Não basta mais ter um bom produto.**",
  "A atenção é a nova moeda, mas a **condução é o novo ouro.**",
  "Empresas que não dominam o fechamento no WhatsApp estão **deixando dinheiro na mesa todos os dias.**",
  "O D4 SELLER nasceu para resolver o vácuo entre o 'Oi' e o 'Pix'.",
  "Prepare-se para ver sua conversão **dobrar nas próximas semanas.**"
];

export const WHATSAPP_SIMULATION = [
  { day: 1, text: "Olá! Notei que você se interessou pelo nosso framework.", xp: "+10 XP" },
  { day: 2, text: "Ainda não recebi seu retorno sobre o diagnóstico. Vamos conversar?", xp: "Follow-up Ativo" },
  { day: 3, text: "Aqui está um depoimento de quem aplicou o método e teve resultados.", xp: "Prova Social" }
];
