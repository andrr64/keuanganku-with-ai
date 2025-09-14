import { useMemo } from 'react';
import { Briefcase, Utensils, Film, Wifi, ShoppingCart, HeartPulse, Handshake, Train } from 'lucide-react';

// Menggunakan tipe dan formatter yang sama dari file lain untuk konsistensi
interface Transaction {
    type: 'income' | 'expense';
    date: string;
    description: string;
    amount: number;
    category?: string;
}

const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value / 15000);

// Fungsi untuk memilih ikon berdasarkan nama kategori
const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'food': return <Utensils className="w-5 h-5" />;
        case 'transportation': return <Train className="w-5 h-5" />;
        case 'entertainment': return <Film className="w-5 h-5" />;
        case 'bills': return <Wifi className="w-5 h-5" />;
        case 'health': return <HeartPulse className="w-5 h-5" />;
        case 'social': return <Handshake className="w-5 h-5" />;
        default: return <ShoppingCart className="w-5 h-5" />;
    }
};

export default function TopSpendingCategories({ data }: { data: Transaction[] }) {
    const topCategories = useMemo(() => {
        const latestDate = new Date(Math.max(...data.map(t => new Date(t.date).getTime())));
        const currentMonth = latestDate.getMonth();
        const currentYear = latestDate.getFullYear();

        const currentMonthExpenses = data.filter(t => {
            const tDate = new Date(t.date);
            return t.type === 'expense' && tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
        });

        if (currentMonthExpenses.length === 0) return [];

        const totalExpenses = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);

        const expensesByCategory = currentMonthExpenses.reduce((acc, item) => {
            if (item.category) {
                acc[item.category] = (acc[item.category] || 0) + item.amount;
            }
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(expensesByCategory)
            .map(([name, amount]) => ({
                name,
                amount,
                percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
            }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 4); // Ambil 4 teratas

    }, [data]);

    const COLORS = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];

    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 h-full">
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Top Spending Categories</h1>
            {topCategories.length > 0 ? (
                <ul className="space-y-4">
                    {topCategories.map((cat, i) => (
                        <li key={cat.name}>
                            <div className="flex justify-between items-center mb-1 text-sm">
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    {getCategoryIcon(cat.name)}
                                    <span>{cat.name}</span>
                                </div>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(cat.amount)}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className={`${COLORS[i % COLORS.length]} h-2 rounded-full`}
                                    style={{ width: `${cat.percentage}%` }}
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No spending data for this month.</p>
            )}
        </div>
    );
}
