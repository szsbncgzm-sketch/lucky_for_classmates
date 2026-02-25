import { useState, useCallback, useRef } from 'react';

export function useLottery() {
  const [pool, setPool] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const rollIntervalRef = useRef<number | null>(null);

  const addParticipants = useCallback((names: string[]) => {
    setPool((prev) => {
      const newPool = [...prev, ...names];
      // Remove duplicates and empty strings
      return Array.from(new Set(newPool.map(n => n.trim()).filter(Boolean)));
    });
  }, []);

  const startRoll = useCallback(() => {
    if (pool.length === 0) return;
    setIsRolling(true);
    setWinner(null);

    rollIntervalRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * pool.length);
      setCurrentCandidate(pool[randomIndex]);
    }, 50); // Fast rolling
  }, [pool]);

  const stopRoll = useCallback(() => {
    if (!isRolling || pool.length === 0) return;
    
    if (rollIntervalRef.current) {
      clearInterval(rollIntervalRef.current);
    }

    // Pick a final winner
    const randomIndex = Math.floor(Math.random() * pool.length);
    const finalWinner = pool[randomIndex];
    
    setIsRolling(false);
    setWinner(finalWinner);
    setCurrentCandidate(finalWinner);

    // Update pools
    setPool((prev) => prev.filter(name => name !== finalWinner));
    setWinners((prev) => [...prev, finalWinner]);
  }, [isRolling, pool]);

  const reset = useCallback(() => {
    setPool([]);
    setWinners([]);
    setWinner(null);
    setCurrentCandidate(null);
    setIsRolling(false);
    if (rollIntervalRef.current) {
      clearInterval(rollIntervalRef.current);
    }
  }, []);

  return {
    pool,
    winners,
    isRolling,
    currentCandidate,
    winner,
    addParticipants,
    startRoll,
    stopRoll,
    reset
  };
}
