import { BoardTile, EraType, Player, TurnLog } from '../types/game';

export function getEraDisplayName(era: EraType): string {
  switch (era) {
    case 'hindu_buddha':
      return 'Era Hindu-Buddha';
    case 'islam':
      return 'Era Islam Nusantara';
    case 'kolonial':
      return 'Era Kolonial & Perebutan Rempah';
  }
}

export function formatSpiceInventory(spices: { lada: number; cengkeh: number; pala: number }): string {
  const parts: string[] = [];
  if (spices.lada > 0) parts.push(`${spices.lada} Lada`);
  if (spices.cengkeh > 0) parts.push(`${spices.cengkeh} Cengkeh`);
  if (spices.pala > 0) parts.push(`${spices.pala} Pala`);
  return parts.length > 0 ? parts.join(', ') : 'Tidak ada';
}

export function formatTerritoryList(territoryIds: number[], tiles: BoardTile[]): string {
  if (!territoryIds || territoryIds.length === 0) return 'Belum ada wilayah';
  return territoryIds
    .map(id => tiles.find(t => t.id === id)?.name || `Petak #${id}`)
    .join(', ');
}

export function calculateVulnerability(territoryIds: number[]): number {
  if (territoryIds.length < 3) return 0;
  const sorted = [...territoryIds].sort((a, b) => a - b);
  const set = new Set(sorted);
  let consecutiveCount = 0;

  // Check 3 in a row, handling wrap around 24 -> 1
  for (let i = 1; i <= 24; i++) {
    const next1 = (i % 24) + 1;
    const next2 = ((i + 1) % 24) + 1;
    if (set.has(i) && set.has(next1) && set.has(next2)) {
      consecutiveCount++;
    }
  }

  return Math.min(3, consecutiveCount);
}

export function generateGMChronicleMarkdown(params: {
  player: Player;
  tile: BoardTile;
  diceRoll: number;
  tileStatusText: string;
  narration: string;
  actions: string[];
  tiles: BoardTile[];
}): string {
  const { player, tile, diceRoll, tileStatusText, narration, actions, tiles } = params;

  const eraDisplay = getEraDisplayName(tile.era);
  const actionListText = actions.map((act, idx) => `${idx + 1}. ${act}`).join('\n');
  const rempahText = formatSpiceInventory(player.spices);
  const territoriesText = formatTerritoryList(player.territories, tiles);

  return `==================================================
🚩 GILIRAN: ${player.name} (${player.factionName}) | ERA: ${eraDisplay}
==================================================
🎲 Dadu: ${diceRoll} ➡️ Pindah ke: ${tile.name} (Petak #${tile.id})
📍 Status Petak: ${tileStatusText}

📜 NARASI SEJARAH:
${narration}

⚡ PILIHAN AKSI ANDA:
${actionListText}

--------------------------------------------------
📊 STATUS PEMAIN:
💰 Koin Emas: ${player.coins} | ⚔️ Pasukan: ${player.military} | 🌶️ Rempah: ${rempahText}
🏰 Wilayah: ${territoriesText} | 🌟 Poin Kejayaan: ${player.gloryPoints}
⚠️ Kerentanan Perpecahan: [${player.vulnerability}/3]
==================================================`;
}

