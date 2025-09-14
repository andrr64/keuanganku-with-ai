import { Scale, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../lib/formatter";
import { Transaction } from "../../types/transaction";
import { useMemo } from "react";

// --- 1. Balance Overview Component ---
function BalanceOverview({ data }: { data: Transaction[] }) {
    const { totalIncome, totalExpenses, netBalance } = useMemo(() => {
        const latestDate = new Date(Math.max(...data.map(t => new Date(t.date).getTime())));
        const currentMonth = latestDate.getMonth();
        const currentYear = latestDate.getFullYear();

        const currentMonthTransactions = data.filter(t => {
            const tDate = new Date(t.date);
            return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
        });

        const totalIncome = currentMonthTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = currentMonthTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return { totalIncome, totalExpenses, netBalance: totalIncome - totalExpenses };
    }, [data]);

    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-green-500" size={24} />
                    <h2 className="text-sm text-gray-600 dark:text-gray-400">Total Income</h2>
                </div>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="flex flex-col items-center justify-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-gray-200 dark:border-gray-700 py-4 md:py-0">
                 <div className="flex items-center gap-2">
                    <Scale className="text-blue-500" size={24} />
                    <h2 className="text-sm text-gray-600 dark:text-gray-400">Net Balance</h2>
                </div>
                <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-500' : 'text-red-500'}`}>{formatCurrency(netBalance)}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                 <div className="flex items-center gap-2">
                    <TrendingDown className="text-red-500" size={24} />
                    <h2 className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</h2>
                </div>
                <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpenses)}</p>
            </div>
        </div>
    );
}

export default BalanceOverview;