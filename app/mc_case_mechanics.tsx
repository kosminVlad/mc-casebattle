import React, { useState, useEffect } from 'react';
import { Zap, ChevronRight, RotateCw } from 'lucide-react';

const MCCaseMechanics = () => {
  const [activeTab, setActiveTab] = useState('crafting');
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  
  // Anvil state
  const [upgradePhase, setUpgradePhase] = useState('select'); // select, confirm, execute, result
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [upgradeChance, setUpgradeChance] = useState(0);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState(null);

  const items = [
    { id: 1, name: 'Oak Log', icon: '🪵', rarity: 'common', value: 10 },
    { id: 2, name: 'Coal', icon: '⚫', rarity: 'common', value: 15 },
    { id: 3, name: 'Iron Ingot', icon: '🔩', rarity: 'rare', value: 50 },
    { id: 4, name: 'Diamond', icon: '💎', rarity: 'epic', value: 100 },
    { id: 5, name: 'Golden Apple', icon: '🍎', rarity: 'epic', value: 150 },
    { id: 6, name: 'Enchanted Book', icon: '📚', rarity: 'rare', value: 75 },
    { id: 7, name: 'Netherite Ingot', icon: '⛏️', rarity: 'legendary', value: 500 },
    { id: 8, name: 'Totem of Undying', icon: '🗿', rarity: 'legendary', value: 800 },
  ];

  // Crafting Table - Spin Logic
  const handleSpin = () => {
    setIsSpinning(true);
    setSpinning(true);
    setResult(null);

    const spinDuration = 3000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= spinDuration) {
        clearInterval(interval);
        const randomItem = items[Math.floor(Math.random() * items.length)];
        setResult(randomItem);
        setSpinning(false);
        setIsSpinning(false);
      }
    }, 50);
  };

  // Anvil - Calculate upgrade chance
  const calculateChance = (source, target) => {
    if (!source || !target) return 0;
    const ratio = target.value / source.value;
    
    if (ratio < 1.5) return 80;
    if (ratio < 2) return 60;
    if (ratio < 3) return 40;
    if (ratio < 5) return 25;
    return 10;
  };

  // Update chance when selections change
  useEffect(() => {
    if (selectedSource && selectedTarget) {
      setUpgradeChance(calculateChance(selectedSource, selectedTarget));
    }
  }, [selectedSource, selectedTarget]);

  // Execute upgrade
  const executeUpgrade = () => {
    setIsUpgrading(true);
    
    setTimeout(() => {
      const success = Math.random() * 100 < upgradeChance;
      setUpgradeResult({
        success,
        sourceItem: selectedSource,
        targetItem: success ? selectedTarget : null,
      });
      setIsUpgrading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <style>{`
        @keyframes spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(42, 240, 140, 0.3); }
          50% { box-shadow: 0 0 40px rgba(42, 240, 140, 0.6); }
        }
        @keyframes hammer {
          0% { transform: translateY(-40px) rotateZ(-45deg); }
          50% { transform: translateY(0px) rotateZ(0deg); }
          100% { transform: translateY(-40px) rotateZ(-45deg); }
        }
        @keyframes sparkle {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .spinning { animation: spin 0.1s linear infinite; }
        .float-item { animation: float 3s ease-in-out infinite; }
        .glow-effect { animation: glow 2s ease-in-out infinite; }
        .hammer-hit { animation: hammer 0.6s ease-in-out; }
        .shake-effect { animation: shake 0.3s ease-in-out; }
        .rarity-common { color: #9ca3af; }
        .rarity-rare { color: #3b82f6; }
        .rarity-epic { color: #a855f7; }
        .rarity-legendary { color: #ffd75e; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-2">
            MC Case Battle Mechanics
          </h1>
          <p className="text-slate-400">Система открытия кейсов с механиками</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12 justify-center">
          <button
            onClick={() => {
              setActiveTab('crafting');
              setResult(null);
            }}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              activeTab === 'crafting'
                ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg shadow-emerald-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            🛠️ Верстак (Рулетка)
          </button>
          <button
            onClick={() => {
              setActiveTab('anvil');
              setUpgradePhase('select');
              setSelectedSource(null);
              setSelectedTarget(null);
              setUpgradeResult(null);
            }}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              activeTab === 'anvil'
                ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg shadow-emerald-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            🔨 Наковальня (Апгрейд)
          </button>
        </div>

        {/* ===== CRAFTING TABLE SECTION ===== */}
        {activeTab === 'crafting' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Controls */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-800/80 rounded-2xl p-8 border border-emerald-500/30 backdrop-blur">
                <h2 className="text-2xl font-bold mb-6 text-emerald-400">🛠️ Верстак</h2>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
                    <p className="text-sm text-slate-400 mb-2">Ваш баланс</p>
                    <p className="text-2xl font-bold text-emerald-400">1250 MC-Coins</p>
                  </div>
                  
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
                    <p className="text-sm text-slate-400 mb-2">Стоимость открытия</p>
                    <p className="text-2xl font-bold text-blue-400">100 MC-Coins</p>
                  </div>

                  <button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      isSpinning
                        ? 'bg-slate-600 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-r from-emerald-500 to-blue-600 hover:shadow-lg hover:shadow-emerald-500/50 active:scale-95'
                    }`}
                  >
                    {isSpinning ? '⏳ Крутится...' : '🎰 Открыть кейс'}
                  </button>

                  {result && (
                    <div className={`bg-slate-900/50 p-4 rounded-lg border-2 border-${result.rarity === 'legendary' ? 'yellow' : result.rarity === 'epic' ? 'purple' : result.rarity === 'rare' ? 'blue' : 'gray'}-500/50 text-center`}>
                      <p className="text-sm text-slate-400 mb-2">Вы получили!</p>
                      <p className={`text-3xl mb-2`}>{result.icon}</p>
                      <p className={`font-bold text-rarity-${result.rarity}`}>{result.name}</p>
                      <p className="text-sm text-slate-400 mt-2">Стоимость: {result.value} MC</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Center - Animation */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-600/20 rounded-2xl p-12 border border-emerald-500/30 h-full flex flex-col items-center justify-center relative overflow-hidden">
                {/* Верстак base */}
                <div className="relative w-40 h-40">
                  {/* Верстак */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-900 rounded-xl flex items-center justify-center text-6xl shadow-2xl ${result ? 'glow-effect' : ''}`}>
                    🛠️
                  </div>

                  {/* Spinning items carousel */}
                  {isSpinning && (
                    <div className="absolute -inset-4 border-4 border-emerald-400/50 rounded-full animate-spin" />
                  )}

                  {/* Result glow */}
                  {result && (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-blue-500/30 rounded-xl blur-xl animate-pulse" />
                  )}
                </div>

                {/* Particles effect */}
                {isSpinning && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-400 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          animation: `sparkle 1s ease-out forwards`,
                          '--tx': `${Math.cos((i / 8) * Math.PI * 2) * 100}px`,
                          '--ty': `${Math.sin((i / 8) * Math.PI * 2) * 100}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Spin progress */}
                {isSpinning && (
                  <div className="mt-8 text-center">
                    <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-600 animate-pulse" />
                    </div>
                    <p className="text-sm text-emerald-400 mt-3 font-bold">Крутится...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Item Pool */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-emerald-500/30 backdrop-blur max-h-96 overflow-y-auto">
                <h3 className="text-lg font-bold mb-4 text-emerald-400">📦 Возможные награды</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className={`p-3 rounded-lg bg-slate-900/50 border border-slate-600 hover:border-emerald-500/50 transition-all cursor-pointer`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <p className={`font-bold text-rarity-${item.rarity}`}>{item.name}</p>
                            <p className="text-xs text-slate-400">{item.value} MC</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400">Шанс</p>
                          <p className="text-sm font-bold text-emerald-400">12.5%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ANVIL SECTION ===== */}
        {activeTab === 'anvil' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left - Source Item Selection */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-emerald-500/30 backdrop-blur">
                <h3 className="text-lg font-bold mb-4 text-emerald-400">📦 Выберите предмет</h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {items.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedSource(item);
                        setUpgradePhase('select');
                      }}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedSource?.id === item.id
                          ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/30'
                          : 'bg-slate-900/50 border-slate-600 hover:border-emerald-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <p className={`font-bold text-rarity-${item.rarity}`}>{item.name}</p>
                            <p className="text-xs text-slate-400">{item.value} MC</p>
                          </div>
                        </div>
                        {selectedSource?.id === item.id && <Zap size={20} className="text-emerald-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Anvil Animation & Upgrade Preview */}
            <div className="lg:col-span-1">
              <div className="h-full bg-gradient-to-br from-slate-700/50 to-slate-900/50 rounded-2xl p-6 border border-slate-600/50 flex flex-col items-center justify-center">
                {/* Anvil */}
                <div className={`text-7xl mb-6 ${isUpgrading ? 'hammer-hit' : ''}`}>⚒️</div>

                {/* Upgrade chance */}
                {selectedSource && selectedTarget && (
                  <div className="w-full">
                    <div className="text-center mb-4">
                      <p className="text-sm text-slate-400 mb-2">Шанс успеха</p>
                      <p className={`text-3xl font-bold ${
                        upgradeChance >= 50 ? 'text-emerald-400' : 
                        upgradeChance >= 30 ? 'text-yellow-400' : 
                        'text-red-400'
                      }`}>
                        {upgradeChance}%
                      </p>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
                      <div
                        className={`h-full transition-all ${
                          upgradeChance >= 50 ? 'bg-emerald-500' : 
                          upgradeChance >= 30 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${upgradeChance}%` }}
                      />
                    </div>
                    <button
                      onClick={executeUpgrade}
                      disabled={isUpgrading}
                      className="w-full py-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50"
                    >
                      {isUpgrading ? '⏳ Идёт апгрейд...' : '🔨 Улучшить'}
                    </button>
                  </div>
                )}

                {upgradeResult && (
                  <div className={`w-full text-center mt-4 p-4 rounded-lg border-2 ${
                    upgradeResult.success
                      ? 'bg-emerald-500/20 border-emerald-500/50'
                      : 'bg-red-500/20 border-red-500/50'
                  }`}>
                    {upgradeResult.success ? (
                      <>
                        <p className="text-emerald-400 font-bold text-lg">✅ Успех!</p>
                        <p className="text-sm text-slate-300 mt-1">Предмет улучшен</p>
                      </>
                    ) : (
                      <>
                        <p className="text-red-400 font-bold text-lg">❌ Провал!</p>
                        <p className="text-sm text-slate-300 mt-1">Предмет разрушен</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right - Target Item Selection */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-emerald-500/30 backdrop-blur">
                <h3 className="text-lg font-bold mb-4 text-emerald-400">🎯 Выберите цель</h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {items
                    .filter(item => !selectedSource || item.value > selectedSource.value)
                    .map(item => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedTarget(item)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTarget?.id === item.id
                          ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/30'
                          : 'bg-slate-900/50 border-slate-600 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <p className={`font-bold text-rarity-${item.rarity}`}>{item.name}</p>
                            <p className="text-xs text-slate-400">{item.value} MC</p>
                          </div>
                        </div>
                        {selectedTarget?.id === item.id && <ChevronRight size={20} className="text-blue-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCCaseMechanics;