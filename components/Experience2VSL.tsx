import React, { useState, useEffect, useRef } from 'react';
import { VSL_STEPS } from '../constants';

interface Experience2VSLProps {
  onComplete: (answers: { type: string, value: number }[]) => void;
}

const Experience2VSL: React.FC<Experience2VSLProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, { type: string, score: number }>>({});
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const VIDEO_SRC = "https://res.cloudinary.com/dafhibb8s/video/upload/WhatsApp_Video_2026-01-11_at_03.41.56_e51evy.mp4";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(err => console.error("Could not play video", err));
        }
      });
    }

    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video || isFinishing) return;

      const time = video.currentTime;
      setCurrentTime(time);

      VSL_STEPS.forEach((step) => {
        if (Math.abs(time - step.timestamp) < 0.4 && !answers[step.id]) {
          if (currentQuestionId !== step.id) {
            setCurrentQuestionId(step.id);
            setIsOverlayVisible(true);
          }
        }
      });

      if (video.duration > 0 && time >= video.duration - 1.0) {
        setIsFinishing(true);
        const finalAnswers = Object.values(answers).map(a => ({ type: a.type, value: a.score }));
        const missing = VSL_STEPS.filter(s => !answers[s.id]).map(s => ({ type: s.type, value: 0 }));
        onComplete([...finalAnswers, ...missing]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [answers, currentQuestionId, isFinishing, onComplete]);

  const handleAnswer = (score: number, type: string) => {
    if (!currentQuestionId) return;
    setAnswers(prev => ({ ...prev, [currentQuestionId]: { type, score } }));
    setIsOverlayVisible(false);
    setTimeout(() => setCurrentQuestionId(null), 800);
  };

  const activeQuestion = VSL_STEPS.find(q => q.id === currentQuestionId);
  const progressPercentage = videoDuration ? (currentTime / videoDuration) * 100 : 0;

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center font-sans">
      {/* Phone/Reels Frame Container */}
      <div className="relative w-full h-full max-w-[430px] sm:max-h-[90vh] sm:rounded-[3rem] sm:border-[8px] sm:border-neutral-900 bg-black shadow-2xl overflow-hidden flex flex-col items-center justify-center">
        
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          playsInline
          preload="auto"
          onLoadedMetadata={() => setVideoDuration(videoRef.current?.duration || 0)}
        />

        {/* Dynamic Overlay Question (Top half) */}
        {activeQuestion && isOverlayVisible && (
          <div className="absolute top-0 left-0 w-full h-1/2 flex flex-col items-center justify-center z-50 animate-in fade-in slide-in-from-top duration-700 px-6">
            <div className="w-full max-w-sm bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 space-y-5 shadow-2xl">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl text-white font-black italic uppercase tracking-tighter leading-tight text-center">
                  {activeQuestion.question}
                </h2>
                {currentQuestionId === 1 && (
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] animate-pulse text-center">
                    Framework SPIN Selling Ativo
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                {activeQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.score, activeQuestion.type)}
                    className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm hover:bg-blue-600 hover:border-blue-400 transition-all font-bold uppercase tracking-tight text-left flex justify-between items-center group active:scale-95"
                  >
                    <span className="flex-1 pr-3 leading-tight">{opt.text}</span>
                    <div className="w-3 h-3 rounded-full border border-white/30 group-hover:border-white group-hover:bg-white shrink-0"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar (at top of video) */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/10 z-[60]">
          <div
            className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,1)] transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Subtitle / Microcopy Area (at bottom of video) */}
        <div className="absolute bottom-10 left-0 right-0 px-8 z-40 text-center pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 inline-block">
             <p className="text-[9px] text-neutral-300 font-black uppercase tracking-[0.4em] italic opacity-80">
               Mecanismo D4 Seller • Condução Inteligente
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience2VSL;