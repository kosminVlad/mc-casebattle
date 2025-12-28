
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

type AnimationPhase = 'idle' | 'spinning' | 'result';

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
  const [circleRotation, setCircleRotation] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPhase('idle');
      setCircleRotation(0);
      return;
    }

    startUpgradeAnimation();
  }, [isOpen]);

  const startUpgradeAnimation = async () => {
    // Определяем результат заранее
    const success = Math.random() * 100 < successChance;
    setIsSuccess(success);

    // Фаза: Кручение круга
    setPhase('spinning');
    
    // ВАЖНО: Зелёная зона начинается с 0° (вверху где стрелка) и идёт ПО ЧАСОВОЙ стрелке
    const greenZoneDegrees = (successChance / 100) * 360;
    
    let finalAngle: number;
    if (success) {
      // Попадаем в зелёную зону: от 0° до greenZoneDegrees
      // Стрелка указывает вверх (на 0°), поэтому финальный угол должен привести зелёную зону под стрелку
      finalAngle = Math.random() * greenZoneDegrees;
    } else {
      // Попадаем в красную зону: от greenZoneDegrees до 360°
      finalAngle = greenZoneDegrees + Math.random() * (360 - greenZoneDegrees);
    }

    // Добавляем несколько полных оборотов (5-7)
    const fullRotations = 5 + Math.random() * 2;
    
    // ИСПРАВЛЕНИЕ: круг должен остановиться так, чтобы нужная точка была вверху (под стрелкой)
    // Поэтому вычитаем finalAngle из totalRotation (круг крутится назад, чтобы нужная точка оказалась вверху)
    const totalRotation = fullRotations * 360 - finalAngle;

    // Анимация вращения с более плавным замедлением
    const duration = 5000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Более плавное замедление (quartic ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentRotation = easeOut * totalRotation;
      
      setCircleRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Фиксируем финальную позицию без дополнительных движений
        setCircleRotation(totalRotation);
        
        // Завершение анимации
        setTimeout(() => {
          setPhase('result');
          if (success) {
            onSuccess();
          } else {
            onFailure();
          }
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  };

  if (!isOpen) return null;

  const rarityColors = {
  common: 'from-gray-500 to-gray-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-500 to-orange-600',
  mythic: 'from-pink-500 to-purple-600',
};

  const gradient = rarityColors[targetItem.rarity as keyof typeof rarityColors] || rarityColors.common;
  const greenZoneDegrees = (successChance / 100) * 360;

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
          
          {/* Фаза: Вращение круга с прогрессом */}
          {phase === 'spinning' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-8">
                Испытываем удачу...
              </h3>

              {/* Круг с прогрессом */}
              <div className="relative mb-8 flex justify-center">
                <div className="relative w-80 h-80">
                  
                  {/* Вращающийся круг с прогрессом */}
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      transform: `rotate(${circleRotation}deg)`,
                      transition: 'none', // Убираем CSS transition для более точного контроля
                    }}
                  >
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Фоновый круг (серый) */}
                      <circle
                        cx="160"
                        cy="160"
                        r="140"
                        stroke="rgb(71, 85, 105)"
                        strokeWidth="24"
                        fill="none"
                      />
                      
                      {/* Прогресс круг - зелёная зона (успех) */}
                      <circle
                        cx="160"
                        cy="160"
                        r="140"
                        stroke="url(#successGradient)"
                        strokeWidth="24"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 140}`}
                        strokeDashoffset={`${2 * Math.PI * 140 * (1 - successChance / 100)}`}
                        strokeLinecap="round"
                      />

                      {/* Градиенты */}
                      <defs>
                        <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Неподвижная стрелка в центре (указывает ВВЕРХ на круг) */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-20">
                    {/* Чёткий треугольный указатель */}
                    <div className="relative">
                      {/* Основной треугольник стрелки */}
                      <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[40px] border-b-yellow-400 drop-shadow-lg"></div>
                      
                      {/* Обводка для контраста */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[26px] border-l-transparent border-r-[26px] border-r-transparent border-b-[43px] border-b-yellow-600 -z-10"></div>
                      
                      {/* Белая точка на кончике для максимальной точности */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-3 h-3 bg-white rounded-full border-2 border-yellow-600"></div>
                    </div>
                  </div>

                  {/* Внешнее свечение */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl -z-10"></div>
                </div>
              </div>

              {/* Информация */}
              <p className="text-slate-400 text-sm mb-4">
                Если стрелка остановится на <span className="text-emerald-400 font-bold">зелёной зоне</span> — успех!
              </p>
              <p className="text-slate-400 text-sm mb-4">
                Шанс успеха: <span className="text-yellow-400 font-bold">{successChance.toFixed(1)}%</span>
              </p>
              
              {/* Легенда */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full border-2 border-emerald-700"></div>
                  <span className="text-slate-400">Зона успеха ({successChance.toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full border-2 border-slate-800"></div>
                  <span className="text-slate-400">Зона провала ({(100 - successChance).toFixed(0)}%)</span>
                </div>
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