import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- TYPE DEFINITIONS ---
interface Income {
    date: string;
    amount: number;
}

// --- DUMMY DATA ---
// Data spanning multiple months to show a trend
const dummyIncomeData: Income[] = [
    { date: "2025-04-01T09:00:00Z", amount: 7500000 },
    { date: "2025-04-15T15:00:00Z", amount: 2500000 },
    { date: "2025-05-01T09:00:00Z", amount: 7500000 },
    { date: "2025-05-20T11:00:00Z", amount: 750000 },
    { date: "2025-06-01T09:00:00Z", amount: 8000000 },
    { date: "2025-06-18T18:00:00Z", amount: 1500000 },
    { date: "2025-07-01T09:00:00Z", amount: 8000000 },
    { date: "2025-08-01T09:00:00Z", amount: 8000000 },
    { date: "2025-08-25T14:00:00Z", amount: 4500000 },
    { date: "2025-09-01T09:00:00Z", amount: 8500000 },
];

// --- Helper function for currency formatting ---
const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value / 15000);

// --- Standalone Monthly Income Trend Chart Component ---
export default function MonthlyIncomeTrendChart() {
    const monthlyData = useMemo(() => {
        const dataByMonth: Record<string, number> = {};

        // Find the latest date in the data to determine the current month
        const latestDate = new Date(Math.max(...dummyIncomeData.map(e => new Date(e.date).getTime())));

        // Group income by month
        dummyIncomeData.forEach(item => {
            const month = new Date(item.date).toLocaleString('en-US', { month: 'short', year: '2-digit' });
            dataByMonth[month] = (dataByMonth[month] || 0) + item.amount;
        });

        // Generate data for the last 6 months, ensuring all are present
        const result = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(latestDate);
            d.setMonth(d.getMonth() - i);
            const monthName = d.toLocaleString('en-US', { month: 'short', year: '2-digit' });
            result.push({
                name: monthName,
                income: dataByMonth[monthName] || 0,
            });
        }
        return result;
    }, []);

    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 transition-colors h-full flex flex-col">
            <header className="mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Monthly Income Trend</h1>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    Income over the last 6 months
                </p>
            </header>
            <div className="flex-grow" style={{ minHeight: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                        <YAxis tickFormatter={(value: number) => formatCurrency(value).replace(/\.\d+/, '')} tick={{ fill: '#6b7280' }} />
                        <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                borderColor: '#374151',
                                borderRadius: '0.75rem'
                            }}
                        />
                        <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
