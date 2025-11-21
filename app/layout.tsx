import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import './globals.css';

const pressStart = Press_Start_2P({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-press',
});

export const metadata: Metadata = {
    title: 'MC-Case Battle',
    description: 'Ламповое хранилище Minecraft-кейсов',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
            <body className={`${pressStart.variable} mc-body`}>
                {children}
            </body>
        </html>
    );
}
