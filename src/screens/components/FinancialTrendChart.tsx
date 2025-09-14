import { useMemo } from "react";
import { Transaction } from "../../types/transaction";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../../lib/formatter";

// --- 2. Financial Trend Chart ---
export default function FinancialTrendChart({ data }: { data: Transaction[] }) {
    const monthlyData = useMemo(() => {
        const dataByMonth: Record<string, { income: number; expenses: number }> = {};
        const latestDate = new Date(Math.max(...data.map(t => new Date(t.date).getTime())));
        data.forEach(item => {
            const month = new Date(item.date).toLocaleString('en-US', { month: 'short', year: '2-digit' });
            if (!dataByMonth[month]) dataByMonth[month] = { income: 0, expenses: 0 };
            if (item.type === 'income') dataByMonth[month].income += item.amount;
            else dataByMonth[month].expenses += item.amount;
        });
        const result = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(latestDate);
            d.setMonth(d.getMonth() - i);
            const monthName = d.toLocaleString('en-US', { month: 'short', year: '2-digit' });
            result.push({ name: monthName, ... (dataByMonth[monthName] || { income: 0, expenses: 0 }) });
        }
        return result;
    }, [data]);

    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 h-full flex flex-col">
            <header className="mb-4">
                <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Financial Trend</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Income vs. Expenses over last 6 months</p>
            </header>
            <div className="flex-grow" style={{ minHeight: "250px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />

                        {/* Y-Axis for Income (Left) */}
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            stroke="#22c55e"
                            tickFormatter={(value: number) => `${formatCurrency(value).replace(/\s/g, '').slice(0, -1)}K`}
                            tick={{ fill: '#6b7280' }}
                        />

                        {/* Y-Axis for Expenses (Right) */}
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#ef4444"
                            tickFormatter={(value: number) => `${formatCurrency(value).replace(/\s/g, '').slice(0, -1)}K`}
                            tick={{ fill: '#6b7280' }}
                        />

                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />

                        {/* Bar for Income, linked to the left Y-Axis */}
                        <Bar yAxisId="left" dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />

                        {/* Bar for Expenses, linked to the right Y-Axis */}
                        <Bar yAxisId="right" dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
