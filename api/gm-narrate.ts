import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

// Vercel Serverless Function Handler for /api/gm-narrate
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const isValidKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10);

  if (!isValidKey) {
    return res.status(200).json({ narration: null, note: 'Gemini API key not configured, using offline chronicles' });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey!,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build-vercel',
        },
      },
    });

    const { player, tile, diceRoll, tileStatusText, actionType } = req.body || {};

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

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const text = response.text?.trim() || null;
    return res.status(200).json({ narration: text });
  } catch (error) {
    console.error('Vercel API GM Narrate Error:', error);
    return res.status(200).json({ narration: null });
  }
}
