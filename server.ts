import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Check if API key is valid and not placeholder
const apiKey = process.env.GEMINI_API_KEY;
const isValidKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10);
let ai: GoogleGenAI | null = null;

if (isValidKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey!,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Helper with timeout
async function callGeminiWithTimeout<T>(promise: Promise<T>, timeoutMs = 3500): Promise<T | null> {
  let timeoutHandle: NodeJS.Timeout;
  const timeoutPromise = new Promise<null>((resolve) => {
    timeoutHandle = setTimeout(() => resolve(null), timeoutMs);
  });
  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutHandle!);
    return result;
  } catch (e) {
    clearTimeout(timeoutHandle!);
    throw e;
  }
}

// 1. GM Turn Narration Route
app.post('/api/gm-narrate', async (req, res) => {
  try {
    const { player, tile, diceRoll, tileStatusText, actionType } = req.body;

    if (!ai) {
      return res.status(200).json({ narration: null });
    }

    const prompt = `Anda adalah Game Master (GM) sastrawi, bijak, dan berwibawa untuk board game sejarah "NUSANTARA: Takhta, Sekutu, & Prahara".
Berikan narasi sejarah yang imersif dan hidup (PERSIS 2-3 kalimat berbahasa Indonesia bernada hikayat/babad/sejarah megah) untuk giliran berikut:
- Pemain/Faksi: ${player?.name || 'Pemain'} dari ${player?.factionName || 'Kerajaan Nusantara'} (Penguasa: ${player?.rulerName || 'Baginda'})
- Petak yang Dituju: ${tile?.name} (Era: ${tile?.era}, Tipe: ${tile?.type})
- Angka Dadu: ${diceRoll}
- Status Petak: ${tileStatusText}
- Peristiwa Khusus: ${actionType || 'Tiba di petak'}
- Catatan Sejarah Petak: ${tile?.historicalNote || ''}

ATURAN OUTPUT:
- Tulis HANYA 2 sampai 3 kalimat narasi sejarah.
- Gunakan bahasa Indonesia baku bercita rasa tinggi (seperti babad/hikayat kraton klasik nan memikat).
- Jangan sertakan salam pembuka, penutup, atau tanda kutip pembungkus.`;

    const response = await callGeminiWithTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
        },
      }),
      3500
    );

    const narration = response?.text ? response.text.trim() : null;
    return res.json({ narration });
  } catch (error) {
    console.error('Error generating GM narration:', error);
    return res.status(200).json({ narration: null });
  }
});

// 2. GM Interactive Chat / Consultation Route
app.post('/api/gm-chat', async (req, res) => {
  try {
    const { message, gameState } = req.body;

    if (!ai) {
      return res.json({
        reply: 'Wahai Paduka Yang Mulia, hamba sang Juru Kisah Game Master siap membimbing daulat takhta Paduka. Silakan atur strategi militer, bina persekutuan rempah, atau gempur kubu lawan demi keagungan Nusantara!'
      });
    }

    const systemPrompt = `Anda adalah Game Master (GM) cerdas, adil, bijaksana, dan mendalam berwawasan sejarah Nusantara untuk board game "NUSANTARA: Takhta, Sekutu, & Prahara".
Karakter Anda:
- Nada bicara bagaikan Mahapatih atau Resi Penasihat Kerajaan Nusantara yang menghormati pemain ("Paduka", "Baginda", "Tuanku").
- Menguasai seluk-beluk sejarah kerajaan Hindu-Buddha (Kutai, Tarumanagara, Sriwijaya, Majapahit, Kediri, Singhasari), Kesultanan Islam (Demak, Aceh, Banten, Mataram Islam, Samudera Pasai), hingga Era Kolonial VOC (Batavia, Somba Opu, Kepulauan Rempah Banda).
- Membantu pemain memahami taktik board game: kapan harus klaim damai, kapan menyerang militer, menjaga Kerentanan Perpecahan agar tidak meletus Prahara Paregreg, dan trik memonopoli rempah.
- Berikan jawaban padat, tajam, dan bersahaja (maksimal 3-4 paragraf singkat).`;

    const response = await callGeminiWithTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${message}\n\n[Ringkasan Kondisi Permainan: Giliran Ronde ${gameState?.currentRound || 1}, Sisa Pemain: ${gameState?.players?.length || 2}]`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.75,
        },
      }),
      3500
    );

    return res.json({ reply: response?.text ? response.text.trim() : 'Titah Paduka telah didengar para dewa dan leluhur. Lanjutkan perjuangan takhta Paduka!' });
  } catch (err) {
    console.error('Error in GM chat:', err);
    return res.json({
      reply: 'Para juru warta kraton tengah mengamati peta mandala samudra. Lanjutkan langkah takhta Paduka dengan penuh kewaspadaan!'
    });
  }
});

// Configure Vite integration
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`[NUSANTARA GM ENGINE] Server active on port ${port}`);
  });
}

startServer();
