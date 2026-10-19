import { BoardTile, FactionData, PraharaCard } from '../types/game';

export const INITIAL_BOARD_TILES: BoardTile[] = [
  // --- ERA HINDU-BUDDHA (Petak 1-8) ---
  {
    id: 1,
    name: 'Kutai',
    era: 'hindu_buddha',
    type: 'wilayah',
    cost: 35,
    rent: 14,
    fortificationLevel: 0,
    description: 'Bumi tertua Nusantara di tepi Sungai Mahakam.',
    historicalNote: 'Kerajaan Kutai Martapura dipimpin Maharaja Kudungga dan Mulawarman, dibuktikan oleh prasasti Yupa bertarikh abad ke-4 Masehi.'
  },
  {
    id: 2,
    name: 'Tarumanagara',
    era: 'hindu_buddha',
    type: 'wilayah',
    cost: 40,
    rent: 16,
    fortificationLevel: 0,
    description: 'Pusat peradaban Sunda Kuno di tepi Sungai Chandrabhaga.',
    historicalNote: 'Raja Purnawarman mengalirkan sungai untuk mengairi sawah dan mencegah banjir, diabadikan dalam Prasasti Tugu berjejak kaki dewa Wisnu.'
  },
  {
    id: 3,
    name: 'Kalingga',
    era: 'hindu_buddha',
    type: 'wilayah',
    cost: 40,
    rent: 16,
    fortificationLevel: 0,
    description: 'Kerajaan berhukum adil di pesisir utara Jawa Tengah.',
    historicalNote: 'Dipimpin Ratu Shima yang termasyhur menegakkan hukum tanpa pandang bulu; tak seorang pun berani menyentuh kantung emas tergeletak di jalanan.'
  },
  {
    id: 4,
    name: 'Sriwijaya',
    era: 'hindu_buddha',
    type: 'pelabuhan',
    cost: 65,
    rent: 26,
    fortificationLevel: 0,
    description: 'Kedatuan maritim penguasa gerbang Selat Malaka.',
    historicalNote: 'Pusat studi agama Buddha dunia yang dikunjungi biksu I-Tsing, menguasai armada laut perkasa dan memungut cukai niaga rempah serta dupa.'
  },
  {
    id: 5,
    name: 'Mataram Kuno',
    era: 'hindu_buddha',
    type: 'wilayah',
    cost: 45,
    rent: 18,
    fortificationLevel: 0,
    description: 'Bumi Medang berlembah subur di lereng Merapi.',
    historicalNote: 'Persekutuan Dinasti Sanjaya (Siwa) dan Dinasti Syailendra (Buddha Mahayana) yang melahirkan mahakarya candi-candi megah di tanah Jawa.'
  },
  {
    id: 6,
    name: 'Situs Suci - Borobudur',
    era: 'hindu_buddha',
    type: 'situs_suci',
    cost: 0,
    rent: 0,
    fortificationLevel: 0,
    description: 'Mandala agung lambang kosmos Syailendra (+2 Poin Kejayaan).',
    historicalNote: 'Dibangun sekitar abad ke-8 Masehi oleh wangsa Syailendra sebagai representasi Kamadhatu, Rupadhatu, hingga Arupadhatu menuju pencerahan sejati.'
  },
  {
    id: 7,
    name: 'Kediri',
    era: 'hindu_buddha',
    type: 'wilayah',
    cost: 45,
    rent: 18,
    fortificationLevel: 0,
    description: 'Kerajaan sastra kakawin di tepian Sungai Brantas.',
    historicalNote: 'Masa keemasan Prabu Jayabaya yang melahirkan ramalan Jangka Jayabaya dan melahirkan sastra agung Bharatayuddha oleh Mpu Sedah dan Mpu Panuluh.'
  },
  {
    id: 8,
    name: 'Singhasari',
    era: 'hindu_buddha',
    type: 'wilayah',
    cost: 50,
    rent: 20,
    fortificationLevel: 0,
    description: 'Negeri Wangsa Rajasa penggagas Ekspedisi Pamalayu.',
    historicalNote: 'Ken Arok mendirikan wangsa Rajasa di Tumapel; Maharaja Kertanegara kemudian menyatukan kepulauan Nusantara dan menolak tunduk pada Kubilai Khan dari Mongol.'
  },

  // --- ERA ISLAM (Petak 9-16) ---
  {
    id: 9,
    name: 'Majapahit',
    era: 'islam',
    type: 'wilayah',
    cost: 75,
    rent: 30,
    fortificationLevel: 0,
    description: 'Ibu kota kemaharajaan Wilwatikta di Trowulan.',
    historicalNote: 'Mahapatih Gajah Mada mengikrarkan Sumpah Palapa menyatukan seluruh kepulauan Nusantara di bawah naungan panji dwiwarna Majapahit.'
  },
  {
    id: 10,
    name: 'Samudera Pasai',
    era: 'islam',
    type: 'pelabuhan',
    cost: 60,
    rent: 24,
    fortificationLevel: 0,
    description: 'Kesultanan Islam pertama penguasa koin dirham emas.',
    historicalNote: 'Didirikan Sultan Malikussaleh di pesisir Aceh utara; disinggahi penjelajah dunia Ibnu Battuta dan Marco Polo sebagai bandar niaga tersibuk.'
  },
  {
    id: 11,
    name: 'Demak',
    era: 'islam',
    type: 'wilayah',
    cost: 55,
    rent: 22,
    fortificationLevel: 0,
    description: 'Kesultanan Glagah Wangi pelopor syiar Wali Songo.',
    historicalNote: 'Didirikan Raden Patah dengan Masjid Agung beratap tumpang tiga; mengirim Adipati Unus (Pangeran Sabrang Lor) menggempur Portugis di Malaka.'
  },
  {
    id: 12,
    name: 'Prahara - Perang Paregreg',
    era: 'islam',
    type: 'prahara',
    cost: 0,
    rent: 0,
    fortificationLevel: 0,
    description: 'Prahara perang saudara suksesi takhta kraton.',
    historicalNote: 'Perang saudara berkecamuk (1404–1406) antara Wikramawardhana dari istana barat dan Bhre Wirabhumi dari istana timur yang meremukkan keutuhan imperium.'
  },
  {
    id: 13,
    name: 'Banten',
    era: 'islam',
    type: 'wilayah',
    cost: 55,
    rent: 22,
    fortificationLevel: 0,
    spiceBonus: 'lada',
    description: 'Bandar lada terkemuka di gerbang barat Selat Sunda.',
    historicalNote: 'Sultan Maulana Hasanuddin dan Sultan Ageng Tirtayasa menjadikan Banten poros perdagangan lada bebas tanpa monopoli bangsa Eropa.'
  },
  {
    id: 14,
    name: 'Aceh Darussalam',
    era: 'islam',
    type: 'wilayah',
    cost: 65,
    rent: 26,
    fortificationLevel: 0,
    description: 'Serambi Mekkah berarmada kapal laksamana Malahayati.',
    historicalNote: 'Di bawah Sultan Iskandar Muda, Kesultanan Aceh membangun hegemoni militer maritim perkasa dengan meriam Lada Sicupak kiriman Turki Utsmani.'
  },
  {
    id: 15,
    name: 'Mataram Islam',
    era: 'islam',
    type: 'wilayah',
    cost: 65,
    rent: 26,
    fortificationLevel: 0,
    description: 'Pusat kraton pedalaman Jawa di Karta dan Kotagede.',
    historicalNote: 'Sultan Agung Hanyakrakusuma menyatukan hampir seluruh Pulau Jawa dan memimpin penyerbuan legendaris mengepung benteng VOC di Batavia.'
  },
  {
    id: 16,
    name: 'Pasar Rempah Utama',
    era: 'islam',
    type: 'pasar_rempah',
    cost: 0,
    rent: 0,
    fortificationLevel: 0,
    description: 'Bandar bursa niaga akbar komoditas Lada, Cengkeh, & Pala.',
    historicalNote: 'Pertemuan saudagar Gujarat, Persia, Cina, dan kepulauan Nusantara untuk menukar hasil bumi wangi bernilai setara emas murni.'
  },

  // --- ERA KOLONIAL (Petak 17-24) ---
  {
    id: 17,
    name: 'Gowa-Tallo',
    era: 'kolonial',
    type: 'wilayah',
    cost: 60,
    rent: 24,
    fortificationLevel: 0,
    description: 'Benteng Somba Opu, negeri pelaut ulung Bugis-Makassar.',
    historicalNote: 'Sultan Hasanuddin "Ayam Jantan dari Timur" gigih menolak monopoli dagang VOC, mempertahankan laut bebas untuk seluruh pelaut kepulauan.'
  },
  {
    id: 18,
    name: 'Ternate & Tidore',
    era: 'kolonial',
    type: 'wilayah_rempah',
    cost: 70,
    rent: 28,
    fortificationLevel: 0,
    spiceBonus: 'cengkeh',
    description: 'Kepulauan gunung api penghasil cengkeh terbaik dunia.',
    historicalNote: 'Sultan Baabullah mengusir penjajah Portugis dari benteng Gam Lamo setelah pembunuhan Sultan Khairun; kepulauan rempah yang diperebutkan adidaya dunia.'
  },
  {
    id: 19,
    name: 'Bentrokan VOC',
    era: 'kolonial',
    type: 'bentrokan_voc',
    cost: 0,
    rent: 0,
    fortificationLevel: 0,
    description: 'Armada Kompeni Belanda menuntut hak monopoli dan upeti.',
    historicalNote: 'Vereenigde Oostindische Compagnie (VOC) menerapkan politik adu domba (devide et impera) dan blokade maritim dengan armada meriam kapal berkubah besi.'
  },
  {
    id: 20,
    name: 'Batavia',
    era: 'kolonial',
    type: 'pelabuhan',
    cost: 70,
    rent: 30,
    fortificationLevel: 0,
    description: 'Markas Gubernur Jenderal di muara Sungai Ciliwung.',
    historicalNote: 'Didirikan Jan Pieterszoon Coen di atas reruntuhan Jayakarta; benteng Kasteel Batavia menjadi poros hegemoni kolonial di Asia Tenggara.'
  },
  {
    id: 21,
    name: 'Semarang',
    era: 'kolonial',
    type: 'wilayah',
    cost: 50,
    rent: 20,
    fortificationLevel: 0,
    description: 'Pelabuhan dagang pesisir utara dan perlintasan kayu jati.',
    historicalNote: 'Ki Ageng Pandanaran mendirikan pemukiman di sela pohon asam yang jarang; berkembang menjadi bandar logistik utama Pulau Jawa.'
  },
  {
    id: 22,
    name: 'Surabaya',
    era: 'kolonial',
    type: 'wilayah',
    cost: 55,
    rent: 22,
    fortificationLevel: 0,
    description: 'Ujung Galuh, benteng maritim muara Brantas nan garang.',
    historicalNote: 'Pertempuran legendaris Raden Wijaya memukul mundur pasukan Mongol Tartar di Ujung Galuh menjadi akar semangat juang kota pahlawan.'
  },
  {
    id: 23,
    name: 'Ambon & Banda',
    era: 'kolonial',
    type: 'wilayah_rempah',
    cost: 75,
    rent: 30,
    fortificationLevel: 0,
    spiceBonus: 'pala',
    description: 'Kepulauan Banda penghasil sejati buah Pala dan Fuli.',
    historicalNote: 'Satu-satunya tempat di muka bumi penghasil buah pala pada abad ke-17; menjadi saksi tragedi pembantaian Banda 1621 demi monopoli dagang VOC.'
  },
  {
    id: 24,
    name: 'Padang',
    era: 'kolonial',
    type: 'wilayah',
    cost: 50,
    rent: 20,
    fortificationLevel: 0,
    spiceBonus: 'lada',
    description: 'Pesisir barat Minangkabau pengekspor lada dan emas Salido.',
    historicalNote: 'Bandar muara Batang Arau yang mempertemukan saudagar rantau Minang dengan kapal niaga Samudra Hindia dan tambang emas pegunungan Bukit Barisan.'
  }
];

