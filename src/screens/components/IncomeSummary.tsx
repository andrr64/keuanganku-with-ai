import { useMemo } from "react";
import { Landmark, ReceiptText, Target, TrendingUp, LucideIcon } from "lucide-react";

// --- TYPE DEFINITIONS ---
interface Income {
    date: string;
    source: string;
    amount: number;
}

interface SummaryCard {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
}

// --- DUMMY DATA ---
const dummyIncomeData: Income[] = [
    { date: "2025-02-01T09:00:00Z", source: "Salary", amount: 7500000 },
    { date: "2025-02-05T15:00:00Z", source: "Freelance Project", amount: 2000000 },
    { date: "2025-02-10T11:00:00Z", source: "Investment Dividends", amount: 500000 },
    { date: "2025-02-12T18:00:00Z", source: "Side Gig", amount: 1200000 },
    { date: "2025-02-15T10:00:00Z", source: "Gift", amount: 250000 },
];

// --- Helper function for currency formatting ---
const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 15000);

// --- Standalone Key Metric Summary Component for Income ---
export default function IncomeSummary() {
    const { totalIncome, totalTransactions, averageIncome, topSource } = useMemo(() => {
        const totalIncome = dummyIncomeData.reduce((sum, item) => sum + item.amount, 0);
        const totalTransactions = dummyIncomeData.length;
        const averageIncome = totalTransactions > 0 ? totalIncome / totalTransactions : 0;

        const sourceTotals = dummyIncomeData.reduce((acc, item) => {
            acc[item.source] = (acc[item.source] || 0) + item.amount;
            return acc;
        }, {} as Record<string, number>);

        const topSource = Object.keys(sourceTotals).reduce((a, b) => sourceTotals[a] > sourceTotals[b] ? a : b, 'N/A');

        return { totalIncome, totalTransactions, averageIncome, topSource };
    }, []);

    const summaryCards: SummaryCard[] = [
        { title: 'Total Income', value: formatCurrency(totalIncome), icon: Landmark, color: 'text-green-500' },
        { title: 'Transactions', value: totalTransactions, icon: ReceiptText, color: 'text-blue-500' },
        { title: 'Average Income', value: formatCurrency(averageIncome), icon: Target, color: 'text-yellow-500' },
        { title: 'Top Source', value: topSource, icon: TrendingUp, color: 'text-teal-500' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryCards.map(card => (
                <div key={card.title} className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 flex items-center gap-4 transition-colors">
                    <div className={`p-3 rounded-full bg-gray-200 dark:bg-gray-700 ${card.color}`}>
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
