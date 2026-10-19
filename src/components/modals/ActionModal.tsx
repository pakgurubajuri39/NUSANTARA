import React, { useState } from 'react';
import { BoardTile, Player, SpiceMarketPrices, SpiceType, ActiveActionModal } from '../../types/game';
import { 
  Castle, 
  Coins, 
  Swords, 
  Sparkles, 
  Store, 
  Flame, 
  Skull, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActionModalProps {
  modalData: ActiveActionModal;
  tile: BoardTile;
  player: Player;
  ownerPlayer: Player | null;
  spicePrices: SpiceMarketPrices;
  onClaimTile: (tileId: number) => void;
  onPayRent: (tileId: number, amount: number) => void;
  onInitiateBattle: (tileId: number, attackerId: string, defenderId: string) => void;
  onBlessBorobudur: () => void;
  onTradeSpice: (action: 'buy' | 'sell', spice: SpiceType, amount: number) => void;
  onHandleParegreg: () => void;
  onHandleVOC: (choice: 'bribe' | 'fight') => void;
  onClose: () => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  modalData,
  tile,
  player,
  ownerPlayer,
  spicePrices,
  onClaimTile,
  onPayRent,
  onInitiateBattle,
  onBlessBorobudur,
  onTradeSpice,
  onHandleParegreg,
  onHandleVOC,
  onClose
}) => {
  const [selectedSpice, setSelectedSpice] = useState<SpiceType>('lada');

  // Potongan harga Singhasari jika ada
  const isSinghasari = player.factionId === 'singhasari';
  const claimCost = isSinghasari ? Math.round(tile.cost * 0.8) : tile.cost;

  // Samudera Pasai bonus sewa
  const baseRent = tile.rent + (tile.fortificationLevel * 6);
  const finalRent = ownerPlayer?.factionId === 'samudera_pasai' 
    ? Math.round(baseRent * 1.25) 
    : baseRent;

  // Check if allied with owner
  const allianceWithHost = ownerPlayer ? player.alliances[ownerPlayer.id] : 'none';
  const isFreeTransit = allianceWithHost === 'bebas_transit' || allianceWithHost === 'nikah_politik';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-700/60 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Top Decorative Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />

        {/* Modal Header */}
        <div className="flex items-start justify-between mb-4 pt-1">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/40">
              Petak #{tile.id} · {tile.era.replace('_', ' ').toUpperCase()}
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
              {tile.name}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {tile.description}
            </p>
          </div>
        </div>

        {/* Historical Context Banner */}
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs font-serif italic text-amber-200/90 leading-relaxed mb-5">
          "{tile.historicalNote}"
        </div>

        {/* SCENARIO 1: Empty Territory (Wilayah Kosong) */}
        {modalData.type === 'claim_tile' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Status Wilayah:</span>
                <span className="text-emerald-400 font-semibold">Wilayah Netral (Belum Berpemilik)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Biaya Klaim Damai:</span>
                <span className="text-amber-300 font-bold font-mono">
                  {claimCost} Koin Emas
                  {isSinghasari && <span className="text-[10px] text-amber-400 block">(Diskon 20% Trait Singhasari)</span>}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Koin Emas Anda:</span>
                <span className={`font-mono font-bold ${player.coins >= claimCost ? 'text-amber-200' : 'text-rose-400'}`}>
                  {player.coins} Koin Emas
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Lewati / Biarkan Kosong
              </button>
              
              <button
                onClick={() => onClaimTile(tile.id)}
                disabled={player.coins < claimCost}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 disabled:opacity-40 text-stone-950 text-xs font-serif font-bold transition-all shadow-lg shadow-amber-600/20 cursor-pointer"
              >
                Klaim Wilayah Damai ({claimCost}g)
              </button>
            </div>
          </div>
        )}

        {/* SCENARIO 2: Enemy Territory (Wilayah Lawan) */}
        {modalData.type === 'enemy_tile' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Penguasa Wilayah:</span>
                <span className="font-bold" style={{ color: ownerPlayer?.color || '#f59e0b' }}>
                  {ownerPlayer ? `${ownerPlayer.name} (${ownerPlayer.factionName})` : 'Kerajaan Lawan'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Status Aliansi:</span>
                <span className="text-sky-400 font-medium capitalize">
                  {allianceWithHost !== 'none' ? allianceWithHost.replace('_', ' ') : 'Tidak Ada Persekutuan'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Upeti / Sewa Transit:</span>
                <span className="text-amber-300 font-bold font-mono">
                  {isFreeTransit ? '0 Koin (Bebas Transit Sekutu)' : `${finalRent} Koin Emas`}
                </span>
              </div>
            </div>

            {isFreeTransit ? (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-600/40 text-sky-200 text-xs">
                  🕊️ Karena Anda terikat traktat aliansi dengan {ownerPlayer?.name || 'pemilik tanah'}, Anda bebas melintasi tanah ini tanpa pungutan sewa!
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-serif font-bold text-xs cursor-pointer shadow-lg"
                >
                  Lanjutkan Perjalanan
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onPayRent(tile.id, finalRent)}
                  className="flex-1 py-3 px-3 rounded-xl bg-amber-700/40 hover:bg-amber-600/50 border border-amber-600/40 text-amber-200 text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  Bayar Upeti ({finalRent}g)
                </button>

                {ownerPlayer && (
                  <button
                    onClick={() => onInitiateBattle(tile.id, player.id, ownerPlayer.id)}
                    disabled={player.military <= 0}
                    className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white text-xs font-serif font-bold shadow-lg shadow-red-900/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Swords className="w-4 h-4" />
                    <span>Serang Militer!</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* SCENARIO 2B: Friendly / Own Territory (Wilayah Sendiri) */}
        {modalData.type === 'friendly_tile' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/50 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-serif font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Singgah di Benteng Wilayah Sendiri</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Pasukan Anda disambut gembira oleh rakyat kawula di <b>{tile.name}</b>. Tidak ada upeti atau pungutan sewa yang dikenakan.
              </p>
              <div className="p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 text-[11px] text-stone-300 flex justify-between">
                <span>Benteng Pertahanan:</span>
                <span className="text-amber-300 font-mono">Level {tile.fortificationLevel} {tile.fortificationLevel > 0 ? '(Diperkokoh)' : '(Standar)'}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-stone-950 font-serif font-bold text-xs tracking-wide shadow-lg cursor-pointer"
            >
              Lanjutkan Giliran Berikutnya
            </button>
          </div>
        )}

        {/* SCENARIO 3: Sacred Site - Borobudur */}
        {modalData.type === 'sacred_site' && (
          <div className="space-y-4 text-center">
            <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 to-stone-950 border border-amber-600/50 space-y-3">
              <Sparkles className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
              <h4 className="text-base font-serif font-bold text-amber-100">
                Pemberkatan Mandala Suci Syailendra
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed max-w-sm mx-auto">
                Raja menapaki undakan batu mandala Arupadhatu. Legitimasi kepemimpinan dan kewibawaan spiritual takhta Anda terberkati oleh para dewa dan leluhur.
              </p>
              <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono font-bold text-sm">
                +2 Poin Kejayaan (PK) Diterima!
              </div>
            </div>

            <button
              onClick={onBlessBorobudur}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-serif font-bold text-xs tracking-wide shadow-lg cursor-pointer"
            >
              Terima Berkah Suci & Lanjutkan
            </button>
          </div>
        )}

        {/* SCENARIO 4: Pasar Rempah Utama */}
        {modalData.type === 'spice_market' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-medium">Bursa Komoditas Nusantara:</span>
                <span className="text-amber-300 font-mono">Kas Anda: {player.coins}g</span>
              </div>

              {/* Spice Tabs */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['lada', 'cengkeh', 'pala'] as SpiceType[]).map((spice) => {
                  const price = spicePrices[spice];
                  const userCount = player.spices[spice];
                  const isSelected = selectedSpice === spice;
                  return (
                    <button
                      key={spice}
                      onClick={() => setSelectedSpice(spice)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-950/60 border-amber-500 text-amber-200 shadow-md'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <span className="capitalize block font-serif font-bold text-xs">{spice}</span>
                      <span className="text-[11px] font-mono text-amber-300 block">{price}g / unit</span>
                      <span className="text-[10px] text-stone-400">Milik Anda: {userCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trading Action for selected spice */}
            <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-stone-300 font-medium capitalize">
                  Perdagangan {selectedSpice}
                </span>
                <p className="text-[11px] text-stone-400">
                  Harga Pasar: <b className="text-amber-300">{spicePrices[selectedSpice]}g</b>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTradeSpice('sell', selectedSpice, 1)}
                  disabled={player.spices[selectedSpice] <= 0}
                  className="px-3.5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 disabled:opacity-30 text-white text-xs font-semibold cursor-pointer"
                >
                  Jual 1 (+{spicePrices[selectedSpice]}g)
                </button>
                <button
                  onClick={() => onTradeSpice('buy', selectedSpice, 1)}
                  disabled={player.coins < spicePrices[selectedSpice]}
                  className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-stone-950 text-xs font-semibold cursor-pointer"
                >
                  Beli 1 (-{spicePrices[selectedSpice]}g)
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer"
            >
              Selesai Berniaga
            </button>
          </div>
        )}

        {/* SCENARIO 5: Prahara - Perang Paregreg */}
        {modalData.type === 'paregreg' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-red-950/50 border border-red-700/60 space-y-2 text-red-200">
              <div className="flex items-center gap-2 font-serif font-bold text-red-300 text-sm">
                <Flame className="w-5 h-5 text-red-400 animate-bounce" />
                <span>Prahara Keretakan Takhta Istana</span>
              </div>
              <p className="text-xs leading-relaxed">
                Api perselisihan suksesi Paregreg berkobar! Pertikaian keluarga kraton merongrong loyalitas prajurit dan memicu pergolakan di kalangan punggawa istana.
              </p>
              <div className="p-2.5 rounded-lg bg-black/40 border border-red-900/50 text-[11px] text-red-300">
                ⚠️ Efek: Kerentanan Perpecahan kerajaan Anda bertambah +1. Jika mencapai 3/3, prahara pembagian wilayah akan meletus!
              </div>
            </div>

            <button
              onClick={onHandleParegreg}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white font-serif font-bold text-xs tracking-wide shadow-lg cursor-pointer"
            >
              Hadapi Ujian Sejarah Takhta
            </button>
          </div>
        )}

        {/* SCENARIO 6: Bentrokan VOC */}
        {modalData.type === 'voc_clash' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-700/60 space-y-2 text-rose-200">
              <div className="flex items-center gap-2 font-serif font-bold text-rose-300 text-sm">
                <Skull className="w-5 h-5 text-rose-400 animate-pulse" />
                <span>Intervensi Faksi Armada VOC Belanda</span>
              </div>
              <p className="text-xs leading-relaxed">
                Kapal dagang bersenjata meriam VOC memblokade jalur laut! Kompeni menuntut upeti monopoli sebesar 30 Koin Emas, atau armada meriam mereka akan menggempur pertahanan Anda!
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => onHandleVOC('bribe')}
                disabled={player.coins < 30}
                className="flex-1 py-3 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 disabled:opacity-40 border border-stone-700 text-stone-200 text-xs font-medium cursor-pointer text-center"
              >
                Bayar Sogokan VOC (30g)
              </button>

              <button
                onClick={() => onHandleVOC('fight')}
                className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-rose-700 to-red-600 hover:from-rose-600 text-white text-xs font-serif font-bold shadow-lg cursor-pointer text-center"
              >
                Lawan Armada Meriam!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
