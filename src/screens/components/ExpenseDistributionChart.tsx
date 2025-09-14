import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

interface ChartData {
    name: string;
    value: number;
}

// --- DUMMY DATA ---
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
const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value / 15000);

export default function ExpenseDistribution() {
    const { chartData, totalSpent } = useMemo(() => {
        const dataByCategory = dummyData.reduce((acc, expense) => {
            const categoryName = expense.category.name;
            acc[categoryName] = (acc[categoryName] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);

        const chartData: ChartData[] = Object.keys(dataByCategory).map(category => ({
            name: category,
            value: dataByCategory[category],
        }));

        const totalSpent = dummyData.reduce((sum, item) => sum + item.amount, 0);

        return { chartData, totalSpent };
    }, []);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919", "#19FFFF"];

    const renderLegend = (value: string, entry: any) => {
        const itemValue = entry.payload.value;
        return (
            <span className="text-gray-600 dark:text-gray-300 text-sm">
                {value}:{" "}
                <span className="font-semibold text-red-600 dark:text-red-400">
                    {formatCurrency(itemValue)}
                </span>
            </span>
        );
    };

    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 transition-colors h-full flex flex-col">
            <header className="mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                    Expense Distribution
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    Visualization by category
                </p>
            </header>

            <div className="relative flex-grow flex items-center justify-center" style={{ minHeight: "300px" }}>
                <div className="absolute text-center pointer-events-none">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalSpent)}</p>
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
