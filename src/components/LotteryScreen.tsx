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
          colors: ['#60A5FA', '#A78BFA', '#FFFFFF']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#60A5FA', '#A78BFA', '#FFFFFF']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [winner]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 flex items-center gap-2 text-xs text-slate-200/70"
      >
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
          奖池 {poolSize} 人
        </span>
        <span className="hidden sm:inline">抽奖过程支持随时停止并锁定当前人选</span>
      </motion.div>

      {/* Main Display Area */}
      <div className="mac-card relative flex aspect-[2/1] w-full max-w-3xl items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(900px 420px at 30% 20%, rgba(99,102,241,0.35), transparent 55%), radial-gradient(800px 520px at 76% 72%, rgba(56,189,248,0.22), transparent 58%)'
          }}
        />

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
                  ? 'text-white drop-shadow-[0_0_34px_rgba(99,102,241,0.55)]' 
                  : 'text-white/92 drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)]'
              }`}
            >
              {currentCandidate}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-semibold tracking-wide text-white/55"
            >
              等待抽取...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={isRolling ? onStop : onStart}
          disabled={poolSize === 0 && !isRolling}
          className={[
            'mac-button relative group overflow-hidden px-10 py-3 text-lg font-semibold tracking-wide',
            poolSize === 0 && !isRolling
              ? 'cursor-not-allowed opacity-40'
              : isRolling
                ? 'mac-button-danger'
                : 'mac-button-primary'
          ].join(' ')}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {isRolling ? '停！' : '开始抽奖'}
        </button>
        
        <p className="text-xs font-mono text-slate-200/60">奖池剩余: {poolSize} 人</p>
      </div>
    </div>
  );
}
