import React, { useState } from 'react';
import { Player, BoardTile } from '../types/game';
import { CharacterAvatar } from './CharacterAvatar';
import { REAL_CHARACTERS } from '../data/characters';
import { 
  Coins, 
  Swords, 
  Crown, 
  AlertTriangle, 
  Shield, 
  Sparkles, 
  Handshake, 
  Castle,
  PlusCircle,
  ShieldCheck,
  User,
  Quote,
  Flame,
  X
} from 'lucide-react';

interface PlayerDashboardProps {
  players: Player[];
  activePlayerIndex: number;
  tiles: BoardTile[];
  onRecruitMilitary: (playerId: string) => void;
  onFortifyTerritory: (tileId: number) => void;
  onOpenDiplomacy: (playerId: string) => void;
  canManageActions: boolean;
}

export const PlayerDashboard: React.FC<PlayerDashboardProps> = ({
  players,
  activePlayerIndex,
  tiles,
  onRecruitMilitary,
  onFortifyTerritory,
  onOpenDiplomacy,
  canManageActions
}) => {
  const [inspectedPlayer, setInspectedPlayer] = useState<Player | null>(null);

  return (
    <div className="w-full">
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x md:snap-none gap-2.5 sm:gap-3 pb-2 md:pb-0 scrollbar-thin">
        {players.map((p, idx) => {
          const isActive = idx === activePlayerIndex;
          const ownedTiles = tiles.filter(t => p.territories.includes(t.id));
          const alliancesEntries = Object.entries(p.alliances);

          return (
            <div
              key={p.id}
              className={`min-w-[260px] sm:min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                p.bankrupt
                  ? 'opacity-40 bg-stone-950/80 border-stone-800'
                  : isActive
                  ? 'bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950/30 border-amber-500/80 shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/40'
                  : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
              }`}
            >
              {/* Top Color Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: p.color }}
              />

              {/* Header: Name, Realistic Character Persona & Active Tag */}
              <div className="flex items-start justify-between gap-2 pt-1 mb-2">
                <div className="flex items-start gap-2.5">
                  {/* Miniature Figurine Plinth Avatar */}
                  <button
                    onClick={() => setInspectedPlayer(p)}
                    className="relative rounded-xl border border-amber-600/50 bg-stone-950 flex flex-col items-center justify-center shrink-0 shadow-inner group/avatar cursor-pointer hover:border-amber-400 transition-colors p-0.5"
                    title="Klik untuk melihat profil lengkap tokoh sejarah"
                  >
                    <CharacterAvatar 
                      factionId={p.factionId} 
                      size="md" 
                      isTurnPlayer={isActive}
                    />
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-serif font-bold text-stone-100 line-clamp-1">
                        {p.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-amber-300 font-medium truncate">
                      {p.factionName}
                    </p>
                    <p className="text-[10px] text-stone-400 truncate" title={p.rulerTitle}>
                      {p.rulerName}
                    </p>
                  </div>
                </div>

                {isActive && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse shrink-0">
                    Aktif
                  </span>
                )}
              </div>

              {/* Real Character Oath / Quote Snippet */}
              {p.quote && (
                <div 
                  onClick={() => setInspectedPlayer(p)}
                  className="mb-2.5 px-2 py-1 rounded-lg bg-stone-950/60 border border-stone-800/80 text-[10px] font-serif italic text-amber-200/80 line-clamp-1 cursor-pointer hover:border-amber-500/40"
                  title={p.quote}
                >
                  "{p.quote}"
                </div>
              )}

              {/* Primary Stats Grid */}
              <div className="grid grid-cols-2 gap-1.5 text-xs mb-2.5">
                {/* Koin Emas */}
                <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg bg-stone-950/70 border border-stone-800">
                  <Coins className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[9px] text-stone-400 block leading-none">Koin Emas</span>
                    <span className="text-xs font-bold text-amber-200">{p.coins}g</span>
                  </div>
                </div>

                {/* Pasukan Militer */}
                <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg bg-stone-950/70 border border-stone-800">
                  <Swords className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <div>
                    <span className="text-[9px] text-stone-400 block leading-none">Lasykar</span>
                    <span className="text-xs font-bold text-stone-100">{p.military}</span>
                  </div>
                </div>

                {/* Poin Kejayaan (PK) */}
                <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg bg-stone-950/70 border border-stone-800">
                  <Crown className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <div>
                    <span className="text-[9px] text-stone-400 block leading-none">Kejayaan</span>
                    <span className="text-xs font-bold text-yellow-300">{p.gloryPoints} PK</span>
                  </div>
                </div>

                {/* Kerentanan Perpecahan (0-3) */}
                <div className={`flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg border ${
                  p.vulnerability >= 2
                    ? 'bg-red-950/50 border-red-700/60 text-red-300 animate-pulse'
                    : 'bg-stone-950/70 border-stone-800 text-stone-300'
                }`}>
                  <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${p.vulnerability >= 2 ? 'text-red-400' : 'text-stone-400'}`} />
                  <div>
                    <span className="text-[9px] text-stone-400 block leading-none">Perpecahan</span>
                    <span className="text-xs font-bold font-mono">[{p.vulnerability}/3]</span>
                  </div>
                </div>
              </div>

              {/* Inventory Rempah */}
              <div className="p-1.5 sm:p-2 rounded-lg bg-stone-950/50 border border-stone-800/80 mb-2 text-[10px]">
                <div className="flex items-center justify-between text-stone-300">
                  <span>Lada: <b className="text-amber-300">{p.spices.lada}</b></span>
                  <span>Cengkeh: <b className="text-emerald-300">{p.spices.cengkeh}</b></span>
                  <span>Pala: <b className="text-teal-300">{p.spices.pala}</b></span>
                </div>
              </div>

              {/* Wilayah Kekuasaan */}
              <div className="mb-2 text-[10px]">
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span>🏰 Wilayah ({ownedTiles.length}):</span>
                  {ownedTiles.length > 0 && (
                    <span className="text-[9px] text-amber-400/80 font-mono">
                      {Math.round((ownedTiles.length / 24) * 100)}% peta
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 max-h-12 overflow-y-auto">
                  {ownedTiles.length === 0 ? (
                    <span className="text-[9px] text-stone-600 italic">Belum ada wilayah</span>
                  ) : (
                    ownedTiles.map(t => (
                      <span 
                        key={t.id}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-300 flex items-center gap-1"
                      >
                        <span>{t.name}</span>
                        {t.fortificationLevel > 0 && (
                          <ShieldCheck className="w-2.5 h-2.5 text-amber-400" />
                        )}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Alliances summary if any */}
              {alliancesEntries.length > 0 && (
                <div className="mb-2 text-[9px] text-stone-400 flex items-center gap-1.5">
                  <Handshake className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="line-clamp-1">
                    Sekutu: {alliancesEntries.map(([tId, type]) => {
                      const target = players.find(x => x.id === tId);
                      return `${target?.name || 'Faksi'} (${type.replace('_', ' ')})`;
                    }).join(', ')}
                  </span>
                </div>
              )}

              {/* Action Bar for Active Player */}
              {isActive && canManageActions && !p.bankrupt && !p.isAI && (
                <div className="mt-auto pt-2 border-t border-stone-800 flex items-center gap-1.5">
                  <button
                    onClick={() => onRecruitMilitary(p.id)}
                    disabled={p.coins < 25}
                    title="Rekrut 1 Pasukan Militer tambahan (25 Koin Emas)"
                    className="flex-1 py-1.5 px-2 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 text-[10px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-3 h-3 text-red-400" />
                    <span>Rekrut (25g)</span>
                  </button>

                  <button
                    onClick={() => onOpenDiplomacy(p.id)}
                    className="py-1.5 px-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    title="Ajukan Traktat Diplomasi / Persekutuan"
                  >
                    <Handshake className="w-3 h-3 text-sky-400" />
                    <span>Diplomasi</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* REAL CHARACTER PROFILE / DOSSIER MODAL */}
      {inspectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-stone-900 border-2 border-amber-600/70 rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between pb-3 mb-4 border-b border-amber-800/40">
              <div className="flex items-center gap-3">
                <CharacterAvatar 
                  factionId={inspectedPlayer.factionId} 
                  size="lg" 
                  showStandee={true}
                />
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-100">
                    {inspectedPlayer.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium">
                    {inspectedPlayer.factionName}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Tokoh Utama: {inspectedPlayer.rulerName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectedPlayer(null)}
                className="p-1 rounded-xl bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Character Dossier Content */}
            <div className="space-y-3 text-xs">
              {/* Gelar Resmi */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                  Gelar Kebangsaan Resmi
                </span>
                <p className="text-sm font-serif font-bold text-amber-100">
                  {inspectedPlayer.rulerTitle || inspectedPlayer.rulerName}
                </p>
              </div>

              {/* Kisah Tokoh Sejarah Real */}
              {REAL_CHARACTERS[inspectedPlayer.factionId]?.lore && (
                <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                    Catatan Sejarah Karakter
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    {REAL_CHARACTERS[inspectedPlayer.factionId].lore}
                  </p>
                </div>
              )}

              {/* Sumpah / Ikrar Sejarah */}
              {inspectedPlayer.quote && (
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-700/50 space-y-1">
                  <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-mono">
                    Sumpah & Ikrar Takhta
                  </span>
                  <p className="text-xs font-serif italic text-amber-200 leading-relaxed">
                    "{inspectedPlayer.quote}"
                  </p>
                </div>
              )}

              {/* Busana & Zirah Kebesaran */}
              {REAL_CHARACTERS[inspectedPlayer.factionId]?.attire && (
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                    Busana Adat & Zirah Kerajaan
                  </span>
                  <p className="text-xs text-stone-300">
                    👑 {REAL_CHARACTERS[inspectedPlayer.factionId].attire}
                  </p>
                </div>
              )}

              {/* Pusaka & Senjata Tempur */}
              {inspectedPlayer.weapon && (
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                    Senjata Pusaka & Mahakarya
                  </span>
                  <p className="text-xs font-serif text-stone-200">
                    🗡️ {inspectedPlayer.weapon}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setInspectedPlayer(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 text-stone-950 font-serif font-bold text-xs shadow-md cursor-pointer"
            >
              Tutup Profil Tokoh Sejarah
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
