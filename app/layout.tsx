import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Note from "@/components/Note";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Bassim's notes",
    description: "Bassim Eledath's blog",
};

export default function RootLayout() {
    return (
        <html lang="en">
            <body>
                <div className="app-container">
                    <Sidebar />
                    <div className="flex-1 ml-64">
                        <Note />
                    </div>
                </div>
            </body>
        </html>
    );
}