export const HISTORICAL_FACTIONS: FactionData[] = [
  {
    id: 'majapahit',
    name: 'Kemaharajaan Majapahit',
    ruler: 'Gajah Mada & Hayam Wuruk',
    rulerTitle: 'Sang Mahamantrimukya & Sri Rajasanagara',
    capital: 'Wilwatikta (Trowulan)',
    era: 'islam',
    traitName: 'Sumpah Palapa',
    traitDescription: '+1 Dadu Tempur saat menyerang wilayah lawan.',
    bannerColor: '#991b1b', // Red
    textColor: '#ffffff',
    secondaryColor: '#fef08a',
    iconName: 'Crown',
    lore: 'Wilwatikta merajai bentang samudra Nusantara di bawah panji surya Majapahit dan sumpah persatuan persaudaraan Dwipantara.',
    quote: 'Lamun huwus kalah Nusantara, isun amukti palapa!',
    weapon: 'Keris Kyai Condong Campur & Keris Pusaka Brawijaya',
    miniatureType: 'Gajah Mada Berzirah Emas'
  },
  {
    id: 'sriwijaya',
    name: 'Kedatuan Sriwijaya',
    ruler: 'Dapunta Hyang Sri Jayanasa',
    rulerTitle: 'Maharaja Suwarnadwipa & Penguasa Selat Malaka',
    capital: 'Palembang',
    era: 'hindu_buddha',
    traitName: 'Kedaulatan Maritim',
    traitDescription: 'Mendapat bonus +15 Koin Emas setiap singgah di Pelabuhan Utama.',
    bannerColor: '#0369a1', // Ocean Blue
    textColor: '#ffffff',
    secondaryColor: '#bae6fd',
    iconName: 'Anchor',
    lore: 'Penguasa maritim Selat Malaka yang disegani Dinasti Tang hingga Dinasti Chola, mercusuar spiritual dan pelayaran samudra.',
    quote: 'Marwah kedatuan terbentang seluas samudra dan selat niaga dunia!',
    weapon: 'Tongkat Pusaka Naga Laut & Pedang Swarnabhumi',
    miniatureType: 'Maharaja Bahari Mutiara'
  },
  {
    id: 'demak',
    name: 'Kesultanan Demak',
    ruler: 'Raden Patah & Pangeran Sabrang Lor',
    rulerTitle: 'Sultan Demak Bintoro & Panglima Armada Laut Jawa',
    capital: 'Glagah Wangi',
    era: 'islam',
    traitName: 'Syiar & Legitimasi',
    traitDescription: 'Memperoleh +1 Poin Kejayaan setiap kali berhasil mengklaim wilayah baru.',
    bannerColor: '#047857', // Emerald
    textColor: '#ffffff',
    secondaryColor: '#a7f3d0',
    iconName: 'MoonStar',
    lore: 'Pelopor peradaban Islam di pesisir Jawa yang menyatukan kekuatan santri, adipati, dan armada meriam laut berlayar tiga tumpang.',
    quote: 'Bidikan meriam jung perang kita takkan gentar membela kedaulatan Glagah Wangi!',
    weapon: 'Keris Kyai Kopek & Meriam Ki Amuk',
    miniatureType: 'Panglima Zirah Zamrud'
  },
  {
    id: 'singhasari',
    name: 'Kerajaan Singhasari',
    ruler: 'Kertanegara & Ken Arok',
    rulerTitle: 'Sri Ranggah Rajasa Bhatara Sang Amurwabhumi',
    capital: 'Kutaraja (Tumapel)',
    era: 'hindu_buddha',
    traitName: 'Ekspedisi Pamalayu',
    traitDescription: 'Biaya klaim wilayah kosong mendapat potongan harga 20%.',
    bannerColor: '#b45309', // Amber
    textColor: '#ffffff',
    secondaryColor: '#fde68a',
    iconName: 'Sword',
    lore: 'Wangsa Rajasa yang berani menolak tunduk pada Kaisar Kubilai Khan Mongol dan melancarkan ekspedisi persahabatan ke seberang lautan.',
    quote: 'Mandala kepulauan ini adalah bumi leluhur merdeka, pantang bertekuk lutut!',
    weapon: 'Keris Mpu Gandring Pusaka Tumapel',
    miniatureType: 'Ksatria Rajasa Berkujang'
  },
  {
    id: 'gowa_tallo',
    name: 'Kesultanan Gowa-Tallo',
    ruler: 'Sultan Hasanuddin',
    rulerTitle: 'I Mallombasi Daeng Mattawang (Ayam Jantan Dari Timur)',
    capital: 'Somba Opu',
    era: 'kolonial',
    traitName: 'Ayam Jantan Dari Timur',
    traitDescription: 'Boleh memilih menambah +1 langkah saat melempar dadu pergerakan.',
    bannerColor: '#be123c', // Crimson
    textColor: '#ffffff',
    secondaryColor: '#fecdd3',
    iconName: 'Compass',
    lore: 'Ksatria bahari Bugis-Makassar yang mengarungi samudra dengan perahu Pinisi dan benteng bata merah yang menolak monopoli asing.',
    quote: 'Laut ini adalah karunia Tuhan yang merdeka bagi semua insan bahari!',
    weapon: 'Badik Gecong Pusaka & Tombak Karaeng',
    miniatureType: 'Laksamana Bugis Destar Merah'
  },
  {
    id: 'mataram_islam',
    name: 'Kraton Mataram Islam',
    ruler: 'Sultan Agung Hanyakrakusuma',
    rulerTitle: 'Senapati ing Alaga Sayidin Panatagama',
    capital: 'Karta / Kotagede',
    era: 'islam',
    traitName: 'Prajurit Mataram',
    traitDescription: 'Memulai permainan dengan modal +1 Pasukan Militer ekstra (total 3).',
    bannerColor: '#4c1d95', // Royal Indigo
    textColor: '#ffffff',
    secondaryColor: '#ddd6fe',
    iconName: 'Shield',
    lore: 'Imperium agraris tangguh di jantung Pulau Jawa pembawa kalender Jawa-Hijriyah dan penggempur benteng kolonial Batavia.',
    quote: 'Bumi Jawa berdaulat mutlak, tak sudi dijajah serdadu asing berkubah besi!',
    weapon: 'Tombak Kanjeng Kyai Pleret & Keris Kyai Sengkelat',
    miniatureType: 'Prajurit Bregada Berkuda'
  },
  {
    id: 'ternate_tidore',
    name: 'Kesultanan Rempah Maluku',
    ruler: 'Sultan Baabullah Datu Syah',
    rulerTitle: 'Penguasa 72 Kepulauan Rempah Moloku Kie Raha',
    capital: 'Gam Lamo',
    era: 'kolonial',
    traitName: 'Monopoli Cengkeh',
    traitDescription: 'Memulai dengan 2 rempah dan harga jual rempah mendapat bonus +25% di pasar.',
    bannerColor: '#0f766e', // Teal
    textColor: '#ffffff',
    secondaryColor: '#99f6e4',
    iconName: 'Flame',
    lore: 'Tuan dari 72 kepulauan beraroma harum cengkeh yang sanggup mengusir penjajah Eropa dari benteng Gam Lamo.',
    quote: 'Setiap butir cengkeh adalah kehormatan rakyat kami, pantang dirampas!',
    weapon: 'Pedang Pusaka Salawaku Maluku',
    miniatureType: 'Kora-Kora Berpanji Emas'
  },
  {
    id: 'samudera_pasai',
    name: 'Kesultanan Samudera Pasai',
    ruler: 'Sultan Malikussaleh',
    rulerTitle: 'As-Sulthan Al-Kamil Meurah Silu',
    capital: 'Pasai',
    era: 'islam',
    traitName: 'Syahbandar Niaga',
    traitDescription: 'Uang sewa / upeti yang diterima dari lawan bertambah +25%.',
    bannerColor: '#854d0e', // Gold/Dark Yellow
    textColor: '#ffffff',
    secondaryColor: '#fef08a',
    iconName: 'Coins',
    lore: 'Poros dirham emas internasional tempat saudagar timur dan barat bersua di gerbang maritim Selat Malaka.',
    quote: 'Dari bandar Pasai, berkah perdagangan halal mengalir ke penjuru samudra!',
    weapon: 'Rencong Emas Kesultanan Pasai',
    miniatureType: 'Syahbandar Dirham Emas'
  }
];

