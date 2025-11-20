import { useState, useEffect } from 'react';
import { CaseItem, DropTableItem, CaseOpenResult, UserStats } from '../types/case';
import { caseService } from '../services/caseService';

export function useCases() {
    const [cases, setCases] = useState<CaseItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCases();
    }, []);

    const loadCases = async () => {
        try {
            setLoading(true);
            const activeCases = caseService.getActiveCases();
            setCases(activeCases);
        } catch (err) {
            setError('Ошибка загрузки кейсов');
        } finally {
            setLoading(false);
        }
    };

    return {
        cases,
        loading,
        error,
        reload: loadCases,
    };
}

export function useCaseOpening() {
    const [isOpening, setIsOpening] = useState(false);
    const [result, setResult] = useState<DropTableItem | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [transactionId, setTransactionId] = useState<string | null>(null);

    const openCase = async (
        userId: string,
        caseId: number,
        userBalance: number,
        onBalanceUpdate: (newBalance: number) => void,
    ): Promise<CaseOpenResult> => {
        try {
            setIsOpening(true);
            setError(null);
            setResult(null);

            const caseItem = caseService.getCaseById(caseId);
            if (!caseItem) {
                throw new Error('Кейс не найден');
            }

            // ⭐ 3-4. Открываем кейс (результат генерируется ДО анимации)
            const openResult = await caseService.openCase(userId, caseId, userBalance);

            if (!openResult.success) {
                setError(openResult.error || 'Ошибка открытия кейса');
                return openResult;
            }

            // ⭐ 3. Списываем валюту
            onBalanceUpdate(userBalance - caseItem.price);

            // Сохраняем результат для показа после анимации
            setResult(openResult.item || null);
            setTransactionId(openResult.transactionId || null);

            return openResult;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsOpening(false);
        }
    };

    // ⭐ 6. Забрать предмет
    const claimItem = async (userId: string): Promise<boolean> => {
        if (!transactionId) return false;

        try {
            const claimResult = await caseService.claimItem(userId, transactionId);
            if (claimResult.success) {
                setResult(null);
                setTransactionId(null);
                return true;
            } else {
                setError(claimResult.error || 'Ошибка получения предмета');
                return false;
            }
        } catch (err) {
            setError('Ошибка связи с сервером');
            return false;
        }
    };

    // ⭐ 6. Продать предмет
    const sellItem = async (
        userId: string,
        onBalanceUpdate: (newBalance: number, currentBalance: number) => void,
        currentBalance: number,
    ): Promise<boolean> => {
        if (!transactionId) return false;

        try {
            const sellResult = await caseService.sellItem(userId, transactionId);
            if (sellResult.success && sellResult.sellPrice) {
                onBalanceUpdate(currentBalance + sellResult.sellPrice, currentBalance);
                setResult(null);
                setTransactionId(null);
                return true;
            } else {
                setError(sellResult.error || 'Ошибка продажи предмета');
                return false;
            }
        } catch (err) {
            setError('Ошибка связи с сервером');
            return false;
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
        setTransactionId(null);
        setIsOpening(false);
    };

    return {
        isOpening,
        result,
        error,
        transactionId,
        openCase,
        claimItem,
        sellItem,
        reset,
    };
}

export function useUserStats(userId: string) {
    const [stats, setStats] = useState<UserStats>({
        totalOpened: 0,
        rareCount: 0,
        epicCount: 0,
        legendaryCount: 0,
        mythicCount: 0,
        lastRareItem: null,
        guaranteedProgress: 0,
    });

    const loadStats = () => {
        const userStats = caseService.getUserStats(userId);
        setStats(userStats);
    };

    useEffect(() => {
        loadStats();
    }, [userId]);

    return {
        stats,
        reload: loadStats,
    };
}

export function useRecentDrops() {
    const [recentDrops, setRecentDrops] = useState<
        Array<{
            player: string;
            item: string;
            rarity: string;
            timestamp: Date;
        }>
    >([]);

    const loadRecentDrops = () => {
        const drops = caseService.getRecentRareDrops(10);
        setRecentDrops(drops);
    };

    useEffect(() => {
        loadRecentDrops();

        // ⭐ 8. Обновляем ленту каждые 5 секунд
        const interval = setInterval(loadRecentDrops, 5000);

        return () => clearInterval(interval);
    }, []);

    return {
        recentDrops,
        reload: loadRecentDrops,
    };
}
import { useState, useEffect } from 'react';
import { CaseItem, DropTableItem, CaseOpenResult } from '../types/case';
import { caseService } from '../services/caseService';

export function useCases() {
    const [cases, setCases] = useState<CaseItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCases();
    }, []);

    const loadCases = async () => {
        try {
            setLoading(true);
            const activeCases = caseService.getActiveCases();
            setCases(activeCases);
        } catch (err) {
            setError('Ошибка загрузки кейсов');
        } finally {
            setLoading(false);
        }
    };

    return {
        cases,
        loading,
        error,
        reload: loadCases,
    };
}

