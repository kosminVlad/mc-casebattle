import { CaseItem, DropTableItem, DropLog, CaseOpenResult, UserStats } from '../types/case';

// Полные данные кейсов с drop tables
export const CASES_DATA: CaseItem[] = [
    {
        id: 1,
        name: 'Стол зачарований',
        type: 'enchanting_table',
        price: 100,
        rarity: 'epic',
        description: 'Магический кейс с зачарованными предметами и книгами',
        isActive: true,
        dropTable: [
            {
                id: 101,
                name: '32 Бревна дуба',
                description: 'Обычные блоки дерева для строительства',
                rarity: 'common',
                probability: 40,
                sellPrice: 15,
                minecraftItem: 'minecraft:oak_log',
                icon: '🪵',
            },
            {
                id: 102,
                name: 'Зачарованная книга',
                description: 'Книга с случайным зачарованием',
                rarity: 'rare',
                probability: 30,
                sellPrice: 45,
                minecraftItem: 'minecraft:enchanted_book',
                icon: '📚',
            },
            {
                id: 103,
                name: 'Алмазный меч',
                description: 'Острый алмазный клинок',
                rarity: 'epic',
                probability: 20,
                sellPrice: 120,
                minecraftItem: 'minecraft:diamond_sword',
                icon: '⚔️',
            },
            {
                id: 104,
                name: 'Незеритовая кирка',
                description: 'Легендарный инструмент из незерита',
                rarity: 'legendary',
                probability: 8,
                sellPrice: 300,
                minecraftItem: 'minecraft:netherite_pickaxe',
                icon: '⛏️',
            },
            {
                id: 105,
                name: 'Тотем бессмертия',
                description: 'Мифический артефакт защиты',
                rarity: 'mythic',
                probability: 2,
                sellPrice: 800,
                minecraftItem: 'minecraft:totem_of_undying',
                icon: '🗿',
            },
        ],
    },
    {
        id: 2,
        name: 'Наковальня',
        type: 'anvil',
        price: 150,
        rarity: 'legendary',
        description: 'Кейс с улучшенным снаряжением и оружием',
        isActive: true,
        dropTable: [
            {
                id: 201,
                name: '16 Железных слитков',
                description: 'Металл для крафта инструментов',
                rarity: 'common',
                probability: 35,
                sellPrice: 25,
                minecraftItem: 'minecraft:iron_ingot',
                icon: '🔩',
            },
            {
                id: 202,
                name: 'Алмазная броня',
                description: 'Полный комплект алмазной защиты',
                rarity: 'rare',
                probability: 25,
                sellPrice: 80,
                minecraftItem: 'minecraft:diamond_chestplate',
                icon: '🛡️',
            },
            {
                id: 203,
                name: 'Зачарованный лук',
                description: 'Лук с мощными зачарованиями',
                rarity: 'epic',
                probability: 25,
                sellPrice: 180,
                minecraftItem: 'minecraft:bow',
                icon: '🏹',
            },
            {
                id: 204,
                name: 'Незеритовая броня',
                description: 'Легендарная защита из незерита',
                rarity: 'legendary',
                probability: 12,
                sellPrice: 450,
                minecraftItem: 'minecraft:netherite_chestplate',
                icon: '🛡️',
            },
            {
                id: 205,
                name: 'Элитры',
                description: 'Мифические крылья для полёта',
                rarity: 'mythic',
                probability: 3,
                sellPrice: 1000,
                minecraftItem: 'minecraft:elytra',
                icon: '🪶',
            },
        ],
    },
    {
        id: 3,
        name: 'Верстак',
        type: 'crafting_table',
        price: 75,
        rarity: 'rare',
        description: 'Базовый кейс с полезными ресурсами',
        isActive: true,
        dropTable: [
            {
                id: 301,
                name: '64 Булыжника',
                description: 'Строительный материал',
                rarity: 'common',
                probability: 50,
                sellPrice: 10,
                minecraftItem: 'minecraft:cobblestone',
                icon: '🪨',
            },
            {
                id: 302,
                name: '32 Угля',
                description: 'Топливо для печей',
                rarity: 'common',
                probability: 25,
                sellPrice: 12,
                minecraftItem: 'minecraft:coal',
                icon: '⚫',
            },
            {
                id: 303,
                name: '16 Алмазов',
                description: 'Драгоценные камни',
                rarity: 'rare',
                probability: 15,
                sellPrice: 60,
                minecraftItem: 'minecraft:diamond',
                icon: '💎',
            },
            {
                id: 304,
                name: 'Золотое яблоко',
                description: 'Магический фрукт восстановления',
                rarity: 'epic',
                probability: 8,
                sellPrice: 90,
                minecraftItem: 'minecraft:golden_apple',
                icon: '🍎',
            },
            {
                id: 305,
                name: 'Зачарованное золотое яблоко',
                description: 'Легендарный артефакт силы',
                rarity: 'legendary',
                probability: 2,
                sellPrice: 200,
                minecraftItem: 'minecraft:enchanted_golden_apple',
                icon: '✨🍎',
            },
        ],
    },
    {
        id: 4,
        name: 'Зельеварка',
        type: 'brewing_stand',
        price: 200,
        rarity: 'mythic',
        description: 'Алхимический кейс с магическими зельями',
        isActive: true,
        dropTable: [
            {
                id: 401,
                name: 'Зелье лечения',
                description: 'Восстанавливает здоровье',
                rarity: 'common',
                probability: 30,
                sellPrice: 30,
                minecraftItem: 'minecraft:potion',
                icon: '🧪',
            },
            {
                id: 402,
                name: 'Зелье силы II',
                description: 'Увеличивает урон в бою',
                rarity: 'rare',
                probability: 25,
                sellPrice: 70,
                minecraftItem: 'minecraft:potion',
                icon: '💪',
            },
            {
                id: 403,
                name: 'Зелье невидимости',
                description: 'Делает игрока невидимым',
                rarity: 'epic',
                probability: 20,
                sellPrice: 150,
                minecraftItem: 'minecraft:potion',
                icon: '👻',
            },
            {
                id: 404,
                name: 'Зелье удачи',
                description: 'Увеличивает шанс редких дропов',
                rarity: 'legendary',
                probability: 15,
                sellPrice: 400,
                minecraftItem: 'minecraft:potion',
                icon: '🍀',
            },
            {
                id: 405,
                name: 'Философский камень',
                description: 'Мифический артефакт алхимии',
                rarity: 'mythic',
                probability: 10,
                sellPrice: 1500,
                minecraftItem: 'minecraft:nether_star',
                icon: '💫',
            },
        ],
    },
];