export const HISTORICAL_PRAHARA_CARDS: PraharaCard[] = [
  {
    id: 'prahara_paregreg',
    title: 'Perang Saudara Paregreg',
    historicalContext: 'Perebutan takhta antara Istana Barat dan Istana Timur menguras kas negara dan memicu keruntuhan internal.',
    effectDescription: 'Wilayah dengan biaya sewa terendah milik pemain memisahkan diri menjadi wilayah netral independen!',
    type: 'secession'
  },
  {
    id: 'prahara_giyanti',
    title: 'Perjanjian Palihan Nagari (Giyanti)',
    historicalContext: 'Intrik politik dan campur tangan asing membelah kerajaan menjadi dua kraton yang saling bersaing.',
    effectDescription: 'Pemain kehilangan 1 wilayah acak kepada pemain terlemah atau netral, serta kehilangan 1 pasukan militer.',
    type: 'civil_war'
  },
  {
    id: 'prahara_sadeng',
    title: 'Pemberontakan Sadeng & Keta',
    historicalContext: 'Daerah bawahan memberontak menuntut kemerdekaan dari kekuasaan pusat.',
    effectDescription: 'Kerajaan harus mengerahkan 1 Pasukan Militer atau membayar 30 Koin Emas untuk memadamkan pemberontakan.',
    type: 'rebellion'
  },
  {
    id: 'prahara_upeti_voc',
    title: 'Tuntutan Monopoli & Blokade VOC',
    historicalContext: 'Armada kapal perang Kompeni mengepung jalur pelabuhan dan menuntut hak monopoli dagang.',
    effectDescription: 'Pemain harus menyerahkan separuh komoditas rempah atau membayar denda 35 Koin Emas!',
    type: 'tribute'
  },
  {
    id: 'prahara_wabah',
    title: 'Wabah Penyakit Pes & Kemarau Panjang',
    historicalContext: 'Bencana alam dan wabah penyakit melanda lumbung padi, melemahkan kekuatan pertahanan kerajaan.',
    effectDescription: 'Pasukan militer berkurang 1 dan Poin Kejayaan berkurang 1 akibat melemahnya legitimasi takhta.',
    type: 'pestilence'
  }
];
