
  import React, { useState } from 'react';
  import { SALES_PAGE_CONTENT } from '../constants';
  import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

  const SalesPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
      <div className="min-h-screen bg-white text-neutral-900 pb-32">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-6 max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            {SALES_PAGE_CONTENT.headline}
          </h1>
          <p className="text-xl text-neutral-500 leading-relaxed max-w-lg mx-auto">
            {SALES_PAGE_CONTENT.subheadline}
          </p>
        </section>

        {/* Benefits */}
        <section className="px-6 max-w-xl mx-auto space-y-4">
          {SALES_PAGE_CONTENT.benefits.map((b, i) => (
            <div key={i} className="flex items-start space-x-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <CheckCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
              <span className="font-medium text-neutral-700">{b}</span>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="px-6 max-w-xl mx-auto mt-20 space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8 tracking-tight">Perguntas Frequentes</h2>
          <div className="space-y-3">
            {SALES_PAGE_CONTENT.faq.map((item, i) => (
              <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-semibold">{item.q}</span>
                  {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-neutral-500 text-sm leading-relaxed border-t border-neutral-100 pt-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Bar */}
        <div className="fixed bottom-0 left-0 w-full p-6 bg-white/90 backdrop-blur-xl border-t border-neutral-200 z-50">
          <div className="max-w-xl mx-auto">
            <button className="w-full bg-neutral-900 text-white font-bold py-5 rounded-2xl shadow-2xl hover:bg-neutral-800 active:scale-95 transition-all">
              👉 COMEÇAR COM O D4 SELLER AGORA
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default SalesPage;
