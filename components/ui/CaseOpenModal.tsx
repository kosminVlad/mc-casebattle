'use client';

import { useState, useEffect } from 'react';
import { DropTableItem } from '../../types/case';
import { Button } from './Button';

interface CaseOpenModalProps {
    isOpen: boolean;
    caseName: string;
    caseType: string;
    result: DropTableItem | null;
    isAnimating: boolean;
    onClose: () => void;
    onClaim: () => void;
    onSell: () => void;
}

const rarityConfig = {
    common: {
        gradient: 'from-mc-rarity-common to-gray-600',
        glow: 'shadow-glow-emerald',
        badge: 'bg-mc-rarity-common/20 text-mc-rarity-common border-mc-rarity-common/30',
    },
    rare: {
        gradient: 'from-mc-rarity-rare to-blue-600',
        glow: 'shadow-glow-blue',
        badge: 'bg-mc-rarity-rare/20 text-mc-rarity-rare border-mc-rarity-rare/30',
    },
    epic: {
        gradient: 'from-mc-rarity-epic to-purple-600',
        glow: 'shadow-glow-purple',
        badge: 'bg-mc-rarity-epic/20 text-mc-rarity-epic border-mc-rarity-epic/30',
    },
    legendary: {
        gradient: 'from-mc-rarity-legendary to-orange-500',
        glow: 'shadow-glow-emerald',
        badge: 'bg-mc-rarity-legendary/20 text-mc-rarity-legendary border-mc-rarity-legendary/30',
    },
    mythic: {
        gradient: 'from-mc-rarity-mythic to-pink-600',
        glow: 'shadow-glow-purple',
        badge: 'bg-mc-rarity-mythic/20 text-mc-rarity-mythic border-mc-rarity-mythic/30',
    },
};

const typeIcons = {
    enchanting_table: '🔮',
    anvil: '🔨',
    crafting_table: '🛠️',
    brewing_stand: '⚗️',
};

export function CaseOpenModal({
    isOpen,
    caseName,
    caseType,
    result,
    isAnimating,
    onClose,
    onClaim,
    onSell,
}: CaseOpenModalProps) {
    const [showResult, setShowResult] = useState(false);
    const [animationPhase, setAnimationPhase] = useState<'opening' | 'revealing' | 'complete'>(
        'opening',
    );

    useEffect(() => {
        if (isAnimating && result) {
            setShowResult(false);
            setAnimationPhase('opening');

            // ⭐ 5. Фаза 1: Анимация открытия кейса (1 секунда)
            const openingTimer = setTimeout(() => {
                setAnimationPhase('revealing');
            }, 1000);

            // ⭐ 5. Фаза 2: Показ результата (0.5 секунды)
            const revealTimer = setTimeout(() => {
                setShowResult(true);
                setAnimationPhase('complete');
            }, 1500);

            return () => {
                clearTimeout(openingTimer);
                clearTimeout(revealTimer);
            };
        }
    }, [isAnimating, result]);

    if (!isOpen) return null;

    const config = result ? rarityConfig[result.rarity] : rarityConfig.common;
    const icon = typeIcons[caseType as keyof typeof typeIcons] || '📦';

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-mc-bg-primary border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-mc-bg-secondary/50 to-mc-bg-tertiary/50"></div>

                {/* Close Button */}
                {!isAnimating && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-mc-text-secondary hover:text-mc-text-primary transition-colors z-10"
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
                )}

                <div className="relative z-10">
                    {/* ⭐ 5. Case Opening Animation */}
                    {isAnimating && (
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-mc-text-primary mb-8">
                                Открываем {caseName}
                            </h3>

                            {/* Animated Case */}
                            <div className="relative h-48 mb-8 flex items-center justify-center">
                                {animationPhase === 'opening' && (
                                    <div
                                        className={`w-32 h-32 bg-gradient-to-br ${config.gradient} rounded-xl animate-pulse ${config.glow} relative`}
                                    >
                                        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                                            <div className="text-6xl animate-bounce">{icon}</div>
                                        </div>

                                        {/* ⭐ 5. Particle Effects */}
                                        <div className="absolute inset-0">
                                            <div className="absolute top-2 left-2 w-2 h-2 bg-mc-accent-emerald rounded-full animate-ping"></div>
                                            <div className="absolute top-4 right-3 w-1 h-1 bg-mc-accent-purple rounded-full animate-pulse"></div>
                                            <div className="absolute bottom-3 left-4 w-3 h-3 bg-mc-rarity-legendary rounded-full animate-bounce"></div>
                                            <div
                                                className="absolute bottom-2 right-2 w-2 h-2 bg-mc-accent-blue rounded-full animate-ping"
                                                style={{ animationDelay: '0.5s' }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {animationPhase === 'revealing' && (
                                    <div className="animate-pulse">
                                        <div className="text-4xl text-mc-accent-emerald font-bold">
                                            ✨ Открываем... ✨
                                        </div>
                                    </div>
                                )}
                            </div>

                            {animationPhase === 'opening' && (
                                <div className="text-mc-text-secondary animate-pulse">
                                    Генерируем результат...
                                </div>
                            )}

                            {animationPhase === 'revealing' && (
                                <div className="text-mc-accent-emerald animate-pulse">
                                    Показываем результат...
                                </div>
                            )}
                        </div>
                    )}

                    {/* ⭐ 6. Result Display */}
                    {showResult && result && (
                        <div className="text-center animate-[fadeInUp_0.5s_ease-out]">
                            <h3 className="text-2xl font-bold text-mc-text-primary mb-2">
                                Поздравляем!
                            </h3>
                            <p className="text-mc-text-secondary mb-8">Вы получили:</p>

                            {/* ⭐ 6. Item Display */}
                            <div
                                className={`relative mb-8 p-6 bg-gradient-to-br ${config.gradient} rounded-xl ${config.glow}`}
                            >
                                <div className="bg-black/20 rounded-lg p-6 backdrop-blur-sm">
                                    {/* Item Icon */}
                                    <div className="text-6xl mb-4 animate-bounce">
                                        {result.icon || '📦'}
                                    </div>

                                    {/* Item Name */}
                                    <h4 className="text-2xl font-bold text-white mb-2">
                                        {result.name}
                                    </h4>

                                    {/* Rarity Badge */}
                                    <div
                                        className={`inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border ${config.badge} mb-4`}
                                    >
                                        {result.rarity}
                                    </div>

                                    {/* Item Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                        <div className="text-center">
                                            <div className="text-mc-text-secondary">
                                                Minecraft ID
                                            </div>
                                            <div className="text-white font-mono text-xs">
                                                {result.minecraftItem}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-mc-text-secondary">
                                                Цена продажи
                                            </div>
                                            <div className="text-mc-accent-emerald font-bold">
                                                {result.sellPrice} MC
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-mc-text-secondary text-sm">
                                        {result.description}
                                    </p>
                                </div>

                                {/* Glow Effect */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-30 blur-xl -z-10`}
                                ></div>
                            </div>

                            {/* ⭐ 6. Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={onClaim}
                                    className="flex-1"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <span>📦</span>
                                        Забрать в Minecraft
                                    </span>
                                </Button>

                                <Button
                                    variant="secondary"
                                    size="lg"
                                    onClick={onSell}
                                    className="flex-1"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <span>💰</span>
                                        Продать за {result.sellPrice} MC
                                    </span>
                                </Button>
                            </div>

                            <p className="text-xs text-mc-text-muted mt-4">
                                Предмет будет доставлен в ваш инвентарь при следующем входе в игру
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}