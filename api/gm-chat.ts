import { GoogleGenAI } from '@google/genai';

// Vercel Serverless Function Handler for /api/gm-chat
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const isValidKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10);

  if (!isValidKey) {
    return res.status(200).json({
      reply: 'Wahai Paduka Yang Mulia, hamba sang Juru Kisah Game Master siap membimbing daulat takhta Paduka. Silakan atur strategi militer, bina persekutuan rempah, atau gempur kubu lawan demi keagungan Nusantara!',
    });
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

    const { message, gameState } = req.body || {};

    const prompt = `Anda adalah Game Master (GM) cerdas, bijak, dan berwibawa untuk board game sejarah "NUSANTARA: Takhta, Sekutu, & Prahara".
Pemain bertanya kepada Anda: "${message}"

Konteks status permainan saat ini:
- Ronde: ${gameState?.currentRound || 1}/${gameState?.maxRounds || 30}
- Faksi aktif: ${gameState?.players?.[gameState?.currentTurnIndex]?.name || 'Pemain'}
- Wilayah VOC: ${gameState?.vocTerritories?.length || 0} petak

TUGAS ANDA:
Berikan jawaban ringkas, akurat secara sejarah/aturan game, dan bernada penasihat kerajaan/Game Master bijak Nusantara (maksimal 2-3 kalimat).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const reply = response.text?.trim() || 'Titah Paduka telah dicatat oleh juru tulis kraton.';
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Vercel API GM Chat Error:', error);
    return res.status(200).json({
      reply: 'Wahai Paduka, kabut tebal merintangi perbincangan. Perkokoh benteng dan siapkan strategi takhta Anda!',
    });
  }
}