// Built-in authentic historical chronicles fallback
export function getLocalHistoricalNarration(tile: BoardTile, player: Player, context?: string): string {
  switch (tile.id) {
    case 1:
      return `Kaki baginda menginjak tanah Kutai Martapura di tepi riak Mahakam. Di hadapan prasasti Yupa bertuliskan huruf Pallawa, para brahmana melantunkan doa syukur dan Maharaja Mulawarman mempersembahkan ribuan ekor lembu emas demi kemakmuran takhta.`;
    case 2:
      return `Patih melaporkan tibanya panji di Tarumanagara, di mana aliran sungai Chandrabhaga dibedah oleh titah Sri Purnawarman. Jejak telapak kaki raja yang perkasa terukir di atas batu andesit, menandai daulat penakluk musuh dan pelindung kawula.`;
    case 3:
      return `Rombongan tiba di bumi Kalingga yang tenteram di bawah titah Ratu Shima. Tak ada seorang pun berani menyentuh harta yang tercecer di alun-alun kraton, sebab hukum ditegakkan setegak tiang langit tanpa memandang darah bangsawan maupun jelata.`;
    case 4:
      return `Sauh berlabuh di pelabuhan agung Sriwijaya di muara Musi. Ribuan biksu mengaji kidung Sanskerta, sementara armada kapal perang bercadik mengawal kapal-kapal dagang dari Tiongkok dan India yang membayar bea cukai emas.`;
    case 5:
      return `Lembah subur Medang Mataram Kuno terbentang luas berpagar Merapi. Di sinilah wangsa Sanjaya dan Syailendra mengharmonikan mantra Siwa dan puja Buddha, mengolah persawahan basah menjadi lumbung kemakmuran Jawa Dwipa.`;
    case 6:
      return `Stupa agung Borobudur menjulang laksana gunung kosmis keemasan di atas bukit kedu. Menapaki undakan batu dari Kamadhatu menuju Arupadhatu menghadirkan ketenangan batin yang mendalam, mengangkat legitimasi spiritual wangsa ke puncak tertinggi.`;
    case 7:
      return `Bumi Kediri bergema oleh kidung kakawin para pujangga kraton. Sang Prabu Jayabaya telah menuliskan lembaran ramalan masa depan tanah Jawa, sementara pasukan kavaleri Daha bersiap mempertahankan kehormatan panji kerajaan.`;
    case 8:
      return `Bumi Tumapel Singhasari bergetar oleh langkah bala tentara Rajasa. Keris Mpu Gandring telah menobatkan Ken Arok, dan kini cita-cita Cakrawala Mandala Dwipantara milik Kertanegara bersiap menggetarkan seantero kepulauan hingga daratan Mongol.`;
    case 9:
      return `Gapura Bajang Ratu menyambut kedatangan baginda di Trowulan, pusat kemaharajaan Majapahit. Di balai agung Manguntur, Mahapatih Gajah Mada mengamati peta mandala pulau-pulau sambil memegang teguh sumpah suci persatuan Nusantara.`;
    case 10:
      return `Koin dirham emas berkilau di bandar Samudera Pasai. Para syahbandar menyambut kafilah kapal dari Hadramaut, Gujarat, dan Malaka; ayat suci dan seruan azan mengalun syahdu mengiringi transaksi lada dan kapur barus.`;
    case 11:
      return `Kubah atap tumpang tiga Masjid Agung Demak berdiri megah di Glagah Wangi. Di bawah bimbingan para Wali Songo dan ketegasan Raden Patah, armada jung perang Jawa bersiap menjaga kedaulatan laut dari ancaman bangsa asing.`;
    case 12:
      return `Prahara membara di istana saat Perang Paregreg meletus! Bara perselisihan antara Wikramawardhana dan Bhre Wirabhumi membakar lumbung dan memecah kesetiaan adipati bawahan; takhta kraton terancam koyak dari dalam.`;
    case 13:
      return `Aroma tajam lada hitam semerbak di pesisir Kesultanan Banten. Menara masjid pecinan berdiri tegak menatap Selat Sunda, di mana kapal-kapal merdeka berlayar menolak tunduk pada pemaksaan monopoli niaga Eropa.`;
    case 14:
      return `Meriam Lada Sicupak menggelegar dari benteng pertahanan Aceh Darussalam. Sultan Iskandar Muda dan laksamana wanita Malahayati memimpin armada kapal perang raksasa Chakra Donya, menegaskan daulat Serambi Mekkah di Samudra Hindia.`;
    case 15:
      return `Kraton Karta bergetar oleh barisan prajurit Mataram Islam. Sultan Agung Hanyakrakusuma mengutus senopati terbaiknya memimpin puluhan ribu lasykar menembus hutan rimba menuju benteng kubu pertahanan musuh di Batavia.`;
    case 16:
      return `Pasar Rempah Utama riuh oleh tawar-menawar saudagar dari tujuh penjuru angin. Karung-karung berisi cengkeh Ternate, lada Banten, dan pala Kepulauan Banda diperdagangkan dengan timbangan dacing emas murni.`;
    case 17:
      return `Benteng Somba Opu berdiri kokoh dari bata merah di pesisir Gowa-Tallo. Sultan Hasanuddin sang Ayam Jantan dari Timur menatap cakrawala laut lepas, bersumpah darah bahwa laut Nusantara adalah anugerah Tuhan yang merdeka bagi semua insan.`;
    case 18:
      return `Asap tipis mengepul dari puncak Gamalama di Ternate dan Tidore. Pohon-pohon cengkeh pusaka berbunga lebat mengharumkan seantero kepulauan; Sultan Baabullah berdiri teguh mengusir segala bentuk tirani asing.`;
    case 19:
      return `Bendera berlambang VOC terkibar di tiang kapal berlayar putih. Meriam-meriam besi kapal Kompeni mengarah ke pesisir, menuntut hak istimewa dagang monopoli atau memuntahkan peluru timah panas ke pemukiman!`;
    case 20:
      return `Kasteel Batavia berdiri kaku di muara Sungai Ciliwung dengan tembok batu kelabu. Di dalam kantor dagang Belanda, juru tulis kolonial menghitung timbunan rempah rampasan dan merencanakan siasat pecah belah antar raja-raja pribumi.`;
    case 21:
      return `Kapal-kapal dagang berlabuh di pesisir Semarang, mengangkut gelondongan kayu jati dari hutan pedalaman Jawa. Bandar ini menjadi urat nadi perbekalan yang menghubungkan kraton pedalaman dengan jalur niaga Laut Jawa.`;
    case 22:
      return `Gelombang Ujung Galuh di Surabaya menderu garang laksana auman singa. Semangat arek-arek pesisir yang pantang tunduk terus menyala, menjaga gerbang sungai Brantas dari serbuan armada laut penjajah.`;
    case 23:
      return `Kepulauan Banda memancarkan kemilau buah pala berdaging kuning merekah dengan fuli merah menyala. Tanah bertuah yang menjadi pusat perebutan imperium dunia ini menyimpan air mata perjuangan rakyat mempertahankan pohon rempah leluhur.`;
    case 24:
      return `Pesisir Ranah Minang di Padang mempertemukan emas urai perbukitan Salido dengan kapal-kapal pengangkut lada. Rumah gadang bergonjong tajam menaungi musyawarah para tetua kaum menegakkan adat bersendi syarak.`;
    default:
      return `Baginda melangkah anggun di bentang tanah pusaka Nusantara, menyaksikan kejayaan peradaban maritim yang membentang dari ujung barat Sumatra hingga kepulauan rempah timur.`;
  }
}

// Fetch live narration from Gemini backend if available, fallback to rich local engine
export async function getGMNarration(params: {
  player: Player;
  tile: BoardTile;
  diceRoll: number;
  tileStatusText: string;
  actionType?: string;
}): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);
    const res = await fetch('/api/gm-narrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.narration && typeof data.narration === 'string') {
        return data.narration.trim();
      }
    }
  } catch (err) {
    // Graceful fallback to local engine
  }
  return getLocalHistoricalNarration(params.tile, params.player, params.actionType);
}
