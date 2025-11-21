'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { DropTableItem } from '../../types/case';
import { Button } from './Button';

interface CaseRollerModalProps {
  isOpen: boolean;
  caseName: string;
  caseType: string;
  price: number;
  balance: number;
  dropTable: DropTableItem[];
  resultItem: DropTableItem | null;
  isResultPending?: boolean;
  onClose: () => void;
  onClaim: (item: DropTableItem) => void;
  onSell: (item: DropTableItem) => void;
  onRollAgain?: () => Promise<boolean> | boolean;
}

const rarityConfig = {
  common: {
    gradient: 'from-gray-500 to-gray-600',
    glow: 'shadow-lg shadow-gray-500/50',
    badge: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    border: 'border-gray-500/50',
  },
  rare: {
    gradient: 'from-blue-500 to-blue-600',
    glow: 'shadow-lg shadow-blue-500/50',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    border: 'border-blue-500/50',
  },
  epic: {
    gradient: 'from-purple-500 to-purple-600',
    glow: 'shadow-lg shadow-purple-500/50',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    border: 'border-purple-500/50',
  },
  legendary: {
    gradient: 'from-yellow-500 to-orange-600',
    glow: 'shadow-lg shadow-yellow-500/50',
    badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    border: 'border-yellow-500/50',
  },
  mythic: {
    gradient: 'from-pink-500 to-purple-600',
    glow: 'shadow-lg shadow-pink-500/50',
    badge: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    border: 'border-pink-500/50',
  },
};

