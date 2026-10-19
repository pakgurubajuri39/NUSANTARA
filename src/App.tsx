import React, { useState, useEffect, useRef } from 'react';
import { 
  BoardTile, 
  Player, 
  GameState, 
  TurnLog, 
  SpiceType, 
  AllianceType,
  PraharaCard
} from './types/game';
import { 
  INITIAL_BOARD_TILES, 
  HISTORICAL_FACTIONS, 
  HISTORICAL_PRAHARA_CARDS 
} from './data/boardData';
import { soundEngine } from './utils/audio';
import { 
  calculateVulnerability, 
  generateGMChronicleMarkdown, 
  getGMNarration,
  getLocalHistoricalNarration
} from './utils/gameMaster';

import { Board } from './components/Board';
import { GMChroniclePanel } from './components/GMChroniclePanel';
import { PlayerDashboard } from './components/PlayerDashboard';
import { ActionModal } from './components/modals/ActionModal';
import { BattleModal } from './components/modals/BattleModal';
import { DiplomacyModal } from './components/modals/DiplomacyModal';
import { SetupModal } from './components/modals/SetupModal';
import { TileDetailModal } from './components/modals/TileDetailModal';
import { VictoryModal } from './components/modals/VictoryModal';

import { 
  Crown, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  HelpCircle, 
  Sparkles,
  Shield,
  Coins,
  Swords,
  Scroll,
  Compass,
  Dices
} from 'lucide-react';

