// src/layouts/RootLayout.tsx
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div id="rootElement" className="font-sans flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