class CaseService {
    private dropLogs: DropLog[] = [];

    // ⭐ 1. Получить все активные кейсы
    getActiveCases(): CaseItem[] {
        return CASES_DATA.filter((caseItem) => caseItem.isActive);
    }

    // Получить кейс по ID
    getCaseById(id: number): CaseItem | null {
        return CASES_DATA.find((caseItem) => caseItem.id === id) || null;
    }

    // ⭐ 2. Проверить условия открытия кейса
    canOpenCase(
        userId: string,
        caseId: number,
        userBalance: number,
    ): { canOpen: boolean; error?: string } {
        const caseItem = this.getCaseById(caseId);

        if (!caseItem) {
            return { canOpen: false, error: 'Кейс не найден' };
        }

        if (!caseItem.isActive) {
            return { canOpen: false, error: 'Кейс временно недоступен' };
        }

        if (userBalance < caseItem.price) {
            return { canOpen: false, error: 'Недостаточно MC-Coins' };
        }

        // Проверка на спам (не более 1 кейса в секунду)
        const recentOpens = this.dropLogs.filter(
            (log) => log.userId === userId && Date.now() - log.timestamp.getTime() < 1000,
        );

        if (recentOpens.length > 0) {
            return { canOpen: false, error: 'Слишком быстро! Подождите секунду' };
        }

        return { canOpen: true };
    }

    // ⭐ 4. Генерация случайного предмета по весам вероятности
    private generateRandomItem(dropTable: DropTableItem[], userId: string): DropTableItem {
        // Проверяем гарантированную систему (каждые 10 кейсов)
        const userHistory = this.getUserDropHistory(userId);
        const guaranteedProgress = userHistory.length % 10;

        // Если это 10-й кейс, гарантируем rare или выше
        if (guaranteedProgress === 9) {
            const rareItems = dropTable.filter((item) =>
                ['rare', 'epic', 'legendary', 'mythic'].includes(item.rarity),
            );
            if (rareItems.length > 0) {
                const randomIndex = Math.floor(Math.random() * rareItems.length);
                return rareItems[randomIndex];
            }
        }

        // Обычная генерация по весам
        const totalProbability = dropTable.reduce((sum, item) => sum + item.probability, 0);

        if (Math.abs(totalProbability - 100) > 0.01) {
            console.warn(`Drop table probability sum is ${totalProbability}%, not 100%`);
        }

        const random = Math.random() * 100;
        let currentSum = 0;

        for (const item of dropTable) {
            currentSum += item.probability;
            if (random <= currentSum) {
                return item;
            }
        }

        return dropTable[dropTable.length - 1];
    }

