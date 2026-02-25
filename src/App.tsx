/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLottery } from './hooks/useLottery';
import { SettingsPanel } from './components/SettingsPanel';
import { LotteryScreen } from './components/LotteryScreen';
import { WinnersList } from './components/WinnersList';

export default function App() {
  const {
    pool,
    winners,
    isRolling,
    currentCandidate,
    winner,
    addParticipants,
    startRoll,
    stopRoll,
    reset
  } = useLottery();

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-red-900 via-red-950 to-black overflow-hidden font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-600/10 blur-[120px]" />
      </div>

      {/* Left Sidebar: Settings */}
      <div className="relative z-10 h-full">
        <SettingsPanel 
          onAddParticipants={addParticipants} 
          poolCount={pool.length}
          onReset={reset}
        />
      </div>

      {/* Center: Main Lottery Screen */}
      <div className="flex-1 relative z-10">
        <LotteryScreen
          isRolling={isRolling}
          currentCandidate={currentCandidate}
          winner={winner}
          onStart={startRoll}
          onStop={stopRoll}
          poolSize={pool.length}
        />
      </div>

      {/* Right Sidebar: Winners */}
      <div className="relative z-10 h-full">
        <WinnersList winners={winners} />
      </div>
    </div>
  );
}
