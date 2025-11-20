import { Metadata } from 'next';
import { caseService } from '../../../services/caseService';
import { getCaseIdFromSlug } from '../../../utils/caseUtils';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const caseId = getCaseIdFromSlug(params.slug);
    const caseItem = caseId ? caseService.getCaseById(caseId) : null;

    if (!caseItem) {
        return {
            title: 'Кейс не найден - MC-Case Battle',
            description: 'Запрашиваемый кейс не найден',
        };
    }

    return {
        title: `${caseItem.name} - MC-Case Battle`,
        description: `${caseItem.description} Цена: ${caseItem.price} MC-Coins. ${caseItem.dropTable.length} уникальных предметов.`,
        keywords: `minecraft, кейс, ${caseItem.name.toLowerCase()}, ${caseItem.type}, предметы`,
        openGraph: {
            title: `${caseItem.name} - MC-Case Battle`,
            description: caseItem.description,
            type: 'website',
        },
    };
}

export async function generateStaticParams() {
    return [
        { slug: 'enchanting-table' },
        { slug: 'anvil' },
        { slug: 'crafting-table' },
        { slug: 'brewing-stand' },
    ];
}

export default function CaseLayout({ children }: { children: React.ReactNode }) {
    return children;
}
