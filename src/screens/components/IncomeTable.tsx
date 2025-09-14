import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";

// --- TYPE DEFINITIONS ---
interface Income {
    date: string;
    description: string;
    source: string;
    amount: number;
}

type SortKey = "date" | "description" | "amount" | "source";

// --- DUMMY DATA ---
const dummyIncomeData: Income[] = [
    { date: "2025-02-01T09:00:00Z", description: "Monthly Salary Feb", source: "Salary", amount: 7500000 },
    { date: "2025-02-05T15:00:00Z", description: "Web design for Client X", source: "Freelance Project", amount: 2000000 },
    { date: "2025-02-10T11:00:00Z", description: "Q1 Stock Payout", source: "Investment Dividends", amount: 500000 },
    { date: "2025-02-12T18:00:00Z", description: "Tutoring session", source: "Side Gig", amount: 1200000 },
    { date: "2025-02-15T10:00:00Z", description: "Birthday gift", source: "Gift", amount: 250000 },
    { date: "2025-03-01T09:00:00Z", description: "Monthly Salary Mar", source: "Salary", amount: 7500000 },
];

// --- Helper function for currency formatting ---
const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 15000);

export default function IncomeTable() {
    const [sortKey, setSortKey] = useState<SortKey>("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [filterSource, setFilterSource] = useState("All");
    const [search, setSearch] = useState("");

    const sources = ["All", ...new Set(dummyIncomeData.map((d) => d.source))];

    const filteredData = useMemo(() => {
        let data = [...dummyIncomeData];

        if (filterSource !== "All") {
            data = data.filter((item) => item.source === filterSource);
        }

        if (search) {
            data = data.filter(
                (item) =>
                    item.description.toLowerCase().includes(search.toLowerCase()) ||
                    item.source.toLowerCase().includes(search.toLowerCase())
            );
        }

        data.sort((a, b) => {
            let x: any = a[sortKey];
            let y: any = b[sortKey];

            if (sortKey === "date") {
                x = new Date(a.date).getTime();
                y = new Date(b.date).getTime();
            }

            if (x < y) return sortOrder === "asc" ? -1 : 1;
            if (x > y) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return data;
    }, [sortKey, sortOrder, filterSource, search]);

    return (
        <div className="h-full w-full bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 transition-colors flex flex-col">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Records</h1>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    Track, filter, and manage your income sources
                </p>
            </header>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                <div className="flex flex-col w-full sm:w-1/2">
                    <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1">
                        <Search className="w-4 h-4" /> Search
                    </label>
                    <input
                        type="text"
                        placeholder="Search by description or source..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                    />
                </div>

                <div className="flex flex-col w-full sm:w-1/3">
                    <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1">
                        <Filter className="w-4 h-4" /> Filter by Source
                    </label>
                    <select
                        value={filterSource}
                        onChange={(e) => setFilterSource(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                    >
                        {sources.map((cat) => (
                            <option key={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="flex-grow overflow-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg max-h-[70vh]">
                <table className="min-w-full text-xs sm:text-sm">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            {(["date", "description", "amount", "source"] as SortKey[]).map((key) => (
                                <th
                                    key={key}
                                    onClick={() => {
                                        if (sortKey === key) {
                                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                        } else {
                                            setSortKey(key);
                                            setSortOrder("asc");
                                        }
                                    }}
                                    className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none capitalize"
                                >
                                    {key} {sortKey === key && (sortOrder === "asc" ? "↑" : "↓")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {filteredData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    {new Date(item.date).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                                </td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 dark:text-gray-100 font-medium">
                                    {item.description}
                                </td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-green-600 dark:text-green-400 whitespace-nowrap">
                                    {formatCurrency(item.amount)}
                                </td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 dark:text-gray-300">
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                                        {item.source}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-4">
                Showing <span className="font-medium">{filteredData.length}</span> of{" "}
                <span className="font-medium">{dummyIncomeData.length}</span> records
            </div>
        </div>
    );
}
