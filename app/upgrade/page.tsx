'use client';

import { useState, useEffect } from 'react';
import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { ChevronRight, Hammer, Sparkles, AlertCircle, Filter, ArrowUpDown, X, CheckCircle2 } from 'lucide-react';
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
    hoverBorder: 'hover:border-gray-500/50',
  },
  rare: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    gradient: 'from-blue-500 to-blue-600',
    glow: 'shadow-glow-blue',
    hoverBorder: 'hover:border-blue-500/50',
  },
  epic: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    gradient: 'from-purple-500 to-purple-600',
    glow: 'shadow-glow-purple',
    hoverBorder: 'hover:border-purple-500/50',
  },
  legendary: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    gradient: 'from-yellow-500 to-orange-600',
    glow: 'shadow-glow-emerald',
    hoverBorder: 'hover:border-yellow-500/50',
  },
  mythic: {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
    gradient: 'from-pink-500 to-purple-600',
    glow: 'shadow-glow-purple',
    hoverBorder: 'hover:border-pink-500/50',
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
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);
  const [upgradeResult, setUpgradeResult] = useState<'success' | 'failed' | null>(null);
  
  // Фильтры для инвентаря
  const [inventorySort, setInventorySort] = useState<'none' | 'price-asc' | 'price-desc'>('price-desc');
  const [inventoryRarityFilter, setInventoryRarityFilter] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'>('all');
  const [inventoryMinPrice, setInventoryMinPrice] = useState<string>('');
  const [inventoryMaxPrice, setInventoryMaxPrice] = useState<string>('');
  
  // Фильтры для целевых предметов
  const [targetSort, setTargetSort] = useState<'none' | 'price-asc' | 'price-desc'>('price-desc');
  const [targetRarityFilter, setTargetRarityFilter] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'>('all');
  const [targetMinPrice, setTargetMinPrice] = useState<string>('');
  const [targetMaxPrice, setTargetMaxPrice] = useState<string>('');

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
    if (!canUpgrade || isAnimating) return;
    
    // Reset state
    setIsAnimating(true);
    setUpgradeResult(null);
    setArrowRotation(0);
    
    // Calculate green zone (starts at top, goes clockwise)
    // SVG is rotated -90°, so 0° is at the top
    const greenZoneDegrees = (successChance / 100) * 360;
    
    // Calculate random final angle (0 to 360)
    // This is the angle where the arrow will stop pointing on the circle
    const finalAngle = Math.random() * 360;
    
    // Add multiple full rotations (5-7 rotations)
    const fullRotations = 5 + Math.random() * 2;
    const totalRotation = fullRotations * 360 + finalAngle;
    
    // Store final angle for checking after animation
    const finalArrowAngle = finalAngle;
    
    // Animation duration: 2-3 seconds
    const duration = 2000 + Math.random() * 1000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = easeOut * totalRotation;
      
      setArrowRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete - check if arrow stopped in green zone
        // The arrow rotates clockwise around the center
        // Arrow starts at top (0°) pointing down
        // When arrow rotates by 'totalRotation' degrees, it points to position on circle
        // The actual angle where arrow points = totalRotation % 360
        // Normalize to 0-360 range (handle negative angles)
        const actualArrowAngle = ((totalRotation % 360) + 360) % 360;
        
        // Green zone is from 0° to greenZoneDegrees (starting from top, going clockwise)
        // Check if the arrow's pointing position is within the green zone
        // Note: greenZoneDegrees can be 0, so we need to handle edge case
        // Use <= to include the boundary of the green zone
        // IMPORTANT: actualArrowAngle is the angle where the arrow POINTS on the circle
        // Green zone goes from 0° to greenZoneDegrees (clockwise from top)
        const isSuccess = greenZoneDegrees > 0 && 
                         actualArrowAngle >= 0 && 
                         actualArrowAngle <= greenZoneDegrees;
        
        // Keep arrow at final position
        setArrowRotation(totalRotation);
        setIsAnimating(false);
        setUpgradeResult(isSuccess ? 'success' : 'failed');
      }
    };
    
    requestAnimationFrame(animate);
  };

  const handleCollectItem = () => {
    // Reset everything for next upgrade
    setUpgradeResult(null);
    // Reset arrow rotation without animation
    setArrowRotation(0);
    setSelectedItems([]);
    setSelectedTarget(null);
    // Here you would add logic to add the item to inventory
    // For now, just reset the state
  };

  const handleResetAfterFailure = () => {
    // Reset everything for next upgrade
    setUpgradeResult(null);
    // Reset arrow rotation without animation
    setArrowRotation(0);
    setSelectedItems([]);
    setSelectedTarget(null);
  };

  // Фильтруем целевые предметы
  const filteredTargets = mockTargets.filter((target) => {
    if (selectedItems.length === 0) return true;
    if (target.value <= totalValue) return false;
    const chance = Math.min(Math.max((totalValue / target.value) * 100, 0.1), 75);
    if (chance > 75) return false;
    return true;
  });

  // Фильтруем предметы инвентаря (если выбран целевой предмет)
  const filteredInventory = inventory.filter((item) => {
    if (!selectedTarget) return true;
    const target = mockTargets.find(t => t.id === selectedTarget);
    if (!target) return true;
    return item.value < target.value;
  });

  // Фильтруем и сортируем инвентарь
  const processedInventory = (() => {
    let items = [...filteredInventory];
    
    // Фильтр по редкости
    if (inventoryRarityFilter !== 'all') {
      items = items.filter(item => item.rarity === inventoryRarityFilter);
    }
    
    // Фильтр по цене (от и до)
    if (inventoryMinPrice !== '') {
      const minPrice = parseInt(inventoryMinPrice);
      if (!isNaN(minPrice)) {
        items = items.filter(item => item.value >= minPrice);
      }
    }
    if (inventoryMaxPrice !== '') {
      const maxPrice = parseInt(inventoryMaxPrice);
      if (!isNaN(maxPrice)) {
        items = items.filter(item => item.value <= maxPrice);
      }
    }
    
    // Сортировка по цене
    if (inventorySort === 'price-asc') {
      items.sort((a, b) => a.value - b.value);
    } else if (inventorySort === 'price-desc') {
      items.sort((a, b) => b.value - a.value);
    }
    
    return items;
  })();

  // Фильтруем и сортируем целевые предметы
  const processedTargets = (() => {
    let items = [...filteredTargets];
    
    // Фильтр по редкости
    if (targetRarityFilter !== 'all') {
      items = items.filter(item => item.rarity === targetRarityFilter);
    }
    
    // Фильтр по цене (от и до)
    if (targetMinPrice !== '') {
      const minPrice = parseInt(targetMinPrice);
      if (!isNaN(minPrice)) {
        items = items.filter(item => item.value >= minPrice);
      }
    }
    if (targetMaxPrice !== '') {
      const maxPrice = parseInt(targetMaxPrice);
      if (!isNaN(maxPrice)) {
        items = items.filter(item => item.value <= maxPrice);
      }
    }
    
    // Сортировка по цене
    if (targetSort === 'price-asc') {
      items.sort((a, b) => a.value - b.value);
    } else if (targetSort === 'price-desc') {
      items.sort((a, b) => b.value - a.value);
    }
    
    return items;
  })();

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
                            className={`group relative p-4 rounded-xl border backdrop-blur-sm ${colors.bg} ${colors.border} transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden shadow-lg hover:shadow-xl`}
                          >
                            {/* Glow effect */}
                            <div className={`absolute inset-0 rounded-xl opacity-30 bg-gradient-to-br ${colors.gradient} blur-sm`}></div>
                            
                            <div className="relative z-10 w-full">
                              <div className={`mb-2 drop-shadow-lg ${
                                selectedItems.length === 1 ? 'text-6xl' :
                                selectedItems.length === 2 ? 'text-5xl' :
                                selectedItems.length <= 4 ? 'text-4xl' :
                                'text-3xl'
                              }`}>
                                {item.icon}
                              </div>
                              <div className={`font-bold text-white mb-1 truncate w-full drop-shadow-sm ${
                                selectedItems.length <= 2 ? 'text-sm' : 'text-xs'
                              }`}>
                                {item.name}
                              </div>
                              <div className={`text-[10px] ${colors.text} mb-1.5 uppercase font-semibold tracking-wide`}>{item.rarity}</div>
                              <div className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1">
                                <span className="text-[10px]">💎</span>
                                {item.value} MC
                              </div>
                            </div>
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
                {/* Animated Circular Progress Wheel */}
                <div className="relative mb-8">
                  <div className="relative w-64 h-64">
                    {/* Fixed Circle with Green Segment */}
                    <svg className="w-64 h-64 transform -rotate-90">
                      {/* Background circle (gray) */}
                      <circle
                        cx="128"
                        cy="128"
                        r="112"
                        stroke="rgb(51, 65, 85)"
                        strokeWidth="16"
                        fill="none"
                        className={upgradeResult === 'failed' ? 'opacity-50 transition-opacity duration-500' : ''}
                      />
                      {/* Green success segment */}
                      {successChance > 0 && (
                        <circle
                          cx="128"
                          cy="128"
                          r="112"
                          stroke="url(#successGradient)"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 112}`}
                          strokeDashoffset={`${2 * Math.PI * 112 * (1 - successChance / 100)}`}
                          strokeLinecap="round"
                          className={`transition-all duration-300 ${
                            upgradeResult === 'success' ? 'animate-pulse' : ''
                          } ${upgradeResult === 'failed' ? 'opacity-30' : ''}`}
                          style={{
                            filter: upgradeResult === 'success' ? 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))' : 'none',
                          }}
                        />
                      )}
                      <defs>
                        <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Rotating Arrow at the top */}
                    <div 
                      className="absolute top-1/2 left-1/2 z-20"
                      style={{
                        transform: `translate(-50%, -50%) translateY(-120px) rotate(${arrowRotation}deg)`,
                        transformOrigin: '50% 120px',
                        transition: isAnimating ? 'none' : 'none',
                      }}
                    >
                      {/* White arrow pointing down - smaller size */}
                      <div className="relative">
                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-white drop-shadow-lg"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-1.5 h-1.5 bg-white rounded-full border border-slate-800"></div>
                      </div>
                    </div>

                    {/* Center Content - Show during idle or result */}
                    {!isAnimating && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        {upgradeResult === null && (
                          <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
                            <Hammer size={56} className="text-white" />
                          </div>
                        )}
                        {upgradeResult === 'success' && (
                          <div className="text-center animate-[fadeInScale_0.5s_ease-out]">
                            <div className="text-6xl mb-2 animate-bounce">✨</div>
                            <div className="text-2xl font-bold text-emerald-400 drop-shadow-lg mb-2">
                              UPGRADE SUCCESS
                            </div>
                          </div>
                        )}
                        {upgradeResult === 'failed' && (
                          <div className="text-center animate-[fadeInScale_0.5s_ease-out]">
                            <div className="text-6xl mb-2">💥</div>
                            <div className="text-2xl font-bold text-red-400 drop-shadow-lg">
                              Вы проиграли
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-full blur-2xl -z-10 transition-all duration-500 ${
                      upgradeResult === 'success' 
                        ? 'bg-emerald-500/30 animate-pulse' 
                        : upgradeResult === 'failed'
                        ? 'bg-red-500/20 opacity-50'
                        : 'bg-yellow-500/20'
                    }`}></div>
                    
                    {/* Green flash overlay on success */}
                    {upgradeResult === 'success' && (
                      <div className="absolute inset-0 rounded-full bg-emerald-500/40 animate-[flash_0.6s_ease-out] pointer-events-none z-10"></div>
                    )}
                    
                    {/* Dim overlay on failure */}
                    {upgradeResult === 'failed' && (
                      <div className="absolute inset-0 rounded-full bg-black/40 pointer-events-none z-10"></div>
                    )}
                  </div>
                </div>

                {/* Success Chance Display - Hide during animation and results */}
                {!isAnimating && upgradeResult === null && (
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
                )}

                {/* Animation status */}
                {isAnimating && (
                  <div className="text-center mb-6">
                    <div className="text-slate-400 text-sm animate-pulse">Вращение...</div>
                  </div>
                )}

                {/* Result buttons and upgrade button */}
                {upgradeResult === 'success' ? (
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg shadow-emerald-500/30 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                    onClick={handleCollectItem}
                  >
                    <span className="flex items-center justify-center gap-2">
                      ✨ Забрать предмет
                    </span>
                  </Button>
                ) : upgradeResult === 'failed' ? (
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={handleResetAfterFailure}
                  >
                    Попробовать снова
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg shadow-yellow-500/30"
                    onClick={handleStartUpgrade}
                    disabled={!canUpgrade || isAnimating}
                  >
                    {!canUpgrade ? (
                      'Выберите предметы'
                    ) : isAnimating ? (
                      'Апгрейд в процессе...'
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Hammer size={20} />
                        Начать апгрейд
                      </span>
                    )}
                  </Button>
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
                          <div className={`relative p-6 rounded-xl border backdrop-blur-sm mb-4 ${colors.bg} ${colors.border} overflow-hidden shadow-xl`}>
                            {/* Glow effect */}
                            <div className={`absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br ${colors.gradient} blur-xl`}></div>
                            
                            <div className="relative z-10">
                              <div className="text-center mb-4">
                                <div className="text-7xl mb-3 drop-shadow-2xl">{item.icon}</div>
                                <div className="font-bold text-white text-xl mb-2 drop-shadow-sm">{item.name}</div>
                                <div className={`text-sm ${colors.text} uppercase mb-3 font-semibold tracking-wide`}>{item.rarity}</div>
                                <div className="text-emerald-400 font-bold text-2xl mb-2 flex items-center justify-center gap-2">
                                  <span>💎</span>
                                  {item.value} MC
                                </div>
                              </div>
                              <div className="text-xs text-slate-300 text-center font-mono bg-slate-800/70 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-slate-700/50">
                                {item.minecraftItem}
                              </div>
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
            <div
              className={`
                grid grid-cols-1 lg:grid-cols-2
                gap-y-10 lg:gap-x-14
                transition-all duration-1000 delay-300
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
            >
              
              {/* Left: Inventory Section */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                    Ваш инвентарь
                  </span>
                </h2>
                
                {/* Фильтры для инвентаря */}
                <div className="space-y-3 mb-6">
                  <div className="flex gap-3 flex-wrap justify-center">
                    <div className="relative group">
                      <select
                        value={inventorySort}
                        onChange={(e) => setInventorySort(e.target.value as any)}
                        className="appearance-none px-4 py-2.5 pr-10 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white hover:border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                      >
                        <option value="none">Без сортировки</option>
                        <option value="price-asc">Цена ↑</option>
                        <option value="price-desc">Цена ↓</option>
                      </select>
                      <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    
                    <div className="relative group">
                      <select
                        value={inventoryRarityFilter}
                        onChange={(e) => setInventoryRarityFilter(e.target.value as any)}
                        className="appearance-none px-4 py-2.5 pr-10 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white hover:border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                      >
                        <option value="all">Все редкости</option>
                        <option value="common">Common</option>
                        <option value="rare">Rare</option>
                        <option value="epic">Epic</option>
                        <option value="legendary">Legendary</option>
                        <option value="mythic">Mythic</option>
                      </select>
                      <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    
                    {(inventorySort !== 'none' || inventoryRarityFilter !== 'all' || inventoryMinPrice !== '' || inventoryMaxPrice !== '') && (
                      <button
                        onClick={() => {
                          setInventorySort('price-desc');
                          setInventoryRarityFilter('all');
                          setInventoryMinPrice('');
                          setInventoryMaxPrice('');
                        }}
                        className="px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-sm text-white flex items-center gap-2 transition-all hover:border-red-500/50"
                      >
                        <X className="w-4 h-4" />
                        Сбросить
                      </button>
                    )}
                  </div>
                  
                  {/* Фильтр по цене */}
                  <div className="flex gap-2 flex-wrap justify-center items-center">
                    <span className="text-sm text-slate-400">Цена:</span>
                    <input
                      type="number"
                      placeholder="От"
                      value={inventoryMinPrice}
                      onChange={(e) => setInventoryMinPrice(e.target.value)}
                      className="w-24 px-3 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-500 hover:border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                    <span className="text-slate-500">—</span>
                    <input
                      type="number"
                      placeholder="До"
                      value={inventoryMaxPrice}
                      onChange={(e) => setInventoryMaxPrice(e.target.value)}
                      className="w-24 px-3 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-500 hover:border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {processedInventory.map((item) => {
                    const colors = rarityColors[item.rarity];
                    const isSelected = selectedItems.includes(item.id);
                    const isDisabled = !isSelected && selectedItems.length >= MAX_SELECTED_ITEMS;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectItem(item.id)}
                        disabled={isDisabled}
                        className={`group relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 aspect-square flex flex-col items-center justify-center overflow-hidden ${
                          isSelected
                            ? `bg-gradient-to-br ${colors.gradient} ${colors.glow} ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 shadow-lg shadow-emerald-500/20 scale-105`
                            : isDisabled
                              ? 'bg-slate-800/20 border-slate-700/30 opacity-40 cursor-not-allowed'
                              : `bg-gradient-to-br ${colors.gradient} opacity-50 hover:opacity-100 border-slate-700/50 ${colors.hoverBorder} hover:scale-105 hover:shadow-lg`
                        }`}
                      >
                        {/* Selection indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        
                        {/* Glow effect on hover */}
                        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${colors.gradient}`}></div>
                        
                        <div className="relative z-10 text-center w-full">
                          <div className="text-4xl mb-2 drop-shadow-lg">{item.icon}</div>
                          <div className="text-xs font-bold text-white mb-1 truncate w-full drop-shadow-sm">{item.name}</div>
                          <div className={`text-[10px] ${colors.text} mb-1.5 uppercase font-semibold tracking-wide`}>{item.rarity}</div>
                          <div className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1">
                            <span className="text-[10px]">💎</span>
                            {item.value} MC
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Available Targets Section */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Доступные апгрейды
                  </span>
                </h2>
                
                {/* Фильтры для целевых предметов */}
                <div className="space-y-3 mb-6">
                  <div className="flex gap-3 flex-wrap justify-center">
                    <div className="relative group">
                      <select
                        value={targetSort}
                        onChange={(e) => setTargetSort(e.target.value as any)}
                        className="appearance-none px-4 py-2.5 pr-10 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white hover:border-yellow-500/50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all cursor-pointer"
                      >
                        <option value="none">Без сортировки</option>
                        <option value="price-asc">Цена ↑</option>
                        <option value="price-desc">Цена ↓</option>
                      </select>
                      <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    
                    <div className="relative group">
                      <select
                        value={targetRarityFilter}
                        onChange={(e) => setTargetRarityFilter(e.target.value as any)}
                        className="appearance-none px-4 py-2.5 pr-10 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white hover:border-yellow-500/50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all cursor-pointer"
                      >
                        <option value="all">Все редкости</option>
                        <option value="common">Common</option>
                        <option value="rare">Rare</option>
                        <option value="epic">Epic</option>
                        <option value="legendary">Legendary</option>
                        <option value="mythic">Mythic</option>
                      </select>
                      <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    
                    {(targetSort !== 'none' || targetRarityFilter !== 'all' || targetMinPrice !== '' || targetMaxPrice !== '') && (
                      <button
                        onClick={() => {
                          setTargetSort('price-desc');
                          setTargetRarityFilter('all');
                          setTargetMinPrice('');
                          setTargetMaxPrice('');
                        }}
                        className="px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-sm text-white flex items-center gap-2 transition-all hover:border-red-500/50"
                      >
                        <X className="w-4 h-4" />
                        Сбросить
                      </button>
                    )}
                  </div>
                  
                  {/* Фильтр по цене */}
                  <div className="flex gap-2 flex-wrap justify-center items-center">
                    <span className="text-sm text-slate-400">Цена:</span>
                    <input
                      type="number"
                      placeholder="От"
                      value={targetMinPrice}
                      onChange={(e) => setTargetMinPrice(e.target.value)}
                      className="w-24 px-3 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-500 hover:border-yellow-500/50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    />
                    <span className="text-slate-500">—</span>
                    <input
                      type="number"
                      placeholder="До"
                      value={targetMaxPrice}
                      onChange={(e) => setTargetMaxPrice(e.target.value)}
                      className="w-24 px-3 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-500 hover:border-yellow-500/50 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    />
                  </div>
                </div>
                
                {processedTargets.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-slate-400 mb-2">
                      {selectedItems.length === 0 
                        ? 'Выберите предметы из инвентаря' 
                        : 'Нет доступных апгрейдов'}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {selectedItems.length > 0 && 'Попробуйте изменить фильтры или выбрать другие предметы'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {processedTargets.map((target) => {
                      const colors = rarityColors[target.rarity];
                      const isSelected = selectedTarget === target.id;
                      const itemChance = Math.min(Math.max((totalValue / target.value) * 100, 0.1), 75);
                      
                      return (
                        <button
                          key={target.id}
                          onClick={() => handleSelectTarget(target.id)}
                          className={`group relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 aspect-square flex flex-col items-center justify-center overflow-hidden ${
                            isSelected
                              ? `bg-gradient-to-br ${colors.gradient} ${colors.glow} ring-2 ring-yellow-400 ring-offset-2 ring-offset-slate-900 shadow-lg shadow-yellow-500/20 scale-105`
                              : `bg-gradient-to-br ${colors.gradient} opacity-50 hover:opacity-100 border-slate-700/50 ${colors.hoverBorder} hover:scale-105 hover:shadow-lg`
                          }`}
                        >
                          {/* Selection indicator */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          
                          {/* Glow effect on hover */}
                          <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${colors.gradient}`}></div>
                          
                          <div className="relative z-10 text-center w-full">
                            <div className="text-4xl mb-2 drop-shadow-lg">{target.icon}</div>
                            <h4 className="font-bold text-white mb-1 text-xs truncate w-full drop-shadow-sm">{target.name}</h4>
                            <div className={`text-[10px] ${colors.text} mb-1.5 uppercase font-semibold tracking-wide`}>{target.rarity}</div>
                            <div className="text-emerald-400 font-bold text-xs mb-1 flex items-center justify-center gap-1">
                              <span className="text-[10px]">💎</span>
                              {target.value} MC
                            </div>
                            {selectedItems.length > 0 && (
                              <div className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 ${
                                itemChance >= 50 
                                  ? 'text-emerald-400 bg-emerald-500/10' 
                                  : itemChance >= 25 
                                    ? 'text-yellow-400 bg-yellow-500/10' 
                                    : 'text-red-400 bg-red-500/10'
                              }`}>
                                {itemChance.toFixed(1)}%
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Upgrade Modal with Animation - НЕ НУЖНО БОЛЬШЕ */}
      {/* {showUpgradeModal && targetItem && (
        <UpgradeModal ... />
      )} */}
    </div>
  );
}