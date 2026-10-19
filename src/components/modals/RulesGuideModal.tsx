import React, { useState } from 'react';
import { 
  Scroll, 
  Crown, 
  Swords, 
  Coins, 
  Store, 
  Flame, 
  Shield, 
  Anchor, 
  Compass, 
  AlertTriangle, 
  Handshake, 
  Sparkles,
  BookOpen,
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface RulesGuideModalProps {
  onClose: () => void;
}

export const RulesGuideModal: React.FC<RulesGuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<
    'ringkasan' | 'petak_era' | 'alur_giliran' | 'pertempuran' | 'rempah_ekonomi' | 'prahara_voc' | 'diplomasi'
  >('ringkasan');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-stone-900 border-2 border-amber-600/70 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Gold Trim */}
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-amber-900/40 bg-stone-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/90 border border-amber-500/50 flex items-center justify-center shadow-inner">
              <Scroll className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-black text-amber-100 tracking-wide">
                Kitab Panduan & Aturan Permainan
              </h2>
              <p className="text-xs text-amber-400/80 font-mono">
                NUSANTARA: Takhta, Sekutu, & Prahara · Board Game Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-stone-200 border border-stone-800 cursor-pointer transition-colors"
            title="Tutup Panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto scrollbar-thin px-4 py-2.5 bg-stone-950 border-b border-stone-800 gap-1.5 shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('ringkasan')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ringkasan'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Tujuan & Menang</span>
          </button>

          <button
            onClick={() => setActiveTab('petak_era')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'petak_era'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>24 Petak & 3 Era</span>
          </button>

          <button
            onClick={() => setActiveTab('alur_giliran')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'alur_giliran'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Alur Giliran</span>
          </button>

          <button
            onClick={() => setActiveTab('pertempuran')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pertempuran'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Perang & Benteng</span>
          </button>

          <button
            onClick={() => setActiveTab('rempah_ekonomi')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rempah_ekonomi'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Pasar Rempah</span>
          </button>

          <button
            onClick={() => setActiveTab('prahara_voc')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prahara_voc'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Prahara & AI VOC</span>
          </button>

          <button
            onClick={() => setActiveTab('diplomasi')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'diplomasi'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Handshake className="w-3.5 h-3.5" />
            <span>Diplomasi & Sekutu</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-stone-200 text-xs sm:text-sm leading-relaxed scrollbar-thin">
          {/* TAB 1: RINGKASAN & TUJUAN */}
          {activeTab === 'ringkasan' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-700/50 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Latar Belakang Epik
                </span>
                <p className="text-amber-100 text-sm font-serif leading-relaxed">
                  "Nusantara bukan sekadar gugusan pulau, melainkan bentangan peradaban maritim dan agraris adiluhung tempat para maharaja, laksamana, sultan, dan pujangga bertarung menegakkan daulat, memperluas pengaruh rempah dunia, serta membendung prahara perpecahan internal."
                </p>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-amber-200 mb-3 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Dua Kondisi Kemenangan Mutlak:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 hover:border-amber-600/60 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-600 text-stone-950 font-black text-xs flex items-center justify-center font-mono">
                        1
                      </span>
                      <h4 className="font-serif font-bold text-amber-300">
                        Kemenangan Dominasi Mutlak (60%)
                      </h4>
                    </div>
                    <p className="text-xs text-stone-300">
                      Kerajaan yang berhasil menguasai <b>minimal 14 dari 24 wilayah</b> (60% peta Nusantara) dinobatkan seketika sebagai <i>Maharaja Diraja Nusantara</i> pemersatu mandala kepulauan!
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 hover:border-amber-600/60 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-yellow-500 text-stone-950 font-black text-xs flex items-center justify-center font-mono">
                        2
                      </span>
                      <h4 className="font-serif font-bold text-amber-300">
                        Kemenangan Kejayaan (Poin Kejayaan Tertinggi)
                      </h4>
                    </div>
                    <p className="text-xs text-stone-300">
                      Jika hingga ronde ke-30 belum ada yang menguasai 14 wilayah, pemenang ditentukan dari kerajaan yang mengumpulkan <b>Poin Kejayaan (PK) tertinggi</b> melalui klaim wilayah, kemenangan perang, ziarah Borobudur, dan supremasi rempah.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-amber-200 mb-2">
                  Modal Awal Setiap Penguasa:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <Coins className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <span className="font-bold text-amber-200 block">100 Koin Emas</span>
                    <span className="text-[10px] text-stone-400">Kas Kerajaan</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <Swords className="w-4 h-4 text-red-400 mx-auto mb-1" />
                    <span className="font-bold text-stone-100 block">2 Pasukan Militer</span>
                    <span className="text-[10px] text-stone-400">Garnisun Awal</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <Store className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <span className="font-bold text-emerald-300 block">1 Rempah Acak</span>
                    <span className="text-[10px] text-stone-400">Lada/Cengkeh/Pala</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <Sparkles className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                    <span className="font-bold text-yellow-300 block">0 Poin Kejayaan</span>
                    <span className="text-[10px] text-stone-400">Awal Perjalanan</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 24 PETAK & 3 ERA */}
          {activeTab === 'petak_era' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs text-stone-300">
                Papan melingkar terdiri dari <b>24 Petak Sejarah</b> yang terbagi secara kronologis dalam 3 era besar Nusantara:
              </p>

              {/* Era 1 */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-amber-300 flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>A. Era Hindu-Buddha (Petak #1 s/d #8)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-600/40">
                    Abad IV - XIII
                  </span>
                </div>
                <p className="text-xs text-stone-300">
                  Awal kemunculan kerajaan-kerajaan besar yang mendirikan prasasti batu dan candi megah.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono pt-1 text-stone-300">
                  <div>#1 Kutai (Wilayah)</div>
                  <div>#2 Tarumanagara (Wilayah)</div>
                  <div>#3 Kalingga (Wilayah)</div>
                  <div>#4 Sriwijaya (Pelabuhan)</div>
                  <div>#5 Mataram Kuno (Wilayah)</div>
                  <div className="text-amber-300 font-bold">#6 Borobudur (Situs Suci)</div>
                  <div>#7 Kediri (Wilayah)</div>
                  <div>#8 Singhasari (Wilayah)</div>
                </div>
              </div>

              {/* Era 2 */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-600/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-emerald-300 flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>B. Era Islam Nusantara (Petak #9 s/d #16)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-600/40">
                    Abad XIII - XVII
                  </span>
                </div>
                <p className="text-xs text-stone-300">
                  Era kejayaan maritim Majapahit, bandar dirham Samudera Pasai, dan syiar Kesultanan Demak.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono pt-1 text-stone-300">
                  <div>#9 Majapahit (Strategis)</div>
                  <div>#10 Samudera Pasai (Pelabuhan)</div>
                  <div>#11 Demak (Wilayah)</div>
                  <div className="text-red-400 font-bold">#12 Paregreg (Prahara)</div>
                  <div>#13 Banten (Wilayah)</div>
                  <div>#14 Aceh Darussalam (Wilayah)</div>
                  <div>#15 Mataram Islam (Wilayah)</div>
                  <div className="text-emerald-300 font-bold">#16 Pasar Rempah (Bursa)</div>
                </div>
              </div>

              {/* Era 3 */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-600/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-rose-300 flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span>C. Era Kolonial & Perebutan Rempah (Petak #17 s/d #24)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-600/40">
                    Abad XVII - XIX
                  </span>
                </div>
                <p className="text-xs text-stone-300">
                  Perlawanan gigih menghadapi monopoli dagang VOC dan perang hegemoni pelayaran bebas.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono pt-1 text-stone-300">
                  <div>#17 Gowa-Tallo (Wilayah)</div>
                  <div>#18 Ternate & Tidore (Rempah)</div>
                  <div className="text-rose-400 font-bold">#19 Bentrokan VOC (Serbuan)</div>
                  <div>#20 Batavia (Pelabuhan)</div>
                  <div>#21 Semarang (Wilayah)</div>
                  <div>#22 Surabaya (Wilayah)</div>
                  <div>#23 Ambon & Banda (Rempah)</div>
                  <div>#24 Padang (Wilayah)</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ALUR GILIRAN */}
          {activeTab === 'alur_giliran' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs text-stone-300">
                Setiap giliran dimainkan dengan alur 4 fase yang konsisten dan dipandu oleh Game Master:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                    1
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-amber-200">Fase 1: Lemparan Dadu & Pergerakan</h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Pemain melempar dadu pergerakan (1 - 6). Bidak miniatur berpindah melompat petak demi petak searah jarum jam. Jika berhasil menyelesaikan satu putaran penuh melewati petak #1 (Kutai), kerajaan menerima <b>bonus sirkuit +20 Koin Emas</b>.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                    2
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-amber-200">Fase 2: Evaluasi Petak Pendaratan</h4>
                    <ul className="text-xs text-stone-300 mt-1 space-y-1 list-disc list-inside">
                      <li><b>Wilayah Kosong:</b> Anda dapat memilih [Klaim Damai] dengan membayar Koin Emas atau [Biarkan Kosong].</li>
                      <li><b>Wilayah Lawan:</b> Anda dapat memilih [Bayar Upeti/Sewa Transit] ATAU [Kobarkan Serangan Militer] untuk merebut paksa wilayah tersebut.</li>
                      <li><b>Situs Suci Borobudur (#6):</b> Menegakkan legitimasi wangsa spiritual (+2 Poin Kejayaan).</li>
                      <li><b>Pasar Rempah (#16):</b> Berdagang membeli atau menjual komoditas Lada, Cengkeh, dan Pala sesuai harga pasar saat itu.</li>
                      <li><b>Prahara Paregreg (#12):</b> Menghadapi pergolakan takhta internal yang menambah Kerentanan Perpecahan +1.</li>
                      <li><b>Bentrokan VOC (#19):</b> Menyuap Kompeni (30g) atau bertempur mengusir kapal meriam mereka.</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                    3
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-amber-200">Fase 3: Prahara Check (Pemeriksaan Kerentanan)</h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Sistem memeriksa indikator <b>Kerentanan Perpecahan (0/3)</b>. Jika mencapai 3/3, Kartu Prahara Sejarah otomatis meletus, menghukum kerajaan yang terlalu serakah berekspansi!
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                    4
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-amber-200">Fase 4: Manajemen Takhta & Diplomasi</h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Sebelum mengakhiri giliran, penguasa dapat merekrut lasykar militer (25g), memperkuat wilayah dengan Benteng Pertahanan (+5g sewa), atau membuka Balai Diplomasi menawarkan traktat aliansi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PERTEMPURAN & BENTENG */}
          {activeTab === 'pertempuran' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-700/50 space-y-2">
                <h4 className="font-serif font-bold text-red-300 text-sm flex items-center gap-2">
                  <Swords className="w-4 h-4 text-red-400" />
                  <span>Sistem Perang & Perebutan Wilayah</span>
                </h4>
                <p className="text-xs text-stone-300">
                  Saat mendarat di wilayah yang telah dikuasai kerajaan lawan, Anda tidak wajib membayar sewa jika Anda memilih opsi <b>"Kobarkan Serangan Militer Rebut Wilayah!"</b>
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <h5 className="font-bold text-amber-300 text-xs">Rumus Kekuatan Tempur (Kalkulasi Dadu Palagan):</h5>
                  <div className="p-3 rounded-lg bg-stone-900 font-mono text-xs text-amber-200 border border-stone-700">
                    Total Penyerang = Dadu Tempur (1 - 6) + Jumlah Lasykar Penyerang (+1 jika Trait Majapahit)<br />
                    Total Bertahan = Dadu Tempur (1 - 6) + Jumlah Lasykar Bertahan
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <span className="font-bold text-emerald-400 block">🏆 Jika Penyerang Menang:</span>
                    <p className="text-stone-300">
                      • Wilayah langsung berpindah kepemilikan menjadi milik Penyerang.<br />
                      • Penyerang mendapat bonus <b>+2 Poin Kejayaan</b>.<br />
                      • Pasukan Bertahan gugur 1 unit lasykar.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <span className="font-bold text-rose-400 block">🛡️ Jika Bertahan Menang (atau Seri):</span>
                    <p className="text-stone-300">
                      • Wilayah tetap aman di bawah kekuasaan Bertahan.<br />
                      • Penyerang kehilangan 1 unit lasykar dan wajib membayar ganti rugi perang (hingga 20 Koin Emas).<br />
                      • Pihak Bertahan mendapat <b>+1 Poin Kejayaan</b>.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1 text-xs">
                  <h5 className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Benteng Pertahanan (Fortifikasi)</span>
                  </h5>
                  <p className="text-stone-300">
                    Penguasa dapat memperkokoh wilayah miliknya dengan membangun <b>Benteng Pertahanan (biaya: 40g)</b>. Benteng memberikan tambahan sewa permanen <b>+5 Koin Emas</b> dari setiap musuh yang singgah, serta menghalau serangan mendadak musuh.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PASAR REMPAH & EKONOMI */}
          {activeTab === 'rempah_ekonomi' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-600/50 space-y-2">
                <h4 className="font-serif font-bold text-emerald-300 text-sm flex items-center gap-2">
                  <Store className="w-4 h-4 text-emerald-400" />
                  <span>Bursa Pasar Rempah Nusantara (#16)</span>
                </h4>
                <p className="text-xs text-stone-300">
                  Kepulauan Nusantara adalah pusat perdagangan rempah paling bernilai di dunia. Lada, Cengkeh, dan Pala memiliki nilai tukar yang fluktuatif di pasar internasional!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="font-bold text-stone-100 flex items-center gap-1">
                    🌿 Lada Hitam (Banten / Padang)
                  </span>
                  <p className="text-stone-400">
                    Kisaran Harga: <b>15g - 40g</b><br />
                    Komoditas stabil untuk kas cepat dan perbekalan ekspedisi maritim.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    🌸 Bunga Cengkeh (Ternate / Tidore)
                  </span>
                  <p className="text-stone-400">
                    Kisaran Harga: <b>20g - 55g</b><br />
                    Rempah bernilai tinggi yang diperebutkan pedagang Venesia, Portugis, dan Tiongkok.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="font-bold text-red-400 flex items-center gap-1">
                    🌰 Buah Pala (Banda)
                  </span>
                  <p className="text-stone-400">
                    Kisaran Harga: <b>30g - 70g</b><br />
                    Emas hitam bernilai tertinggi di pasar dunia; sumber kekayaan terbesar kepulauan timur.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1.5">
                <h5 className="font-bold text-amber-300">Mekanisme Fluktuasi Pasar:</h5>
                <p className="text-stone-300">
                  Setiap kali ronde berganti, harga pasar rempah berfluktuasi naik atau turun secara alami mengikuti permintaan saudagar laut. Ternate & Tidore memiliki trait keunggulan bonus <b>+25% harga jual rempah</b>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: PRAHARA & FAKSI AI VOC */}
          {activeTab === 'prahara_voc' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Prahara */}
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600/50 space-y-2">
                <h4 className="font-serif font-bold text-amber-300 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Kerentanan Perpecahan Takhta (0 s/d 3)</span>
                </h4>
                <p className="text-xs text-stone-300">
                  Kekuasaan yang terlalu cepat melebar membawa benih perpecahan internal dari para bangsawan istana.
                </p>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs space-y-1">
                  <p className="text-amber-200">
                    • Setiap kali pemain berhasil menguasai <b>3 wilayah yang berurutan posisinya di papan</b>, indikator Kerentanan bertambah <b>+1</b>.
                  </p>
                  <p className="text-rose-300">
                    • Jika indikator Kerentanan menyentuh <b>[3/3]</b>, seketika meletus <b>Kartu Prahara Sejarah</b> (contoh: <i>Perang Paregreg</i>, <i>Perjanjian Giyanti</i> yang melepaskan wilayah jajahan dan menguras kas istana)!
                  </p>
                </div>
              </div>

              {/* VOC */}
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-600/50 space-y-2">
                <h4 className="font-serif font-bold text-rose-300 text-sm flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>Faksi AI Kompeni Kolonial (VOC)</span>
                </h4>
                <p className="text-xs text-stone-300">
                  Mulai <b>ronde ke-10 atau Era Kolonial</b>, faksi AI VOC akan aktif secara otomatis. Armada berkubah besi Kompeni Belanda akan bergerak mencaplok wilayah-wilayah netral di pesisir Jawa dan Maluku.
                </p>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs space-y-1 text-stone-300">
                  <p>• Jika mendarat di petak VOC, Anda dapat <b>Membayar Sogokan (30g)</b> atau <b>Bertempur Melawan Armada Meriam VOC</b>.</p>
                  <p>• Kemenangan melawan VOC memberikan rampasan emas melimpah (+40g) dan <b>+3 Poin Kejayaan</b>!</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: DIPLOMASI & SEKUTU */}
          {activeTab === 'diplomasi' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-stone-950 border border-amber-600/50 space-y-2">
                <h4 className="font-serif font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-amber-400" />
                  <span>Tiga Traktat Diplomasi Nusantara</span>
                </h4>
                <p className="text-xs text-stone-300">
                  Penguasa bijak tidak hanya mengandalkan pedang, tetapi juga kelihaian merajut sekutu dan traktat perdamaian di Balai Diplomasi:
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <h5 className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span>1. Traktat Bebas Transit (Pakta Non-Agresi)</span>
                  </h5>
                  <p className="text-stone-300">
                    Kedua kerajaan saling memberikan izin bebas transit tanpa perlu membayar uang sewa seperser pun saat singgah di wilayah satu sama lain.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <h5 className="font-bold text-pink-400 flex items-center gap-1.5">
                    <span>2. Traktat Nikah Politik (Persekutuan Wangsa)</span>
                  </h5>
                  <p className="text-stone-300">
                    Menggabungkan martabat keluarga kraton. Bebas transit satu sama lain, serta mendapat <b>bagi hasil ekonomi 50%</b> setiap kali ada pihak ketiga yang membayar sewa di wilayah sekutu.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <h5 className="font-bold text-red-400 flex items-center gap-1.5">
                    <span>3. Koalisi Persekutuan Perang</span>
                  </h5>
                  <p className="text-stone-300">
                    Persekutuan militer darurat untuk bersama-sama membendung hegemoni kerajaan adidaya yang hampir menguasai 14 wilayah Nusantara.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-amber-900/40 bg-stone-950 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-stone-400 hidden sm:inline">
            Gunakan panduan ini untuk menyusun strategi takhta terbaik!
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 text-stone-950 font-serif font-bold text-xs shadow-md cursor-pointer transition-all active:scale-95 ml-auto"
          >
            Tutup & Kembali ke Permainan
          </button>
        </div>
      </div>
    </div>
  );
};