export default function App() {
  const [mobileTab, setMobileTab] = useState<'board' | 'chronicle' | 'players'>('board');

  // Game State
  const [gameState, setGameState] = useState<GameState>({
    gameStarted: false,
    gameOver: false,
    winner: null,
    currentRound: 1,
    currentTurnIndex: 0,
    maxRounds: 30,
    players: [],
    tiles: JSON.parse(JSON.stringify(INITIAL_BOARD_TILES)),
    spicePrices: { lada: 22, cengkeh: 32, pala: 44 },
    vocActive: false,
    vocTerritories: [],
    logs: [],
    activeActionModal: null,
    lastDiceRoll: null,
    isRolling: false,
    gmThinking: false,
  });

  const [soundOn, setSoundOn] = useState(true);
  const [selectedInspectTile, setSelectedInspectTile] = useState<BoardTile | null>(null);
  const [showDiplomacyModal, setShowDiplomacyModal] = useState(false);
  const [showRulesGuide, setShowRulesGuide] = useState(false);
  const [battleState, setBattleState] = useState<{
    tileId: number;
    attackerId: string;
    defenderId: string;
  } | null>(null);

  const activePlayer = gameState.players[gameState.currentTurnIndex];

  // Sound toggle
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEngine.setSoundEnabled(next);
  };

  // 1. Initial Start Game (From SetupModal)
  const handleStartGame = (initialPlayers: Player[]) => {
    soundEngine.playGong();
    const freshTiles: BoardTile[] = JSON.parse(JSON.stringify(INITIAL_BOARD_TILES));

    // Register starting log
    const welcomeLog: TurnLog = {
      id: `turn-init`,
      turnNumber: 1,
      roundNumber: 1,
      playerId: initialPlayers[0].id,
      playerName: initialPlayers[0].name,
      factionName: initialPlayers[0].factionName,
      era: 'hindu_buddha',
      diceRoll: 0,
      destinationTileId: 1,
      destinationTileName: 'Kutai Martapura',
      destinationTileType: 'wilayah',
      tileStatusText: 'Awal Permainan',
      narration: 'Genderang takhta berdentang di hadapan singgasana para raja. Giliran pertama diserahkan kepada baginda penguasa pembuka untuk mengocok dadu takhta!',
      actionTakenText: 'Permainan Dimulai dengan modal awal 100 koin emas dan 2 pasukan militer.',
      markdownFormatted: `==================================================
🚩 GILIRAN: ${initialPlayers[0].name} (${initialPlayers[0].factionName}) | ERA: Era Hindu-Buddha
==================================================
🎲 Dadu: - ➡️ Pindah ke: Kutai (Petak #1)
📍 Status Petak: Awal Permainan

📜 NARASI SEJARAH:
Kaki baginda menginjak tanah Kutai Martapura di tepi riak Mahakam. Di hadapan prasasti Yupa bertuliskan huruf Pallawa, genderang takhta resmi ditabuh!

⚡ PILIHAN AKSI ANDA:
1. Kocok Dadu Takhta (1-6) untuk memulai pergerakan pertama.

--------------------------------------------------
📊 STATUS PEMAIN:
💰 Koin Emas: ${initialPlayers[0].coins} | ⚔️ Pasukan: ${initialPlayers[0].military} | 🌶️ Rempah: 1 Komoditas Acak
🏰 Wilayah: Belum ada wilayah | 🌟 Poin Kejayaan: 0
⚠️ Kerentanan Perpecahan: [0/3]
==================================================`,
      timestamp: Date.now(),
    };

    setGameState((prev) => ({
      ...prev,
      gameStarted: true,
      gameOver: false,
      winner: null,
      currentRound: 1,
      currentTurnIndex: 0,
      players: initialPlayers,
      tiles: freshTiles,
      logs: [welcomeLog],
      activeActionModal: null,
      lastDiceRoll: null,
      isRolling: false,
    }));
  };

  // 2. Dice Roll & Movement Step
  const handleRollDice = async () => {
    if (!activePlayer || gameState.isRolling || gameState.activeActionModal || gameState.gameOver) return;

    setGameState((prev) => ({ ...prev, isRolling: true, gmThinking: true }));
    soundEngine.playDiceRoll();

    // Roll dice 1-6
    const roll = Math.floor(Math.random() * 6) + 1;
    // Gowa-Tallo trait: option to add 1 step if advantageous (AI uses it, human prompt or default)
    const bonusStep = (activePlayer.factionId === 'gowa_tallo' && Math.random() > 0.4) ? 1 : 0;
    const finalRoll = roll + bonusStep;

    // Set dice roll immediately
    setGameState((prev) => ({
      ...prev,
      lastDiceRoll: finalRoll,
    }));

    // Step-by-step animated hopping along the circular track
    let stepCount = 0;
    let tempPos = activePlayer.position;
    let crossedStart = false;

    const stepInterval = setInterval(async () => {
      stepCount++;
      tempPos = (tempPos % 24) + 1;
      if (tempPos === 1) {
        crossedStart = true;
      }

      // Audible progressive chime for each stepping hop
      soundEngine.playBonang(1 + (stepCount * 0.05));

      // Move player pawn 1 step forward with smooth spring transition
      setGameState((prev) => ({
        ...prev,
        players: prev.players.map((p) => (p.id === activePlayer.id ? { ...p, position: tempPos } : p)),
      }));

      // When the final tile is reached
      if (stepCount >= finalRoll) {
        clearInterval(stepInterval);
        soundEngine.playBonang(1.3);

        const newPos = tempPos;
        const targetTile = gameState.tiles.find((t) => t.id === newPos)!;

        // Update player position & bonus if crossed Kutai / Pelabuhan (Sriwijaya trait)
        let updatedCoins = activePlayer.coins;
        let bonusNotes = '';
        if (crossedStart) {
          updatedCoins += 20; // 20 gold for full circuit
          bonusNotes += ' (+20g putaran peta)';
        }
      if (targetTile.type === 'pelabuhan' && activePlayer.factionId === 'sriwijaya') {
        updatedCoins += 15;
        bonusNotes += ' (+15g Kedaulatan Maritim Sriwijaya)';
      }

      // Determine Tile Status Text
      let statusText = 'Wilayah Netral (Belum Berpemilik)';
      const isVocOwned = gameState.vocTerritories.includes(targetTile.id);
      if (isVocOwned) {
        statusText = 'Dikuasai Garnisun VOC Kompeni';
      } else if (targetTile.ownerId) {
        const owner = gameState.players.find((p) => p.id === targetTile.ownerId);
        statusText = owner ? `Dikuasai oleh ${owner.name} (${owner.factionName})` : 'Wilayah Khusus';
      } else if (targetTile.type === 'situs_suci') {
        statusText = 'Situs Suci Bersejarah (Candi Borobudur)';
      } else if (targetTile.type === 'pasar_rempah') {
        statusText = 'Bursa Pasar Rempah Nusantara';
      } else if (targetTile.type === 'prahara') {
        statusText = 'Pusat Prahara Sejarah (Perang Paregreg)';
      } else if (targetTile.type === 'bentrokan_voc') {
        statusText = 'Pangkalan Armada Meriam VOC';
      }

      // Fetch or compute narration
      const narration = await getGMNarration({
        player: { ...activePlayer, coins: updatedCoins, position: newPos },
        tile: targetTile,
        diceRoll: finalRoll,
        tileStatusText: statusText,
      });

      // Actions available
      const actionsList: string[] = [];
      if (targetTile.type === 'wilayah' || targetTile.type === 'pelabuhan' || targetTile.type === 'wilayah_rempah') {
        if (!targetTile.ownerId && !isVocOwned) {
          actionsList.push(`Klaim Damai Wilayah ${targetTile.name} (${targetTile.cost}g)`);
          actionsList.push('Biarkan Wilayah Kosong');
        } else if (targetTile.ownerId && targetTile.ownerId !== activePlayer.id) {
          actionsList.push(`Bayar Upeti / Sewa Transit (${targetTile.rent}g)`);
          actionsList.push('Kobarkan Serangan Militer Rebut Wilayah!');
        } else {
          actionsList.push('Singgah di Wilayah Sendiri (Bebas Sewa)');
        }
      } else if (targetTile.type === 'situs_suci') {
        actionsList.push('Tegakkan Legitimasi Suci Borobudur (+2 Poin Kejayaan)');
      } else if (targetTile.type === 'pasar_rempah') {
        actionsList.push('Beli atau Jual Komoditas Rempah (Lada, Cengkeh, Pala)');
        actionsList.push('Lewati Pasar Rempah');
      } else if (targetTile.type === 'prahara') {
        actionsList.push('Hadapi Pergolakan Internal Takhta Paregreg (+1 Kerentanan)');
      } else if (targetTile.type === 'bentrokan_voc') {
        actionsList.push('Bayar Sogokan Kompeni VOC (30g)');
        actionsList.push('Pertahankan Martabat Lawan Armada VOC');
      }
      actionsList.push('Buka Balai Diplomasi / Rekrut Pasukan / Lewati Giliran');

      // Create Turn Log in Section 6 Format
      const updatedPlayerObj: Player = {
        ...activePlayer,
        position: newPos,
        coins: updatedCoins,
      };

      const markdownString = generateGMChronicleMarkdown({
        player: updatedPlayerObj,
        tile: targetTile,
        diceRoll: finalRoll,
        tileStatusText: statusText,
        narration,
        actions: actionsList,
        tiles: gameState.tiles,
      });

      const newLog: TurnLog = {
        id: `turn-${Date.now()}`,
        turnNumber: gameState.logs.length + 1,
        roundNumber: gameState.currentRound,
        playerId: activePlayer.id,
        playerName: activePlayer.name,
        factionName: activePlayer.factionName,
        era: targetTile.era,
        diceRoll: finalRoll,
        destinationTileId: newPos,
        destinationTileName: targetTile.name,
        destinationTileType: targetTile.type,
        tileStatusText: statusText,
        narration,
        actionTakenText: `Mendarat di ${targetTile.name}${bonusNotes}`,
        markdownFormatted: markdownString,
        timestamp: Date.now(),
      };

      // Determine modal type to trigger
      let modalAction: GameState['activeActionModal'] = null;

      if (!targetTile.ownerId && !isVocOwned && (targetTile.type === 'wilayah' || targetTile.type === 'pelabuhan' || targetTile.type === 'wilayah_rempah')) {
        modalAction = { type: 'claim_tile', tileId: newPos };
      } else if (targetTile.ownerId && targetTile.ownerId !== activePlayer.id) {
        modalAction = { type: 'enemy_tile', tileId: newPos, ownerId: targetTile.ownerId };
      } else if (targetTile.type === 'situs_suci') {
        modalAction = { type: 'sacred_site', tileId: newPos };
      } else if (targetTile.type === 'pasar_rempah') {
        modalAction = { type: 'spice_market', tileId: newPos };
      } else if (targetTile.type === 'prahara') {
        modalAction = { type: 'paregreg', tileId: newPos };
      } else if (targetTile.type === 'bentrokan_voc' || isVocOwned) {
        modalAction = { type: 'voc_clash', tileId: newPos };
      }

      setGameState((prev) => {
        const nextPlayers = prev.players.map((p) => (p.id === activePlayer.id ? updatedPlayerObj : p));
        return {
          ...prev,
          players: nextPlayers,
          lastDiceRoll: finalRoll,
          isRolling: false,
          gmThinking: false,
          logs: [...prev.logs, newLog],
          activeActionModal: modalAction,
        };
      });

        // AI auto decision if AI player
        if (activePlayer.isAI && modalAction) {
          handleAIDecision(activePlayer, modalAction, targetTile);
        }
      }
    }, 220);
  };

  // 3. AI Automated Actions
  const handleAIDecision = (
    bot: Player, 
    modalAction: NonNullable<GameState['activeActionModal']>,
    tile: BoardTile
  ) => {
    setTimeout(() => {
      if (modalAction.type === 'claim_tile') {
        const cost = bot.factionId === 'singhasari' ? Math.round(tile.cost * 0.8) : tile.cost;
        if (bot.coins >= cost) {
          handleClaimTile(tile.id);
        } else {
          closeActionModalAndNext();
        }
      } else if (modalAction.type === 'enemy_tile') {
        const rent = tile.rent;
        // If bot has high military, it attacks! Otherwise pays rent
        if (bot.military >= 3 && bot.coins < rent * 2) {
          handleInitiateBattle(tile.id, bot.id, tile.ownerId!);
        } else {
          handlePayRent(tile.id, rent);
        }
      } else if (modalAction.type === 'sacred_site') {
        handleBlessBorobudur();
      } else if (modalAction.type === 'spice_market') {
        // AI sells if high price or buys
        if (bot.spices.lada > 0 && gameState.spicePrices.lada > 25) {
          handleTradeSpice('sell', 'lada', 1);
        } else if (bot.coins > 60) {
          handleTradeSpice('buy', 'cengkeh', 1);
        }
        closeActionModalAndNext();
      } else if (modalAction.type === 'paregreg') {
        handleParegregCrisis();
      } else if (modalAction.type === 'voc_clash') {
        if (bot.coins >= 30) {
          handleHandleVOC('bribe');
        } else {
          handleHandleVOC('fight');
        }
      }
    }, 1200);
  };

  // 4. Claim Tile
  const handleClaimTile = (tileId: number) => {
    if (!activePlayer) return;
    const tile = gameState.tiles.find((t) => t.id === tileId)!;
    const isSinghasari = activePlayer.factionId === 'singhasari';
    const cost = isSinghasari ? Math.round(tile.cost * 0.8) : tile.cost;

    if (activePlayer.coins < cost) return;

    soundEngine.playCoins();

    setGameState((prev) => {
      const updatedTiles = prev.tiles.map((t) => (t.id === tileId ? { ...t, ownerId: activePlayer.id } : t));
      const newTerritories = [...activePlayer.territories, tileId];
      const newVulnerability = calculateVulnerability(newTerritories);
      // Demak bonus: +1 Glory Point on claiming new territory
      const demakGloryBonus = activePlayer.factionId === 'demak' ? 1 : 0;

      const updatedPlayer: Player = {
        ...activePlayer,
        coins: activePlayer.coins - cost,
        territories: newTerritories,
        vulnerability: newVulnerability,
        gloryPoints: activePlayer.gloryPoints + demakGloryBonus,
      };

      const updatedPlayers = prev.players.map((p) => (p.id === activePlayer.id ? updatedPlayer : p));

      // Append action to latest log
      const updatedLogs = [...prev.logs];
      if (updatedLogs.length > 0) {
        const last = { ...updatedLogs[updatedLogs.length - 1] };
        last.actionTakenText = `Mengklaim damai wilayah ${tile.name} seharga ${cost} Koin Emas.`;
        updatedLogs[updatedLogs.length - 1] = last;
      }

      return {
        ...prev,
        tiles: updatedTiles,
        players: updatedPlayers,
        logs: updatedLogs,
        activeActionModal: null,
      };
    });

    checkVictoryAfterClaim(activePlayer.id);
    checkVulnerabilityParegreg(activePlayer.id);
    proceedToNextTurn();
  };

  // 5. Pay Rent
  const handlePayRent = (tileId: number, rentAmount: number) => {
    if (!activePlayer) return;
    const tile = gameState.tiles.find((t) => t.id === tileId)!;
    const owner = gameState.players.find((p) => p.id === tile.ownerId);

    soundEngine.playCoins();

    setGameState((prev) => {
      const actualPay = Math.min(activePlayer.coins, rentAmount);
      const isBankrupt = activePlayer.coins - actualPay <= 0 && activePlayer.territories.length === 0;

      const updatedPlayers = prev.players.map((p) => {
        if (p.id === activePlayer.id) {
          return {
            ...p,
            coins: Math.max(0, p.coins - actualPay),
            bankrupt: isBankrupt,
          };
        }
        if (owner && p.id === owner.id) {
          return {
            ...p,
            coins: p.coins + actualPay,
          };
        }
        return p;
      });

      // Append action to latest log
      const updatedLogs = [...prev.logs];
      if (updatedLogs.length > 0) {
        const last = { ...updatedLogs[updatedLogs.length - 1] };
        last.actionTakenText = `Membayar upeti transit ${actualPay} Koin Emas kepada ${owner?.name || 'pemilik'}.`;
        updatedLogs[updatedLogs.length - 1] = last;
      }

      return {
        ...prev,
        players: updatedPlayers,
        logs: updatedLogs,
        activeActionModal: null,
      };
    });

    proceedToNextTurn();
  };

  // 6. Initiate Battle Modal
  const handleInitiateBattle = (tileId: number, attackerId: string, defenderId: string) => {
    setGameState((prev) => ({ ...prev, activeActionModal: null }));
    setBattleState({ tileId, attackerId, defenderId });
  };

  // 7. Resolve Battle
  const handleBattleResolved = (winner: 'attacker' | 'defender', attackerRoll: number, defenderRoll: number) => {
    if (!battleState) return;
    const { tileId, attackerId, defenderId } = battleState;
    const tile = gameState.tiles.find((t) => t.id === tileId)!;
    const attacker = gameState.players.find((p) => p.id === attackerId)!;
    const defender = gameState.players.find((p) => p.id === defenderId)!;

    setGameState((prev) => {
      let updatedTiles = [...prev.tiles];
      let updatedPlayers = [...prev.players];

      if (winner === 'attacker') {
        // Attacker conquers tile!
        updatedTiles = updatedTiles.map((t) => (t.id === tileId ? { ...t, ownerId: attackerId } : t));
        const newAttackerTerritories = [...attacker.territories, tileId];
        const newDefenderTerritories = defender.territories.filter((id) => id !== tileId);

        updatedPlayers = updatedPlayers.map((p) => {
          if (p.id === attackerId) {
            return {
              ...p,
              territories: newAttackerTerritories,
              gloryPoints: p.gloryPoints + 2, // +2 PK for winning battle
              vulnerability: calculateVulnerability(newAttackerTerritories),
            };
          }
          if (p.id === defenderId) {
            return {
              ...p,
              military: Math.max(0, p.military - 1),
              territories: newDefenderTerritories,
              vulnerability: calculateVulnerability(newDefenderTerritories),
            };
          }
          return p;
        });
      } else {
        // Defender wins! Attacker loses 1 military and pays 20g
        const warReparations = Math.min(attacker.coins, 20);
        updatedPlayers = updatedPlayers.map((p) => {
          if (p.id === attackerId) {
            return {
              ...p,
              military: Math.max(0, p.military - 1),
              coins: Math.max(0, p.coins - warReparations),
            };
          }
          if (p.id === defenderId) {
            return {
              ...p,
              coins: p.coins + warReparations,
              gloryPoints: p.gloryPoints + 1,
            };
          }
          return p;
        });
      }

      // Log battle outcome
      const outcomeLog: TurnLog = {
        id: `turn-battle-${Date.now()}`,
        turnNumber: prev.logs.length + 1,
        roundNumber: prev.currentRound,
        playerId: attacker.id,
        playerName: attacker.name,
        factionName: attacker.factionName,
        era: tile.era,
        diceRoll: attackerRoll,
        destinationTileId: tileId,
        destinationTileName: tile.name,
        destinationTileType: 'wilayah',
        tileStatusText: 'Medan Pertempuran Palagan',
        narration:
          winner === 'attacker'
            ? `Bala tentara ${attacker.name} berhasil merebut benteng ${tile.name} dalam pertempuran sengit!`
            : `Pertahanan ${defender.name} di ${tile.name} berhasil memukul mundur pasukan penyerang!`,
        actionTakenText: `Palagan berakhir: ${winner === 'attacker' ? attacker.name : defender.name} keluar sebagai pemenang.`,
        markdownFormatted: `🚩 HASIL PALAGAN: ${attacker.name} vs ${defender.name} di ${tile.name}
⚔️ Dadu Penyerang: ${attackerRoll} (Total: ${attackerRoll + attacker.military})
🛡️ Dadu Bertahan: ${defenderRoll} (Total: ${defenderRoll + defender.military})
🏆 Pemenang: ${winner === 'attacker' ? attacker.name : defender.name}`,
        timestamp: Date.now(),
      };

      return {
        ...prev,
        tiles: updatedTiles,
        players: updatedPlayers,
        logs: [...prev.logs, outcomeLog],
      };
    });

    setBattleState(null);
    checkVictoryAfterClaim(attackerId);
    proceedToNextTurn();
  };

  // 8. Sacred Site - Borobudur blessing
  const handleBlessBorobudur = () => {
    if (!activePlayer) return;
    soundEngine.playGong();

    setGameState((prev) => {
      const updatedPlayers = prev.players.map((p) => {
        if (p.id === activePlayer.id) {
          return {
            ...p,
            gloryPoints: p.gloryPoints + 2, // +2 Poin Kejayaan
          };
        }
        return p;
      });

      return {
        ...prev,
        players: updatedPlayers,
        activeActionModal: null,
      };
    });

    proceedToNextTurn();
  };

  // 9. Spice Trading
  const handleTradeSpice = (action: 'buy' | 'sell', spice: SpiceType, amount: number) => {
    if (!activePlayer) return;
    const price = gameState.spicePrices[spice];
    soundEngine.playCoins();

    setGameState((prev) => {
      const updatedPlayer = { ...activePlayer };
      if (action === 'buy' && updatedPlayer.coins >= price * amount) {
        updatedPlayer.coins -= price * amount;
        updatedPlayer.spices[spice] += amount;
      } else if (action === 'sell' && updatedPlayer.spices[spice] >= amount) {
        const bonus = updatedPlayer.factionId === 'ternate_tidore' ? 1.25 : 1;
        const earned = Math.round(price * amount * bonus);
        updatedPlayer.coins += earned;
        updatedPlayer.spices[spice] -= amount;
      }

      return {
        ...prev,
        players: prev.players.map((p) => (p.id === activePlayer.id ? updatedPlayer : p)),
      };
    });
  };

  // 10. Prahara - Paregreg crisis
  const handleParegregCrisis = () => {
    if (!activePlayer) return;
    soundEngine.playPrahara();

    setGameState((prev) => {
      const newVulnerability = Math.min(3, activePlayer.vulnerability + 1);
      const updatedPlayer: Player = {
        ...activePlayer,
        vulnerability: newVulnerability,
      };

      return {
        ...prev,
        players: prev.players.map((p) => (p.id === activePlayer.id ? updatedPlayer : p)),
        activeActionModal: null,
      };
    });

    checkVulnerabilityParegreg(activePlayer.id);
    proceedToNextTurn();
  };

  // 11. Bentrokan VOC
  const handleHandleVOC = (choice: 'bribe' | 'fight') => {
    if (!activePlayer) return;

    if (choice === 'bribe') {
      soundEngine.playCoins();
      setGameState((prev) => ({
        ...prev,
        players: prev.players.map((p) => (p.id === activePlayer.id ? { ...p, coins: Math.max(0, p.coins - 30) } : p)),
        activeActionModal: null,
      }));
    } else {
      // Fight VOC: Attacker roll vs VOC roll
      soundEngine.playWarDrum();
      const userRoll = Math.floor(Math.random() * 6) + 1 + activePlayer.military;
      const vocRoll = Math.floor(Math.random() * 6) + 1 + 3; // VOC military = 3

      if (userRoll > vocRoll) {
        soundEngine.playVictory();
        setGameState((prev) => ({
          ...prev,
          players: prev.players.map((p) => (p.id === activePlayer.id ? { ...p, gloryPoints: p.gloryPoints + 3, coins: p.coins + 40 } : p)),
          activeActionModal: null,
        }));
      } else {
        soundEngine.playPrahara();
        setGameState((prev) => ({
          ...prev,
          players: prev.players.map((p) => (p.id === activePlayer.id ? { ...p, military: Math.max(0, p.military - 1), coins: Math.max(0, p.coins - 20) } : p)),
          activeActionModal: null,
        }));
      }
    }
    proceedToNextTurn();
  };

  // 12. Check Vulnerability = 3 Trigger Prahara Card
  const checkVulnerabilityParegreg = (playerId: string) => {
    const player = gameState.players.find((p) => p.id === playerId);
    if (!player || player.vulnerability < 3) return;

    const card = HISTORICAL_PRAHARA_CARDS[Math.floor(Math.random() * HISTORICAL_PRAHARA_CARDS.length)];
    soundEngine.playPrahara();

    // Trigger prahara penalty: reset vulnerability, lose 1 territory or coins
    setTimeout(() => {
      setGameState((prev) => {
        const target = prev.players.find((p) => p.id === playerId)!;
        let updatedTerritories = [...target.territories];
        let updatedTiles = [...prev.tiles];

        if (updatedTerritories.length > 0) {
          const removedTileId = updatedTerritories.pop()!;
          updatedTiles = updatedTiles.map((t) => (t.id === removedTileId ? { ...t, ownerId: null } : t));
        }

        const updatedPlayer: Player = {
          ...target,
          territories: updatedTerritories,
          vulnerability: 0, // Reset after calamity
        };

        const praharaLog: TurnLog = {
          id: `prahara-${Date.now()}`,
          turnNumber: prev.logs.length + 1,
          roundNumber: prev.currentRound,
          playerId: target.id,
          playerName: target.name,
          factionName: target.factionName,
          era: 'islam',
          diceRoll: 0,
          destinationTileId: 12,
          destinationTileName: 'Prahara Kerajaan',
          destinationTileType: 'prahara',
          tileStatusText: card.title,
          narration: `Kerentanan perpecahan takhta mencapai puncaknya! ${card.historicalContext} ${card.effectDescription}`,
          actionTakenText: `Prahara Meletus: ${card.title}`,
          markdownFormatted: `⚠️ PRAHARA SEJARAH MEMBARA: ${card.title}
📜 Konteks: ${card.historicalContext}
💥 Dampak: ${card.effectDescription}`,
          timestamp: Date.now(),
        };

        return {
          ...prev,
          tiles: updatedTiles,
          players: prev.players.map((p) => (p.id === playerId ? updatedPlayer : p)),
          logs: [...prev.logs, praharaLog],
        };
      });
    }, 1000);
  };

  // 13. Check Victory Conditions
  const checkVictoryAfterClaim = (playerId: string) => {
    const player = gameState.players.find((p) => p.id === playerId);
    if (!player) return;

    // Victory 1: Dominasi 60% (14 petak)
    if (player.territories.length >= 14) {
      setGameState((prev) => ({
        ...prev,
        gameOver: true,
        winner: player,
        winReason: `Kemenangan Dominasi Mutlak! Berhasil menyatukan 14 wilayah (${Math.round((player.territories.length / 24) * 100)}% peta Nusantara) di bawah panji kekuasaan!`,
      }));
    }
  };

  // 14. Turn Advancement
  const proceedToNextTurn = () => {
    setGameState((prev) => {
      const activePlayers = prev.players.filter((p) => !p.bankrupt);
      if (activePlayers.length <= 1 && prev.players.length > 1) {
        return {
          ...prev,
          gameOver: true,
          winner: activePlayers[0] || prev.players[0],
          winReason: 'Seluruh kerajaan lawan telah bangkrut dan tak sanggup mempertahankan takhta!',
        };
      }

      let nextIndex = (prev.currentTurnIndex + 1) % prev.players.length;
      let nextRound = prev.currentRound;

      if (nextIndex === 0) {
        nextRound += 1;
        // Fluctuating spice market prices
        const newSpicePrices = {
          lada: Math.max(15, Math.min(40, prev.spicePrices.lada + Math.floor(Math.random() * 9) - 4)),
          cengkeh: Math.max(20, Math.min(55, prev.spicePrices.cengkeh + Math.floor(Math.random() * 11) - 5)),
          pala: Math.max(30, Math.min(70, prev.spicePrices.pala + Math.floor(Math.random() * 13) - 6)),
        };

        // VOC activates starting round 10 or Era Kolonial
        let newVocActive = prev.vocActive;
        let newVocTerritories = [...prev.vocTerritories];
        if (nextRound >= 10 && !prev.vocActive) {
          newVocActive = true;
          // VOC annexes a neutral tile
          const neutralTile = prev.tiles.find((t) => !t.ownerId && t.era === 'kolonial');
          if (neutralTile) {
            newVocTerritories.push(neutralTile.id);
          }
        }

        // Check Max Rounds Victory (Kemenangan Kejayaan)
        if (nextRound > prev.maxRounds) {
          const sortedByGlory = [...prev.players].sort((a, b) => b.gloryPoints - a.gloryPoints);
          return {
            ...prev,
            gameOver: true,
            winner: sortedByGlory[0],
            winReason: `Kemenangan Poin Kejayaan (PK)! Mencapai Poin Kejayaan tertinggi (${sortedByGlory[0].gloryPoints} PK) setelah ${prev.maxRounds} ronde peradaban!`,
          };
        }

        return {
          ...prev,
          currentRound: nextRound,
          currentTurnIndex: nextIndex,
          spicePrices: newSpicePrices,
          vocActive: newVocActive,
          vocTerritories: newVocTerritories,
        };
      }

      return {
        ...prev,
        currentRound: nextRound,
        currentTurnIndex: nextIndex,
      };
    });
  };

  const closeActionModalAndNext = () => {
    setGameState((prev) => ({ ...prev, activeActionModal: null }));
    proceedToNextTurn();
  };

  // 15. Recruit Military & Fortify
  const handleRecruitMilitary = (playerId: string) => {
    soundEngine.playCoins();
    soundEngine.playWarDrum();

    setGameState((prev) => {
      const updatedPlayers = prev.players.map((p) => {
        if (p.id === playerId && p.coins >= 25) {
          return {
            ...p,
            coins: p.coins - 25,
            military: p.military + 1,
          };
        }
        return p;
      });

      return { ...prev, players: updatedPlayers };
    });
  };

  const handleUpgradeFort = (tileId: number) => {
    if (!activePlayer || activePlayer.coins < 40) return;
    soundEngine.playCoins();

    setGameState((prev) => {
      const updatedTiles = prev.tiles.map((t) => (t.id === tileId ? { ...t, fortificationLevel: 1 } : t));
      const updatedPlayers = prev.players.map((p) => (p.id === activePlayer.id ? { ...p, coins: p.coins - 40 } : p));
      return {
        ...prev,
        tiles: updatedTiles,
        players: updatedPlayers,
      };
    });
    setSelectedInspectTile(null);
  };

  // 16. Form Alliance
  const handleFormAlliance = (targetPlayerId: string, allianceType: AllianceType) => {
    if (!activePlayer) return;
    soundEngine.playCoins();

    setGameState((prev) => {
      const updatedPlayers = prev.players.map((p) => {
        if (p.id === activePlayer.id) {
          return {
            ...p,
            coins: Math.max(0, p.coins - 20),
            alliances: { ...p.alliances, [targetPlayerId]: allianceType },
          };
        }
        if (p.id === targetPlayerId) {
          return {
            ...p,
            alliances: { ...p.alliances, [activePlayer.id]: allianceType },
          };
        }
        return p;
      });

      return { ...prev, players: updatedPlayers };
    });
  };

  // If active player is AI and can roll, auto-trigger roll after small delay
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameOver && activePlayer?.isAI && !gameState.isRolling && !gameState.activeActionModal && !battleState) {
      const timer = setTimeout(() => {
        handleRollDice();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentTurnIndex, gameState.isRolling, gameState.activeActionModal, battleState, gameState.gameStarted]);

  return (
    <div className="min-h-screen text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 font-sans relative bg-[#0e0805]">
      {/* 3D Realistic Antique Wooden Table Environment Backdrop */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-110"
        style={{ backgroundImage: `url('/board-game-table.jpg')` }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(50,28,15,0.65)_0%,rgba(20,11,6,0.92)_65%,rgba(10,5,3,0.99)_100%)]" />
      {/* Warm Antique Chamber Candlelight Glow */}
      <div className="fixed -top-20 -left-20 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full bg-yellow-600/10 blur-[120px] pointer-events-none z-0" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-serif font-black tracking-wide text-amber-100 flex items-center gap-2">
              <span>NUSANTARA</span>
              <span className="text-xs font-normal text-amber-400/80 font-mono hidden sm:inline">
                Takhta, Sekutu, & Prahara
              </span>
            </h1>
            <p className="text-[11px] text-stone-400 hidden md:block">
              Game Master Engine Sejarah Nusantara · 24 Petak Melingkar
            </p>
          </div>
        </div>

        {/* Status Indicators & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {gameState.gameStarted && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 font-mono">
              <span className="text-stone-400">Ronde:</span>
              <span className="font-bold text-amber-300">{gameState.currentRound}/{gameState.maxRounds}</span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 transition-colors cursor-pointer"
            title={soundOn ? 'Matikan Suara Gamelan' : 'Nyalakan Suara Gamelan'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>

          {/* Rules Guide */}
          <button
            onClick={() => setShowRulesGuide(true)}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Panduan Aturan Main"
          >
            <HelpCircle className="w-4 h-4 text-stone-400" />
            <span className="hidden sm:inline">Panduan</span>
          </button>

          {/* Reset / New Game */}
          <button
            onClick={() => setGameState((prev) => ({ ...prev, gameStarted: false }))}
            className="px-3 py-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/40 text-amber-200 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-3 sm:p-5 max-w-7xl mx-auto w-full space-y-4 pb-20 lg:pb-5">
        {/* Mobile & Tablet View Selector Bar (Phone & Tablet) */}
        {gameState.players.length > 0 && (
          <div className="lg:hidden flex items-center justify-center p-1 rounded-2xl bg-stone-900 border border-amber-900/40 text-xs shadow-lg">
            <button
              onClick={() => setMobileTab('board')}
              className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-all cursor-pointer ${
                mobileTab === 'board'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Papan Peta</span>
            </button>
            <button
              onClick={() => setMobileTab('chronicle')}
              className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-all cursor-pointer ${
                mobileTab === 'chronicle'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>Babad GM</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-950 font-mono text-amber-300">
                {gameState.logs.length}
              </span>
            </button>
            <button
              onClick={() => setMobileTab('players')}
              className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-all cursor-pointer ${
                mobileTab === 'players'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Status Kerajaan</span>
            </button>
          </div>
        )}

        {/* Top: Player Dashboard Ribbon (Shown on Desktop, or when mobileTab === 'players' on mobile/tablet) */}
        {gameState.players.length > 0 && (
          <div className={`${mobileTab === 'players' ? 'block' : 'hidden lg:block'}`}>
            <PlayerDashboard
              players={gameState.players}
              activePlayerIndex={gameState.currentTurnIndex}
              tiles={gameState.tiles}
              onRecruitMilitary={handleRecruitMilitary}
              onFortifyTerritory={handleUpgradeFort}
              onOpenDiplomacy={() => setShowDiplomacyModal(true)}
              canManageActions={!gameState.isRolling && !gameState.activeActionModal && !battleState}
            />
          </div>
        )}

        {/* Main Game Cockpit: Side-by-Side on Desktop/Laptop (>=1024px), Tabbed on Mobile/Tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Board View: Shown on desktop OR when mobileTab === 'board' */}
          <div className={`lg:col-span-7 ${mobileTab === 'board' ? 'block' : 'hidden lg:block'}`}>
            <Board
              tiles={gameState.tiles}
              players={gameState.players}
              activePlayerIndex={gameState.currentTurnIndex}
              selectedTile={selectedInspectTile}
              onSelectTile={(t) => setSelectedInspectTile(t)}
              onRollDice={handleRollDice}
              isRolling={gameState.isRolling}
              lastDiceRoll={gameState.lastDiceRoll}
              canRoll={
                gameState.gameStarted &&
                !gameState.gameOver &&
                !activePlayer?.isAI &&
                !gameState.activeActionModal &&
                !battleState
              }
              vocTerritories={gameState.vocTerritories}
            />
          </div>

          {/* GM Chronicle Output Panel: Shown on desktop OR when mobileTab === 'chronicle' */}
          <div className={`lg:col-span-5 ${mobileTab === 'chronicle' ? 'block' : 'hidden lg:block'}`}>
            <GMChroniclePanel
              latestLog={gameState.logs.length > 0 ? gameState.logs[gameState.logs.length - 1] : null}
              logs={gameState.logs}
              gameState={gameState}
            />
          </div>
        </div>

        {/* Floating Quick Action Dock for Mobile / Small Tablet Screens */}
        {gameState.gameStarted && !gameState.gameOver && activePlayer && (
          <div className="lg:hidden fixed bottom-3 left-3 right-3 z-30 p-2.5 rounded-2xl bg-stone-950/95 backdrop-blur-md border border-amber-600/60 shadow-2xl flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <span 
                className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-stone-900"
                style={{ backgroundColor: activePlayer.color }}
              />
              <div className="min-w-0">
                <span className="text-[11px] font-serif font-bold text-stone-100 block truncate">
                  {activePlayer.name}
                </span>
                <span className="text-[10px] text-amber-300 block truncate">
                  Petak #{activePlayer.position} · {gameState.tiles.find(t => t.id === activePlayer.position)?.name}
                </span>
              </div>
            </div>

            {/* Quick action button */}
            <div className="shrink-0 flex items-center gap-1.5">
              {!activePlayer.isAI && !gameState.activeActionModal && !battleState && (
                <button
                  onClick={handleRollDice}
                  disabled={gameState.isRolling}
                  className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-stone-950 font-serif font-bold text-xs tracking-wide shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Dices className={`w-3.5 h-3.5 ${gameState.isRolling ? 'animate-spin' : ''}`} />
                  <span>{gameState.isRolling ? 'Mengocok...' : 'Kocok Dadu'}</span>
                </button>
              )}

              {activePlayer.isAI && (
                <span className="text-[11px] font-mono text-amber-300 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 animate-pulse">
                  Giliran AI...
                </span>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-900/40 bg-stone-950/80 py-4 px-4 text-center text-xs text-stone-400 space-y-1">
        <p className="font-serif font-bold text-amber-300/90 tracking-wide">
          NUSANTARA: Takhta, Sekutu, & Prahara · Board Game Strategis Sejarah Indonesia
        </p>
        <p className="text-[11px] text-stone-400 font-medium">
          desingn by. Pak GuruAI collaborative with Dr. Fauzan Baihaqi, S.Hum, M.Hum
        </p>
      </footer>

      {/* MODALS */}

      {/* 1. Setup / Initial Game Modal (Section 7) */}
      {!gameState.gameStarted && (
        <SetupModal onStartGame={handleStartGame} />
      )}

      {/* 2. Action Modal (Empty Tile Claim, Rent, Market, Sacred Site, Paregreg) */}
      {gameState.activeActionModal && activePlayer && (
        <ActionModal
          modalData={gameState.activeActionModal}
          tile={gameState.tiles.find((t) => t.id === gameState.activeActionModal!.tileId)!}
          player={activePlayer}
          ownerPlayer={
            ('ownerId' in gameState.activeActionModal && gameState.activeActionModal.ownerId)
              ? gameState.players.find((p) => p.id === (gameState.activeActionModal as { ownerId?: string }).ownerId) || null
              : null
          }
          spicePrices={gameState.spicePrices}
          onClaimTile={handleClaimTile}
          onPayRent={handlePayRent}
          onInitiateBattle={handleInitiateBattle}
          onBlessBorobudur={handleBlessBorobudur}
          onTradeSpice={handleTradeSpice}
          onHandleParegreg={handleParegregCrisis}
          onHandleVOC={handleHandleVOC}
          onClose={closeActionModalAndNext}
        />
      )}

      {/* 3. Military Battle Modal */}
      {battleState && (
        <BattleModal
          tile={gameState.tiles.find((t) => t.id === battleState.tileId)!}
          attacker={gameState.players.find((p) => p.id === battleState.attackerId)!}
          defender={gameState.players.find((p) => p.id === battleState.defenderId)!}
          onBattleResolved={handleBattleResolved}
        />
      )}

      {/* 4. Diplomacy Treaty Modal */}
      {showDiplomacyModal && activePlayer && (
        <DiplomacyModal
          activePlayer={activePlayer}
          otherPlayers={gameState.players.filter((p) => p.id !== activePlayer.id && !p.bankrupt)}
          onFormAlliance={handleFormAlliance}
          onClose={() => setShowDiplomacyModal(false)}
        />
      )}

      {/* 5. Tile Inspection Modal */}
      {selectedInspectTile && activePlayer && (
        <TileDetailModal
          tile={selectedInspectTile}
          owner={gameState.players.find((p) => p.id === selectedInspectTile.ownerId) || null}
          activePlayer={activePlayer}
          onUpgradeFort={handleUpgradeFort}
          onClose={() => setSelectedInspectTile(null)}
        />
      )}

      {/* 6. Victory Modal */}
      {gameState.gameOver && gameState.winner && (
        <VictoryModal
          winner={gameState.winner}
          winReason={gameState.winReason}
          onRestartGame={() => setGameState((prev) => ({ ...prev, gameStarted: false }))}
        />
      )}

      {/* 7. Rules Guide Modal */}
      {showRulesGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-stone-900 border border-amber-700/60 rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <h3 className="text-xl font-serif font-bold text-amber-200 mb-3 flex items-center gap-2">
              <Scroll className="w-5 h-5 text-amber-400" />
              <span>Panduan Aturan Nusantara Engine</span>
            </h3>
            <div className="space-y-3 text-xs text-stone-300 leading-relaxed font-sans">
              <p>
                <b>1. Tiga Era Bersejarah:</b> Papan 24 petak terbagi dalam Era Hindu-Buddha (1-8), Era Islam Nusantara (9-16), dan Era Kolonial (17-24).
              </p>
              <p>
                <b>2. Modal Awal:</b> Setiap kerajaan mengawali dengan 100 Koin Emas, 2 Pasukan Militer, 1 Rempah Acak, dan 0 Poin Kejayaan.
              </p>
              <p>
                <b>3. Kerentanan Perpecahan (0-3):</b> Menguasai 3 petak berurutan meningkatkan kerentanan +1. Jika mencapai 3/3, Prahara Sejarah meletus dan memecah kerajaan!
              </p>
              <p>
                <b>4. Syarat Kemenangan:</b>
                <br />• <i>Kemenangan Dominasi:</i> Menguasai 60% (14 petak) dari total wilayah Nusantara.
                <br />• <i>Kemenangan Kejayaan:</i> Memiliki Poin Kejayaan (PK) tertinggi setelah 30 ronde peradaban.
              </p>
              <p>
                <b>5. Faksi AI VOC:</b> Mulai ronde ke-10 atau Era Kolonial, armada VOC akan merebut wilayah pesisir dan menuntut upeti monopoli.
              </p>
            </div>
            <button
              onClick={() => setShowRulesGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer"
            >
              Mengerti & Kembali Bermain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
