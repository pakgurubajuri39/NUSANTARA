import React, { useState } from 'react';
import { REAL_CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { 
  Crown, 
  Dices, 
  Scroll, 
  Swords, 
  Store, 
  Flame, 
  ShieldAlert, 
  Maximize2, 
  Play, 
  HelpCircle, 
  Compass, 
  Users, 
  Sparkles,
  ChevronRight,
  AlertTriangle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingPageProps {
  onStartGameClick: () => void;
  onOpenRulesClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartGameClick,
  onOpenRulesClick,
}) => {
  const [selectedCharacterKey, setSelectedCharacterKey] = useState<string | null>(null);
  const [isPhotoZoomOpen, setIsPhotoZoomOpen] = useState(false);

  const characterKeys = Object.keys(REAL_CHARACTERS).filter(k => k !== 'voc');

  return (
    <div className="min-h-screen text-stone-100 flex flex-col justify-between relative bg-[#0d0704] overflow-hidden selection:bg-amber-500 selection:text-stone-950">
      {/* 3D Realistic Antique Wooden Table Environment Backdrop */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-110"
        style={{ backgroundImage: `url('/board-game-table.jpg')` }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_35%,rgba(55,30,16,0.65)_0%,rgba(20,11,6,0.92)_65%,rgba(10,5,3,0.99)_100%)]" />
      {/* Warm Antique Chamber Candlelight Glow */}
      <div className="fixed -top-24 -left-24 w-[450px] h-[450px] rounded-full bg-amber-500/15 blur-[140px] pointer-events-none z-0" />
      <div className="fixed -bottom-24 -right-24 w-[450px] h-[450px] rounded-full bg-yellow-600/10 blur-[130px] pointer-events-none z-0" />

      {/* Top Header */}
      <header className="relative z-20 px-4 sm:px-8 py-4 flex items-center justify-between border-b border-amber-900/40 bg-stone-950/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-500 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-serif font-black tracking-wide text-amber-100">
              NUSANTARA
            </h1>
            <span className="text-[11px] font-mono text-amber-400/90 block -mt-0.5">
              Takhta, Sekutu, & Prahara
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenRulesClick}
            className="px-3.5 py-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-850 border border-amber-700/40 text-stone-300 hover:text-amber-200 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Scroll className="w-3.5 h-3.5 text-amber-400" />
            <span>Kitab Panduan</span>
          </button>

          <button
            onClick={onStartGameClick}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 text-stone-950 font-serif font-bold text-xs tracking-wide shadow-lg shadow-amber-600/30 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Mulai Bermain</span>
          </button>
        </div>
      </header>

      {/* Main Landing Page Content */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 space-y-12">
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text & CTA */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-mono shadow-inner">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>Board Game Strategis Sejarah Nusantara</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-100 leading-tight">
              Rebut Takhta, Rajut Sekutu, Hadapi Prahara!
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
              Pimpin kerajaan agung kepulauan Nusantara dalam pertempuran taktis 24 petak melingkar melintasi <b>Era Hindu-Buddha</b>, <b>Era Islam Nusantara</b>, hingga <b>Era Kolonial VOC</b>. Dipandu Game Master cerdas dengan narasi sejarah hidup!
            </p>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onStartGameClick}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 text-stone-950 font-serif font-black text-sm tracking-wide shadow-xl shadow-amber-600/40 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
              >
                <Crown className="w-5 h-5" />
                <span>Mulai Permainan Baru</span>
              </button>

              <button
                onClick={onOpenRulesClick}
                className="px-5 py-3.5 rounded-2xl bg-stone-900/90 hover:bg-stone-850 border border-amber-700/60 text-amber-200 font-serif font-bold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Pelajari Aturan Main</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-md mx-auto lg:mx-0 border-t border-amber-900/40 text-center">
              <div>
                <span className="text-xl sm:text-2xl font-serif font-black text-amber-300 block">24 Petak</span>
                <span className="text-[11px] text-stone-400">Papan 3 Era</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-black text-amber-300 block">8 Tokoh</span>
                <span className="text-[11px] text-stone-400">Figurin Sejarah</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-black text-amber-300 block">2 - 4</span>
                <span className="text-[11px] text-stone-400">Pemain / Bot AI</span>
              </div>
            </div>
          </div>

          {/* Right Hero: Physical Board Game Artwork Preview */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-600/70 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-stone-950 group">
              <img 
                src="/board-game-table.jpg" 
                alt="Papan Permainan Nusantara 3D Meja Kayu" 
                className="w-full aspect-[16/10] object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70 pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-stone-950/90 border border-amber-500/70 backdrop-blur-md flex items-center gap-1.5 text-xs text-amber-200">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-serif font-bold">Papan Meja Kayu 3D Asli</span>
              </div>

              {/* Zoom Button */}
              <button
                onClick={() => setIsPhotoZoomOpen(true)}
                className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-stone-950/90 hover:bg-stone-850 border border-amber-500/60 text-amber-300 backdrop-blur-md cursor-pointer transition-colors shadow-lg"
                title="Perbesar Tampilan Seni Meja Kayu"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Caption Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-stone-200 font-serif">
                  Dilengkapi koin gobog emas-perak, rempah cengkeh & pala, serta peta mandala.
                </span>
                <button
                  onClick={onStartGameClick}
                  className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Masuk Meja Permainan ➔
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SHOWCASE 8 REAL CHARACTERS FIGURINES */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-amber-900/40 pb-3">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-1">
                <Users className="w-4 h-4" />
                <span>Figurin Tokoh Sejarah Realistis</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-amber-100">
                Pilih Tokoh Pemimpin Peradaban Anda
              </h3>
            </div>
            <span className="text-xs text-stone-400">
              Klik tokoh untuk melihat gelar, senjata pusaka, dan ikrar takhta
            </span>
          </div>

          {/* Characters Carousel / Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {characterKeys.map((key) => {
              const char = REAL_CHARACTERS[key];
              const isSelected = selectedCharacterKey === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedCharacterKey(isSelected ? null : key)}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[145px] relative group ${
                    isSelected
                      ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-400/50 shadow-xl'
                      : 'bg-stone-900/80 hover:bg-stone-850 border-stone-800 hover:border-amber-700/60'
                  }`}
                >
                  {/* Standee Miniature */}
                  <CharacterAvatar 
                    factionId={key} 
                    size="md" 
                    showStandee={true} 
                  />

                  <div className="mt-2 w-full">
                    <span className="text-[11px] font-serif font-bold text-stone-100 block truncate group-hover:text-amber-300">
                      {char.ruler.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-amber-400/90 block truncate font-mono">
                      {char.name.split(' ')[1] || char.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Character Detail Card */}
          {selectedCharacterKey && REAL_CHARACTERS[selectedCharacterKey] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-3xl bg-stone-900/95 border-2 border-amber-600/70 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedCharacterKey(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <CharacterAvatar 
                  factionId={selectedCharacterKey} 
                  size="xl" 
                  showStandee={true} 
                  className="shrink-0"
                />

                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-serif font-bold text-amber-200">
                      {REAL_CHARACTERS[selectedCharacterKey].ruler}
                    </h4>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-700/50 text-amber-300">
                      {REAL_CHARACTERS[selectedCharacterKey].name}
                    </span>
                  </div>

                  <p className="text-xs font-serif font-medium text-stone-300">
                    👑 Gelar: {REAL_CHARACTERS[selectedCharacterKey].title}
                  </p>

                  <p className="text-xs text-stone-300 font-sans leading-relaxed">
                    {REAL_CHARACTERS[selectedCharacterKey].lore}
                  </p>

                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-700/40 text-xs font-serif italic text-amber-200">
                    "{REAL_CHARACTERS[selectedCharacterKey].quote}"
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-1">
                    <span>🗡️ Pusaka: <b className="text-stone-200">{REAL_CHARACTERS[selectedCharacterKey].weapon}</b></span>
                    <span>🥋 Busana: <b className="text-stone-200">{REAL_CHARACTERS[selectedCharacterKey].attire}</b></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* SECTION 3: GAMEPLAY FEATURES */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-serif font-black text-amber-100 border-b border-amber-900/40 pb-3">
            Fitur Utama Nusantara Game Engine
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2 hover:border-amber-700/60 transition-colors">
              <Scroll className="w-5 h-5 text-amber-400" />
              <h4 className="font-serif font-bold text-amber-200 text-sm">Game Master Engine Cerdas</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Setiap lemparan dadu melahirkan 2-3 kalimat narasi sejarah Nusantara bernada babad kraton klasik yang imersif dan mendalam.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2 hover:border-amber-700/60 transition-colors">
              <Store className="w-5 h-5 text-emerald-400" />
              <h4 className="font-serif font-bold text-amber-200 text-sm">Bursa Rempah Internasional</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Dagangkan komoditas Lada, Cengkeh, dan Pala di Bursa Pasar Rempah (#16) dengan harga yang berfluktuasi di tiap ronde.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2 hover:border-amber-700/60 transition-colors">
              <Swords className="w-5 h-5 text-red-400" />
              <h4 className="font-serif font-bold text-amber-200 text-sm">Palagan Tempur & Benteng</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Gempur wilayah lawan dengan dadu tempur dan kekuatan lasykar. Perkokoh daerah kekuasaan dengan benteng pertahanan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2 hover:border-amber-700/60 transition-colors">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h4 className="font-serif font-bold text-amber-200 text-sm">Kerentanan Perpecahan Takhta</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Ekspansi tanpa henti meningkatkan kerentanan [3/3]. Picu Kartu Prahara Paregreg yang memecah kerajaan dari dalam!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2 hover:border-amber-700/60 transition-colors">
              <Flame className="w-5 h-5 text-rose-400" />
              <h4 className="font-serif font-bold text-amber-200 text-sm">Faksi AI Kompeni VOC</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Mulai ronde ke-10, armada kapal meriam VOC hadir merebut pelabuhan dan memaksakan monopoli dagang kolonial.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2 hover:border-amber-700/60 transition-colors">
              <Crown className="w-5 h-5 text-yellow-400" />
              <h4 className="font-serif font-bold text-amber-200 text-sm">Kemenangan Dominasi & Kejayaan</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Capai 14 wilayah untuk Dominasi Mutlak, atau kumpulkan Poin Kejayaan (PK) tertinggi untuk memenangkan takhta Nusantara.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-amber-900/40 bg-stone-950/85 py-5 px-4 text-center text-xs text-stone-400 space-y-1">
        <p className="font-serif font-bold text-amber-300/90 tracking-wide">
          NUSANTARA: Takhta, Sekutu, & Prahara · Board Game Strategis Sejarah Indonesia
        </p>
        <p className="text-[11px] text-stone-400 font-medium">
          design based on the collaboration between Pak GuruAI and Dr. Fauzan Baihaqi, S.Hum, M.Hum
        </p>
      </footer>

      {/* Zoom Modal for Tabletop Art */}
      <AnimatePresence>
        {isPhotoZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg">
            <div className="relative w-full max-w-5xl max-h-[90vh] bg-stone-950 border border-amber-600/70 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-800/40">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base sm:text-lg font-serif font-bold text-amber-100">
                    Karya Seni Visual Papan Meja Kayu 3D Nusantara
                  </h3>
                </div>
                <button
                  onClick={() => setIsPhotoZoomOpen(false)}
                  className="p-1.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-300 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto rounded-xl flex items-center justify-center bg-stone-900/60">
                <img 
                  src="/board-game-table.jpg" 
                  alt="Full Nusantara Board Game" 
                  className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs text-stone-400">
                  Papan 24 petak 3 era sejarah Nusantara, koin gobog emas, dan rempah pala-cengkeh.
                </span>
                <button
                  onClick={() => {
                    setIsPhotoZoomOpen(false);
                    onStartGameClick();
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Mulai Permainan ➔
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
