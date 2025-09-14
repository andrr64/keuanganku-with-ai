import { useMemo, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

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
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value / 15000);

export default function WeeklyExpenseTrendChart() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDark = () =>
            setIsDark(document.documentElement.classList.contains("dark"));

        checkDark();
        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const weeklyData = useMemo(() => {
        const latestDate = new Date(
            Math.max(...dummyData.map((e) => new Date(e.date).getTime()))
        );

        const last7Days: { name: string; amount: number }[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(latestDate);
            d.setDate(d.getDate() - i);
            last7Days.push({
                name: d.toLocaleDateString("en-US", { weekday: "short" }),
                amount: 0,
            });
        }

        const sevenDaysAgo = new Date(latestDate);
        sevenDaysAgo.setDate(latestDate.getDate() - 6);

        dummyData.forEach((expense) => {
            const expenseDate = new Date(expense.date);

            if (expenseDate >= sevenDaysAgo && expenseDate <= latestDate) {
                const dayName = expenseDate.toLocaleDateString("en-US", {
                    weekday: "short",
                });
                const day = last7Days.find((d) => d.name === dayName);
                if (day) {
                    day.amount += expense.amount;
                }
            }
        });

        return last7Days;
    }, []);

    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 transition-colors h-full flex flex-col">
            <header className="mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                    Weekly Spending Trend
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    Spending over the last 7 days
                </p>
            </header>
            <div className="flex-grow" style={{ minHeight: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={weeklyData}
                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={isDark ? "#4b5563" : "#d1d5db"} // dark: gray-600, light: gray-300
                            strokeOpacity={0.3}
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: isDark ? "#d1d5db" : "#374151" }} // dark: gray-300, light: gray-700
                        />
                        <YAxis
                            tickFormatter={(value: number) =>
                                formatCurrency(value).replace(/\.\d+/, "")
                            }
                            tick={{ fill: isDark ? "#d1d5db" : "#374151" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? "#1f2937" : "#ffffff", // dark: gray-800, light: white
                                border: "none",
                                borderRadius: "0.5rem",
                                color: isDark ? "#f9fafb" : "#111827", // dark: gray-50, light: gray-900
                            }}
                            formatter={(value: number) => formatCurrency(value)}
                            cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                        />
                        <Bar
                            dataKey="amount"
                            fill={isDark ? "#60a5fa" : "#3b82f6"} // dark: blue-400, light: blue-500
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
