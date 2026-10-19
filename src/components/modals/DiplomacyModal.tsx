import React, { useState } from 'react';
import { Player, AllianceType } from '../../types/game';
import { Handshake, HeartHandshake, Shield, Sparkles, X } from 'lucide-react';

interface DiplomacyModalProps {
  activePlayer: Player;
  otherPlayers: Player[];
  onFormAlliance: (targetPlayerId: string, allianceType: AllianceType) => void;
  onClose: () => void;
}

export const DiplomacyModal: React.FC<DiplomacyModalProps> = ({
  activePlayer,
  otherPlayers,
  onFormAlliance,
  onClose,
}) => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    otherPlayers[0]?.id || ''
  );
  const [selectedAllianceType, setSelectedAllianceType] = useState<AllianceType>('bebas_transit');

  const targetPlayer = otherPlayers.find(p => p.id === selectedTargetId);

  const allianceOptions: Array<{
    type: AllianceType;
    title: string;
    description: string;
    cost: number;
    icon: React.ReactNode;
  }> = [
    {
      type: 'bebas_transit',
      title: 'Perjanjian Bebas Transit',
      description: 'Kedua faksi bebas melintasi wilayah masing-masing tanpa dipungut upeti/uang sewa.',
      cost: 15,
      icon: <Handshake className="w-5 h-5 text-emerald-400" />
    },
    {
      type: 'nikah_politik',
      title: 'Traktat Nikah Politik',
      description: 'Menjalin ikatan kekerabatan darah istana: Bebas transit + pembagian dividen pajak jika pihak ketiga transit.',
      cost: 30,
      icon: <HeartHandshake className="w-5 h-5 text-rose-400" />
    },
    {
      type: 'persekutuan_perang',
      title: 'Persekutuan Pakta Perang',
      description: 'Koalisi militer resmi: Memperoleh bantuan kekuatan tempur pertahanan terhadap ancaman kerajaan lain.',
      cost: 40,
      icon: <Shield className="w-5 h-5 text-sky-400" />
    }
  ];

  const currentOption = allianceOptions.find(o => o.type === selectedAllianceType)!;

  const handleConfirm = () => {
    if (!selectedTargetId) return;
    onFormAlliance(selectedTargetId, selectedAllianceType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-stone-900 border border-sky-700/60 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-800/40">
              Balai Pasowanan Diplomasi Nusantara
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
              Jalin Aliansi & Traktat Politik
            </h3>
            <p className="text-xs text-stone-400">
              Kirimkan utusan mahapatih untuk memperkuat posisi geopolitik kerajaan.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Player Selection */}
        <div className="mb-4">
          <label className="text-xs text-stone-300 block mb-1.5 font-medium">
            Pilih Kerajaan / Faksi Sasaran:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {otherPlayers.map((p) => {
              const isSelected = p.id === selectedTargetId;
              const currentAlliance = activePlayer.alliances[p.id] || 'none';
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedTargetId(p.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-sky-950/60 border-sky-400 text-sky-100 ring-1 ring-sky-400'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full shrink-0" 
                    style={{ backgroundColor: p.color }}
                  />
                  <div className="line-clamp-1">
                    <span className="text-xs font-serif font-bold block">{p.name}</span>
                    <span className="text-[10px] text-stone-400 block">{p.factionName}</span>
                    {currentAlliance !== 'none' && (
                      <span className="text-[9px] text-emerald-400 font-mono">
                        Aktif: {currentAlliance.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alliance Type Cards */}
        <div className="space-y-2.5 mb-5">
          <label className="text-xs text-stone-300 block font-medium">
            Bentuk Traktat yang Ditawarkan:
          </label>
          {allianceOptions.map((opt) => {
            const isSelected = opt.type === selectedAllianceType;
            return (
              <button
                key={opt.type}
                onClick={() => setSelectedAllianceType(opt.type)}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'bg-stone-950 border-sky-400 text-stone-100 shadow-md ring-1 ring-sky-500/40'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 shrink-0">
                  {opt.icon}
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-stone-200">{opt.title}</span>
                    <span className="font-mono text-amber-300 font-bold">{opt.cost}g Biaya Mahar</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Confirm Footer */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-800">
          <div className="text-xs text-stone-400">
            Kas Anda: <b className="text-amber-300">{activePlayer.coins}g</b>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleConfirm}
              disabled={activePlayer.coins < currentOption.cost || !selectedTargetId}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 disabled:opacity-40 text-white font-serif font-bold text-xs tracking-wide shadow-lg cursor-pointer"
            >
              Kirim Perjanjian Damai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
