import React from 'react';
import { REAL_CHARACTERS, RealCharacter } from '../data/characters';
import { Crown, Sparkles, Shield, Swords } from 'lucide-react';

interface CharacterAvatarProps {
  factionId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showStandee?: boolean;
  isTurnPlayer?: boolean;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  factionId,
  size = 'md',
  showStandee = false,
  isTurnPlayer = false,
  className = '',
}) => {
  const character: RealCharacter = REAL_CHARACTERS[factionId] || REAL_CHARACTERS['majapahit'];

  // Size mappings
  const sizeMap = {
    xs: {
      box: 'w-6 h-6',
      imgSize: 'w-6 h-6',
      standeeH: 'h-8',
      baseW: 'w-7',
      pedestalH: 'h-1.5',
      nameText: 'text-[6px]',
    },
    sm: {
      box: 'w-8 h-8',
      imgSize: 'w-8 h-8',
      standeeH: 'h-11',
      baseW: 'w-9',
      pedestalH: 'h-2',
      nameText: 'text-[7px]',
    },
    md: {
      box: 'w-11 h-11',
      imgSize: 'w-11 h-11',
      standeeH: 'h-15',
      baseW: 'w-12',
      pedestalH: 'h-2.5',
      nameText: 'text-[8px]',
    },
    lg: {
      box: 'w-16 h-16',
      imgSize: 'w-16 h-16',
      standeeH: 'h-22',
      baseW: 'w-18',
      pedestalH: 'h-3.5',
      nameText: 'text-[10px]',
    },
    xl: {
      box: 'w-24 h-24',
      imgSize: 'w-24 h-24',
      standeeH: 'h-32',
      baseW: 'w-26',
      pedestalH: 'h-4',
      nameText: 'text-xs',
    },
    hero: {
      box: 'w-36 h-36',
      imgSize: 'w-36 h-36',
      standeeH: 'h-48',
      baseW: 'w-38',
      pedestalH: 'h-5',
      nameText: 'text-sm',
    },
  };

  const currentSize = sizeMap[size];

  // Render the cropped realistic painted figurine
  const renderCroppedFigurine = () => {
    const { x, y, bgWidth } = character.crop;

    return (
      <div 
        className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-stone-900 border-2"
        style={{ borderColor: character.color }}
      >
        <div
          className="absolute inset-0 bg-no-repeat bg-cover transition-transform duration-300 pointer-events-none"
          style={{
            backgroundImage: `url('/nusantara-characters.jpg')`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundSize: `${bgWidth}% auto`,
          }}
        />
        {/* Subtle royal rim light */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_8px_rgba(0,0,0,0.7)] pointer-events-none" />
      </div>
    );
  };

  if (!showStandee) {
    return (
      <div 
        className={`relative inline-flex items-center justify-center shrink-0 ${currentSize.box} ${className}`}
        title={`${character.ruler} (${character.name})`}
      >
        {renderCroppedFigurine()}

        {/* Small faction colored indicator badge */}
        <div 
          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-stone-900 flex items-center justify-center shadow-xs"
          style={{ backgroundColor: character.color }}
        >
          <span className="w-1 h-1 rounded-full bg-white opacity-80" />
        </div>
      </div>
    );
  }

  // Full Realistic 3D Miniature Standee Token with Wood Pedestal and Brass Nameplate
  return (
    <div 
      className={`relative flex flex-col items-center justify-end select-none ${currentSize.standeeH} ${className}`}
      title={`${character.ruler} · ${character.title}`}
    >
      {/* Turn Player Golden Aura */}
      {isTurnPlayer && (
        <div 
          className="absolute inset-0 -top-2 rounded-full blur-md opacity-60 pointer-events-none animate-pulse"
          style={{ backgroundColor: character.accentColor || '#fbbf24' }}
        />
      )}

      {/* Realistic Painted Character Bust / Figurine */}
      <div className={`relative ${currentSize.box} z-10 transition-transform duration-200 group-hover:scale-110`}>
        {renderCroppedFigurine()}

        {/* Floating Mini Crown for active rulers */}
        <div 
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1 py-0.2 rounded-full bg-stone-950/90 border border-amber-400/80 shadow-md text-[7px] text-amber-300 font-bold"
        >
          👑
        </div>
      </div>

      {/* Miniature Carved Wood Standee Base / Pedestal */}
      <div className={`relative z-10 ${currentSize.baseW} flex flex-col items-center -mt-1`}>
        {/* Upper Brass Trim Ring */}
        <div 
          className="w-full h-1 rounded-t-sm border-t border-amber-500/80 shadow-xs"
          style={{ backgroundColor: character.color }}
        />
        
        {/* Carved Dark Wood Body with Name Banner */}
        <div className={`w-full ${currentSize.pedestalH} bg-gradient-to-b from-stone-850 via-stone-900 to-stone-950 border-x border-b border-stone-700/80 rounded-b-md flex items-center justify-center shadow-lg px-0.5`}>
          <span 
            className={`font-serif font-black tracking-tight text-amber-200 line-clamp-1 text-center drop-shadow ${currentSize.nameText}`}
          >
            {character.ruler.split(' ')[0]}
          </span>
        </div>

        {/* Bottom Shadow on Board */}
        <div className="w-3/4 h-1 bg-black/60 blur-[1px] rounded-full -mt-0.5" />
      </div>
    </div>
  );
};
