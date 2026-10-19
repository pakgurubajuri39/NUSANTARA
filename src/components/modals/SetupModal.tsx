import React, { useState } from 'react';
import { FactionData, Player, SpiceType } from '../../types/game';
import { HISTORICAL_FACTIONS } from '../../data/boardData';
import { CharacterAvatar } from '../CharacterAvatar';
import { REAL_CHARACTERS } from '../../data/characters';
import { Crown, Users, Bot, Sparkles, Shield, Coins, Swords, Check, X } from 'lucide-react';

interface SetupModalProps {
  onStartGame: (players: Player[]) => void;
  onClose?: () => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({ onStartGame, onClose }) => {
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [gameMode, setGameMode] = useState<'solo_vs_ai' | 'pass_and_play'>('solo_vs_ai');

  // Player configurations
  const [configs, setConfigs] = useState<Array<{ name: string; factionId: string; isAI: boolean }>>([
    { name: 'Pemain 1 (Raden Wijaya)', factionId: 'majapahit', isAI: false },
    { name: 'Pemain 2 (Sri Jayanasa)', factionId: 'sriwijaya', isAI: true },
    { name: 'Pemain 3 (Raden Patah)', factionId: 'demak', isAI: true },
    { name: 'Pemain 4 (Sultan Hasanuddin)', factionId: 'gowa_tallo', isAI: true },
  ]);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
  };

