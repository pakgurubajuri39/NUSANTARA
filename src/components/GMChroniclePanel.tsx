import React, { useState } from 'react';
import { TurnLog, GameState } from '../types/game';
import { 
  Scroll, 
  Copy, 
  Check, 
  MessageSquare, 
  History, 
  Send, 
  Sparkles,
  BookOpen,
  Terminal
} from 'lucide-react';

interface GMChroniclePanelProps {
  latestLog: TurnLog | null;
  logs: TurnLog[];
  gameState: GameState;
}

export const GMChroniclePanel: React.FC<GMChroniclePanelProps> = ({
  latestLog,
  logs,
  gameState,
}) => {
  const [activeTab, setActiveTab] = useState<'chronicle' | 'raw' | 'history' | 'ask_gm'>('chronicle');
  const [copied, setCopied] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'gm'; text: string; time: string }>>([
    {
      sender: 'gm',
      text: 'Salam sejahtera, wahai para penguasa tanah pusaka! Hamba adalah Game Master pendamping takhta Anda. Bertanyalah perihal sejarah kraton, siasat rempah, aturan perpecahan Paregreg, atau taktik perang!',
      time: 'Awal Permainan'
    }
  ]);
  const [isAskingGM, setIsAskingGM] = useState(false);

  const handleCopy = () => {
    if (!latestLog?.markdownFormatted) return;
    navigator.clipboard.writeText(latestLog.markdownFormatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || isAskingGM) return;

    const query = userQuery.trim();
    setUserQuery('');
    const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: 'user', text: query, time: now }]);
    setIsAskingGM(true);

    try {
      const res = await fetch('/api/gm-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, gameState }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'gm',
          text: data.reply || 'Titah Paduka telah dicatat oleh juru tulis kraton.',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'gm',
          text: 'Pemberontakan dan kabut tebal merintangi merpati pos. Hamba sarankan perkuat pertahanan benteng Anda!',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAskingGM(false);
    }
  };

  return (
    <div className="w-full bg-stone-900/90 border border-amber-900/50 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[460px] sm:h-[500px] lg:h-[540px]">
      {/* Top Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-stone-950 border-b border-amber-900/40 gap-2">
        <div className="flex items-center gap-2">
          <Scroll className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-serif font-bold text-amber-200 tracking-wide uppercase">
            Juru Kisah Game Master (GM Engine)
          </h3>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800 text-[11px] sm:text-xs">
          <button
            onClick={() => setActiveTab('chronicle')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === 'chronicle'
                ? 'bg-amber-600/30 text-amber-300 font-medium border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kisah Giliran</span>
          </button>
          
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === 'raw'
                ? 'bg-amber-600/30 text-amber-300 font-medium border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Format Markdown</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-amber-600/30 text-amber-300 font-medium border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Riwayat ({logs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ask_gm')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === 'ask_gm'
                ? 'bg-amber-600/30 text-amber-300 font-medium border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Tanya GM</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Formatted Royal Chronicle */}
      {activeTab === 'chronicle' && (
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-sans text-stone-200 text-sm leading-relaxed bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-900 to-stone-950">
          {latestLog ? (
            <div className="space-y-4">
              {/* Turn Banner */}
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-700/40 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                    Ronde {latestLog.roundNumber} · Giliran {latestLog.turnNumber}
                  </span>
                  <h4 className="text-base font-serif font-bold text-amber-100">
                    {latestLog.playerName} ({latestLog.factionName})
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2.5 py-1 rounded bg-stone-950 border border-amber-800/40 text-amber-300 font-mono">
                    Dadu: {latestLog.diceRoll}
                  </span>
                </div>
              </div>

              {/* Destination & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800">
                  <span className="text-stone-400">Petak yang Dituju:</span>
                  <div className="font-semibold text-stone-100 text-sm">
                    #{latestLog.destinationTileId} {latestLog.destinationTileName}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800">
                  <span className="text-stone-400">Status Petak:</span>
                  <div className="font-semibold text-amber-300 text-sm">
                    {latestLog.tileStatusText}
                  </div>
                </div>
              </div>

              {/* Immersive Historical Narration */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 to-stone-950 border border-amber-600/30 relative">
                <div className="flex items-center gap-2 mb-2 text-xs font-serif font-bold text-amber-400 tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Narasi Sejarah Nusantara</span>
                </div>
                <p className="text-stone-200 font-serif italic text-sm leading-relaxed border-l-2 border-amber-500/60 pl-3">
                  "{latestLog.narration}"
                </p>
              </div>

              {/* Action summary */}
              {latestLog.actionTakenText && (
                <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800 text-xs">
                  <span className="text-stone-400 font-medium">Tindakan Terkini: </span>
                  <span className="text-amber-200">{latestLog.actionTakenText}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-stone-500 p-6">
              <Scroll className="w-10 h-10 mb-2 opacity-40 text-amber-500" />
              <p className="font-serif text-base text-stone-400">Kocok dadu takhta untuk memulai giliran pertama!</p>
              <p className="text-xs text-stone-600 mt-1 max-w-sm">
                Game Master akan menyajikan narasi sejarah resmi Nusantara, evaluasi petak, dan opsi aksi taktis.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Exact Markdown Output Required by Section 6 */}
      {activeTab === 'raw' && (
        <div className="flex-1 flex flex-col bg-stone-950 p-4 font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
            <span className="text-stone-400">
              Format Output Resmi Board Game (Seksi 6 Panduan GM):
            </span>
            <button
              onClick={handleCopy}
              disabled={!latestLog}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-700/30 hover:bg-amber-600/40 text-amber-300 border border-amber-600/40 transition-colors cursor-pointer text-xs disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Markdown'}</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-black/60 p-3 rounded-lg border border-stone-800/80 text-amber-200/90 whitespace-pre font-mono leading-relaxed select-all">
            {latestLog?.markdownFormatted || '// Belum ada riwayat giliran. Kocok dadu untuk menerbitkan catatan Game Master.'}
          </div>
        </div>
      )}

      {/* Tab 3: Turn History Logs */}
      {activeTab === 'history' && (
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-950">
          {logs.length === 0 ? (
            <p className="text-xs text-stone-500 text-center py-8">Belum ada riwayat giliran yang tercatat.</p>
          ) : (
            logs.slice().reverse().map((log) => (
              <div 
                key={log.id}
                className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between text-amber-400 font-mono">
                  <span>Ronde {log.roundNumber} · Giliran #{log.turnNumber}</span>
                  <span className="text-stone-400">Dadu [{log.diceRoll}] ➡️ {log.destinationTileName}</span>
                </div>
                <div className="text-stone-200 font-serif">
                  <span className="font-bold text-amber-200">{log.playerName}: </span>
                  {log.narration}
                </div>
                {log.actionTakenText && (
                  <div className="text-[11px] text-stone-400 italic">
                    Aksi: {log.actionTakenText}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Interactive GM Consultation (Chat with AI Game Master) */}
      {activeTab === 'ask_gm' && (
        <div className="flex-1 flex flex-col bg-stone-950 overflow-hidden">
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-600/30 text-amber-100 border border-amber-500/40 rounded-br-none'
                      : 'bg-stone-900 text-stone-200 border border-stone-800 rounded-bl-none font-serif'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className="block mt-1.5 text-[10px] text-stone-400 text-right">
                    {msg.sender === 'gm' ? 'Juru Kisah GM' : 'Paduka'} · {msg.time}
                  </span>
                </div>
              </div>
            ))}
            {isAskingGM && (
              <div className="flex items-center gap-2 text-xs text-amber-400 p-2 italic">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Game Master sedang menelaah kitab babad kraton...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendQuery} className="p-2.5 bg-stone-900 border-t border-stone-800 flex gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Tanyakan siasat, sejarah wilayah, atau aturan pada Game Master..."
              className="flex-1 px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={isAskingGM || !userQuery.trim()}
              className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-xs flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
