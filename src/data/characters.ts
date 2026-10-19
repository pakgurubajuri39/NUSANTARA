export interface RealCharacter {
  id: string;
  name: string;
  ruler: string;
  title: string;
  factionId: string;
  era: 'hindu_buddha' | 'islam' | 'kolonial';
  quote: string;
  lore: string;
  weapon: string;
  attire: string;
  color: string;
  textColor: string;
  accentColor: string;
  // Position in nusantara-characters.jpg (percentage x, y, zoom)
  crop: {
    x: number; // percentage from left
    y: number; // percentage from top
    zoom: number;
    bgWidth: number; // percentage width
  };
  svgAvatarFallback: string;
}

export const REAL_CHARACTERS: Record<string, RealCharacter> = {
  majapahit: {
    id: 'majapahit',
    name: 'Kemaharajaan Majapahit',
    ruler: 'Mahapatih Gajah Mada',
    title: 'Sang Mahamantrimukya & Sri Rajasanagara',
    factionId: 'majapahit',
    era: 'islam',
    quote: 'Lamun huwus kalah Nusantara, isun amukti palapa!',
    lore: 'Panglima agung pemersatu kepulauan Nusantara yang bersumpah tidak akan menikmati istirahat sebelum panji Surya Majapahit berkibar dari Gurun hingga Maluku.',
    weapon: 'Keris Kyai Condong Campur & Keris Pusaka Brawijaya',
    attire: 'Zirah Kavaca Emas Berpundak Singa, Jubah Merah Wilwatikta, & Kuluk Keemasan',
    color: '#991b1b',
    textColor: '#ffffff',
    accentColor: '#fef08a',
    crop: {
      x: 34.5, // 2nd character in nusantara-characters.jpg
      y: 48,
      zoom: 3.6,
      bgWidth: 500
    },
    svgAvatarFallback: 'majapahit-gajah-mada'
  },
  sriwijaya: {
    id: 'sriwijaya',
    name: 'Kedatuan Sriwijaya',
    ruler: 'Dapunta Hyang Sri Jayanasa',
    title: 'Maharaja Suwarnadwipa & Penguasa Selat Malaka',
    factionId: 'sriwijaya',
    era: 'hindu_buddha',
    quote: 'Marwah kedatuan terbentang seluas samudra dan selat niaga dunia!',
    lore: 'Maharaja maritim agung Swarnabhumi yang memimpin 20.000 laskar siddhayatra, mengendalikan poros perdagangan laut dunia dari Tiongkok hingga India.',
    weapon: 'Tongkat Pusaka Naga Laut & Sumpit Emas Suwarnadwipa',
    attire: 'Mahkota Emas Filigri Bertakhta Mutiara, Jubah Sutra Biru Samudra, & Kalung Gandik',
    color: '#0369a1',
    textColor: '#ffffff',
    accentColor: '#bae6fd',
    crop: {
      x: 50, // 3rd character in nusantara-characters.jpg (center)
      y: 48,
      zoom: 3.6,
      bgWidth: 500
    },
    svgAvatarFallback: 'sriwijaya-dapunta'
  },
  demak: {
    id: 'demak',
    name: 'Kesultanan Demak',
    ruler: 'Raden Patah & Pangeran Sabrang Lor',
    title: 'Sultan Demak Bintoro & Panglima Armada Laut',
    factionId: 'demak',
    era: 'islam',
    quote: 'Bidikan meriam jung perang kita takkan gentar membela kedaulatan Glagah Wangi!',
    lore: 'Pelopor peradaban Islam pesisir Jawa yang menyatukan kekuatan santri, adipati, dan armada jung laut raksasa bertingkat tiga berpanji bulan sabit.',
    weapon: 'Keris Kyai Kopek & Meriam Perunggu Ki Amuk',
    attire: 'Serban Hijau Zamrud Bermahkotakan Bulan Sabit Emas, Zirah Sisik Rantai, & Selendang Sutra',
    color: '#047857',
    textColor: '#ffffff',
    accentColor: '#a7f3d0',
    crop: {
      x: 67, // 4th character in nusantara-characters.jpg
      y: 48,
      zoom: 3.6,
      bgWidth: 500
    },
    svgAvatarFallback: 'demak-raden-patah'
  },
  singhasari: {
    id: 'singhasari',
    name: 'Kerajaan Singhasari',
    ruler: 'Sri Ranggah Rajasa (Kertanegara)',
    title: 'Bhatara Sang Amurwabhumi',
    factionId: 'singhasari',
    era: 'hindu_buddha',
    quote: 'Mandala kepulauan ini adalah bumi leluhur merdeka, pantang bertekuk lutut!',
    lore: 'Wangsa Rajasa yang digdaya, penakluk ancaman Mongol pimpinan Kubilai Khan dan pencetus wawasan persahabatan Nusantara melalui Ekspedisi Pamalayu.',
    weapon: 'Keris Mpu Gandring & Perisai Tembaga Rajasa',
    attire: 'Mahkota Makuta Bersayap Emas, Zirah Lempeng Kuningan, & Kain Songket Tumapel',
    color: '#b45309',
    textColor: '#ffffff',
    accentColor: '#fde68a',
    crop: {
      x: 17.5, // 1st character in nusantara-characters.jpg (leftmost)
      y: 48,
      zoom: 3.6,
      bgWidth: 500
    },
    svgAvatarFallback: 'singhasari-kertanegara'
  },
  gowa_tallo: {
    id: 'gowa_tallo',
    name: 'Kesultanan Gowa-Tallo',
    ruler: 'Sultan Hasanuddin',
    title: 'I Mallombasi Daeng Mattawang (Ayam Jantan Dari Timur)',
    factionId: 'gowa_tallo',
    era: 'kolonial',
    quote: 'Laut ini adalah karunia Tuhan yang merdeka bagi semua insan bahari!',
    lore: 'Pahlawan bahari Bugis-Makassar yang berjiwa ksatria maritim, memimpin armada perahu Pinisi mengarungi samudra dan benteng bata merah Somba Opu.',
    weapon: 'Badik Gecong Pusaka & Tombak Karaeng Berjumbai Merah',
    attire: 'Destar Merah Patonro/Passapu Khas Bugis, Baju Bodo Sutra Marun, & Pending Emas',
    color: '#be123c',
    textColor: '#ffffff',
    accentColor: '#fecdd3',
    crop: {
      x: 84.5, // 5th character in nusantara-characters.jpg (rightmost)
      y: 48,
      zoom: 3.6,
      bgWidth: 500
    },
    svgAvatarFallback: 'gowa-hasanuddin'
  },
  mataram_islam: {
    id: 'mataram_islam',
    name: 'Kraton Mataram Islam',
    ruler: 'Sultan Agung Hanyakrakusuma',
    title: 'Senapati ing Alaga Sayidin Panatagama',
    factionId: 'mataram_islam',
    era: 'islam',
    quote: 'Bumi Jawa berdaulat mutlak, tak sudi dijajah serdadu asing berkubah besi!',
    lore: 'Kaisar agraris Mataram yang memperluas kekuasaan hingga seantero Jawa, pencipta kalender Sultan Agungan, dan panglima penyerang benteng Batavia.',
    weapon: 'Tombak Kanjeng Kyai Pleret & Keris Kyai Sengkelat',
    attire: 'Kuluk Blangkon Mataram Emas, Beskap Beludru Ungu Kebesaran, & Batik Parang Rusak Barong',
    color: '#4c1d95',
    textColor: '#ffffff',
    accentColor: '#ddd6fe',
    crop: {
      x: 50,
      y: 48,
      zoom: 3.6,
      bgWidth: 500
    },
    svgAvatarFallback: 'mataram-sultan-agung'
  },
  ternate_tidore: {
    id: 'ternate_tidore',
    name: 'Kesultanan Rempah Maluku',
    ruler: 'Sultan Baabullah Datu Syah',
    title: 'Penguasa 72 Kepulauan Rempah Moloku Kie Raha',
    factionId: 'ternate_tidore',
    era: 'kolonial',
    quote: 'Setiap butir cengkeh adalah kehormatan rakyat kami, pantang dirampas!',
    lore: 'Tuan dari 72 pulau beraroma surga rempah, yang berhasil mengepung dan mengusir penjajah Portugis dari benteng Gam Lamo tanpa kompromi.',
    weapon: 'Pedang Pusaka Kalawaku & Perisai Salawaku Bertatah Kulit Kerang',
    attire: 'Destar Maluku Berbulu Cendrawasih, Jubah Sutra Hijau Zamrud, & Selempang Biji Pala',
    color: '#0f766e',
    textColor: '#ffffff',
    accentColor: '#99f6e4',
    crop: {
      x: 67,
      y: 48,
      zoom: 3.6,
      bgWidth: 500
    },
    svgAvatarFallback: 'ternate-baabullah'
  },
  samudera_pasai: {
    id: 'samudera_pasai',
    name: 'Kesultanan Samudera Pasai',
    ruler: 'Sultan Malikussaleh (Meurah Silu)',
    title: 'As-Sulthan Al-Kamil Meurah Silu',
    factionId: 'samudera_pasai',
    era: 'islam',
    quote: 'Dari bandar Pasai, berkah perdagangan halal mengalir ke penjuru samudra!',
    lore: 'Pendiri kesultanan Islam pertama Nusantara, pencetak koin dirham emas internasional, pelindung para musafir dan ulama lintas benua.',
    weapon: 'Rencong Meucangge Emas & Pedang Saudagar Pasai',
    attire: 'Sorban Emas Bersulam Benang Perak, Jubah Saudagar Arab-Melayu, & Kalung Dirham Emas',
    color: '#854d0e',
    textColor: '#ffffff',
    accentColor: '#fef08a',
    crop: {
      x: 34.5,
      y: 48,
      zoom: 3.6,
      bgWidth: 500
    },
    svgAvatarFallback: 'pasai-malikussaleh'
  },
  voc: {
    id: 'voc',
    name: 'Kompeni Dagang Hindia Belanda (VOC)',
    ruler: 'Gouverneur-Generaal Jan Pieterszoon Coen',
    title: 'Gubernur Jenderal Dewan Hindia di Kasteel Batavia',
    factionId: 'voc',
    era: 'kolonial',
    quote: 'Geen handel zonder oorlog, geen oorlog tanpa perdagangan!',
    lore: 'Persekutuan kongsi dagang bersenjata VOC dengan armada kapal meriam, benteng kubu batu, dan taktik devide et impera untuk memonopoli rempah kepulauan.',
    weapon: 'Senapan Bedil Musket & Pedang Rapiere Perwira VOC',
    attire: 'Baju Zirah Perwira Hitam Belanda, Kerah Renda Putih Mengembang, & Topi Berbulu Angsa',
    color: '#be123c',
    textColor: '#ffffff',
    accentColor: '#fecdd3',
    crop: {
      x: 84.5,
      y: 48,
      zoom: 3.6,
      bgWidth: 500
    },
    svgAvatarFallback: 'voc-coen'
  }
};
