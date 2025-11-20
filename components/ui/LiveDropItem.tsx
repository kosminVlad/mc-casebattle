'use client';

import React from 'react';

interface LiveDropItemProps {
    player: string;
    item: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
}

const rarityColors = {
    common: 'bg-mc-rarity-common/20 text-mc-rarity-common',
    rare: 'bg-mc-rarity-rare/20 text-mc-rarity-rare',
    epic: 'bg-mc-rarity-epic/20 text-mc-rarity-epic',
    legendary: 'bg-mc-rarity-legendary/20 text-mc-rarity-legendary',
    mythic: 'bg-mc-rarity-mythic/20 text-mc-rarity-mythic',
};

export function LiveDropItem({ player, item, rarity }: LiveDropItemProps) {
    return (
        <div
            className="flex-shrink-0 glass-effect rounded-lg p-4 border border-white/10 hover:border-mc-accent-emerald/30 transition-colors duration-300"
            data-oid="2ppw_-o"
        >
            <div className="flex items-center space-x-3" data-oid="ktk8r5h">
                <div
                    className="w-8 h-8 bg-gradient-to-br from-mc-accent-emerald to-mc-accent-blue rounded-lg flex items-center justify-center text-xs font-bold"
                    data-oid="wri5891"
                >
                    {player.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0" data-oid="0a36qsi">
                    <div
                        className="text-sm font-semibold text-mc-text-primary truncate"
                        data-oid="d49ew-:"
                    >
                        {player}
                    </div>
                    <div className="text-xs text-mc-text-muted" data-oid="mwz_2dy">
                        получил
                    </div>
                </div>
                <div
                    className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${rarityColors[rarity]}`}
                    data-oid="51_q23:"
                >
                    {item}
                </div>
            </div>
        </div>
    );
}
