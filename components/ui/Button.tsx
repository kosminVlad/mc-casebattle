'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseClasses =
        'font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-mc-accent-emerald/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

    const variantClasses = {
        primary:
            'bg-gradient-to-r from-mc-accent-emerald to-mc-accent-blue text-white hover:shadow-glow-emerald',
        secondary:
            'border-2 border-mc-text-secondary text-mc-text-secondary hover:border-mc-accent-emerald hover:text-mc-accent-emerald',
        ghost: 'text-mc-text-secondary hover:text-mc-accent-emerald hover:bg-mc-accent-emerald/10',
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
            data-oid="-aa.4jd"
        >
            {children}
        </button>
    );
}
