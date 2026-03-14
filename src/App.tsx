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
    <div className="mac-bg min-h-screen w-full font-sans">
      <div className="relative z-10 mx-auto flex h-[100dvh] w-[min(1180px,calc(100%-24px))] flex-col py-6">
        <div className="mac-window flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className="mac-titlebar">
            <div className="mac-traffic" aria-hidden="true">
              <span className="mac-dot mac-dot--red" />
              <span className="mac-dot mac-dot--yellow" />
              <span className="mac-dot mac-dot--green" />
            </div>

            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-sm font-semibold tracking-tight text-white/90">
                幸运大抽奖
              </div>
              <div className="truncate text-xs text-slate-200/70">
                导入名单后点击开始抽奖，中奖记录会显示在右侧。
              </div>
            </div>

            <div className="hidden shrink-0 text-xs text-slate-200/70 sm:block">
              奖池 {pool.length} 人 · 已中奖 {winners.length} 人
            </div>
          </header>

          <main className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[320px_1fr_288px]">
            <section className="mac-pane mac-pane--left min-h-0">
              <SettingsPanel
                onAddParticipants={addParticipants}
                poolCount={pool.length}
                onReset={reset}
              />
            </section>

            <section className="min-h-0">
              <LotteryScreen
                isRolling={isRolling}
                currentCandidate={currentCandidate}
                winner={winner}
                onStart={startRoll}
                onStop={stopRoll}
                poolSize={pool.length}
              />
            </section>

            <section className="mac-pane mac-pane--right min-h-0">
              <WinnersList winners={winners} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
