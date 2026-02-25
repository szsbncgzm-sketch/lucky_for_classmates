import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface LotteryScreenProps {
  isRolling: boolean;
  currentCandidate: string | null;
  winner: string | null;
  onStart: () => void;
  onStop: () => void;
  poolSize: number;
}

export function LotteryScreen({
  isRolling,
  currentCandidate,
  winner,
  onStart,
  onStop,
  poolSize
}: LotteryScreenProps) {
  
  useEffect(() => {
    if (winner) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FF0000', '#FFFFFF']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FF0000', '#FFFFFF']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [winner]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 mb-12 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        幸运大抽奖
      </motion.h1>

      {/* Main Display Area */}
      <div className="relative w-full max-w-3xl aspect-[2/1] bg-red-950/40 backdrop-blur-xl border-4 border-yellow-500/50 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.2)] flex items-center justify-center overflow-hidden">
        
        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-yellow-500/50 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-yellow-500/50 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-yellow-500/50 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-yellow-500/50 rounded-br-lg" />

        <AnimatePresence mode="wait">
          {currentCandidate ? (
            <motion.div
              key={winner ? 'winner' : currentCandidate}
              initial={winner ? { scale: 0.5, opacity: 0 } : { y: 20, opacity: 0 }}
              animate={winner ? { scale: 1, opacity: 1 } : { y: 0, opacity: 1 }}
              exit={winner ? {} : { y: -20, opacity: 0 }}
              transition={
                winner 
                  ? { type: 'spring', stiffness: 200, damping: 15 }
                  : { duration: 0.05 }
              }
              className={`text-6xl md:text-8xl font-black tracking-wider ${
                winner 
                  ? 'text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]' 
                  : 'text-white/90 drop-shadow-lg'
              }`}
            >
              {currentCandidate}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl text-yellow-500/50 font-medium tracking-widest"
            >
              等待抽取...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <button
          onClick={isRolling ? onStop : onStart}
          disabled={poolSize === 0 && !isRolling}
          className={`
            relative group overflow-hidden rounded-full px-12 py-4 text-2xl font-bold tracking-widest transition-all duration-300
            ${poolSize === 0 && !isRolling 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-2 border-gray-700' 
              : isRolling
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-400 shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-105'
                : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-950 border-2 border-yellow-300 shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:scale-105'
            }
          `}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {isRolling ? '停！' : '开始抽奖'}
        </button>
        
        <p className="text-yellow-500/60 text-sm font-mono">
          奖池剩余: {poolSize} 人
        </p>
      </div>
    </div>
  );
}
