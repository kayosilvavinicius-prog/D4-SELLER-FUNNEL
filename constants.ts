
export const WHATSAPP_1A_MESSAGES = [
  "seja bem-vindo(a).",
  "Eu sou o D4 SELLER e sou responsável pelo seu atendimento aqui.\n\nMas antes de mais nada, eu preciso saber o seu nome.\nPode me responder, por gentileza?"
];

export const CALL_TRANSCRIPT = [
  "Aqui é o D4 Phone.",
  "Quem passou o seu contato foi o D4 Seller, que estava falando com você pelo WhatsApp.",
  "Para te dar um breve contexto:",
  "o D4 Seller e eu somos ferramentas desenvolvidas pela D4 Kingdom e, juntos, fazemos parte de um pacote de serviço de consultoria de marketing e vendas para empresas, prestadores de serviço e negócios locais, chamado Receita 360.",
  "Em outro momento, você terá a oportunidade de conhecer melhor a nossa empresa — e será um prazer te apresentar com mais calma.",
  "Mas agora, eu vou desligar.",
  "Nós precisamos entender se essa ferramenta realmente se aplica ao seu negócio e, claro, te explicar como funciona.",
  "Permaneça nessa tela.",
  "Em instantes, vamos te explicar tudo em um vídeo breve de poucos minutos."
];

// Lógica SPIN (Situação, Problema, Implicação, Necessidade)
export const VSL_STEPS = [
  {
    id: 0,
    timestamp: 10,
    text: "Situação: Se você tivesse que prever o faturamento do seu WhatsApp no próximo mês agora, você conseguiria?",
    options: [
      { text: "Sim, tenho precisão", next: 1 },
      { text: "Não, é imprevisível", next: 1 }
    ]
  },
  {
    id: 1,
    timestamp: 25,
    text: "Problema: Sua equipe hoje atua mais como 'garçons de informação' (apenas respondendo o que perguntam) ou 'condutores de decisão'?",
    options: [
      { text: "Somos garçons de informação", next: 2 },
      { text: "Tentamos conduzir, mas falhamos", next: 2 }
    ]
  },
  {
    id: 2,
    timestamp: 45,
    text: "Implicação: Você percebe que essa falta de condução é o que faz o lead 'sumir' após saber o preço, travando sua escala?",
    options: [
      { text: "Sim, perdemos muitos leads assim", next: 3 },
      { text: "Acontece com frequência", next: 3 }
    ]
  },
  {
    id: 3,
    timestamp: 55,
    text: "Necessidade: Faz sentido substituir o improviso individual por um sistema que conduz o cliente até o fechamento de forma lógica?",
    options: [
      { text: "Ativar o sistema de condução", next: 'FINISH' },
      { text: "Continuar a análise", next: 'FINISH' }
    ]
  }
];

export const QUESTIONS = [
  {
    question: "Como sua equipe inicia a maioria das conversas hoje?",
    options: [
      "Respondendo a dúvida direta do cliente",
      "Enviando uma apresentação/PDF da empresa",
      "Fazendo uma pergunta de qualificação",
      "Enviando o preço imediatamente"
    ],
    microcopy: "O início define quem detém o status na conversa."
  }
];

export const VSL_BLOCKS = [
  "O que você viu no diagnóstico foi o reflexo de uma **operação reativa**.",
  "No WhatsApp, quem faz a pergunta está no **controle**.",
  "O **D4 SELLER** inverte essa lógica através do **Mecanismo de Condução**.",
  "Isso não é manipulação. É **clareza de decisão**."
];

export const WHATSAPP_SIMULATION = [
  { day: 1, text: "Iniciando framework de condução. Dia 1: Ocupando o território mental.", xp: "+10% de atenção" },
  { day: 7, text: "Venda concluída sem esforço extra. O sistema conduziu, o vendedor apenas colheu.", xp: "LUCRO NO BOLSO" }
];

export const SALES_PAGE_CONTENT = {
  headline: "Assuma o controle total do lucro no seu WhatsApp.",
  subheadline: "O D4 SELLER não é um CRM. É a inteligência de condução que falta na sua operação.",
  benefits: [
    "Redução de 60% no tempo de atendimento",
    "Aumento imediato na taxa de conversão"
  ],
  faq: [
    { q: "Preciso trocar de CRM?", a: "Não. O D4 funciona em paralelo a qualquer estrutura atual." }
  ]
};
