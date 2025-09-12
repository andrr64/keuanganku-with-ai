import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Load saved theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const initialTheme = savedTheme || "light";
        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, []);

    const onToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Theme
            </span>

            <button
                onClick={onToggle}
                className="relative inline-flex h-6 w-12 items-center rounded-full
                           bg-[#1E3A8A] dark:bg-gray-600 transition-colors duration-300"
            >
                <span
                    className={`absolute left-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-300
                    ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
                >
                    {theme === "dark" ? (
                        <Moon size={12} className="text-[#1E3A8A]" />
                    ) : (
                        <Sun size={12} className="text-yellow-500" />
                    )}
                </span>
            </button>
        </div>
    );
}
