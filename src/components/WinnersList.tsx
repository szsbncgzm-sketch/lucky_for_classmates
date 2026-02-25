import { motion, AnimatePresence } from 'motion/react';
import { Trophy } from 'lucide-react';

interface WinnersListProps {
  winners: string[];
}

export function WinnersList({ winners }: WinnersListProps) {
  return (
    <div className="w-72 bg-black/40 backdrop-blur-md border-l border-yellow-500/20 h-full p-6 flex flex-col text-white/90">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-yellow-400 tracking-wider">中奖名单</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {winners.map((winner, index) => (
              <motion.div
                key={`${winner}-${index}`}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-lg p-3"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-mono font-bold">
                  {index + 1}
                </span>
                <span className="font-medium text-lg tracking-wide">{winner}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {winners.length === 0 && (
            <div className="text-center py-10 text-white/30 text-sm">
              暂无中奖者
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
