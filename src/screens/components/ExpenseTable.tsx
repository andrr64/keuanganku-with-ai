import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";

// Dummy data
const dummyData = [
    { tanggal: "2025-02-01T12:30:00Z", title: "Makan Siang", jumlah: 50000, kategori: { id: 1, name: "Makanan" } },
    { tanggal: "2025-02-02T09:15:00Z", title: "Transport Grab", jumlah: 35000, kategori: { id: 2, name: "Transportasi" } },
    { tanggal: "2025-02-03T18:45:00Z", title: "Kopi", jumlah: 25000, kategori: { id: 3, name: "Hiburan" } },
    { tanggal: "2025-02-04T20:00:00Z", title: "Pulsa", jumlah: 100000, kategori: { id: 4, name: "Komunikasi" } },
    { tanggal: "2025-02-05T07:20:00Z", title: "Listrik", jumlah: 200000, kategori: { id: 5, name: "Tagihan" } },
    { tanggal: "2025-02-06T22:10:00Z", title: "Netflix", jumlah: 65000, kategori: { id: 3, name: "Hiburan" } },
    { tanggal: "2025-02-07T14:00:00Z", title: "Bensin", jumlah: 80000, kategori: { id: 2, name: "Transportasi" } },
    { tanggal: "2025-02-08T10:05:00Z", title: "Donasi", jumlah: 50000, kategori: { id: 6, name: "Sosial" } },
    { tanggal: "2025-02-09T08:50:00Z", title: "Vitamin", jumlah: 120000, kategori: { id: 7, name: "Kesehatan" } },
    { tanggal: "2025-02-10T16:40:00Z", title: "Snack", jumlah: 30000, kategori: { id: 1, name: "Makanan" } },
];

type SortKey = "tanggal" | "title" | "jumlah" | "kategori";

export default function ExpenseTable() {
    const [sortKey, setSortKey] = useState<SortKey>("tanggal");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [filterKategori, setFilterKategori] = useState("All");
    const [search, setSearch] = useState("");

    const categories = ["All", ...new Set(dummyData.map((d) => d.kategori.name))];

    const filteredData = useMemo(() => {
        let data = [...dummyData];

        if (filterKategori !== "All") {
            data = data.filter((item) => item.kategori.name === filterKategori);
        }

        if (search) {
            data = data.filter(
                (item) =>
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.kategori.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        data.sort((a, b) => {
            let x: any = a[sortKey];
            let y: any = b[sortKey];

            if (sortKey === "tanggal") {
                x = new Date(a.tanggal).getTime();
                y = new Date(b.tanggal).getTime();
            } else if (sortKey === "kategori") {
                x = a.kategori.name;
                y = b.kategori.name;
            }

            if (x < y) return sortOrder === "asc" ? -1 : 1;
            if (x > y) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return data;
    }, [sortKey, sortOrder, filterKategori, search]);

    return (
        <div className="max-w-full mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 transition-colors">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Expense Records</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Track, filter, and manage your daily expenses easily</p>
            </header>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                {/* Search */}
                <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1">
                        <Search className="w-4 h-4" /> Search
                    </label>
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Filter */}
                <div className="flex flex-col w-full md:w-1/3">
                    <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1">
                        <Filter className="w-4 h-4" /> Filter by Category
                    </label>
                    <select
                        value={filterKategori}
                        onChange={(e) => setFilterKategori(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        {categories.map((cat) => (
                            <option key={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table with fixed height */}
            <div className="overflow-y-auto overflow-x-auto rounded-lg border dark:border-gray-700" style={{ height: "480px" }}>
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            {["tanggal", "title", "jumlah", "kategori"].map((key) => (
                                <th
                                    key={key}
                                    onClick={() => {
                                        if (sortKey === key) {
                                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                        } else {
                                            setSortKey(key as SortKey);
                                            setSortOrder("asc");
                                        }
                                    }}
                                    className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                                >
                                    {key === "tanggal"
                                        ? "Date"
                                        : key === "title"
                                            ? "Title"
                                            : key === "jumlah"
                                                ? "Amount"
                                                : "Category"}{" "}
                                    {sortKey === key && (sortOrder === "asc" ? "↑" : "↓")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <td className="px-4 py-3 text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    {new Date(item.tanggal).toLocaleString("id-ID", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </td>
                                <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium">{item.title}</td>
                                <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400 whitespace-nowrap">
                                    Rp {item.jumlah.toLocaleString("id-ID")}
                                </td>
                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{item.kategori.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Info */}
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Showing <span className="font-medium">{filteredData.length}</span> of{" "}
                <span className="font-medium">{dummyData.length}</span> records
            </div>
        </div>
    );
}
