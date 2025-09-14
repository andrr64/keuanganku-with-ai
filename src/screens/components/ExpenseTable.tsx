import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";

// Dummy data translated to English
const dummyData = [
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

// Type for sorting keys, updated to English
type SortKey = "date" | "title" | "amount" | "category";

export default function ExpenseTable() {
    const [sortKey, setSortKey] = useState<SortKey>("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [filterCategory, setFilterCategory] = useState("All");
    const [search, setSearch] = useState("");

    // Get unique categories from the data
    const categories = ["All", ...new Set(dummyData.map((d) => d.category.name))];

    // useMemo for filtering and sorting data
    const filteredData = useMemo(() => {
        let data = [...dummyData];

        // Filter by category
        if (filterCategory !== "All") {
            data = data.filter((item) => item.category.name === filterCategory);
        }

        // Filter by search term
        if (search) {
            data = data.filter(
                (item) =>
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.category.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sort data
        data.sort((a, b) => {
            let x: any = a[sortKey];
            let y: any = b[sortKey];

            if (sortKey === "date") {
                x = new Date(a.date).getTime();
                y = new Date(b.date).getTime();
            } else if (sortKey === "category") {
                x = a.category.name;
                y = b.category.name;
            }

            if (x < y) return sortOrder === "asc" ? -1 : 1;
            if (x > y) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return data;
    }, [sortKey, sortOrder, filterCategory, search]);

    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 transition-colors">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Records</h1>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    Track, filter, and manage your daily expenses easily
                </p>
            </header>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                {/* Search */}
                <div className="flex flex-col w-full sm:w-1/2">
                    <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1">
                        <Search className="w-4 h-4" /> Search
                    </label>
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white 
                        dark:bg-gray-700 dark:border-gray-700 dark:text-white
                        focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                    />
                </div>

                {/* Filter */}
                <div className="flex flex-col w-full sm:w-1/3">
                    <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1">
                        <Filter className="w-4 h-4" /> Filter by Category
                    </label>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white
                        dark:bg-gray-700 dark:border-gray-700 dark:text-white
                        focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                    >
                        {categories.map((cat) => (
                            <option key={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-y-auto overflow-x-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg" style={{ height: "480px" }}>
                <table className="min-w-full text-xs sm:text-sm">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            {(["date", "title", "amount", "category"] as SortKey[]).map((key) => (
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
                                    {key}{" "}
                                    {sortKey === key && (sortOrder === "asc" ? "↑" : "↓")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {filteredData.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    {new Date(item.date).toLocaleString("en-US", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 dark:text-gray-100 font-medium">
                                    {item.title}
                                </td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-red-600 dark:text-red-400 whitespace-nowrap">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.amount / 15000)}
                                </td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 dark:text-gray-300">
                                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-xs">
                                        {item.category.name}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-4">
                Showing <span className="font-medium">{filteredData.length}</span> of{" "}
                <span className="font-medium">{dummyData.length}</span> records
            </div>
        </div>
    );
}

