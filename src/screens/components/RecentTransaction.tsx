import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { formatCurrency } from "../../lib/formatter";
import { Transaction } from "../../types/transaction";
import { useMemo } from "react";

export default function RecentTransactions({ data }: { data: Transaction[] }) {
    const recent = useMemo(() => {
        return [...data]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
    }, [data]);

    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 h-full">
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Recent Activity</h1>
            <ul className="space-y-4">
                {recent.map((t, i) => (
                    <li key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {t.type === 'income' ?
                                <ArrowUpCircle className="text-green-500" size={24} /> :
                                <ArrowDownCircle className="text-red-500" size={24} />
                            }
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{t.description}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(t.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <p className={`font-bold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                            {t.type === 'income' ? '+' : '-'}
                            {formatCurrency(t.amount)}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}