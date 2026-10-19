import React from 'react';
import { BoardTile, Player } from '../../types/game';
import { Castle, Coins, ShieldCheck, X, Sparkles, MapPin } from 'lucide-react';

interface TileDetailModalProps {
  tile: BoardTile;
  owner: Player | null;
  activePlayer: Player;
  onUpgradeFort: (tileId: number) => void;
  onClose: () => void;
}

export const TileDetailModal: React.FC<TileDetailModalProps> = ({
  tile,
  owner,
  activePlayer,
  onUpgradeFort,
  onClose,
}) => {
  const isOwner = owner?.id === activePlayer.id;
  const canUpgrade = isOwner && tile.fortificationLevel === 0 && activePlayer.coins >= 40;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-stone-900 border border-amber-800/60 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/40">
              Petak #{tile.id} · {tile.era.replace('_', ' ').toUpperCase()}
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
              {tile.name}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {tile.description}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Historical Note */}
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs font-serif italic text-amber-200/90 leading-relaxed mb-4">
          "{tile.historicalNote}"
        </div>

        {/* Stats */}
        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-stone-400">Penguasa Saat Ini:</span>
            <span className="font-bold" style={{ color: owner?.color || '#a8a29e' }}>
              {owner ? `${owner.name} (${owner.factionName})` : 'Wilayah Netral'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-400">Uang Sewa / Upeti Transit:</span>
            <span className="font-mono font-bold text-amber-300">
              {tile.rent + (tile.fortificationLevel * 6)} Koin Emas
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-400">Status Benteng Pertahanan:</span>
            <span className={`font-semibold ${tile.fortificationLevel > 0 ? 'text-amber-400' : 'text-stone-500'}`}>
              {tile.fortificationLevel > 0 ? 'Benteng Bata Merah (+6 Sewa, +1 Def)' : 'Tanpa Benteng'}
            </span>
          </div>

          {tile.spiceBonus && (
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Hasil Bumi Pusaka:</span>
              <span className="text-emerald-400 font-bold capitalize">
                +{tile.spiceBonus} Setiap Putaran
              </span>
            </div>
          )}
        </div>

        {/* Upgrade Benteng button if owner */}
        {isOwner && tile.fortificationLevel === 0 && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/30 border border-amber-700/40 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-serif font-bold text-amber-300 block">
                Bangun Benteng Pertahanan (40g)
              </span>
              <p className="text-[10px] text-stone-400">
                Menambah sewa +6 koin & +1 pertahanan saat diserang militer.
              </p>
            </div>
            <button
              onClick={() => onUpgradeFort(tile.id)}
              disabled={!canUpgrade}
              className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-stone-950 text-xs font-bold cursor-pointer transition-colors shrink-0"
            >
              Bangun
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer"
        >
          Tutup Rincian
        </button>
      </div>
    </div>
  );
};
