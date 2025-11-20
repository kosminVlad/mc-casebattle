// Утилиты для работы с кейсами

export const CASE_SLUGS: Record<number, string> = {
    1: 'enchanting-table',
    2: 'anvil',
    3: 'crafting-table',
    4: 'brewing-stand',
};

export const SLUG_TO_CASE_ID: Record<string, number> = {
    'enchanting-table': 1,
    anvil: 2,
    'crafting-table': 3,
    'brewing-stand': 4,
};

export function getCaseSlug(caseId: number): string | null {
    return CASE_SLUGS[caseId] || null;
}

export function getCaseIdFromSlug(slug: string): number | null {
    return SLUG_TO_CASE_ID[slug] || null;
}

export function getCaseUrl(caseId: number): string {
    const slug = getCaseSlug(caseId);
    return slug ? `/case/${slug}` : '/';
}

export function generateCaseSitemap() {
    return Object.values(CASE_SLUGS).map((slug) => `/case/${slug}`);
} // Утилиты для работы с кейсами

export const CASE_SLUGS: Record<number, string> = {
    1: 'enchanting-table',
    2: 'anvil',
    3: 'crafting-table',
    4: 'brewing-stand',
};

export const SLUG_TO_CASE_ID: Record<string, number> = {
    'enchanting-table': 1,
    anvil: 2,
    'crafting-table': 3,
    'brewing-stand': 4,
};

export function getCaseSlug(caseId: number): string | null {
    return CASE_SLUGS[caseId] || null;
}

export function getCaseIdFromSlug(slug: string): number | null {
    return SLUG_TO_CASE_ID[slug] || null;
}

export function getCaseUrl(caseId: number): string {
    const slug = getCaseSlug(caseId);
    return slug ? `/case/${slug}` : '/';
}

export function generateCaseSitemap() {
    return Object.values(CASE_SLUGS).map((slug) => `/case/${slug}`);
}
