export type EraType = 'hindu_buddha' | 'islam' | 'kolonial';

export type TileType = 
  | 'wilayah' 
  | 'pelabuhan' 
  | 'situs_suci' 
  | 'prahara' 
  | 'pasar_rempah' 
  | 'bentrokan_voc'
  | 'wilayah_rempah';

export type SpiceType = 'lada' | 'cengkeh' | 'pala';

export type AllianceType = 'none' | 'bebas_transit' | 'nikah_politik' | 'persekutuan_perang';

export interface BoardTile {
  id: number; // 1 to 24
  name: string;
  era: EraType;
  type: TileType;
  cost: number; // Gold to claim
  rent: number; // Gold to pay when landing
  description: string;
  historicalNote: string;
  ownerId?: string | null; // player id, or 'voc'
  fortificationLevel: number; // 0 = standard, 1 = benteng (+5 rent, +1 defense)
  spiceBonus?: SpiceType;
}

export interface FactionData {
  id: string;
  name: string;
  ruler: string;
  rulerTitle: string;
  capital: string;
  era: EraType;
  traitName: string;
  traitDescription: string;
  bannerColor: string; // Tailwind hex / color
  textColor: string;
  secondaryColor: string;
  iconName: string;
  lore: string;
  quote: string;
  weapon: string;
  miniatureType: string;
}

export interface PlayerInventory {
  lada: number;
  cengkeh: number;
  pala: number;
}

export interface Player {
  id: string;
  name: string;
  factionId: string;
  factionName: string;
  rulerName: string;
  rulerTitle: string;
  quote: string;
  weapon: string;
  color: string;
  textColor: string;
  isAI: boolean;
  position: number; // 1 to 24
  coins: number; // Starts at 100
  military: number; // Starts at 2
  spices: PlayerInventory; // Starts with 1 random spice
  gloryPoints: number; // Starts at 0
  territories: number[]; // Tile IDs owned
  vulnerability: number; // 0 to 3
  alliances: Record<string, AllianceType>; // targetPlayerId -> AllianceType
  bankrupt: boolean;
}

export interface SpiceMarketPrices {
  lada: number;
  cengkeh: number;
  pala: number;
}

export interface TurnLog {
  id: string;
  turnNumber: number;
  roundNumber: number;
  playerId: string;
  playerName: string;
  factionName: string;
  era: EraType;
  diceRoll: number;
  destinationTileId: number;
  destinationTileName: string;
  destinationTileType: TileType;
  tileStatusText: string;
  narration: string;
  actionTakenText: string;
  markdownFormatted: string;
  timestamp: number;
}

export interface PraharaCard {
  id: string;
  title: string;
  historicalContext: string;
  effectDescription: string;
  type: 'secession' | 'civil_war' | 'tribute' | 'pestilence' | 'rebellion';
}

export type ActiveActionModal = 
  | { type: 'claim_tile'; tileId: number; ownerId?: string }
  | { type: 'enemy_tile'; tileId: number; ownerId: string }
  | { type: 'friendly_tile'; tileId: number; ownerId?: string }
  | { type: 'sacred_site'; tileId: number; ownerId?: string }
  | { type: 'spice_market'; tileId: number; ownerId?: string }
  | { type: 'paregreg'; tileId: number; ownerId?: string }
  | { type: 'voc_clash'; tileId: number; ownerId?: string };

export interface GameState {
  gameStarted: boolean;
  gameOver: boolean;
  winner: Player | null;
  winReason?: string;
  currentRound: number;
  currentTurnIndex: number;
  maxRounds: number;
  players: Player[];
  tiles: BoardTile[];
  spicePrices: SpiceMarketPrices;
  vocActive: boolean;
  vocTerritories: number[];
  logs: TurnLog[];
  activeActionModal: ActiveActionModal | null;
  lastDiceRoll: number | null;
  isRolling: boolean;
  gmThinking: boolean;
}
