'use client';

import React from 'react';
import { CaseItem } from '../../types/case';
import { Button } from './Button';

interface DropTableModalProps {
    isOpen: boolean;
    caseItem: CaseItem | null;
    onClose: () => void;
}

const rarityColors = {
    common: 'bg-mc-rarity-common/20 text-mc-rarity-common border-mc-rarity-common/30',
    rare: 'bg-mc-rarity-rare/20 text-mc-rarity-rare border-mc-rarity-rare/30',
    epic: 'bg-mc-rarity-epic/20 text-mc-rarity-epic border-mc-rarity-epic/30',
    legendary: 'bg-mc-rarity-legendary/20 text-mc-rarity-legendary border-mc-rarity-legendary/30',
    mythic: 'bg-mc-rarity-mythic/20 text-mc-rarity-mythic border-mc-rarity-mythic/30',
};

export function DropTableModal({ isOpen, caseItem, onClose }: DropTableModalProps) {
    if (!isOpen || !caseItem) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-mc-bg-primary border border-white/20 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-mc-text-primary">{caseItem.name}</h3>
                        <p className="text-mc-text-secondary">Возможные награды</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-mc-text-secondary hover:text-mc-text-primary transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* ⭐ 1. Drop Table */}
                <div className="space-y-3 mb-6">
                    {caseItem.dropTable
                        .sort((a, b) => b.probability - a.probability)
                        .map((item) => (
                            <div
                                key={item.id}
                                className="glass-effect rounded-lg p-4 border border-white/10 hover:border-mc-accent-emerald/30 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {/* Item Icon */}
                                        <div className="text-2xl">{item.icon || '📦'}</div>

                                        {/* Item Info */}
                                        <div>
                                            <h4 className="font-semibold text-mc-text-primary">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-mc-text-secondary">
                                                {item.description}
                                            </p>
                                            <p className="text-xs text-mc-text-muted font-mono">
                                                {item.minecraftItem}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        {/* Sell Price */}
                                        <div className="text-right">
                                            <div className="text-sm text-mc-text-secondary">
                                                Продажа
                                            </div>
                                            <div className="text-mc-accent-emerald font-semibold">
                                                {item.sellPrice} MC
                                            </div>
                                        </div>

                                        {/* Probability */}
                                        <div className="text-right">
                                            <div className="text-sm text-mc-text-secondary">
                                                Шанс
                                            </div>
                                            <div className="text-mc-text-primary font-bold">
                                                {item.probability}%
                                            </div>
                                        </div>

                                        {/* Rarity Badge */}
                                        <div
                                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${rarityColors[item.rarity]}`}
                                        >
                                            {item.rarity}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Summary */}
                <div className="glass-effect rounded-lg p-4 border border-white/10 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-mc-text-primary">
                                {caseItem.dropTable.length}
                            </div>
                            <div className="text-sm text-mc-text-secondary">Предметов</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-mc-accent-emerald">
                                {caseItem.price}
                            </div>
                            <div className="text-sm text-mc-text-secondary">MC-Coins</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-mc-rarity-legendary">
                                {
                                    caseItem.dropTable.filter((item) =>
                                        ['legendary', 'mythic'].includes(item.rarity),
                                    ).length
                                }
                            </div>
                            <div className="text-sm text-mc-text-secondary">Редких</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-mc-rarity-epic">
                                {caseItem.dropTable.filter((item) => item.rarity === 'epic').length}
                            </div>
                            <div className="text-sm text-mc-text-secondary">Эпиков</div>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-center">
                    <Button variant="secondary" onClick={onClose}>
                        Закрыть
                    </Button>
                </div>
            </div>
        </div>
    );
}
import React from 'react';
import { CaseItem } from '../../types/case';
import { Button } from './Button';

interface DropTableModalProps {
    isOpen: boolean;
    caseItem: CaseItem | null;
    onClose: () => void;
}

const rarityColors = {
    common: 'bg-mc-rarity-common/20 text-mc-rarity-common border-mc-rarity-common/30',
    rare: 'bg-mc-rarity-rare/20 text-mc-rarity-rare border-mc-rarity-rare/30',
    epic: 'bg-mc-rarity-epic/20 text-mc-rarity-epic border-mc-rarity-epic/30',
    legendary: 'bg-mc-rarity-legendary/20 text-mc-rarity-legendary border-mc-rarity-legendary/30',
    mythic: 'bg-mc-rarity-mythic/20 text-mc-rarity-mythic border-mc-rarity-mythic/30',
};

export function DropTableModal({ isOpen, caseItem, onClose }: DropTableModalProps) {
    if (!isOpen || !caseItem) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            data-oid=":uf:80r"
        >
            <div
                className="bg-mc-bg-primary border border-white/20 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                data-oid="agxl8da"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6" data-oid="i2__gkm">
                    <div data-oid="d.04nrv">
                        <h3 className="text-2xl font-bold text-mc-text-primary" data-oid="q4d:5-6">
                            {caseItem.name}
                        </h3>
                        <p className="text-mc-text-secondary" data-oid="jpgue9a">
                            Возможные награды
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-mc-text-secondary hover:text-mc-text-primary transition-colors"
                        data-oid="zvl3ia3"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            data-oid="6n2dwvi"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                                data-oid="xb.iw5x"
                            />
                        </svg>
                    </button>
                </div>

                {/* Drop Table */}
                <div className="space-y-3 mb-6" data-oid="eh004-4">
                    {caseItem.dropTable
                        .sort((a, b) => b.probability - a.probability)
                        .map((item) => (
                            <div
                                key={item.id}
                                className="glass-effect rounded-lg p-4 border border-white/10 hover:border-mc-accent-emerald/30 transition-colors"
                                data-oid="mo6jlrj"
                            >
                                <div
                                    className="flex items-center justify-between"
                                    data-oid=":6cq3v:"
                                >
                                    <div className="flex items-center space-x-4" data-oid="xmr-ywq">
                                        {/* Item Icon */}
                                        <div className="text-2xl" data-oid="hmag938">
                                            {item.icon || '📦'}
                                        </div>

                                        {/* Item Info */}
                                        <div data-oid="6x:tng0">
                                            <h4
                                                className="font-semibold text-mc-text-primary"
                                                data-oid="-41v9ad"
                                            >
                                                {item.name}
                                            </h4>
                                            <p
                                                className="text-sm text-mc-text-secondary"
                                                data-oid="ld.9zzr"
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4" data-oid="hn3xm5a">
                                        {/* Sell Price */}
                                        <div className="text-right" data-oid="dcnsx_v">
                                            <div
                                                className="text-sm text-mc-text-secondary"
                                                data-oid="5nkznzn"
                                            >
                                                Продажа
                                            </div>
                                            <div
                                                className="text-mc-accent-emerald font-semibold"
                                                data-oid="4sqr8j6"
                                            >
                                                {item.sellPrice} MC
                                            </div>
                                        </div>

                                        {/* Probability */}
                                        <div className="text-right" data-oid="7yoa9x4">
                                            <div
                                                className="text-sm text-mc-text-secondary"
                                                data-oid="vf1_kqk"
                                            >
                                                Шанс
                                            </div>
                                            <div
                                                className="text-mc-text-primary font-bold"
                                                data-oid="09vygsd"
                                            >
                                                {item.probability}%
                                            </div>
                                        </div>

                                        {/* Rarity Badge */}
                                        <div
                                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${rarityColors[item.rarity]}`}
                                            data-oid="-xmd7.i"
                                        >
                                            {item.rarity}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Summary */}
                <div
                    className="glass-effect rounded-lg p-4 border border-white/10 mb-6"
                    data-oid="hkeq1l:"
                >
                    <div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
                        data-oid="1aprxk-"
                    >
                        <div data-oid="3g8c.pr">
                            <div
                                className="text-2xl font-bold text-mc-text-primary"
                                data-oid="bwm2fa5"
                            >
                                {caseItem.dropTable.length}
                            </div>
                            <div className="text-sm text-mc-text-secondary" data-oid="2wmgvgs">
                                Предметов
                            </div>
                        </div>
                        <div data-oid="pys9d9e">
                            <div
                                className="text-2xl font-bold text-mc-accent-emerald"
                                data-oid="h6i2_0f"
                            >
                                {caseItem.price}
                            </div>
                            <div className="text-sm text-mc-text-secondary" data-oid="d5wjk:m">
                                MC-Coins
                            </div>
                        </div>
                        <div data-oid="4t5-zzc">
                            <div
                                className="text-2xl font-bold text-mc-rarity-legendary"
                                data-oid="l29xl-m"
                            >
                                {
                                    caseItem.dropTable.filter((item) =>
                                        ['legendary', 'mythic'].includes(item.rarity),
                                    ).length
                                }
                            </div>
                            <div className="text-sm text-mc-text-secondary" data-oid="5f9p7kd">
                                Редких
                            </div>
                        </div>
                        <div data-oid="wp2kj_t">
                            <div
                                className="text-2xl font-bold text-mc-rarity-epic"
                                data-oid="de47tnp"
                            >
                                {caseItem.dropTable.reduce(
                                    (sum, item) => sum + (item.probability >= 10 ? 0 : 1),
                                    0,
                                )}
                            </div>
                            <div className="text-sm text-mc-text-secondary" data-oid="yd.uf.g">
                                Эпиков
                            </div>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-center" data-oid="jgo2:of">
                    <Button variant="secondary" onClick={onClose} data-oid="nm.rajl">
                        Закрыть
                    </Button>
                </div>
            </div>
        </div>
    );
}
