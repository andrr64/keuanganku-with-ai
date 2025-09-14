import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- TYPE DEFINITIONS ---
interface Income {
    date: string;
    source: string;
    amount: number;
}

interface ChartData {
    name: string;
    value: number;
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

export default function IncomeDistributionChart() {
    const { chartData, totalIncome } = useMemo(() => {
        const dataBySource = dummyIncomeData.reduce((acc, income) => {
            acc[income.source] = (acc[income.source] || 0) + income.amount;
            return acc;
        }, {} as Record<string, number>);

        const chartData: ChartData[] = Object.keys(dataBySource).map(source => ({
            name: source,
            value: dataBySource[source],
        }));

        const totalIncome = dummyIncomeData.reduce((sum, item) => sum + item.amount, 0);

        return { chartData, totalIncome };
    }, []);

    const COLORS = ['#22c55e', '#16a34a', '#15803d', '#14532d', '#84cc16'];

    const renderLegend = (value: string, entry: any) => {
        const itemValue = entry.payload.value;
        return (
            <span className="text-gray-600 dark:text-gray-300 text-sm">
                {value}:{" "}
                <span className="font-semibold text-green-700 dark:text-green-400">{formatCurrency(itemValue)}</span>
            </span>
        );
    };

    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 transition-colors h-full flex flex-col">
            <header className="mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Income Distribution</h1>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    Visualization of income by source
                </p>
            </header>

            <div className="relative flex-grow flex items-center justify-center" style={{ minHeight: "300px" }}>
                <div className="absolute text-center pointer-events-none">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(totalIncome)}</p>
                </div>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            innerRadius={70}
                            dataKey="value"
                            nameKey="name"
                            label={({ percent }: any) => `${(percent * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend formatter={renderLegend} verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