export function CaseRollerModal({
  isOpen,
  caseName,
  caseType,
  price,
  balance,
  dropTable,
  resultItem: resolvedResult,
  isResultPending = false,
  onClose,
  onClaim,
  onSell,
  onRollAgain,
}: CaseRollerModalProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [rollerItems, setRollerItems] = useState<DropTableItem[]>([]);
  const [winningItem, setWinningItem] = useState<DropTableItem | null>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(142);

  const registerItemRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    if (typeof window === 'undefined') return;
    const rect = el.getBoundingClientRect();
    const styles = window.getComputedStyle(el);
    const totalWidth = rect.width + parseFloat(styles.marginLeft || '0') + parseFloat(styles.marginRight || '0');
    if (!Number.isNaN(totalWidth) && totalWidth > 0) {
      setItemWidth(totalWidth);
    }
  }, []);

  // ВАЖНО: Сбрасываем состояние при открытии/закрытии модала
  useEffect(() => {
    if (isOpen) {
      setIsRolling(false);
      setTranslateX(0);
      setShowResult(false);
      setRollerItems([]);
      setWinningItem(null);
    }
  }, [isOpen]);

  // Функция для рандомизации массива
  const shuffleArray = (array: DropTableItem[]): DropTableItem[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getWeightedRandomItem = () => {
    const total = dropTable.reduce((acc, item) => acc + item.probability, 0);
    const threshold = Math.random() * total;
    let cumulative = 0;

    for (const item of dropTable) {
      cumulative += item.probability;
      if (threshold <= cumulative) {
        return item;
      }
    }
    return dropTable[dropTable.length - 1];
  };

  const buildSequence = (finalItem: DropTableItem) => {
    const ensureLength = (len: number) => {
      const bucket: DropTableItem[] = [];
      while (bucket.length < len) {
        bucket.push(...shuffleArray(dropTable));
      }
      return bucket.slice(0, len);
    };

    const LEAD = 25;
    const BASE = 70;
    const TRAIL = 25;

    const leadItems = ensureLength(LEAD);
    const baseItems = ensureLength(BASE);
    const trailItems = ensureLength(TRAIL);

    const finalBaseIndex = Math.max(10, BASE - TRAIL - 1);
    baseItems[finalBaseIndex] = finalItem;

    const sequence = [...leadItems, ...baseItems, ...trailItems];
    const absoluteIndex = leadItems.length + finalBaseIndex;

    return { sequence, absoluteIndex };
  };

  const resetRollerState = () => {
    setShowResult(false);
    setRollerItems([]);
    setWinningItem(null);
    setTranslateX(0);
    setIsRolling(false);
  };

  const startRoll = () => {
    if (isRolling || dropTable.length === 0 || showResult) return;
    if (!resolvedResult) return;

    const container = rollerRef.current;
    if (!container) return;

    setIsRolling(true);
    setShowResult(false);
    setWinningItem(null);
    setTranslateX(0);

    const ITEM_WIDTH = Math.max(itemWidth, 1);

    const finalItem = resolvedResult || getWeightedRandomItem();
    const { sequence, absoluteIndex } = buildSequence(finalItem);

    setRollerItems(sequence);
    setWinningItem(finalItem);

    const centerOffset = container.offsetWidth / 2 - ITEM_WIDTH / 2;
    const targetTranslate = -(absoluteIndex * ITEM_WIDTH - centerOffset);
    const startTranslate = 0;
    setTranslateX(startTranslate);

    const duration = 4500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentTranslate = startTranslate + easeOut * (targetTranslate - startTranslate);
      setTranslateX(currentTranslate);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTranslateX(targetTranslate);
        setTimeout(() => {
          setShowResult(true);
          setIsRolling(false);
        }, 400);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleRollAgainClick = async () => {
    if (isRolling || isResultPending || balance < price) return;
    if (!onRollAgain) return;

    const result = await onRollAgain();
    if (result) {
      resetRollerState();
    }
  };

  const handleCloseAfterResult = () => {
    if (isRolling || !showResult) return;
    resetRollerState();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    if (!resolvedResult) return;
    if (isRolling || showResult) return;
    startRoll();
  }, [isOpen, resolvedResult, isRolling, showResult]);

  const resultItem = winningItem;
  const resultConfig = resultItem ? rarityConfig[resultItem.rarity] : rarityConfig.common;

  const idleItems = useMemo(() => {
    if (rollerItems.length) return rollerItems;
    return Array.from({ length: dropTable.length * 3 }).map((_, idx) => dropTable[idx % dropTable.length]);
  }, [dropTable, rollerItems]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleCloseAfterResult}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-3xl w-full mx-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>

        {/* Close Button */}
        {!isRolling && showResult && (
          <button
            onClick={handleCloseAfterResult}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            Открытие кейса: <span className="text-emerald-400">{caseName}</span>
          </h2>

          <div className="flex sm:justify-end mb-6 text-sm">
            <div className="glass-effect px-4 py-2 rounded-lg border border-slate-700 text-slate-300">
              Баланс: <span className="text-emerald-400 font-semibold">{balance.toLocaleString()} MC</span>
            </div>
          </div>

          {!showResult ? (
            <div className="text-center">
              {/* Roller Container - Горизонтальный скролл СЛЕВА НАПРАВО */}
              <div className="mb-8 relative bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden py-5">
                {/* Center Indicator - вертикальная линия + стрелка вверх */}
                <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-emerald-400 z-20 pointer-events-none"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4 border-l-transparent border-r-transparent border-t-emerald-400 z-20 pointer-events-none"></div>

                {/* Items Roller - горизонтальное вращение */}
                <div className="overflow-hidden" ref={rollerRef}>
                  <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{
                      transform: `translate3d(${translateX}px, 0, 0)`,
                    }}
                  >
                    {idleItems.map((item, idx) => {
                      const config = rarityConfig[item.rarity as keyof typeof rarityConfig] || rarityConfig.common;
                      return (
                        <div
                          key={`${item.id}-${idx}`}
                          className={`flex-shrink-0 w-32 h-36 flex items-center justify-center px-3 mx-[6px] rounded-xl border bg-slate-800/60 ${config.border}`}
                          ref={idx === 0 ? registerItemRef : undefined}
                        >
                          <div className="text-center space-y-1">
                            <div className="text-4xl">{item.icon || '📦'}</div>
                            <div className="text-sm font-semibold text-white truncate w-24 mx-auto">{item.name}</div>
                            <div className="text-[10px] uppercase tracking-wide text-slate-400">{item.rarity}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Roll Button or Loading State */}
              <div className="text-center py-4">
                <div className="animate-spin w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-slate-400 text-sm">
                  {isResultPending || !resolvedResult
                    ? 'Готовим награду...'
                    : isRolling
                      ? 'Запускаем рулетку...'
                      : 'Почти готово'}
                </p>
              </div>
            </div>
          ) : resultItem ? (
            <div className="text-center animate-[fadeInUp_0.5s_ease-out]">
              <h3 className="text-2xl font-bold text-white mb-6">🎉 Поздравляем!</h3>

              {/* Result Item Display */}
              <div
                className={`relative mb-8 p-8 bg-gradient-to-br ${resultConfig.gradient} rounded-xl ${resultConfig.glow}`}
              >
                <div className="bg-slate-900/80 rounded-lg p-8 backdrop-blur-sm">
                  {/* Item Icon */}
                  <div className="text-8xl mb-4 animate-bounce">{resultItem.icon || '📦'}</div>

                  {/* Item Name */}
                  <h4 className="text-3xl font-bold text-white mb-2">{resultItem.name}</h4>

                  {/* Rarity Badge */}
                  <div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border ${resultConfig.badge} mb-4`}
                  >
                    {resultItem.rarity}
                  </div>

                  {/* Item Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="text-slate-400">ID предмета</div>
                      <div className="text-white font-mono text-xs">{resultItem.minecraftItem}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-400">Цена продажи</div>
                      <div className="text-emerald-400 font-bold">{resultItem.sellPrice} MC</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm">{resultItem.description}</p>
                </div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${resultConfig.gradient} opacity-20 blur-xl -z-10`}
                ></div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onClaim(resultItem)}
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
                  onClick={() => onSell(resultItem)}
                  className="flex-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>💰</span>
                    Продать за {resultItem.sellPrice} MC
                  </span>
                </Button>
              </div>

              <p className="text-xs text-slate-500 mt-4">
                Предмет будет доставлен в ваш инвентарь при следующем входе в игру
              </p>

              {/* Button to roll again */}
              <Button
                variant="ghost"
                size="md"
                onClick={handleRollAgainClick}
                disabled={isResultPending || balance < price}
                className="mt-4"
              >
                {balance < price
                  ? 'Недостаточно MC-Coins'
                  : `🎲 Открыть ещё за ${price.toLocaleString()} MC`}
              </Button>
            </div>
          ) : null}
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
