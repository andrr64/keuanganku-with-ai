import { useState } from "react";
import { Search, LogOut } from "lucide-react";
import { exit } from "@tauri-apps/plugin-process";
import { ROUTES } from "../lib/route";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const [active, setActive] = useState("Expense");
    const location = useLocation();

    return (
        <div className="flex flex-col w-64 h-screen bg-gray-50 p-5 text-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold">
                    💰
                </div>
                <div>
                    <div className="font-semibold text-gray-900">FinTrack</div>
                    <div className="text-xs text-gray-400">Personal Finance</div>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-200 rounded-lg px-3 py-2 mb-6">
                <Search size={16} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
            </div>

            {/* Menu */}
            <div className="space-y-1">
                {Object.values(ROUTES).map((item) => (
                    <Link
                        key={item.url}
                        to={item.url}
                        onClick={() => setActive(item.label)}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors
              ${location.pathname === item.url || active === item.label
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-auto space-y-3">
                <button
                    onClick={async () => {
                        setActive("Exit");
                        await exit(0); // ✅ Tauri Exit
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={18} />
                    Exit
                </button>
            </div>
        </div>
    );
}
