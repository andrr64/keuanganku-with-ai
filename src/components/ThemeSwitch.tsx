import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function ThemeSwitch() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const onToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.getElementById("rootElement")?.classList.toggle("dark");
    };

    return (
        <button
            type="button"
            onClick={onToggle}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