export function useCaseOpening() {
    const [isOpening, setIsOpening] = useState(false);
    const [result, setResult] = useState<DropTableItem | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [transactionId, setTransactionId] = useState<string | null>(null);

    const openCase = async (
        userId: string,
        caseId: number,
        userBalance: number,
        onBalanceUpdate: (newBalance: number) => void,
    ): Promise<CaseOpenResult> => {
        try {
            setIsOpening(true);
            setError(null);
            setResult(null);

            const caseItem = caseService.getCaseById(caseId);
            if (!caseItem) {
                throw new Error('Кейс не найден');
            }

            // Открываем кейс
            const openResult = await caseService.openCase(userId, caseId, userBalance);

            if (!openResult.success) {
                setError(openResult.error || 'Ошибка открытия кейса');
                return openResult;
            }

            // Списываем валюту
            onBalanceUpdate(userBalance - caseItem.price);

            // Сохраняем результат
            setResult(openResult.item || null);
            setTransactionId(openResult.transactionId || null);

            return openResult;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsOpening(false);
        }
    };

    const claimItem = async (userId: string): Promise<boolean> => {
        if (!transactionId) return false;

        try {
            const claimResult = await caseService.claimItem(userId, transactionId);
            if (claimResult.success) {
                setResult(null);
                setTransactionId(null);
                return true;
            } else {
                setError(claimResult.error || 'Ошибка получения предмета');
                return false;
            }
        } catch (err) {
            setError('Ошибка связи с сервером');
            return false;
        }
    };

    const sellItem = async (
        userId: string,
        onBalanceUpdate: (newBalance: number, currentBalance: number) => void,
        currentBalance: number,
    ): Promise<boolean> => {
        if (!transactionId) return false;

        try {
            const sellResult = await caseService.sellItem(userId, transactionId);
            if (sellResult.success && sellResult.sellPrice) {
                onBalanceUpdate(currentBalance + sellResult.sellPrice, currentBalance);
                setResult(null);
                setTransactionId(null);
                return true;
            } else {
                setError(sellResult.error || 'Ошибка продажи предмета');
                return false;
            }
        } catch (err) {
            setError('Ошибка связи с сервером');
            return false;
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
        setTransactionId(null);
        setIsOpening(false);
    };

    return {
        isOpening,
        result,
        error,
        transactionId,
        openCase,
        claimItem,
        sellItem,
        reset,
    };
}

export function useRecentDrops() {
    const [recentDrops, setRecentDrops] = useState<
        Array<{
            player: string;
            item: string;
            rarity: string;
            timestamp: Date;
        }>
    >([]);

    const loadRecentDrops = () => {
        const drops = caseService.getRecentRareDrops(10);
        setRecentDrops(drops);
    };

    useEffect(() => {
        loadRecentDrops();

        // Обновляем каждые 5 секунд
        const interval = setInterval(loadRecentDrops, 5000);

        return () => clearInterval(interval);
    }, []);

    return {
        recentDrops,
        reload: loadRecentDrops,
    };
}
