'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { CaseRollerModal } from '../../../components/ui/CaseRollerModal';
import { DropTableModal } from '../../../components/ui/DropTableModal';
import { caseService } from '../../../services/caseService';
import { useCaseOpening, useUserStats } from '../../../hooks/useCases';
import { CaseItem } from '../../../types/case';
import { getCaseIdFromSlug, getCaseSlug } from '../../../utils/caseUtils';

const rarityConfig = {
  common: {
    gradient: 'from-mc-rarity-common to-gray-600',
    glow: 'shadow-glow-emerald',
    badge: 'bg-mc-rarity-common/20 text-mc-rarity-common border-mc-rarity-common/30'
  },
  rare: {
    gradient: 'from-mc-rarity-rare to-blue-600',
    glow: 'shadow-glow-blue',
    badge: 'bg-mc-rarity-rare/20 text-mc-rarity-rare border-mc-rarity-rare/30'
  },
  epic: {
    gradient: 'from-mc-rarity-epic to-purple-600',
    glow: 'shadow-glow-purple',
    badge: 'bg-mc-rarity-epic/20 text-mc-rarity-epic border-mc-rarity-epic/30'
  },
  legendary: {
    gradient: 'from-mc-rarity-legendary to-orange-500',
    glow: 'shadow-glow-emerald',
    badge: 'bg-mc-rarity-legendary/20 text-mc-rarity-legendary border-mc-rarity-legendary/30'
  },
  mythic: {
    gradient: 'from-mc-rarity-mythic to-pink-600',
    glow: 'shadow-glow-purple',
    badge: 'bg-mc-rarity-mythic/20 text-mc-rarity-mythic border-mc-rarity-mythic/30'
  }
};

const typeIcons = {
  enchanting_table: '🔮',
  anvil: '🔨',
  crafting_table: '🛠️',
  brewing_stand: '⚗️'
};

