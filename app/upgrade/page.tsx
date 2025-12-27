'use client';

import { useState, useEffect } from 'react';
import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { ChevronRight, Hammer, Sparkles, AlertCircle } from 'lucide-react';
import { UpgradeModal } from '../../components/ui/UpgradeModal';

interface InventoryItem {
  id: number;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  value: number;
}

interface UpgradeTarget {
  id: number;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  value: number;
  minecraftItem: string;
}

const rarityColors = {
  common: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
    border: 'border-gray-500/30',
    gradient: 'from-gray-500 to-gray-600',
    glow: 'shadow-glow-emerald',
  },
  rare: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    gradient: 'from-blue-500 to-blue-600',
    glow: 'shadow-glow-blue',
  },
  epic: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    gradient: 'from-purple-500 to-purple-600',
    glow: 'shadow-glow-purple',
  },
  legendary: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    gradient: 'from-yellow-500 to-orange-600',
    glow: 'shadow-glow-emerald',
  },
  mythic: {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
    gradient: 'from-pink-500 to-purple-600',
    glow: 'shadow-glow-purple',
  },
};

// Заглушка инвентаря
const mockInventory: InventoryItem[] = [
  { id: 1, name: 'Iron Sword', icon: '⚔️', rarity: 'common', value: 50 },
  { id: 2, name: 'Golden Apple', icon: '🍎', rarity: 'rare', value: 100 },
  { id: 3, name: 'Enchanted Book', icon: '📚', rarity: 'epic', value: 200 },
  { id: 4, name: 'Diamond Pickaxe', icon: '⛏️', rarity: 'rare', value: 150 },
  { id: 5, name: 'Potion of Strength', icon: '🧪', rarity: 'common', value: 75 },
  { id: 6, name: 'Ender Pearl', icon: '🔮', rarity: 'rare', value: 120 },
  { id: 7, name: 'TNT Block', icon: '💣', rarity: 'common', value: 60 },
  { id: 8, name: 'Shield', icon: '🛡️', rarity: 'epic', value: 180 },
  { id: 9, name: 'Bow', icon: '🏹', rarity: 'common', value: 80 },
  { id: 10, name: 'Emerald', icon: '💎', rarity: 'rare', value: 110 },
];

// Заглушка целевых предметов для апгрейда
const mockTargets: UpgradeTarget[] = [
  { id: 101, name: 'Enchanted Diamond Sword', icon: '⚔️', rarity: 'legendary', value: 500, minecraftItem: 'diamond_sword' },
  { id: 102, name: 'Netherite Pickaxe', icon: '⛏️', rarity: 'mythic', value: 800, minecraftItem: 'netherite_pickaxe' },
  { id: 103, name: 'Elytra Wings', icon: '🪽', rarity: 'legendary', value: 600, minecraftItem: 'elytra' },
  { id: 104, name: 'Totem of Undying', icon: '🗿', rarity: 'mythic', value: 900, minecraftItem: 'totem_of_undying' },
  { id: 105, name: 'Dragon Egg', icon: '🥚', rarity: 'mythic', value: 1000, minecraftItem: 'dragon_egg' },
  { id: 106, name: 'Enchanted Golden Apple', icon: '🍏', rarity: 'legendary', value: 450, minecraftItem: 'golden_apple' },
  { id: 107, name: 'Trident', icon: '🔱', rarity: 'legendary', value: 550, minecraftItem: 'trident' },
  { id: 108, name: 'Beacon', icon: '💠', rarity: 'epic', value: 350, minecraftItem: 'beacon' },
];

const MAX_SELECTED_ITEMS = 6;

export default function UpgradePage() {
  const [balance, setBalance] = useState(1250);
  const [isConnected, setIsConnected] = useState(true);
  const [username] = useState('Steve_2024');
  const [isVisible, setIsVisible] = useState(false);

  const [inventory] = useState<InventoryItem[]>(mockInventory);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      if (selectedItems.length >= MAX_SELECTED_ITEMS) {
        return; // Достигнут лимит
      }
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectTarget = (id: number) => {
    setSelectedTarget(selectedTarget === id ? null : id);
  };

  const calculateTotalValue = () => {
    return selectedItems.reduce((sum, id) => {
      const item = inventory.find((i) => i.id === id);
      return sum + (item?.value || 0);
    }, 0);
  };

  const calculateSuccessChance = () => {
    const totalValue = calculateTotalValue();
    const target = mockTargets.find((t) => t.id === selectedTarget);
    if (!target || totalValue === 0) return 0;

    const rawChance = (totalValue / target.value) * 100;
    return Math.min(Math.max(rawChance, 0.1), 75);
  };

  const canUpgrade = selectedItems.length > 0 && selectedTarget !== null;
  const totalValue = calculateTotalValue();
  const successChance = calculateSuccessChance();
  const targetItem = mockTargets.find((t) => t.id === selectedTarget);

  const handleStartUpgrade = () => {
    if (!canUpgrade) return;
    setShowUpgradeModal(true);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-slate-900">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(42, 240, 140, 0.08) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(42, 240, 140, 0.08) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <Header
          balance={balance}
          username={username}
          isConnected={isConnected}
          onConnect={() => setIsConnected(true)}
        />

        {/* Hero Section */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <Hammer size={48} className="text-yellow-400" />
                <h1 className="text-5xl font-bold">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Кузница Апгрейдов
                  </span>
                </h1>
                <Sparkles size={48} className="text-yellow-400" />
              </div>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                Объедини свои предметы и попытайся выковать что-то более ценное! Чем больше вложишь, тем выше шанс успеха.
              </p>
            </div>

            {/* Main Upgrade Interface */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              {/* Left: Selected Items from Inventory */}
              <div className="glass-effect rounded-xl p-6 border border-white/10 h-[500px] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>📦</span> Выбрано предметов
                  </h3>
                  <span className="text-sm text-slate-400">
                    {selectedItems.length}/{MAX_SELECTED_ITEMS}
                  </span>
                </div>

                {selectedItems.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-center text-slate-500">
                    <div>
                      <p className="mb-2">Выберите предметы из инвентаря слева</p>
                      <p className="text-xs">(максимум {MAX_SELECTED_ITEMS})</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    {/* Grid для предметов */}
                    <div className={`flex-1 grid gap-3 mb-4 ${
                      selectedItems.length === 1 ? 'grid-cols-1' :
                      selectedItems.length === 2 ? 'grid-cols-2' :
                      selectedItems.length <= 4 ? 'grid-cols-2' :
                      'grid-cols-3'
                    }`}>
                      {selectedItems.map((id) => {
                        const item = inventory.find((i) => i.id === id);
                        if (!item) return null;
                        const colors = rarityColors[item.rarity];
                        
                        return (
                          <div
                            key={id}
                            className={`p-3 rounded-lg border backdrop-blur-sm ${colors.bg} ${colors.border} transition-all duration-300 flex flex-col items-center justify-center text-center`}
                          >
                            <div className={`mb-2 ${
                              selectedItems.length === 1 ? 'text-6xl' :
                              selectedItems.length === 2 ? 'text-5xl' :
                              selectedItems.length <= 4 ? 'text-4xl' :
                              'text-3xl'
                            }`}>
                              {item.icon}
                            </div>
                            <div className={`font-semibold text-white mb-1 truncate w-full ${
                              selectedItems.length <= 2 ? 'text-sm' : 'text-xs'
                            }`}>
                              {item.name}
                            </div>
                            <div className={`text-xs ${colors.text} mb-1`}>{item.rarity}</div>
                            <div className="text-emerald-400 font-bold text-xs">{item.value} MC</div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Total Value */}
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Общая стоимость:</span>
                        <span className="text-emerald-400 font-bold text-xl">{totalValue} MC</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Center: Circular Progress with Upgrade Button */}
              <div className="glass-effect rounded-xl p-6 border border-white/10 h-[500px] flex flex-col items-center justify-center">
                {/* Круговой индикатор шанса */}
                <div className="relative mb-8">
                  <svg className="w-48 h-48 transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="rgb(51, 65, 85)"
                      strokeWidth="12"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      strokeDashoffset={`${2 * Math.PI * 88 * (1 - successChance / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={successChance >= 50 ? '#34d399' : successChance >= 25 ? '#fbbf24' : '#ef4444'} />
                        <stop offset="100%" stopColor={successChance >= 50 ? '#3b82f6' : successChance >= 25 ? '#f97316' : '#dc2626'} />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center animate-float shadow-lg shadow-yellow-500/50">
                      <Hammer size={56} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-20 blur-2xl -z-10"></div>
                </div>

                {/* Success Chance Display */}
                <div className="text-center mb-6">
                  <div className="text-slate-400 text-sm mb-1">Шанс успеха</div>
                  <div className={`text-5xl font-bold mb-2 ${
                    successChance >= 50 ? 'text-emerald-400' : 
                    successChance >= 25 ? 'text-yellow-400' : 
                    successChance > 0 ? 'text-red-400' : 
                    'text-slate-600'
                  }`}>
                    {successChance > 0 ? `${successChance.toFixed(1)}%` : '—'}
                  </div>
                  {successChance > 0 && successChance < 25 && (
                    <div className="flex items-center justify-center gap-1 text-red-400 text-xs">
                      <AlertCircle size={14} />
                      <span>Очень низкий шанс!</span>
                    </div>
                  )}
                </div>

                {/* Upgrade Button */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-lg shadow-yellow-500/30"
                  onClick={handleStartUpgrade}
                  disabled={!canUpgrade}
                >
                  {!canUpgrade ? (
                    'Выберите предметы'
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Hammer size={20} />
                      Начать апгрейд
                    </span>
                  )}
                </Button>

                {targetItem && (
                  <div className="mt-4 text-center text-xs text-slate-400">
                    Попытка получить: <span className="text-yellow-400 font-semibold">{targetItem.name}</span>
                  </div>
                )}
              </div>

              {/* Right: Selected Target */}
              <div className="glass-effect rounded-xl p-6 border border-white/10 h-[500px] flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🎯</span> Целевой предмет
                </h3>
                {selectedTarget ? (
                  <div className="flex-1 flex flex-col justify-center">
                    {(() => {
                      const item = mockTargets.find((t) => t.id === selectedTarget);
                      if (!item) return null;
                      const colors = rarityColors[item.rarity];
                      return (
                        <>
                          <div className={`p-6 rounded-lg border backdrop-blur-sm mb-4 ${colors.bg} ${colors.border}`}>
                            <div className="text-center mb-4">
                              <div className="text-7xl mb-3">{item.icon}</div>
                              <div className="font-bold text-white text-xl mb-2">{item.name}</div>
                              <div className={`text-sm ${colors.text} uppercase mb-3`}>{item.rarity}</div>
                              <div className="text-emerald-400 font-bold text-2xl mb-2">{item.value} MC</div>
                            </div>
                            <div className="text-xs text-slate-400 text-center font-mono bg-slate-800/50 px-3 py-2 rounded">
                              {item.minecraftItem}
                            </div>
                          </div>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full"
                            onClick={() => setSelectedTarget(null)}
                          >
                            Выбрать другой
                          </Button>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center text-slate-500">
                    <p>Выберите целевой предмет справа</p>
                  </div>
                )}
              </div>
            </div>

            {/* Inventory and Available Targets - Side by Side */}
       <div className={`grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-36 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              {/* Left: Inventory Section */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                    Ваш инвентарь
                  </span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {inventory.map((item) => {
                    const colors = rarityColors[item.rarity];
                    const isSelected = selectedItems.includes(item.id);
                    const isDisabled = !isSelected && selectedItems.length >= MAX_SELECTED_ITEMS;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectItem(item.id)}
                        disabled={isDisabled}
                        className={`p-4 rounded-lg border backdrop-blur-sm transition-all hover:scale-105 ${
                          isSelected
                            ? `bg-gradient-to-br ${colors.gradient} ${colors.glow} ring-2 ring-emerald-400`
                            : isDisabled
                              ? 'bg-slate-800/30 border-slate-700/50 opacity-50 cursor-not-allowed'
                              : `bg-gradient-to-br ${colors.gradient} opacity-60 hover:opacity-80 border-slate-700`
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">{item.icon}</div>
                          <div className="text-sm font-semibold text-white mb-1 truncate">{item.name}</div>
                          <div className={`text-xs ${colors.text} mb-2 uppercase`}>{item.rarity}</div>
                          <div className="text-emerald-400 font-bold text-sm">{item.value} MC</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Available Targets Section */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Доступные апгрейды
                  </span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockTargets.map((target) => {
                    const colors = rarityColors[target.rarity];
                    const isSelected = selectedTarget === target.id;
                    return (
                      <button
                        key={target.id}
                        onClick={() => handleSelectTarget(target.id)}
                        className={`p-4 rounded-lg border backdrop-blur-sm transition-all hover:scale-105 ${
                          isSelected
                            ? `bg-gradient-to-br ${colors.gradient} ${colors.glow} ring-2 ring-yellow-400`
                            : `bg-gradient-to-br ${colors.gradient} opacity-60 hover:opacity-80 border-slate-700`
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">{target.icon}</div>
                          <h4 className="font-bold text-white mb-1 text-sm truncate">{target.name}</h4>
                          <div className={`text-xs ${colors.text} mb-2 uppercase`}>{target.rarity}</div>
                          <div className="text-emerald-400 font-bold text-sm">{target.value} MC</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Upgrade Modal with Animation */}
      {showUpgradeModal && targetItem && (
        <UpgradeModal
          isOpen={showUpgradeModal}
          selectedItems={selectedItems.map(id => {
            const item = inventory.find(i => i.id === id);
            return item ? { id: item.id, name: item.name, icon: item.icon, value: item.value } : { id: 0, name: '', icon: '', value: 0 };
          }).filter(item => item.id !== 0)}
          targetItem={{
            id: targetItem.id,
            name: targetItem.name,
            icon: targetItem.icon,
            rarity: targetItem.rarity,
            value: targetItem.value,
          }}
          successChance={successChance}
          onClose={() => {
            setShowUpgradeModal(false);
            setSelectedItems([]);
            setSelectedTarget(null);
          }}
          onSuccess={() => {
            console.log('Upgrade successful!');
            // TODO: Добавить предмет в инвентарь, удалить использованные предметы
          }}
          onFailure={() => {
            console.log('Upgrade failed!');
            // TODO: Удалить использованные предметы из инвентаря
          }}
        />
      )}
    </div>
  );
}