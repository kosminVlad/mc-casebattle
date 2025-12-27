'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';
import { Sparkles, X } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  selectedItems: Array<{ id: number; name: string; icon: string; value: number }>;
  targetItem: { id: number; name: string; icon: string; rarity: string; value: number };
  successChance: number;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: () => void;
}

type AnimationPhase = 'idle' | 'forging' | 'result';

export function UpgradeModal({
  isOpen,
  selectedItems,
  targetItem,
  successChance,
  onClose,
  onSuccess,
  onFailure,
}: UpgradeModalProps) {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [isSuccess, setIsSuccess] = useState(false);
  const [hammerDown, setHammerDown] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentHit, setCurrentHit] = useState(0);
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (!isOpen) {
      setPhase('idle');
      setProgress(0);
      setCurrentHit(0);
      setSparks([]);
      return;
    }

    startUpgradeAnimation();
  }, [isOpen]);

  const generateSparks = () => {
    const newSparks = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 600);
  };

  const startUpgradeAnimation = async () => {
    // Определяем результат заранее
    const success = Math.random() * 100 < successChance;
    setIsSuccess(success);

    // Фаза: Ковка (количество ударов зависит от шанса)
    setPhase('forging');
    
    // Чем выше шанс, тем меньше ударов нужно (от 3 до 8)
    const totalHits = Math.max(3, Math.min(8, Math.ceil(10 - (successChance / 100) * 7)));
    
    // Анимация ударов
    for (let hit = 1; hit <= totalHits; hit++) {
      setCurrentHit(hit);
      
      // Молот вниз
      setHammerDown(true);
      await sleep(150);
      
      // Удар - искры и прогресс
      generateSparks();
      setProgress((hit / totalHits) * 100);
      await sleep(100);
      
      // Молот вверх
      setHammerDown(false);
      await sleep(400);
    }

    // Финальная пауза перед результатом
    await sleep(800);

    // Показываем результат
    setPhase('result');
    if (success) {
      onSuccess();
    } else {
      onFailure();
    }
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  if (!isOpen) return null;

  const rarityColors = {
  common: 'from-gray-500 to-gray-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-500 to-orange-600',
  mythic: 'from-pink-500 to-purple-600',
};

  const gradient = rarityColors[targetItem.rarity as keyof typeof rarityColors] || rarityColors.common;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-2xl w-full relative overflow-hidden">
        
        {/* Close button (только в result) */}
        {phase === 'result' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20"
          >
            <X size={24} />
          </button>
        )}

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>

        <div className="relative z-10">
          
          {/* Фаза: Ковка с ударами молота */}
          {phase === 'forging' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Кузнец куёт предмет...
              </h3>
              <p className="text-slate-400 text-sm mb-8">
                Удар {currentHit} из {Math.max(3, Math.min(8, Math.ceil(10 - (successChance / 100) * 7)))}
              </p>

              {/* Наковальня с молотом */}
              <div className={`relative mb-8 flex justify-center transition-all duration-100 ${hammerDown ? 'scale-105' : 'scale-100'}`}>
                <div className="relative">
                  {/* Наковальня (пиксельная) */}
                  <div className="w-64 h-40 bg-gradient-to-br from-gray-600 to-gray-800 relative">
                    {/* Верхняя часть наковальни */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-12 bg-gradient-to-b from-gray-500 to-gray-600 border-4 border-gray-700"></div>
                    {/* Средняя часть */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-b from-gray-600 to-gray-700 border-4 border-gray-800"></div>
                    {/* Нижняя часть (основание) */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-12 bg-gradient-to-b from-gray-700 to-gray-900 border-4 border-black"></div>
                    
                    {/* Предметы на наковальне */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {selectedItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="text-3xl opacity-70">
                          {item.icon}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Молот (пиксельный) */}
                  <div 
                    className={`absolute -top-20 left-1/2 transform -translate-x-1/2 transition-all duration-150 ${
                      hammerDown ? 'translate-y-16' : 'translate-y-0'
                    }`}
                  >
                    <div className="relative w-16 h-24">
                      {/* Ручка молота */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-20 bg-gradient-to-b from-amber-700 to-amber-900 border-2 border-amber-950"></div>
                      {/* Головка молота */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-10 bg-gradient-to-b from-gray-400 to-gray-600 border-2 border-gray-700"></div>
                      {/* Металлический блеск */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-white opacity-50"></div>
                    </div>
                  </div>

                  {/* Искры при ударе */}
                  {sparks.map((spark) => (
                    <div
                      key={spark.id}
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-[sparkFly_0.6s_ease-out]"
                      style={{
                        '--tx': `${spark.x}px`,
                        '--ty': `${spark.y}px`,
                      } as React.CSSProperties}
                    ></div>
                  ))}

                  {/* Свечение при ударе */}
                  {hammerDown && (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 opacity-40 blur-2xl animate-pulse"></div>
                  )}
                </div>
              </div>

              {/* Прогресс-бар ковки */}
              <div className="mb-6 max-w-md mx-auto">
                <div className="bg-slate-800 rounded-lg h-8 overflow-hidden border-4 border-slate-700 relative">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 transition-all duration-300 relative"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Анимированные искры в прогресс-баре */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-yellow-400 font-bold text-lg mt-2">
                  {Math.round(progress)}%
                </p>
              </div>

              {/* Информация о шансе */}
              <div className="text-sm text-slate-400">
                Шанс успеха: <span className="text-yellow-400 font-bold">{successChance.toFixed(1)}%</span>
              </div>
            </div>
          )}

          {/* Фаза: Результат */}
          {phase === 'result' && (
            <div className="text-center animate-[fadeInScale_0.5s_ease-out]">
              {isSuccess ? (
                <>
                  {/* Успех */}
                  <div className="mb-6">
                    <div className="text-6xl mb-4 animate-bounce">✨</div>
                    <h3 className="text-3xl font-bold text-emerald-400 mb-2">
                      Успех!
                    </h3>
                    <p className="text-slate-400">Вы выковали новый предмет!</p>
                  </div>

                  {/* Конфетти эффект */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-[confetti_2s_ease-out]"
                        style={{
                          left: '50%',
                          top: '30%',
                          animationDelay: `${Math.random() * 0.5}s`,
                          '--tx': `${(Math.random() - 0.5) * 600}px`,
                          '--ty': `${Math.random() * 400 + 100}px`,
                        } as React.CSSProperties}
                      ></div>
                    ))}
                  </div>

                  {/* Новый предмет */}
                  <div className={`relative p-8 bg-gradient-to-br ${gradient} rounded-xl shadow-2xl mb-8`}>
                    <div className="bg-slate-900/80 rounded-lg p-8 backdrop-blur-sm">
                      <div className="text-8xl mb-4 animate-[scaleIn_0.5s_ease-out]">
                        {targetItem.icon}
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {targetItem.name}
                      </h4>
                      <div className="text-sm text-slate-400 uppercase mb-2">{targetItem.rarity}</div>
                      <div className="text-emerald-400 font-bold text-xl">
                        {targetItem.value} MC
                      </div>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 blur-xl -z-10`}></div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg shadow-emerald-500/30"
                    onClick={onClose}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles size={20} />
                      Забрать предмет
                    </span>
                  </Button>
                </>
              ) : (
                <>
                  {/* Провал */}
                  <div className="mb-6">
                    <div className="text-6xl mb-4 animate-[shake_0.5s_ease-out]">💥</div>
                    <h3 className="text-3xl font-bold text-red-400 mb-2">
                      Провал...
                    </h3>
                    <p className="text-slate-400">Предметы были уничтожены в процессе апгрейда</p>
                  </div>

                  {/* Дым/пепел */}
                  <div className="relative mb-8 p-8 bg-slate-800/50 rounded-xl border border-red-500/30">
                    <div className="text-8xl opacity-30 animate-[fadeOut_1s_ease-out]">
                      💨
                    </div>
                    <p className="text-red-400 text-sm mt-4">
                      Потеряно: {selectedItems.reduce((sum, item) => sum + item.value, 0)} MC
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={onClose}
                  >
                    Попробовать снова
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes confetti {
          0% { 
            opacity: 1; 
            transform: translate(0, 0) rotate(0deg); 
          }
          100% { 
            opacity: 0; 
            transform: translate(var(--tx), var(--ty)) rotate(720deg); 
          }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes fadeOut {
          from { opacity: 0.3; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}