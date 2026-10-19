import React, { useState } from 'react';
import { BoardTile, Player } from '../../types/game';
import { soundEngine } from '../../utils/audio';
import { Swords, Shield, Crown, Dices, Award, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface BattleModalProps {
  tile: BoardTile;
  attacker: Player;
  defender: Player;
  onBattleResolved: (winner: 'attacker' | 'defender', attackerRoll: number, defenderRoll: number) => void;
}

export const BattleModal: React.FC<BattleModalProps> = ({
  tile,
  attacker,
  defender,
  onBattleResolved,
}) => {
  const [isRolling, setIsRolling] = useState(false);
  const [attackerRoll, setAttackerRoll] = useState<number | null>(null);
  const [defenderRoll, setDefenderRoll] = useState<number | null>(null);
  const [battleOutcome, setBattleOutcome] = useState<'attacker' | 'defender' | null>(null);

  // Trait bonuses
  const attackerTraitBonus = attacker.factionId === 'majapahit' ? 1 : 0;
  const defenderFortBonus = tile.fortificationLevel;

  const handleRollCombat = () => {
    setIsRolling(true);
    soundEngine.playWarDrum();
    soundEngine.playDiceRoll();

    let count = 0;
    const interval = setInterval(() => {
      setAttackerRoll(Math.floor(Math.random() * 6) + 1);
      setDefenderRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 8) {
        clearInterval(interval);
        const finalAttackerRoll = Math.floor(Math.random() * 6) + 1;
        const finalDefenderRoll = Math.floor(Math.random() * 6) + 1;
        setAttackerRoll(finalAttackerRoll);
        setDefenderRoll(finalDefenderRoll);

        const attackerTotal = finalAttackerRoll + attacker.military + attackerTraitBonus;
        const defenderTotal = finalDefenderRoll + defender.military + defenderFortBonus;

        const winner = attackerTotal > defenderTotal ? 'attacker' : 'defender';
        setBattleOutcome(winner);
        setIsRolling(false);

        if (winner === 'attacker') {
          soundEngine.playVictory();
        } else {
          soundEngine.playGong();
        }
      }
    }, 100);
  };

  const attackerTotal = (attackerRoll || 0) + attacker.military + attackerTraitBonus;
  const defenderTotal = (defenderRoll || 0) + defender.military + defenderFortBonus;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-stone-900 border-2 border-red-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-600/50 text-red-300 text-xs font-mono mb-2">
            <Swords className="w-3.5 h-3.5" />
            <span>Medan Tempur Palagan Sejarah</span>
          </div>
          <h3 className="text-2xl font-serif font-black text-stone-100">
            Perebutan Wilayah {tile.name}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Pertempuran senjata pusaka, panji kraton, dan keberanian lasykar!
          </p>
        </div>

        {/* Both Sides Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Attacker */}
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-red-800/50 flex flex-col items-center text-center">
            <span className="text-[10px] font-mono uppercase text-red-400 font-bold mb-1">
              Pihak Penyerang
            </span>
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-2 shadow"
              style={{ backgroundColor: attacker.color, color: attacker.textColor }}
            >
              {attacker.name.charAt(0)}
            </div>
            <h4 className="text-sm font-serif font-bold text-stone-100">{attacker.name}</h4>
            <span className="text-xs text-amber-300">{attacker.factionName}</span>

            <div className="w-full mt-3 pt-2 border-t border-stone-800 text-xs space-y-1">
              <div className="flex justify-between text-stone-400">
                <span>Pasukan:</span>
                <span className="font-bold text-stone-200">{attacker.military}</span>
              </div>
              {attackerTraitBonus > 0 && (
                <div className="flex justify-between text-amber-400 text-[11px]">
                  <span>Bonus Palapa:</span>
                  <span>+1</span>
                </div>
              )}
            </div>

            {/* Attacker Dice Box */}
            <div className="mt-3 p-3 rounded-xl bg-stone-900 border border-stone-800 w-full flex flex-col items-center">
              <span className="text-[10px] text-stone-400">Dadu Tempur</span>
              <div className="text-2xl font-black font-mono text-red-400 my-1">
                {attackerRoll !== null ? attackerRoll : '-'}
              </div>
              <span className="text-xs font-bold text-amber-300">
                Total Kekuatan: {attackerRoll !== null ? attackerTotal : '?'}
              </span>
            </div>
          </div>

          {/* Defender */}
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex flex-col items-center text-center">
            <span className="text-[10px] font-mono uppercase text-blue-400 font-bold mb-1">
              Pihak Bertahan
            </span>
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-2 shadow"
              style={{ backgroundColor: defender.color, color: defender.textColor }}
            >
              {defender.name.charAt(0)}
            </div>
            <h4 className="text-sm font-serif font-bold text-stone-100">{defender.name}</h4>
            <span className="text-xs text-amber-300">{defender.factionName}</span>

            <div className="w-full mt-3 pt-2 border-t border-stone-800 text-xs space-y-1">
              <div className="flex justify-between text-stone-400">
                <span>Pasukan:</span>
                <span className="font-bold text-stone-200">{defender.military}</span>
              </div>
              {defenderFortBonus > 0 && (
                <div className="flex justify-between text-sky-400 text-[11px]">
                  <span>Benteng:</span>
                  <span>+{defenderFortBonus}</span>
                </div>
              )}
            </div>

            {/* Defender Dice Box */}
            <div className="mt-3 p-3 rounded-xl bg-stone-900 border border-stone-800 w-full flex flex-col items-center">
              <span className="text-[10px] text-stone-400">Dadu Tempur</span>
              <div className="text-2xl font-black font-mono text-sky-400 my-1">
                {defenderRoll !== null ? defenderRoll : '-'}
              </div>
              <span className="text-xs font-bold text-amber-300">
                Total Kekuatan: {defenderRoll !== null ? defenderTotal : '?'}
              </span>
            </div>
          </div>
        </div>

        {/* Outcome result banner */}
        {battleOutcome && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`p-4 rounded-2xl mb-5 text-center border ${
              battleOutcome === 'attacker'
                ? 'bg-red-950/70 border-red-600/70 text-red-200'
                : 'bg-sky-950/70 border-sky-600/70 text-sky-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2 font-serif font-bold text-base mb-1">
              <Award className="w-5 h-5 text-amber-400" />
              <span>
                {battleOutcome === 'attacker'
                  ? `Kemenangan Gemilang Militer ${attacker.name}!`
                  : `Pertahanan ${defender.name} Tak Tergoyahkan!`}
              </span>
            </div>
            <p className="text-xs text-stone-300">
              {battleOutcome === 'attacker'
                ? `Wilayah ${tile.name} berhasil direbut! Pihak bertahan kehilangan 1 pasukan militer.`
                : `Penyerang dipukul mundur! ${attacker.name} kehilangan 1 pasukan dan membayar ganti rugi 20 Koin Emas.`}
            </p>
          </motion.div>
        )}

        {/* Action Button */}
        {battleOutcome === null ? (
          <button
            onClick={handleRollCombat}
            disabled={isRolling}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-50 text-white font-serif font-bold text-sm tracking-wide shadow-lg shadow-red-900/40 cursor-pointer flex items-center justify-center gap-2"
          >
            <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
            <span>{isRolling ? 'Menentukan Nasib Palagan...' : 'Adu Dadu Tempur Palagan!'}</span>
          </button>
        ) : (
          <button
            onClick={() => onBattleResolved(battleOutcome, attackerRoll!, defenderRoll!)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 text-stone-950 font-serif font-bold text-sm tracking-wide shadow-lg cursor-pointer"
          >
            Selesaikan Pertempuran & Catat ke Babad
          </button>
        )}
      </div>
    </div>
  );
};
