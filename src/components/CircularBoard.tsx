import React, { useMemo } from 'react';
import { BoardTile, Player, EraType } from '../types/game';
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
  Compass,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CircularBoardProps {
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

export const CircularBoard: React.FC<CircularBoardProps> = ({
  tiles,
  players,
  activePlayerIndex,
  selectedTile,
  onSelectTile,
  onRollDice,
  isRolling,
  lastDiceRoll,
  canRoll,
  vocTerritories,
}) => {
  const activePlayer = players[activePlayerIndex] || players[0];

  // Tile icons
  const getTileIcon = (tile: BoardTile) => {
    switch (tile.type) {
      case 'pelabuhan':
        return <Anchor className="w-3 h-3 text-sky-400 shrink-0" />;
      case 'situs_suci':
        return <Sparkles className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />;
      case 'prahara':
        return <Flame className="w-3 h-3 text-red-500 shrink-0" />;
      case 'pasar_rempah':
        return <Store className="w-3 h-3 text-emerald-400 shrink-0" />;
      case 'bentrokan_voc':
        return <Skull className="w-3 h-3 text-rose-500 shrink-0" />;
      case 'wilayah_rempah':
        return <Leaf className="w-3 h-3 text-teal-400 shrink-0" />;
      default:
        return <Castle className="w-3 h-3 text-amber-200/80 shrink-0" />;
    }
  };

  // Find owners
  const getTileOwner = (tile: BoardTile) => {
    if (vocTerritories.includes(tile.id)) {
      return { name: 'VOC', color: '#be123c', isVoc: true };
    }
    if (!tile.ownerId) return null;
    const p = players.find(player => player.id === tile.ownerId);
    if (!p) return null;
    return { name: p.name, color: p.color, isVoc: false };
  };

  /**
   * 24 tiles arranged cleanly along the perimeter circle.
   * Angle starts at -90 deg (12 o'clock) for Tile 1 (Kutai), advancing clockwise by 15 deg per tile.
   * Radius = 41% ensures the tiles fit comfortably inside the outer wooden rim and do not overlap the central map.
   */
  const getCoordinates = (tileId: number) => {
    const validId = typeof tileId === 'number' && !isNaN(tileId) ? tileId : 1;
    const index = ((validId - 1) % 24 + 24) % 24;
    const angleDeg = -90 + index * 15;
    const angleRad = (angleDeg * Math.PI) / 180;
    const radius = 41.2;
    const x = 50 + radius * Math.cos(angleRad);
    const y = 50 + radius * Math.sin(angleRad);
    return { x, y, angleDeg };
  };

  // Group players by position to offset co-located pawns
  const pawnsByPosition = useMemo(() => {
    const map = new Map<number, Player[]>();
    players.forEach((p) => {
      if (p.bankrupt) return;
      const list = map.get(p.position) || [];
      list.push(p);
      map.set(p.position, list);
    });
    return map;
  }, [players]);

  return (
    <div className="relative w-full aspect-square max-w-[700px] mx-auto select-none p-1 sm:p-2">
      {/* REALISTIC 3D CARVED TEAKWOOD RIM & DROP SHADOW */}
      <div className="absolute inset-0 rounded-full border-[8px] sm:border-[12px] border-[#2c160c] bg-gradient-to-br from-[#402213] via-[#24130a] to-[#120904] shadow-[0_25px_70px_rgba(0,0,0,0.95),inset_0_0_30px_rgba(0,0,0,0.9)]" />
      
      {/* Wood Texture on the Circular Board Plate */}
      <div 
        className="absolute inset-[8px] sm:inset-[12px] rounded-full bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url('/board-game-table.jpg')` }}
      />
      <div className="absolute inset-[8px] sm:inset-[12px] rounded-full bg-gradient-to-b from-[#2e190e]/95 via-[#1d1009]/95 to-[#120904]/98 shadow-[inset_0_0_40px_rgba(0,0,0,0.85)]" />

      {/* Brass Ornamental Inlaid Rings */}
      <div className="absolute inset-2 sm:inset-3.5 rounded-full border border-amber-500/40 pointer-events-none shadow-[0_0_8px_rgba(245,158,11,0.25)]" />
      <div className="absolute inset-3 sm:inset-5 rounded-full border border-amber-700/25 pointer-events-none" />

      {/* 3 Era Section Banners along the Perimeter */}
      <div className="absolute top-1.5 sm:top-2.5 left-1/2 -translate-x-1/2 z-10 px-2.5 sm:px-3.5 py-0.5 rounded-full bg-amber-950/95 border border-amber-500/80 text-[8px] sm:text-[10px] font-serif font-black text-amber-300 tracking-wider uppercase shadow-[0_4px_12px_rgba(0,0,0,0.8)] pointer-events-none">
        Era Hindu-Buddha (#1-8)
      </div>
      <div className="absolute top-1/2 right-1 sm:right-2 -translate-y-1/2 z-10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-950/95 border border-emerald-500/80 text-[7px] sm:text-[9px] font-serif font-black text-emerald-300 tracking-wider uppercase shadow-[0_4px_12px_rgba(0,0,0,0.8)] rotate-90 origin-center pointer-events-none">
        Era Islam (#9-16)
      </div>
      <div className="absolute bottom-1.5 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-10 px-2.5 sm:px-3.5 py-0.5 rounded-full bg-rose-950/95 border border-rose-500/80 text-[8px] sm:text-[10px] font-serif font-black text-rose-300 tracking-wider uppercase shadow-[0_4px_12px_rgba(0,0,0,0.8)] pointer-events-none">
        Era Kolonial / VOC (#17-24)
      </div>

      {/* CENTRAL MANDALA & VINTAGE PARCHMENT MAP */}
      <div className="absolute inset-[21%] rounded-full overflow-hidden border-2 sm:border-4 border-amber-900/70 shadow-[inset_0_0_40px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.8)] z-0 flex flex-col items-center justify-between p-2.5 sm:p-4 text-center bg-[#150c07]">
        {/* Background Parchment Map Texture */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity pointer-events-none scale-125"
          style={{ backgroundImage: `url('/nusantara_board_game.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180d07]/90 via-[#27140b]/60 to-[#120904]/95 pointer-events-none" />

        {/* Vintage Archipelago Map Header */}
        <div className="relative z-10 pt-0.5 sm:pt-1">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin-slow" />
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-amber-300/80">
              Peta Takhta Nusantara
            </span>
          </div>
          <h2 className="text-sm sm:text-base md:text-lg font-serif font-black tracking-wider text-amber-100 drop-shadow">
            NUSANTARA
          </h2>
          <span className="text-[9px] sm:text-[10px] font-serif text-amber-300/90 tracking-wide block -mt-0.5">
            Takhta, Sekutu, & Prahara
          </span>
        </div>

        {/* Center Archipelago SVG Outline */}
        <div className="relative z-10 w-full max-w-[170px] sm:max-w-[210px] h-10 sm:h-14 flex items-center justify-center opacity-75 pointer-events-none">
          <svg viewBox="0 0 240 70" className="w-full h-full fill-amber-500/20 stroke-amber-400/40 stroke-[1.2]">
            {/* Sumatra */}
            <path d="M15 15 L35 45 L45 55 L38 60 L20 40 L10 20 Z" />
            {/* Java */}
            <path d="M55 58 L120 60 L125 56 L60 54 Z" />
            {/* Kalimantan */}
            <path d="M65 18 L95 12 L110 30 L90 45 L70 38 Z" />
            {/* Sulawesi */}
            <path d="M125 22 L140 18 L135 32 L145 42 L132 50 L128 35 Z" />
            {/* Maluku */}
            <path d="M152 28 A 3 3 0 1 0 155 32 M160 40 A 2.5 2.5 0 1 0 162 44" />
            {/* Papua */}
            <path d="M175 30 L200 22 L225 35 L215 52 L185 45 Z" />
          </svg>
        </div>

        {/* Turn Status & Floating Dice Station */}
        <div className="relative z-10 w-full pb-0.5 sm:pb-1 flex flex-col items-center">
          {activePlayer && (
            <div className="mb-1 sm:mb-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/90 border border-amber-600/50 shadow-lg max-w-[90%]">
              <CharacterAvatar 
                factionId={activePlayer.factionId} 
                size="xs" 
                isTurnPlayer={true} 
              />
              <span className="text-[10px] sm:text-[11px] font-serif font-bold text-stone-100 truncate">
                {activePlayer.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-amber-300 shrink-0">
                (Petak #{activePlayer.position})
              </span>
            </div>
          )}

          {/* Center Dice Roll Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {lastDiceRoll !== null && (
              <motion.div 
                key={lastDiceRoll}
                initial={{ scale: 0.3, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center shadow-lg border border-yellow-200 font-mono"
              >
                {lastDiceRoll}
              </motion.div>
            )}

            <button
              onClick={onRollDice}
              disabled={!canRoll || isRolling}
              className={`px-3 sm:px-4 py-1.5 rounded-xl font-serif font-bold text-[10px] sm:text-xs tracking-wide flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                canRoll && !isRolling
                  ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 text-stone-950 shadow-amber-500/30 active:scale-95'
                  : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-60'
              }`}
            >
              <Dices className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? 'Mengocok...' : 'Kocok Dadu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* THE 24 PETAK TILES - NUMBER FITTED PERFECTLY INSIDE EACH CARD */}
      {tiles.map((tile, idx) => {
        const { x, y } = getCoordinates(tile.id);
        const owner = getTileOwner(tile);
        const isSelected = selectedTile?.id === tile.id;
        const hasActivePlayer = activePlayer?.position === tile.id;

        // Styling based on era
        const eraBorder = 
          tile.era === 'hindu_buddha'
            ? 'border-amber-600/70 bg-gradient-to-b from-amber-950/95 via-stone-900/95 to-amber-950/90 text-amber-200'
            : tile.era === 'islam'
            ? 'border-emerald-600/70 bg-gradient-to-b from-emerald-950/95 via-stone-900/95 to-emerald-950/90 text-emerald-200'
            : 'border-rose-600/70 bg-gradient-to-b from-rose-950/95 via-stone-900/95 to-rose-950/90 text-rose-200';

        const eraNumberBadge =
          tile.era === 'hindu_buddha'
            ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-stone-950'
            : tile.era === 'islam'
            ? 'bg-gradient-to-br from-emerald-400 to-teal-600 text-stone-950'
            : 'bg-gradient-to-br from-rose-400 to-red-600 text-stone-950';

        return (
          <div
            key={tile.id}
            style={{ left: `${x}%`, top: `${y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
          >
            <motion.button
              whileHover={{ scale: 1.12, zIndex: 40 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectTile(tile)}
              className={`relative w-[40px] h-[34px] xs:w-[48px] xs:h-[40px] sm:w-[62px] sm:h-[50px] md:w-[72px] md:h-[58px] rounded-md sm:rounded-xl p-0.5 sm:p-1 flex flex-col justify-between border shadow-[0_4px_12px_rgba(0,0,0,0.85)] transition-all text-left cursor-pointer overflow-hidden backdrop-blur-xs ${
                isSelected
                  ? 'ring-2 ring-amber-300 border-amber-300 scale-105 shadow-amber-500/50 z-30'
                  : hasActivePlayer
                  ? 'ring-2 ring-yellow-400 shadow-yellow-500/40 z-20'
                  : 'hover:border-amber-400'
              } ${eraBorder}`}
            >
              {/* Owner Top Ribbon */}
              {owner && (
                <div 
                  className="absolute top-0 left-0 right-0 h-1 sm:h-1.5"
                  style={{ backgroundColor: owner.color }}
                  title={`Dikuasai oleh: ${owner.name}`}
                />
              )}

              {/* TILE HEADER: NUMBER (#1-#24) EMBEDDED CLEANLY INSIDE CARD */}
              <div className="flex items-center justify-between w-full pt-0.5 leading-none">
                <span className={`text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-mono font-black px-1 py-0.2 rounded shadow-xs ${eraNumberBadge}`}>
                  #{tile.id}
                </span>

                <div className="flex items-center gap-0.5">
                  {getTileIcon(tile)}
                  {tile.fortificationLevel > 0 && (
                    <span title="Benteng Pertahanan (+5 sewa)">
                      <ShieldAlert className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-amber-400" />
                    </span>
                  )}
                </div>
              </div>

              {/* TILE NAME */}
              <div className="leading-tight my-auto">
                <h4 className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-serif font-bold text-stone-100 line-clamp-1 group-hover:text-amber-300">
                  {tile.name}
                </h4>
              </div>

              {/* TILE FOOTER: Cost / Status Text */}
              <div className="flex items-center justify-between text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] font-mono text-stone-400 pt-0.5 border-t border-stone-800/60 leading-none">
                <span className="truncate">
                  {tile.type === 'wilayah' || tile.type === 'pelabuhan' || tile.type === 'wilayah_rempah'
                    ? owner
                      ? owner.name.split(' ')[0]
                      : `${tile.cost}g`
                    : tile.type === 'situs_suci'
                    ? '+2PK'
                    : tile.type === 'pasar_rempah'
                    ? 'Rempah'
                    : tile.type === 'prahara'
                    ? 'Prahara'
                    : 'VOC'}
                </span>
                
                {/* Micro Era marker */}
                <span className={`w-1 h-1 rounded-full ${
                  tile.era === 'hindu_buddha' ? 'bg-amber-400' : tile.era === 'islam' ? 'bg-emerald-400' : 'bg-rose-400'
                }`} />
              </div>

              {/* Active Player Pulse ring */}
              {hasActivePlayer && (
                <span className="absolute -inset-0.5 rounded-md sm:rounded-xl border-2 border-amber-300 animate-ping opacity-75 pointer-events-none" />
              )}
            </motion.button>

            {/* Hover Tooltip Popup */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:flex flex-col items-center pointer-events-none z-50 whitespace-nowrap">
              <div className="px-2.5 py-1.5 rounded-lg bg-stone-950/95 border border-amber-500/70 text-stone-100 text-[10px] shadow-2xl space-y-0.5">
                <span className="font-serif font-bold text-amber-300 block">
                  #{tile.id} {tile.name}
                </span>
                <span className="text-stone-300 block text-[9px]">
                  {owner ? `Dikuasai oleh: ${owner.name}` : `Klaim: ${tile.cost}g · Sewa: ${tile.rent}g`}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* DEDICATED REAL CHARACTER PAWN OVERLAY LAYER WITH FLUID STEPPING ANIMATIONS */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {players.map((player) => {
          if (player.bankrupt) return null;
          const { x, y } = getCoordinates(player.position);
          const isTurnPlayer = player.id === activePlayer?.id;
          const playersAtSameTile = pawnsByPosition.get(player.position) || [player];
          const pIndex = playersAtSameTile.findIndex((p) => p.id === player.id);
          
          // Slight radial offset if multiple pawns share the same tile
          const offsetDist = playersAtSameTile.length > 1 ? 1.6 : 0;
          const offsetAngle = (pIndex * (360 / Math.max(1, playersAtSameTile.length)) * Math.PI) / 180;
          const finalX = x + offsetDist * Math.cos(offsetAngle);
          const finalY = y + offsetDist * Math.sin(offsetAngle);

          return (
            <motion.div
              key={player.id}
              animate={{
                left: `${finalX}%`,
                top: `${finalY}%`,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 22,
                mass: 0.7,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            >
              {/* Stepping Hop and Floating Motion */}
              <motion.div
                animate={
                  isTurnPlayer
                    ? {
                        y: [0, -8, 0],
                        scale: [1, 1.25, 1],
                        transition: {
                          duration: 0.35,
                          ease: 'easeOut',
                        },
                      }
                    : {}
                }
                className="relative"
              >
                {/* Realistic Character Standee Miniature Token */}
                <CharacterAvatar
                  factionId={player.factionId}
                  size="sm"
                  showStandee={true}
                  isTurnPlayer={isTurnPlayer}
                  className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                />

                {/* Golden Sparkle Ripple when Active */}
                {isTurnPlayer && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut' }}
                    className="absolute -inset-1 rounded-full border border-amber-300 pointer-events-none"
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
