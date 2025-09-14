import { Plus } from 'lucide-react';

export default function IncomeHeader() {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    My Income
                </h1>
                <p className="text-md text-gray-600 dark:text-gray-400">
                    Track all your income sources here.
                </p>
            </div>
            <button
                onClick={() => alert("Add new income modal would open here.")}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600 
                   text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 
                   shadow-md transition-colors"
            >
                <Plus size={20} />
                Add Income
            </button>
        </header>
    );
}
