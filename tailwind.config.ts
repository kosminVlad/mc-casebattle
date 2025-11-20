import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-main': 'linear-gradient(135deg, #0B0E13 0%, #151922 50%, #0B0E13 100%)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                // MC-Case Battle Color System
                'mc-bg': {
                    primary: '#0B0E13',
                    secondary: '#151922',
                    tertiary: '#1E2329',
                },
                'mc-accent': {
                    emerald: '#2AF08C',
                    purple: '#A46CFF',
                    blue: '#4F9CF9',
                },
                'mc-text': {
                    primary: '#FFFFFF',
                    secondary: '#AAB2C5',
                    muted: '#6B7280',
                },
                'mc-rarity': {
                    common: '#9CA3AF',
                    rare: '#3B82F6',
                    epic: '#A855F7',
                    legendary: '#FFD75E',
                    mythic: '#EC4899',
                },
                // Original shadcn colors for compatibility
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                glow: 'glow 2s ease-in-out infinite alternate',
                scroll: 'scroll 20s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            boxShadow: {
                'glow-emerald': '0 0 20px rgba(42, 240, 140, 0.3)',
                'glow-purple': '0 0 20px rgba(164, 108, 255, 0.3)',
                'glow-blue': '0 0 20px rgba(79, 156, 249, 0.3)',
                card: '0 8px 32px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
export default config;
