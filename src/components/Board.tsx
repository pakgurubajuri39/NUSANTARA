import React, { useState } from 'react';
import { BoardTile, Player, EraType } from '../types/game';
import { CircularBoard } from './CircularBoard';
import { CharacterAvatar } from './CharacterAvatar';
import { 
  Castle, 
  Anchor, 
  Sparkles, 
  Flame, 
  Store, 
  Skull, 
  ShieldAlert, 
  Crown, 
  Coins, 
  Swords, 
  Leaf,
  Dices,
  Maximize2,
  Grid,
  CircleDot,
  Image as ImageIcon,
  Compass,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BoardProps {
  tiles: BoardTile[];
  players: Player[];
  activePlayerIndex: number;
  selectedTile: BoardTile | null;
  onSelectTile: (tile: BoardTile) => void;
  onRollDice: () => void;
  isRolling: boolean;
  lastDiceRoll: number | null;
  canRoll: boolean;
  vocTerritories: number[];
}

export const Board: React.FC<BoardProps> = ({
  tiles,
  players,
  activePlayerIndex,
  selectedTile,
  onSelectTile,
  onRollDice,
  isRolling,
  lastDiceRoll,
  canRoll,
  vocTerritories
}) => {
  const [viewMode, setViewMode] = useState<'circular' | 'photo' | 'grid'>('circular');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const activePlayer = players[activePlayerIndex];

  // Helper for icons
  const getTileIcon = (tile: BoardTile) => {
    switch (tile.type) {
      case 'pelabuhan':
        return <Anchor className="w-3.5 h-3.5 text-sky-400" />;
      case 'situs_suci':
        return <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />;
      case 'prahara':
        return <Flame className="w-3.5 h-3.5 text-red-500 animate-bounce" />;
      case 'pasar_rempah':
        return <Store className="w-3.5 h-3.5 text-emerald-400" />;
      case 'bentrokan_voc':
        return <Skull className="w-3.5 h-3.5 text-rose-500" />;
      case 'wilayah_rempah':
        return <Leaf className="w-3.5 h-3.5 text-teal-400" />;
      default:
        return <Castle className="w-3.5 h-3.5 text-amber-200/80" />;
    }
  };

  // Era theme colors
  const getEraBadge = (era: EraType) => {
    switch (era) {
      case 'hindu_buddha':
        return {
          label: 'Hindu-Buddha',
          dot: 'bg-amber-400'
        };
      case 'islam':
        return {
          label: 'Islam Nusantara',
          dot: 'bg-emerald-400'
        };
      case 'kolonial':
        return {
          label: 'Era Kolonial & VOC',
          dot: 'bg-rose-400'
        };
    }
  };

  const getTileOwner = (tile: BoardTile) => {
    if (vocTerritories.includes(tile.id)) {
      return { name: 'VOC Kompeni', color: '#be123c', isVoc: true };
    }
    if (!tile.ownerId) return null;
    const p = players.find(player => player.id === tile.ownerId);
    if (!p) return null;
    return { name: p.name, color: p.color, isVoc: false };
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl border border-amber-800/50 p-3 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden bg-[#160d07]">
      {/* Realistic 3D Antique Wooden Table Surface Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-overlay pointer-events-none scale-105"
        style={{ backgroundImage: `url('/board-game-table.jpg')` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(65,36,18,0.45)_0%,rgba(22,13,7,0.88)_70%,rgba(10,6,3,0.98)_100%)] pointer-events-none" />
      {/* Traditional Warm Wood Polish Highlights */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-yellow-600/10 blur-3xl pointer-events-none" />
      
      {/* Board Header Bar with Mode Selector */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-amber-900/30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center shadow-inner">
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-serif font-bold text-amber-100 tracking-wide flex items-center gap-2">
              <span>Peta Papan Nusantara 24 Petak</span>
              <span className="text-[10px] font-mono text-amber-300 font-normal px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-700/40">
                Susunan Angka Masuk Papan
              </span>
            </h2>
            <p className="text-[11px] text-amber-300/70">
              Hindu-Buddha (#1-8) · Islam Nusantara (#9-16) · Kolonial VOC (#17-24)
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-950 border border-stone-800 text-xs">
            <button
              onClick={() => setViewMode('circular')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
                viewMode === 'circular'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Papan melingkar dengan 24 petak pas angka"
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>Papan Melingkar</span>
            </button>

            <button
              onClick={() => setViewMode('photo')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
                viewMode === 'photo'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Tampilan ilustrasi meja kayu 3D"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Meja Kayu 3D</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Tampilan kisi 24 petak"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Petak Kisi</span>
            </button>
          </div>

          <button
            onClick={() => setIsZoomModalOpen(true)}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-850 border border-amber-700/40 text-amber-300 transition-colors cursor-pointer"
            title="Perbesar Tampilan Seni Papan Fisik"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VIEW 1: AUTHENTIC CIRCULAR GAME BOARD WITH 24 NUMBERED TILES FITTED INSIDE */}
      {viewMode === 'circular' && (
        <div className="py-2">
          <CircularBoard
            tiles={tiles}
            players={players}
            activePlayerIndex={activePlayerIndex}
            selectedTile={selectedTile}
            onSelectTile={onSelectTile}
            onRollDice={onRollDice}
            isRolling={isRolling}
            lastDiceRoll={lastDiceRoll}
            canRoll={canRoll}
            vocTerritories={vocTerritories}
          />
        </div>
      )}

      {/* VIEW 2: PHOTO TABLETOP ARTWORK VIEW */}
      {viewMode === 'photo' && (
        <div className="relative w-full rounded-2xl overflow-hidden border border-amber-800/40 shadow-2xl bg-stone-950 mb-3 group">
          <div className="relative w-full aspect-[16/9] max-h-[540px]">
            <img 
              src="/board-game-table.jpg" 
              alt="Papan Permainan Nusantara: Takhta, Sekutu, & Prahara" 
              className="w-full h-full object-cover object-center select-none"
            />
            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-stone-950/90 backdrop-blur-md border border-amber-800/40 text-xs">
              <span className="text-[11px] text-stone-300 font-serif">
                Ilustrasi meja kayu Nusantara dengan kartu peristiwa, koin gobog, rempah cengkeh & pala.
              </span>
              <button
                onClick={() => setViewMode('circular')}
                className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer"
              >
                Kembali ke Papan Melingkar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: TACTICAL DIGITAL 24-GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-3">
          {tiles.map((tile) => {
            const owner = getTileOwner(tile);
            const isSelected = selectedTile?.id === tile.id;
            const playersHere = players.filter((p) => p.position === tile.id && !p.bankrupt);
            const eraInfo = getEraBadge(tile.era);

            return (
              <motion.button
                key={tile.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTile(tile)}
                className={`relative text-left p-2.5 rounded-xl transition-all duration-200 border flex flex-col justify-between min-h-[105px] group cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-amber-400 border-amber-300 bg-amber-950/60 shadow-lg shadow-amber-950/50'
                    : 'bg-stone-900/80 hover:bg-stone-850 border-stone-800 hover:border-amber-700/50'
                }`}
              >
                {owner && (
                  <div 
                    className="absolute top-0 right-0 left-0 h-1.5 rounded-t-xl"
                    style={{ backgroundColor: owner.color }}
                    title={`Dikuasai oleh: ${owner.name}`}
                  />
                )}

                <div className="flex items-start justify-between gap-1 w-full pt-0.5">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                    #{tile.id}
                  </span>
                  <div className="flex items-center gap-1">
                    {getTileIcon(tile)}
                    {tile.fortificationLevel > 0 && (
                      <span title="Benteng Pertahanan (+5 sewa)">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="my-1.5">
                  <h3 className="text-xs font-serif font-bold text-stone-100 group-hover:text-amber-300 line-clamp-1">
                    {tile.name}
                  </h3>
                  <p className="text-[10px] text-stone-400 line-clamp-1">
                    {tile.type === 'wilayah' || tile.type === 'pelabuhan' || tile.type === 'wilayah_rempah'
                      ? owner
                        ? `${owner.name}`
                        : `Klaim: ${tile.cost}g`
                      : tile.type === 'situs_suci'
                      ? '+2 Poin Kejayaan'
                      : tile.type === 'pasar_rempah'
                      ? 'Bursa Rempah'
                      : tile.type === 'prahara'
                      ? 'Perang Saudara'
                      : 'Serbuan VOC'}
                  </p>
                </div>

                <div className="flex items-center justify-between w-full pt-1 border-t border-stone-800/60 mt-auto">
                  <span className={`w-1.5 h-1.5 rounded-full ${eraInfo.dot}`} title={eraInfo.label} />
                  
                  <div className="flex -space-x-1 items-center">
                    {playersHere.map((p) => (
                      <div
                        key={p.id}
                        className="cursor-help"
                        title={`${p.name} (${p.factionName})`}
                      >
                        <CharacterAvatar
                          factionId={p.factionId}
                          size="xs"
                          isTurnPlayer={p.id === activePlayer?.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Central Tactical Banner & Dice Roll Station (When on Grid/Photo mode) */}
      {viewMode !== 'circular' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-900/90 via-amber-950/40 to-stone-900/90 border border-amber-800/30 flex flex-wrap items-center justify-between gap-4">
          {activePlayer && (
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-2xl bg-stone-950 border border-amber-500/50 shadow-lg shrink-0">
                <CharacterAvatar 
                  factionId={activePlayer.factionId} 
                  size="md" 
                  showStandee={true}
                  isTurnPlayer={true}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-amber-400/90 font-medium">
                    Giliran Berjalan
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-200">
                    {activePlayer.isAI ? 'Faksi AI' : 'Pemain Manusia'}
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-stone-100">
                  {activePlayer.name} · <span className="text-amber-300 font-normal">{activePlayer.factionName}</span>
                </h3>
                <p className="text-xs text-stone-400">
                  Posisi: Petak #{activePlayer.position} ({tiles.find(t => t.id === activePlayer.position)?.name})
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            {lastDiceRoll !== null && (
              <div className="flex items-center gap-2 bg-stone-950 px-3 py-2 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400">Dadu Terakhir:</span>
                <motion.div 
                  key={lastDiceRoll}
                  initial={{ scale: 0.5, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-black text-lg flex items-center justify-center shadow-md shadow-amber-500/20"
                >
                  {lastDiceRoll}
                </motion.div>
              </div>
            )}

            <button
              onClick={onRollDice}
              disabled={!canRoll || isRolling}
              className={`px-6 py-3 rounded-xl font-serif font-bold text-sm tracking-wide flex items-center gap-2.5 shadow-lg transition-all ${
                canRoll && !isRolling
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 shadow-amber-500/25 cursor-pointer active:scale-95'
                  : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-60'
              }`}
            >
              <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? 'Mengocok Dadu...' : 'Kocok Dadu Takhta (1-6)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* FULL-SIZE ZOOM MODAL FOR BOARD ARTWORK */}
      <AnimatePresence>
        {isZoomModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-200">
            <div className="relative w-full max-w-6xl max-h-[90vh] bg-stone-950 border border-amber-600/60 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-amber-800/40">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base sm:text-lg font-serif font-bold text-amber-100">
                    Karya Seni Papan Fisik "NUSANTARA: Takhta, Sekutu, & Prahara"
                  </h3>
                </div>
                <button
                  onClick={() => setIsZoomModalOpen(false)}
                  className="p-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto rounded-xl flex items-center justify-center bg-stone-900/50">
                <img 
                  src="/board-game-table.jpg" 
                  alt="Full Zoom Nusantara Board Game" 
                  className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                />
              </div>

              <p className="text-center text-xs text-stone-400 pt-3">
                Papan melingkar 24 petak 3 era sejarah, kartu peristiwa, koin emas-perak, rempah buah pala dan cengkeh, serta peta mandala kepulauan Nusantara.
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
