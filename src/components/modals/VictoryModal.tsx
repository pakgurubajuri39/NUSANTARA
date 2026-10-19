import React, { useEffect } from 'react';
import { Player } from '../../types/game';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../utils/audio';
import { Trophy, Crown, Sparkles, RotateCcw } from 'lucide-react';

interface VictoryModalProps {
  winner: Player;
  winReason?: string;
  onRestartGame: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  winner,
  winReason,
  onRestartGame,
}) => {
  useEffect(() => {
    soundEngine.playVictory();
    soundEngine.playGong();

    // Trigger confetti bursts
    const end = Date.now() + 3000;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#d97706', '#f59e0b', '#fbbf24', '#ffffff', '#e11d48']
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-stone-900 border-2 border-amber-500 rounded-3xl p-8 text-center shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-radial from-amber-600/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center animate-bounce">
            <div className="w-full h-full rounded-[22px] bg-stone-950 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-amber-400" />
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Daulat Mahapatih & Maharaja Nusantara
            </span>
            <h2 className="text-3xl font-serif font-black text-amber-100 mt-1">
              Kemenangan Sejarah Tertinggi!
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-600/50 space-y-2">
            <h3 className="text-2xl font-serif font-bold" style={{ color: winner.color }}>
              {winner.name}
            </h3>
            <p className="text-sm text-amber-300 font-medium">
              Wangsa {winner.factionName} ({winner.rulerName})
            </p>
            <p className="text-xs text-stone-300 italic pt-1">
              "{winReason || 'Telah berhasil menegakkan kedaulatan takhta di seluruh perairan dan daratan Nusantara!'}"
            </p>
          </div>

          {/* Victory stats */}
          <div className="grid grid-cols-3 gap-2 text-xs py-2">
            <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 block text-[10px]">Wilayah:</span>
              <span className="font-bold text-amber-200 text-sm">{winner.territories.length} Petak</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 block text-[10px]">Poin Kejayaan:</span>
              <span className="font-bold text-yellow-300 text-sm">{winner.gloryPoints} PK</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 block text-[10px]">Koin Emas:</span>
              <span className="font-bold text-amber-300 text-sm">{winner.coins}g</span>
            </div>
          </div>

          <button
            onClick={onRestartGame}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-serif font-bold text-sm tracking-widest uppercase shadow-xl cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Babak Permainan Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};
