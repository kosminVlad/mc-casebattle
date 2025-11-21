'use client';

import { useState, useEffect } from 'react';
import { DropTableItem } from '../../types/case';
import { Button } from './Button';

interface CaseRollerModalProps {
  isOpen: boolean;
  caseName: string;
  caseType: string;
  dropTable: DropTableItem[];
  onClose: () => void;
  onClaim: (item: DropTableItem) => void;
  onSell: (item: DropTableItem) => void;
}

const rarityConfig = {
  common: {
    gradient: 'from-gray-500 to-gray-600',
    glow: 'shadow-lg shadow-gray-500/50',
    badge: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  },
  rare: {
    gradient: 'from-blue-500 to-blue-600',
    glow: 'shadow-lg shadow-blue-500/50',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  epic: {
    gradient: 'from-purple-500 to-purple-600',
    glow: 'shadow-lg shadow-purple-500/50',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  legendary: {
    gradient: 'from-yellow-500 to-orange-600',
    glow: 'shadow-lg shadow-yellow-500/50',
    badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  mythic: {
    gradient: 'from-pink-500 to-purple-600',
    glow: 'shadow-lg shadow-pink-500/50',
    badge: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  },
};

export function CaseRollerModal({
  isOpen,
  caseName,
  caseType,
  dropTable,
  onClose,
  onClaim,
  onSell,
}: CaseRollerModalProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shuffledItems, setShuffledItems] = useState<DropTableItem[]>([]);

  // ВАЖНО: Сбрасываем состояние при открытии/закрытии модала
  useEffect(() => {
    if (isOpen) {
      setIsRolling(false);
      setSelectedIndex(null);
      setTranslateX(0);
      setShowResult(false);
      setShuffledItems([]);
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

  const startRoll = () => {
    if (isRolling || dropTable.length === 0) return;

    setIsRolling(true);
    setShowResult(false);
    setSelectedIndex(null);
    setTranslateX(0);

    const itemWidth = 120; // ширина одного предмета в px (включая gap)
    const spins = 10; // количество полных циклов для долгого крутежа
    const finalIndex = Math.floor(Math.random() * dropTable.length);
    
    // Рассчитываем финальный сдвиг (влево)
    // Центр находится в позиции containerWidth/2, нам нужна позиция (containerWidth/2 - itemWidth/2)
    const totalDistance = spins * (itemWidth * dropTable.length) + finalIndex * itemWidth;

    // Запускаем анимацию
    const duration = 4000; // 4 секунды для более долгого эффекта
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic ease-out: плавное замедление
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setTranslateX(-easeOut * totalDistance);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Анимация завершена
        setSelectedIndex(finalIndex);
        setTimeout(() => {
          setShowResult(true);
          setIsRolling(false);
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  };

  if (!isOpen) return null;

  const resultItem = selectedIndex !== null ? dropTable[selectedIndex] : null;
  const resultConfig = resultItem ? rarityConfig[resultItem.rarity] : rarityConfig.common;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-3xl w-full mx-4 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>

        {/* Close Button */}
        {!isRolling && !showResult && (
          <button
            onClick={onClose}
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

          {!showResult ? (
            <div className="text-center">
              {/* Roller Container - Горизонтальный скролл СЛЕВА НАПРАВО */}
              <div className="mb-8 relative bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden py-4">
                {/* Center Indicator - вертикальная линия + стрелка вверх */}
                <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-emerald-400 z-20 pointer-events-none"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4 border-l-transparent border-r-transparent border-t-emerald-400 z-20 pointer-events-none"></div>

                {/* Items Roller - горизонтальное вращение */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform"
                    style={{
                      transform: `translateX(${translateX}px)`,
                      transitionDuration: isRolling ? '0s' : '0.3s',
                      transitionTimingFunction: 'ease-out',
                    }}
                  >
                    {/* Дублируем предметы 15 раз для долгого крутежа */}
                    {Array.from({ length: 15 }).flatMap(() =>
                      dropTable.map((item, idx) => (
                        <div
                          key={`${idx}-${Math.random()}`}
                          className="flex-shrink-0 w-28 h-32 flex items-center justify-center px-2 rounded-lg border border-slate-600 bg-slate-800/50 hover:bg-slate-800/70 transition-colors"
                        >
                          <div className="text-center">
                            <div className="text-4xl mb-2">{item.icon || '📦'}</div>
                            <div className="text-xs font-semibold text-white line-clamp-2 leading-tight">{item.name}</div>
                            <div className="text-xs text-slate-400 capitalize">{item.rarity}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Roll Button or Loading State */}
              {isRolling ? (
                <div className="text-center py-4">
                  <div className="animate-spin w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-slate-400 text-sm">🎲 Кручу... готовлю сюрприз...</p>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={startRoll}
                  className="w-full"
                >
                  🎲 Открыть кейс
                </Button>
              )}
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

              {/* Button to roll again or close */}
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  setShowResult(false);
                  setSelectedIndex(null);
                  setTranslateX(0);
                }}
                className="mt-4"
              >
                🎲 Открыть ещё один кейс
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
