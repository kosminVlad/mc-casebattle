'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { DropTableModal } from './DropTableModal';
import { CaseItem } from '../../types/case';
import { getCaseUrl } from '../../utils/caseUtils';

interface CaseCardProps extends CaseItem {
    onOpen?: (id: number) => void;
    onViewDetails?: (id: number) => void;
}

const rarityConfig = {
    common: {
        gradient: 'from-mc-rarity-common to-gray-600',
        glow: 'hover:shadow-glow-emerald',
        badge: 'bg-mc-rarity-common/20 text-mc-rarity-common',
    },
    rare: {
        gradient: 'from-mc-rarity-rare to-blue-600',
        glow: 'hover:shadow-glow-blue',
        badge: 'bg-mc-rarity-rare/20 text-mc-rarity-rare',
    },
    epic: {
        gradient: 'from-mc-rarity-epic to-purple-600',
        glow: 'hover:shadow-glow-purple',
        badge: 'bg-mc-rarity-epic/20 text-mc-rarity-epic',
    },
    legendary: {
        gradient: 'from-mc-rarity-legendary to-orange-500',
        glow: 'hover:shadow-glow-emerald',
        badge: 'bg-mc-rarity-legendary/20 text-mc-rarity-legendary',
    },
    mythic: {
        gradient: 'from-mc-rarity-mythic to-pink-600',
        glow: 'hover:shadow-glow-purple',
        badge: 'bg-mc-rarity-mythic/20 text-mc-rarity-mythic',
    },
};

const typeIcons = {
    enchanting_table: '🔮',
    anvil: '🔨',
    crafting_table: '🛠️',
    brewing_stand: '⚗️',
};

export function CaseCard({
    id,
    name,
    type,
    price,
    rarity,
    description,
    dropTable,
    onOpen,
    onViewDetails,
}: CaseCardProps) {
    const [showDropTable, setShowDropTable] = useState(false);
    const router = useRouter();
    const config = rarityConfig[rarity];
    const icon = typeIcons[type as keyof typeof typeIcons] || '📦';

    const legendaryCount = dropTable.filter((item) =>
        ['legendary', 'mythic'].includes(item.rarity),
    ).length;
    const epicCount = dropTable.filter((item) => item.rarity === 'epic').length;

    const handleViewCase = () => {
        if (onViewDetails) {
            onViewDetails(id);
        } else {
            const url = getCaseUrl(id);
            router.push(url);
        }
    };

    return (
        <>
            <div
                className={`card-case bg-gradient-to-br ${config.gradient} ${config.glow} animate-float`}
                data-oid="zah735e"
            >
                <div className="card-case-inner" data-oid="3z5vni1">
                    {/* ⭐ 1. 3D Object */}
                    <div
                        className="relative h-48 mb-6 flex items-center justify-center"
                        data-oid=":ka-wi."
                    >
                        <div
                            className={`w-24 h-24 bg-gradient-to-br ${config.gradient} rounded-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-card`}
                            data-oid=".mgnl2m"
                        >
                            <div
                                className="w-full h-full bg-black/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                                data-oid="vbzz5os"
                            >
                                <div className="text-4xl animate-pulse-slow" data-oid="d8wjtrf">
                                    {icon}
                                </div>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}
                            data-oid="3nv1zqu"
                        ></div>
                    </div>

                    {/* ⭐ 1. Case Info */}
                    <h3
                        className="text-xl font-bold mb-2 text-center text-mc-text-primary"
                        data-oid="5dkk0hx"
                    >
                        {name}
                    </h3>

                    {description && (
                        <p
                            className="text-sm text-mc-text-secondary text-center mb-4 line-clamp-2"
                            data-oid="7u5gqc8"
                        >
                            {description}
                        </p>
                    )}

                    {/* ⭐ 1. Stats */}
                    <div
                        className="flex items-center justify-between mb-4 text-xs"
                        data-oid="mbmmg3:"
                    >
                        <div className="flex space-x-2" data-oid="q_dbadk">
                            {legendaryCount > 0 && (
                                <span className="text-mc-rarity-legendary" data-oid="_ep0rgt">
                                    ⭐ {legendaryCount}
                                </span>
                            )}
                            {epicCount > 0 && (
                                <span className="text-mc-rarity-epic" data-oid="wyln0ep">
                                    💜 {epicCount}
                                </span>
                            )}
                        </div>
                        <span className="text-mc-text-muted" data-oid="97fno2l">
                            {dropTable.length} предметов
                        </span>
                    </div>

                    <div className="flex items-center justify-between mb-4" data-oid="z0rrof3">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${config.badge}`}
                            data-oid=".68rc7p"
                        >
                            {rarity}
                        </span>
                        <div className="flex items-center space-x-1" data-oid="-lh1sf:">
                            <div
                                className="w-3 h-3 bg-mc-accent-emerald rounded-full animate-pulse"
                                data-oid="zcy37fu"
                            ></div>
                            <span className="text-mc-accent-emerald font-bold" data-oid="v:7bqi3">
                                {price}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2" data-oid="p5f1-tz">
                        <Button
                            variant="primary"
                            size="md"
                            className="w-full"
                            onClick={() => onOpen?.(id)}
                            data-oid="jtzioo6"
                        >
                            Открыть кейс
                        </Button>

                        <div className="grid grid-cols-2 gap-2" data-oid="p._iui2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={() => setShowDropTable(true)}
                                data-oid="2i-lker"
                            >
                                Содержимое
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={handleViewCase}
                                data-oid="c.yxg_6"
                            >
                                Подробнее
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Drop Table Modal */}
            <DropTableModal
                isOpen={showDropTable}
                caseItem={{ id, name, type, price, rarity, description, dropTable, isActive: true }}
                onClose={() => setShowDropTable(false)}
                data-oid="5x12t30"
            />
        </>
    );
}
