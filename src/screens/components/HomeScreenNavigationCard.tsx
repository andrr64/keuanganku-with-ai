import { ArrowRight } from "lucide-react";


interface NavigationCardProps {
    onChange: (view: string) => void;
}

// --- 4. Navigation Cards ---
const NavigationCards = ({onChange} : NavigationCardProps) => {

    const handleChange = (view: string) => {
        onChange(view);
    }

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <button onClick={() => handleChange("Expense")} className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">View Expenses</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">See all your spending records</p>
                <ArrowRight className="mt-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </button>
            <button onClick={() => handleChange("Income")} className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">View Income</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">See all your income records</p>
                <ArrowRight className="mt-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </button>
        </div>
    );
}


export default NavigationCards;