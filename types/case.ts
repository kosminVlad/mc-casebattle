export interface CaseItem {
    id: number;
    name: string;
    type: string;
    price: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
    description?: string;
    isActive: boolean;
    dropTable: DropTableItem[];
}

export interface DropTableItem {
    id: number;
    name: string;
    description: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
    probability: number; // в процентах
    sellPrice: number; // цена продажи в MC-Coins
    minecraftItem: string; // ID предмета в Minecraft
    icon?: string;
}

export interface DropLog {
    id: string;
    userId: string;
    caseId: number;
    itemId: number;
    rarity: string;
    status: 'pending' | 'claimed' | 'sold';
    timestamp: Date;
    transactionId?: string;
}

export interface CaseOpenResult {
    success: boolean;
    item?: DropTableItem;
    error?: string;
    transactionId?: string;
}

export interface UserStats {
    totalOpened: number;
    rareCount: number;
    epicCount: number;
    legendaryCount: number;
    mythicCount: number;
    lastRareItem: DropLog | null;
    guaranteedProgress: number;
}
export interface CaseItem {
    id: number;
    name: string;
    type: string;
    price: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
    description?: string;
    isActive: boolean;
    dropTable: DropTableItem[];
}

export interface DropTableItem {
    id: number;
    name: string;
    description: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
    probability: number; // в процентах
    sellPrice: number; // цена продажи в MC-Coins
    minecraftItem: string; // ID предмета в Minecraft
    icon?: string;
}

export interface DropLog {
    id: string;
    userId: string;
    caseId: number;
    itemId: number;
    rarity: string;
    status: 'pending' | 'claimed' | 'sold';
    timestamp: Date;
    transactionId?: string;
}

export interface CaseOpenResult {
    success: boolean;
    item?: DropTableItem;
    error?: string;
    transactionId?: string;
}

export interface UserInventory {
    id: string;
    userId: string;
    items: InventoryItem[];
}

export interface InventoryItem {
    id: string;
    dropLogId: string;
    item: DropTableItem;
    status: 'unclaimed' | 'claimed' | 'sold';
    claimedAt?: Date;
}
