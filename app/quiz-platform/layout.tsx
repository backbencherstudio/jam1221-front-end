'use client'

import React from 'react';
import LanguageSwitcher from '../_components/LanguageSwitcher';
import ProtectedRoute from './ProtectedRoute';

export default function QuizPlatformLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#FAD0C4] min-h-screen flex flex-col items-center p-4">
            <div className="flex justify-center mb-6">
                <div className="flex items-center">
                    <div className="mr-2 md:text-2xl text-lg font-bold text-[#1E1E33]">
                        Välj språk:
                    </div>
                    <LanguageSwitcher />
                </div>
            </div>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </div>
    );
}