    // ⭐ 3-5. Основная функция открытия кейса
    async openCase(userId: string, caseId: number, userBalance: number): Promise<CaseOpenResult> {
        // ⭐ 2. Проверяем условия
        const canOpen = this.canOpenCase(userId, caseId, userBalance);
        if (!canOpen.canOpen) {
            return { success: false, error: canOpen.error };
        }

        const caseItem = this.getCaseById(caseId)!;

        // ⭐ 4. Генерируем результат ДО анимации (честная система)
        const droppedItem = this.generateRandomItem(caseItem.dropTable, userId);

        // ⭐ 3. Создаем запись в логе (валюта списывается на фронтенде)
        const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const dropLog: DropLog = {
            id: `drop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId,
            caseId,
            itemId: droppedItem.id,
            rarity: droppedItem.rarity,
            status: 'pending',
            timestamp: new Date(),
            transactionId,
        };

        this.dropLogs.push(dropLog);

        return {
            success: true,
            item: droppedItem,
            transactionId,
        };
    }

    // ⭐ 6. Забрать предмет в Minecraft
    async claimItem(
        userId: string,
        transactionId: string,
    ): Promise<{ success: boolean; error?: string }> {
        const dropLog = this.dropLogs.find(
            (log) =>
                log.userId === userId &&
                log.transactionId === transactionId &&
                log.status === 'pending',
        );

        if (!dropLog) {
            return { success: false, error: 'Предмет не найден или уже обработан' };
        }

        try {
            await this.sendItemToMinecraft(userId, dropLog.itemId);
            dropLog.status = 'claimed';
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Ошибка отправки в Minecraft' };
        }
    }

    // ⭐ 6. Продать предмет за MC-Coins
    async sellItem(
        userId: string,
        transactionId: string,
    ): Promise<{ success: boolean; sellPrice?: number; error?: string }> {
        const dropLog = this.dropLogs.find(
            (log) =>
                log.userId === userId &&
                log.transactionId === transactionId &&
                log.status === 'pending',
        );

        if (!dropLog) {
            return { success: false, error: 'Предмет не найден или уже обработан' };
        }

        const item = this.findItemById(dropLog.itemId);
        if (!item) {
            return { success: false, error: 'Информация о предмете не найдена' };
        }

        dropLog.status = 'sold';

        return {
            success: true,
            sellPrice: item.sellPrice,
        };
    }

    // ⭐ 8. Получить историю открытий пользователя
    getUserDropHistory(userId: string): DropLog[] {
        return this.dropLogs
            .filter((log) => log.userId === userId)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    // ⭐ 8. Получить статистику пользователя
    getUserStats(userId: string): UserStats {
        const userHistory = this.getUserDropHistory(userId);

        return {
            totalOpened: userHistory.length,
            rareCount: userHistory.filter((log) => log.rarity === 'rare').length,
            epicCount: userHistory.filter((log) => log.rarity === 'epic').length,
            legendaryCount: userHistory.filter((log) => log.rarity === 'legendary').length,
            mythicCount: userHistory.filter((log) => log.rarity === 'mythic').length,
            lastRareItem:
                userHistory.find((log) =>
                    ['rare', 'epic', 'legendary', 'mythic'].includes(log.rarity),
                ) || null,
            guaranteedProgress: userHistory.length % 10,
        };
    }

    // ⭐ 8. Получить последние редкие дропы для ленты
    getRecentRareDrops(limit: number = 10): Array<{
        player: string;
        item: string;
        rarity: string;
        timestamp: Date;
    }> {
        return this.dropLogs
            .filter((log) => ['epic', 'legendary', 'mythic'].includes(log.rarity))
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit)
            .map((log) => {
                const item = this.findItemById(log.itemId);
                return {
                    player: `Player_${log.userId.slice(-4)}`,
                    item: item?.name || 'Unknown Item',
                    rarity: log.rarity,
                    timestamp: log.timestamp,
                };
            });
    }

    // Вспомогательные функции
    private findItemById(itemId: number): DropTableItem | null {
        for (const caseItem of CASES_DATA) {
            const item = caseItem.dropTable.find((item) => item.id === itemId);
            if (item) return item;
        }
        return null;
    }

    private async sendItemToMinecraft(userId: string, itemId: number): Promise<void> {
        const item = this.findItemById(itemId);
        if (!item) throw new Error('Item not found');

        console.log(`Sending item ${item.minecraftItem} to user ${userId}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
}

export const caseService = new CaseService();
import { CaseItem, DropTableItem, DropLog, CaseOpenResult } from '../types/case';

// Моковые данные кейсов с полными drop tables
export const CASES_DATA: CaseItem[] = [
    {
        id: 1,
        name: 'Стол зачарований',
        type: 'enchanting_table',
        price: 100,
        rarity: 'epic',
        description: 'Магический кейс с зачарованными предметами',
        isActive: true,
        dropTable: [
            {
                id: 101,
                name: '32 Бревна дуба',
                description: 'Обычные блоки дерева',
                rarity: 'common',
                probability: 40,
                sellPrice: 15,
                minecraftItem: 'minecraft:oak_log',
                icon: '🪵',
            },
            {
                id: 102,
                name: 'Зачарованная книга',
                description: 'Книга с случайным зачарованием',
                rarity: 'rare',
                probability: 30,
                sellPrice: 45,
                minecraftItem: 'minecraft:enchanted_book',
                icon: '📚',
            },
            {
                id: 103,
                name: 'Алмазный меч',
                description: 'Острый алмазный клинок',
                rarity: 'epic',
                probability: 20,
                sellPrice: 120,
                minecraftItem: 'minecraft:diamond_sword',
                icon: '⚔️',
            },
            {
                id: 104,
                name: 'Незеритовая кирка',
                description: 'Легендарный инструмент из незерита',
                rarity: 'legendary',
                probability: 8,
                sellPrice: 300,
                minecraftItem: 'minecraft:netherite_pickaxe',
                icon: '⛏️',
            },
            {
                id: 105,
                name: 'Тотем бессмертия',
                description: 'Мифический артефакт защиты',
                rarity: 'mythic',
                probability: 2,
                sellPrice: 800,
                minecraftItem: 'minecraft:totem_of_undying',
                icon: '🗿',
            },
        ],
    },
    {
        id: 2,
        name: 'Наковальня',
        type: 'anvil',
        price: 150,
        rarity: 'legendary',
        description: 'Кейс с улучшенным снаряжением',
        isActive: true,
        dropTable: [
            {
                id: 201,
                name: '16 Железных слитков',
                description: 'Металл для крафта',
                rarity: 'common',
                probability: 35,
                sellPrice: 25,
                minecraftItem: 'minecraft:iron_ingot',
                icon: '🔩',
            },
            {
                id: 202,
                name: 'Алмазная броня',
                description: 'Полный комплект алмазной защиты',
                rarity: 'rare',
                probability: 25,
                sellPrice: 80,
                minecraftItem: 'minecraft:diamond_chestplate',
                icon: '🛡️',
            },
            {
                id: 203,
                name: 'Зачарованный лук',
                description: 'Лук с мощными зачарованиями',
                rarity: 'epic',
                probability: 25,
                sellPrice: 180,
                minecraftItem: 'minecraft:bow',
                icon: '🏹',
            },
            {
                id: 204,
                name: 'Незеритовая броня',
                description: 'Легендарная защита из незерита',
                rarity: 'legendary',
                probability: 12,
                sellPrice: 450,
                minecraftItem: 'minecraft:netherite_chestplate',
                icon: '🛡️',
            },
            {
                id: 205,
                name: 'Элитры',
                description: 'Мифические крылья для полёта',
                rarity: 'mythic',
                probability: 3,
                sellPrice: 1000,
                minecraftItem: 'minecraft:elytra',
                icon: '🪶',
            },
        ],
    },
    {
        id: 3,
        name: 'Верстак',
        type: 'crafting_table',
        price: 75,
        rarity: 'rare',
        description: 'Базовый кейс с полезными ресурсами',
        isActive: true,
        dropTable: [
            {
                id: 301,
                name: '64 Булыжника',
                description: 'Строительный материал',
                rarity: 'common',
                probability: 50,
                sellPrice: 10,
                minecraftItem: 'minecraft:cobblestone',
                icon: '🪨',
            },
            {
                id: 302,
                name: '32 Угля',
                description: 'Топливо для печей',
                rarity: 'common',
                probability: 25,
                sellPrice: 12,
                minecraftItem: 'minecraft:coal',
                icon: '⚫',
            },
            {
                id: 303,
                name: '16 Алмазов',
                description: 'Драгоценные камни',
                rarity: 'rare',
                probability: 15,
                sellPrice: 60,
                minecraftItem: 'minecraft:diamond',
                icon: '💎',
            },
            {
                id: 304,
                name: 'Золотое яблоко',
                description: 'Магический фрукт восстановления',
                rarity: 'epic',
                probability: 8,
                sellPrice: 90,
                minecraftItem: 'minecraft:golden_apple',
                icon: '🍎',
            },
            {
                id: 305,
                name: 'Зачарованное золотое яблоко',
                description: 'Легендарный артефакт силы',
                rarity: 'legendary',
                probability: 2,
                sellPrice: 200,
                minecraftItem: 'minecraft:enchanted_golden_apple',
                icon: '✨🍎',
            },
        ],
    },
    {
        id: 4,
        name: 'Зельеварка',
        type: 'brewing_stand',
        price: 200,
        rarity: 'mythic',
        description: 'Алхимический кейс с зельями',
        isActive: true,
        dropTable: [
            {
                id: 401,
                name: 'Зелье лечения',
                description: 'Восстанавливает здоровье',
                rarity: 'common',
                probability: 30,
                sellPrice: 30,
                minecraftItem: 'minecraft:potion',
                icon: '🧪',
            },
            {
                id: 402,
                name: 'Зелье силы II',
                description: 'Увеличивает урон в бою',
                rarity: 'rare',
                probability: 25,
                sellPrice: 70,
                minecraftItem: 'minecraft:potion',
                icon: '💪',
            },
            {
                id: 403,
                name: 'Зелье невидимости',
                description: 'Делает игрока невидимым',
                rarity: 'epic',
                probability: 20,
                sellPrice: 150,
                minecraftItem: 'minecraft:potion',
                icon: '👻',
            },
            {
                id: 404,
                name: 'Зелье удачи',
                description: 'Увеличивает шанс редких дропов',
                rarity: 'legendary',
                probability: 15,
                sellPrice: 400,
                minecraftItem: 'minecraft:potion',
                icon: '🍀',
            },
            {
                id: 405,
                name: 'Философский камень',
                description: 'Мифический артефакт алхимии',
                rarity: 'mythic',
                probability: 10,
                sellPrice: 1500,
                minecraftItem: 'minecraft:nether_star',
                icon: '💫',
            },
        ],
    },
];

class CaseService {
    private dropLogs: DropLog[] = [];

    // Получить все активные кейсы
    getActiveCases(): CaseItem[] {
        return CASES_DATA.filter((caseItem) => caseItem.isActive);
    }

    // Получить кейс по ID
    getCaseById(id: number): CaseItem | null {
        return CASES_DATA.find((caseItem) => caseItem.id === id) || null;
    }

    // Проверить условия открытия кейса
    canOpenCase(
        userId: string,
        caseId: number,
        userBalance: number,
    ): { canOpen: boolean; error?: string } {
        const caseItem = this.getCaseById(caseId);

        if (!caseItem) {
            return { canOpen: false, error: 'Кейс не найден' };
        }

        if (!caseItem.isActive) {
            return { canOpen: false, error: 'Кейс временно недоступен' };
        }

        if (userBalance < caseItem.price) {
            return { canOpen: false, error: 'Недостаточно MC-Coins' };
        }

        // Проверка на спам (не более 1 кейса в секунду)
        const recentOpens = this.dropLogs.filter(
            (log) => log.userId === userId && Date.now() - log.timestamp.getTime() < 1000,
        );

        if (recentOpens.length > 0) {
            return { canOpen: false, error: 'Слишком быстро! Подождите секунду' };
        }

        return { canOpen: true };
    }

    // Генерация случайного предмета по весам вероятности
    private generateRandomItem(dropTable: DropTableItem[]): DropTableItem {
        // Проверяем, что сумма вероятностей = 100%
        const totalProbability = dropTable.reduce((sum, item) => sum + item.probability, 0);

        if (Math.abs(totalProbability - 100) > 0.01) {
            console.warn(`Drop table probability sum is ${totalProbability}%, not 100%`);
        }

        // Генерируем случайное число от 0 до 100
        const random = Math.random() * 100;
        let currentSum = 0;

        // Находим предмет по весам
        for (const item of dropTable) {
            currentSum += item.probability;
            if (random <= currentSum) {
                return item;
            }
        }

        // Fallback на последний предмет (не должно происходить)
        return dropTable[dropTable.length - 1];
    }

    // Основная функция открытия кейса
    async openCase(userId: string, caseId: number, userBalance: number): Promise<CaseOpenResult> {
        // 1. Проверяем условия
        const canOpen = this.canOpenCase(userId, caseId, userBalance);
        if (!canOpen.canOpen) {
            return { success: false, error: canOpen.error };
        }

        const caseItem = this.getCaseById(caseId)!;

        // 2. Генерируем результат ДО анимации
        const droppedItem = this.generateRandomItem(caseItem.dropTable);

        // 3. Создаем запись в логе
        const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const dropLog: DropLog = {
            id: `drop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId,
            caseId,
            itemId: droppedItem.id,
            rarity: droppedItem.rarity,
            status: 'pending',
            timestamp: new Date(),
            transactionId,
        };

        this.dropLogs.push(dropLog);

        // 4. Возвращаем результат (валюта должна быть списана на фронтенде)
        return {
            success: true,
            item: droppedItem,
            transactionId,
        };
    }

    // Забрать предмет в Minecraft
    async claimItem(
        userId: string,
        transactionId: string,
    ): Promise<{ success: boolean; error?: string }> {
        const dropLog = this.dropLogs.find(
            (log) =>
                log.userId === userId &&
                log.transactionId === transactionId &&
                log.status === 'pending',
        );

        if (!dropLog) {
            return { success: false, error: 'Предмет не найден или уже обработан' };
        }

        // Здесь должна быть интеграция с Minecraft сервером
        // Например, через WebSocket или HTTP API
        try {
            await this.sendItemToMinecraft(userId, dropLog.itemId);

            dropLog.status = 'claimed';
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Ошибка отправки в Minecraft' };
        }
    }

    // Продать предмет за MC-Coins
    async sellItem(
        userId: string,
        transactionId: string,
    ): Promise<{ success: boolean; sellPrice?: number; error?: string }> {
        const dropLog = this.dropLogs.find(
            (log) =>
                log.userId === userId &&
                log.transactionId === transactionId &&
                log.status === 'pending',
        );

        if (!dropLog) {
            return { success: false, error: 'Предмет не найден или уже обработан' };
        }

        // Находим предмет для получения цены продажи
        const item = this.findItemById(dropLog.itemId);
        if (!item) {
            return { success: false, error: 'Информация о предмете не найдена' };
        }

        dropLog.status = 'sold';

        return {
            success: true,
            sellPrice: item.sellPrice,
        };
    }

    // Получить историю открытий пользователя
    getUserDropHistory(userId: string): DropLog[] {
        return this.dropLogs
            .filter((log) => log.userId === userId)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    // Получить последние редкие дропы для ленты
    getRecentRareDrops(limit: number = 10): Array<{
        player: string;
        item: string;
        rarity: string;
        timestamp: Date;
    }> {
        return this.dropLogs
            .filter((log) => ['epic', 'legendary', 'mythic'].includes(log.rarity))
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit)
            .map((log) => {
                const item = this.findItemById(log.itemId);
                return {
                    player: `Player_${log.userId.slice(-4)}`, // Маскируем ID пользователя
                    item: item?.name || 'Unknown Item',
                    rarity: log.rarity,
                    timestamp: log.timestamp,
                };
            });
    }

    // Вспомогательная функция поиска предмета по ID
    private findItemById(itemId: number): DropTableItem | null {
        for (const caseItem of CASES_DATA) {
            const item = caseItem.dropTable.find((item) => item.id === itemId);
            if (item) return item;
        }
        return null;
    }

    // Заглушка для отправки предмета в Minecraft
    private async sendItemToMinecraft(userId: string, itemId: number): Promise<void> {
        const item = this.findItemById(itemId);
        if (!item) throw new Error('Item not found');

        // Здесь должна быть реальная интеграция с Minecraft сервером
        console.log(`Sending item ${item.minecraftItem} to user ${userId}`);

        // Имитируем задержку сети
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
}

export const caseService = new CaseService();
