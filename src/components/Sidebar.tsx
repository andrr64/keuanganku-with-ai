import { Search, LogOut, HomeIcon } from "lucide-react";
import { exit } from "@tauri-apps/plugin-process";
import { CreditCard, DollarSign, FolderKanban, Settings, MessageSquare } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";

export const ROUTES = [
    { label: "Home", icon: <HomeIcon size={18} /> },
    { label: "Expense", icon: <CreditCard size={18} /> },
    { label: "Income", icon: <DollarSign size={18} /> },
    { label: "Category", icon: <FolderKanban size={18} /> },
    { label: "Settings", icon: <Settings size={18} /> },
    { label: "Chat with AI", icon: <MessageSquare size={18} /> },
];

export default function Sidebar({ active, setActive }: { active: string, setActive: (v: string) => void }) {
    return (
        <div className="flex flex-col w-64 h-screen p-5 text-sm bg-white text-gray-900 dark:bg-[#0F172A] dark:text-gray-100 border-r border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#1E3A8A] text-white rounded-xl flex items-center justify-center font-bold shadow-sm">💰</div>
                <div>
                    <div className="font-semibold text-[#1E3A8A] dark:text-blue-400">KeuanganKu</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Personal Finance</div>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 mb-6">
                <Search size={16} className="text-gray-400 dark:text-gray-500" />
                <input type="text" placeholder="Search" className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" />
            </div>

            {/* Menu */}
            <div className="space-y-1">
                {ROUTES.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => setActive(item.label)}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors
              ${active === item.label
                                ? "bg-[#1E3A8A] text-white dark:bg-blue-900 dark:text-blue-200"
                                : "text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-auto space-y-3">
                <ThemeSwitch />
                <button
                    onClick={async () => await exit(0)}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900 transition-colors"
                >
                    <LogOut size={18} />
                    Exit
                </button>
            </div>
        </div>
    );
}
