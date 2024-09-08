import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "Bassim's notes",
    description: "Bassim Eledath's blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="app-container">
                    <Sidebar />
                    <div className="flex-1 ml-64">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
