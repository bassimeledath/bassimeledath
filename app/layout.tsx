import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
    title: "Bassim's notes",
    description: "Bassim Eledath's blog",
    icons: {
        icon: '/favicon.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-[#1e1e1e]">
                <AuthProvider>
                    <div className="app-container">
                        <Sidebar />
                        <div className="flex-1 ml-64">
                            {children}
                        </div>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
