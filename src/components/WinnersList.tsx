import { motion, AnimatePresence } from 'motion/react';
import { Trophy } from 'lucide-react';

interface WinnersListProps {
  winners: string[];
}

export function WinnersList({ winners }: WinnersListProps) {
  return (
    <div className="flex h-full min-h-0 flex-col p-5 text-white/90">
      <div className="mb-5 flex items-center gap-3">
        <Trophy className="h-5 w-5 text-violet-200/90" />
        <h2 className="text-base font-semibold tracking-tight text-white/90">中奖名单</h2>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {winners.map((winner, index) => (
              <motion.div
                key={`${winner}-${index}`}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="mac-card flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3 shadow-none"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] text-xs font-mono font-bold text-white/[0.85]">
                  {index + 1}
                </span>
                <span className="text-lg font-medium tracking-wide text-white/90">{winner}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {winners.length === 0 && (
            <div className="py-10 text-center text-sm text-white/35">
              暂无中奖者
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