  const handleConfigChange = (index: number, field: 'name' | 'factionId' | 'isAI', value: string | boolean) => {
    setConfigs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleGameModeChange = (mode: 'solo_vs_ai' | 'pass_and_play') => {
    setGameMode(mode);
    setConfigs((prev) =>
      prev.map((c, i) => ({
        ...c,
        isAI: mode === 'solo_vs_ai' ? i > 0 : false,
      }))
    );
  };

  const getRandomSpice = (): SpiceType => {
    const list: SpiceType[] = ['lada', 'cengkeh', 'pala'];
    return list[Math.floor(Math.random() * list.length)];
  };

  const handleLaunch = () => {
    const selectedConfigs = configs.slice(0, playerCount);
    const initialPlayers: Player[] = selectedConfigs.map((cfg, idx) => {
      const faction = HISTORICAL_FACTIONS.find(f => f.id === cfg.factionId) || HISTORICAL_FACTIONS[idx % HISTORICAL_FACTIONS.length];

      // Initial spices: 1 random, or 2 if Ternate-Tidore
      const spiceObj = { lada: 0, cengkeh: 0, pala: 0 };
      const firstSpice = getRandomSpice();
      spiceObj[firstSpice] = 1;
      if (faction.id === 'ternate_tidore') {
        const secondSpice = getRandomSpice();
        spiceObj[secondSpice] += 1;
      }

      // Initial military: 2, or 3 if Mataram Islam
      const initialMilitary = faction.id === 'mataram_islam' ? 3 : 2;

      return {
        id: `player_${idx + 1}`,
        name: cfg.name.trim() || `Penguasa ${idx + 1}`,
        factionId: faction.id,
        factionName: faction.name,
        rulerName: faction.ruler,
        rulerTitle: faction.rulerTitle,
        quote: faction.quote,
        weapon: faction.weapon,
        color: faction.bannerColor,
        textColor: faction.textColor,
        isAI: cfg.isAI,
        position: 1, // Start on tile 1
        coins: 100, // Starts at 100 Koin Emas
        military: initialMilitary, // Starts at 2 (or 3)
        spices: spiceObj,
        gloryPoints: 0,
        territories: [],
        vulnerability: 0,
        alliances: {},
        bankrupt: false,
      };
    });

    onStartGame(initialPlayers);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border-2 border-amber-600/70 rounded-3xl p-5 sm:p-8 shadow-2xl my-6">
        {/* Top Ornament */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800 cursor-pointer transition-colors z-20"
            title="Kembali ke Landing Page"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Title */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-mono mb-2">
            <Crown className="w-3.5 h-3.5" />
            <span>Inisialisasi Game Master Nusantara</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-100 tracking-wide">
            NUSANTARA: Takhta, Sekutu, & Prahara
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-0.5 max-w-md mx-auto">
            Pilih faksi, nama penguasa, dan wujudkan kejayaan mandala kepulauan!
          </p>
        </div>

        {/* Realistic Character Miniatures Showcase Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-700/50 mb-4 shadow-xl max-h-44 group">
          <img 
            src="/nusantara-characters.jpg" 
            alt="Figurin Karakter Pemimpin Sejarah Nusantara" 
            className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex items-end p-3">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-serif font-bold text-amber-200 drop-shadow">
                Figurin Miniatur Asli: Gajah Mada, Dapunta Hyang, Raden Patah, Sultan Hasanuddin
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono">
                Real Tokoh Sejarah
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Mode & Player Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Mode Selector */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
            <label className="text-xs text-stone-400 font-medium block mb-2">
              Mode Permainan:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleGameModeChange('solo_vs_ai')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  gameMode === 'solo_vs_ai'
                    ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Solo vs AI</span>
              </button>
              <button
                type="button"
                onClick={() => handleGameModeChange('pass_and_play')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  gameMode === 'pass_and_play'
                    ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>Multi Pemain</span>
              </button>
            </div>
          </div>

          {/* Player Count */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
            <label className="text-xs text-stone-400 font-medium block mb-2">
              Jumlah Kerajaan (2 - 4):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handlePlayerCountChange(count)}
                  className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    playerCount === count
                      ? 'bg-amber-600 text-stone-950 border-amber-500 shadow-md'
                      : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-850'
                  }`}
                >
                  {count} Pemain
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Configure each player */}
        <div className="space-y-3 mb-6">
          <label className="text-xs text-stone-300 font-medium block">
            Konfigurasi Kerajaan / Faksi Nusantara:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: playerCount }).map((_, idx) => {
              const cfg = configs[idx];
              const faction = HISTORICAL_FACTIONS.find(f => f.id === cfg.factionId) || HISTORICAL_FACTIONS[0];

              return (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 flex flex-col justify-between space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-amber-300">
                      Pemain #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleConfigChange(idx, 'isAI', !cfg.isAI)}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-stone-700 bg-stone-900 text-stone-300 cursor-pointer hover:bg-stone-850"
                    >
                      {cfg.isAI ? '🤖 Bot AI' : '👤 Manusia'}
                    </button>
                  </div>

                  {/* Character Miniature and Inputs */}
                  <div className="flex items-start gap-2.5">
                    <div className="p-1 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0">
                      <CharacterAvatar 
                        factionId={cfg.factionId} 
                        size="md" 
                        showStandee={true}
                      />
                    </div>

                    <div className="flex-1 space-y-2 min-w-0">
                      <div>
                        <label className="text-[10px] text-stone-500 block mb-0.5">Nama Pemimpin / Julukan:</label>
                        <input
                          type="text"
                          value={cfg.name}
                          onChange={(e) => handleConfigChange(idx, 'name', e.target.value)}
                          placeholder={`Nama Pemain ${idx + 1}`}
                          className="w-full px-2 py-1 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-stone-500 block mb-0.5">Pilih Kerajaan Nusantara:</label>
                        <select
                          value={cfg.factionId}
                          onChange={(e) => handleConfigChange(idx, 'factionId', e.target.value)}
                          className="w-full px-2 py-1 rounded-lg bg-stone-900 border border-stone-700 text-xs text-amber-200 focus:outline-none focus:border-amber-500"
                        >
                          {HISTORICAL_FACTIONS.map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.name} ({f.ruler})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Faction Trait badge & Real Character Lore */}
                  <div className="p-2 rounded-lg bg-stone-900/90 border border-stone-800/80 text-[10px] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-semibold truncate">
                        ⚡ {faction.traitName}
                      </span>
                      <span className="text-[9px] text-stone-400 truncate max-w-[120px]" title={faction.weapon}>
                        🗡️ {faction.weapon.split('&')[0]}
                      </span>
                    </div>
                    <p className="text-stone-400 line-clamp-1">
                      {faction.traitDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Awal Confirmation Summary */}
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/80 mb-6 flex flex-wrap items-center justify-between gap-2">
          <span className="font-semibold text-amber-300">Modal Awal Tiap Pemain:</span>
          <span>💰 100 Koin Emas</span>
          <span>⚔️ 2 Pasukan Militer</span>
          <span>🌶️ 1 Komoditas Rempah Acak</span>
          <span>🌟 0 Poin Kejayaan</span>
        </div>

        {/* Start Game Button */}
        <button
          type="button"
          onClick={handleLaunch}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-serif font-black text-sm tracking-widest uppercase shadow-xl shadow-amber-600/30 transition-all cursor-pointer transform active:scale-98"
        >
          Tabuh Genderang & Jalankan Giliran Pertama!
        </button>
      </div>
    </div>
  );
};