export default function CasePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [caseItem, setCaseItem] = useState<CaseItem | null>(null);
  const [balance, setBalance] = useState(1250);
  const [isConnected, setIsConnected] = useState(false);
  const [userId] = useState('user_' + Math.random().toString(36).substr(2, 9));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropTable, setShowDropTable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    isOpening,
    result,
    error: caseError,
    openCase,
    claimItem,
    sellItem,
    reset
  } = useCaseOpening();

  const { stats: userStats, reload: reloadStats } = useUserStats(userId);

  useEffect(() => {
    // ⭐ 1. Получаем кейс по slug
    const caseId = getCaseIdFromSlug(slug);
    if (caseId) {
      const foundCase = caseService.getCaseById(caseId);
      if (foundCase) {
        setCaseItem(foundCase);
        setIsVisible(true);
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [slug, router]);

  const canAttemptOpen = () => {
    if (!isConnected) {
      alert('Сначала подключите Minecraft аккаунт!');
      return false;
    }

    if (!caseItem) return false;

    if (balance < caseItem.price) {
      alert('Недостаточно MC-Coins для открытия этого кейса!');
      return false;
    }

    return true;
  };

  const executeCaseOpen = async () => {
    if (!caseItem) return false;

    const result = await openCase(userId, caseItem.id, balance, setBalance);

    if (!result.success) {
      alert(result.error || 'Ошибка открытия кейса');
      return false;
    }

    return true;
  };

  // ⭐ 2-6. Обработчик открытия кейса
  const handleCaseOpen = async () => {
    if (!canAttemptOpen()) return;

    setIsModalOpen(true);

    const success = await executeCaseOpen();
    if (!success) {
      setIsModalOpen(false);
    }
  };

  const handleRollAgainRequest = async () => {
    if (!canAttemptOpen()) return false;
    return executeCaseOpen();
  };

  // ⭐ 6. Обработчики claim/sell
  const handleClaimItem = async () => {
    const success = await claimItem(userId);
    if (success) {
      alert('Предмет успешно отправлен в ваш Minecraft инвентарь!');
      reloadStats();
      handleCloseModal();
    } else {
      alert(caseError || 'Ошибка получения предмета');
    }
  };

  const handleSellItem = async () => {
    const success = await sellItem(userId, (newBalance) => setBalance(newBalance), balance);
    if (success) {
      alert('Предмет успешно продан! MC-Coins зачислены на ваш баланс.');
      reloadStats();
      handleCloseModal();
    } else {
      alert(caseError || 'Ошибка продажи предмета');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  if (!caseItem) {
    return (
      <div className="min-h-screen bg-gradient-main text-mc-text-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 border-mc-accent-emerald border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-mc-text-secondary">Загрузка кейса...</div>
        </div>
      </div>
    );
  }

  const config = rarityConfig[caseItem.rarity];
  const icon = typeIcons[caseItem.type as keyof typeof typeIcons] || '📦';
  const legendaryCount = caseItem.dropTable.filter(item => ['legendary', 'mythic'].includes(item.rarity)).length;
  const epicCount = caseItem.dropTable.filter(item => item.rarity === 'epic').length;

  return (
    <div className="min-h-screen bg-gradient-main text-mc-text-primary">
      {/* Header */}
      <header className="relative z-10 px-6 py-6 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Back */}
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/')}
              className="flex items-center space-x-2"
            >
              <span>←</span>
              <span>Назад</span>
            </Button>
            <div className="text-2xl font-bold text-gradient-emerald">
              MC-CASE BATTLE
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-6">
            {/* Balance */}
            <div className="glass-effect px-6 py-3 rounded-full border border-mc-accent-emerald/30">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-mc-accent-emerald rounded-full animate-pulse"></div>
                <span className="text-mc-accent-emerald font-bold text-lg">
                  {balance.toLocaleString()}
                </span>
                <span className="text-mc-text-secondary text-sm font-medium">
                  MC-Coins
                </span>
              </div>
            </div>

            {/* Auth Section */}
            {isConnected ? (
              <div className="glass-effect px-4 py-3 rounded-full border border-mc-accent-emerald/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-mc-accent-emerald to-mc-accent-blue rounded-lg flex items-center justify-center font-bold">
                    S
                  </div>
                  <span className="text-mc-accent-emerald font-semibold">
                    Steve_2024
                  </span>
                </div>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="md"
                onClick={() => setIsConnected(true)}
              >
                Подключить Minecraft
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ⭐ 1. Case Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Case Visual */}
            <div className="relative">
              <div className={`relative h-80 flex items-center justify-center bg-gradient-to-br ${config.gradient} rounded-2xl ${config.glow} p-8`}>
                <div className="relative">
                  <div className={`w-48 h-48 bg-gradient-to-br ${config.gradient} rounded-xl transform hover:rotate-12 transition-transform duration-500 shadow-card animate-float`}>
                    <div className="w-full h-full bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <div className="text-8xl animate-pulse-slow">
                        {icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-30 blur-2xl -z-10`}></div>
                </div>
              </div>
            </div>

            {/* ⭐ 1. Case Info */}
            <div className="space-y-6">
              <div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border ${config.badge} mb-4`}>
                  {caseItem.rarity}
                </div>
                <h1 className="text-5xl font-bold text-mc-text-primary mb-4">
                  {caseItem.name}
                </h1>
                <p className="text-xl text-mc-text-secondary leading-relaxed">
                  {caseItem.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-mc-accent-emerald">
                    {caseItem.price}
                  </div>
                  <div className="text-sm text-mc-text-secondary">
                    MC-Coins
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mc-rarity-legendary">
                    {legendaryCount}
                  </div>
                  <div className="text-sm text-mc-text-secondary">
                    Редких
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mc-rarity-epic">
                    {epicCount}
                  </div>
                  <div className="text-sm text-mc-text-secondary">
                    Эпиков
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full shadow-glow-emerald"
                  onClick={handleCaseOpen}
                  disabled={!isConnected || balance < caseItem.price}
                >
                  {!isConnected ? 'Подключите Minecraft' : 
                   balance < caseItem.price ? 'Недостаточно MC-Coins' :
                   `Открыть за ${caseItem.price} MC-Coins`}
                </Button>
                
                <Button 
                  variant="secondary" 
                  size="md" 
                  className="w-full"
                  onClick={() => setShowDropTable(true)}
                >
                  Посмотреть содержимое
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ 8. User Stats Section */}
      <section className="px-6 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="text-gradient-emerald">
              Ваша статистика
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect rounded-lg p-6 text-center border border-white/10">
              <div className="text-3xl font-bold text-mc-accent-emerald mb-2">
                {userStats.totalOpened}
              </div>
              <div className="text-mc-text-secondary">
                Кейсов открыто
              </div>
            </div>
            
            <div className="glass-effect rounded-lg p-6 text-center border border-white/10">
              <div className="text-3xl font-bold text-mc-rarity-legendary mb-2">
                {Math.max(0, 10 - userStats.guaranteedProgress)}
              </div>
              <div className="text-mc-text-secondary">
                До гарантированного Rare
              </div>
              {userStats.guaranteedProgress > 0 && (
                <div className="mt-2 bg-mc-bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-mc-accent-emerald to-mc-accent-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(userStats.guaranteedProgress / 10) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
            
            <div className="glass-effect rounded-lg p-6 text-center border border-white/10">
              <div className="text-3xl font-bold text-mc-rarity-mythic mb-2">
                {userStats.legendaryCount + userStats.mythicCount}
              </div>
              <div className="text-mc-text-secondary">
                Легендарных предметов
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ 1. Drop Table Section */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-emerald">
              Возможные награды
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseItem.dropTable
              .sort((a, b) => b.probability - a.probability)
              .map((item) => {
                const itemConfig = rarityConfig[item.rarity];
                return (
                  <div
                    key={item.id}
                    className={`glass-effect rounded-lg p-6 border border-white/10 hover:border-mc-accent-emerald/30 transition-all duration-300 bg-gradient-to-br ${itemConfig.gradient} bg-opacity-10`}
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">
                        {item.icon || '📦'}
                      </div>
                      <h3 className="font-bold text-mc-text-primary mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-mc-text-secondary">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${itemConfig.badge}`}>
                        {item.rarity}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-mc-text-primary">
                          {item.probability}%
                        </div>
                        <div className="text-xs text-mc-text-secondary">
                          {item.sellPrice} MC продажа
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Related Cases */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-emerald">
              Другие кейсы
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseService.getActiveCases()
              .filter(c => c.id !== caseItem.id)
              .slice(0, 3)
              .map((relatedCase) => {
                const relatedConfig = rarityConfig[relatedCase.rarity];
                const relatedIcon = typeIcons[relatedCase.type as keyof typeof typeIcons] || '📦';
                const relatedSlug = getCaseSlug(relatedCase.id);
                
                return (
                  <div
                    key={relatedCase.id}
                    className={`glass-effect rounded-lg p-6 border border-white/10 hover:border-mc-accent-emerald/30 transition-all duration-300 cursor-pointer bg-gradient-to-br ${relatedConfig.gradient} bg-opacity-10`}
                    onClick={() => router.push(`/case/${relatedSlug}`)}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">
                        {relatedIcon}
                      </div>
                      <h3 className="font-bold text-mc-text-primary mb-2">
                        {relatedCase.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className={`px-2 py-1 rounded text-xs font-bold ${relatedConfig.badge}`}>
                          {relatedCase.rarity}
                        </div>
                        <div className="text-mc-accent-emerald font-bold">
                          {relatedCase.price} MC
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* ⭐ 5-6. Case Opening Modal */}
      <CaseRollerModal
        isOpen={isModalOpen}
        caseName={caseItem.name}
        caseType={caseItem.type}
        price={caseItem.price}
        balance={balance}
        dropTable={caseItem.dropTable}
        resultItem={result}
        isResultPending={isOpening || !result}
        onClose={handleCloseModal}
        onClaim={() => handleClaimItem()}
        onSell={() => handleSellItem()}
        onRollAgain={handleRollAgainRequest}
      />

      {/* Drop Table Modal */}
      <DropTableModal
        isOpen={showDropTable}
        caseItem={caseItem}
        onClose={() => setShowDropTable(false)}
      />
    </div>
  );
}