import { useMemo } from "react";
import { Wallet, ReceiptText, Target, TrendingUp, LucideIcon } from "lucide-react";

// --- TYPE DEFINITIONS ---
interface Expense {
    date: string;
    title: string;
    amount: number;
    category: {
        id: number;
        name: string;
    };
}

interface SummaryCard {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
}


// --- DUMMY DATA ---
// Internal data source for this component
const dummyData: Expense[] = [
    { date: "2025-02-01T12:30:00Z", title: "Lunch", amount: 50000, category: { id: 1, name: "Food" } },
    { date: "2025-02-02T09:15:00Z", title: "Grab Transport", amount: 35000, category: { id: 2, name: "Transportation" } },
    { date: "2025-02-03T18:45:00Z", title: "Coffee", amount: 25000, category: { id: 3, name: "Entertainment" } },
    { date: "2025-02-04T20:00:00Z", title: "Phone Credit", amount: 100000, category: { id: 4, name: "Communication" } },
    { date: "2025-02-05T07:20:00Z", title: "Electricity Bill", amount: 200000, category: { id: 5, name: "Bills" } },
    { date: "2025-02-06T22:10:00Z", title: "Netflix", amount: 65000, category: { id: 3, name: "Entertainment" } },
    { date: "2025-02-07T14:00:00Z", title: "Gasoline", amount: 80000, category: { id: 2, name: "Transportation" } },
    { date: "2025-02-08T10:05:00Z", title: "Donation", amount: 50000, category: { id: 6, name: "Social" } },
    { date: "2025-02-09T08:50:00Z", title: "Vitamins", amount: 120000, category: { id: 7, name: "Health" } },
    { date: "2025-02-10T16:40:00Z", title: "Snack", amount: 30000, category: { id: 1, name: "Food" } },
];

// --- Helper function for currency formatting ---
const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 15000);

// --- Standalone Key Metric Summary Component ---
export default function ExpenseSummary() {
    const { totalSpent, totalTransactions, averageExpense, topCategory } = useMemo(() => {
        const totalSpent = dummyData.reduce((sum, item) => sum + item.amount, 0);
        const totalTransactions = dummyData.length;
        const averageExpense = totalSpent / totalTransactions;

        const categoryTotals = dummyData.reduce((acc, item) => {
            const name = item.category.name;
            acc[name] = (acc[name] || 0) + item.amount;
            return acc;
        }, {} as Record<string, number>);

        const topCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, 'N/A');

        return { totalSpent, totalTransactions, averageExpense, topCategory };
    }, []); // Dependency array is empty as data is static

    const summaryCards: SummaryCard[] = [
        { title: 'Total Spent', value: formatCurrency(totalSpent), icon: Wallet, color: 'text-blue-500' },
        { title: 'Transactions', value: totalTransactions, icon: ReceiptText, color: 'text-green-500' },
        { title: 'Average Expense', value: formatCurrency(averageExpense), icon: Target, color: 'text-yellow-500' },
        { title: 'Top Category', value: topCategory, icon: TrendingUp, color: 'text-purple-500' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryCards.map(card => (
                <div key={card.title} className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 flex items-center gap-4 transition-colors">
                    <div className={`p-3 rounded-full bg-gray-200 dark:bg-gray-800 ${card.color}`}>
                        <card.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{card.title}</p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
