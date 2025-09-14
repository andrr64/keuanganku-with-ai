import { Transaction } from "../types/transaction";
import BalanceOverview from "./components/BalanceCard";
import ExpenseDistribution from "./components/ExpenseDistributionChart";
import FinancialTrendChart from "./components/FinancialTrendChart";
import NavigationCards from "./components/HomeScreenNavigationCard";
import RecentTransactions from "./components/RecentTransaction";
import TopSpendingCategories from "./components/TopSpendingCategories";

interface HomeScreenProps {
    onChange: (view: string) => void;
}

// --- Main Home Screen Component ---
const HomeScreen = ({ onChange }: HomeScreenProps) => {
    // Centralized data source
    const dummyTransactions: Transaction[] = [
        // Expenses
        { type: 'expense', date: "2025-09-01T12:30:00Z", description: "Lunch", amount: 75000, category: "Food" },
        { type: 'expense', date: "2025-09-02T09:15:00Z", description: "Train Ticket", amount: 150000, category: "Transportation" },
        { type: 'expense', date: "2025-08-28T18:45:00Z", description: "Movie Night", amount: 250000, category: "Entertainment" },
        { type: 'expense', date: "2025-08-15T20:00:00Z", description: "Internet Bill", amount: 350000, category: "Bills" },
        { type: 'expense', date: "2025-07-30T07:20:00Z", description: "Groceries", amount: 600000, category: "Food" },
        { type: 'expense', date: "2025-07-10T22:10:00Z", description: "Netflix", amount: 165000, category: "Entertainment" },
        { type: 'expense', date: "2025-06-25T14:00:00Z", description: "Gasoline", amount: 300000, category: "Transportation" },
        { type: 'expense', date: "2025-05-11T08:50:00Z", description: "Doctor Visit", amount: 450000, category: "Health" },

        // Income
        { type: 'income', date: "2025-09-01T09:00:00Z", description: "Monthly Salary", amount: 8500000 },
        { type: 'income', date: "2025-08-25T14:00:00Z", description: "Freelance Project", amount: 4500000 },
        { type: 'income', date: "2025-08-01T09:00:00Z", description: "Monthly Salary", amount: 8000000 },
        { type: 'income', date: "2025-07-01T09:00:00Z", description: "Monthly Salary", amount: 8000000 },
        { type: 'income', date: "2025-06-18T18:00:00Z", description: "Side Gig", amount: 1500000 },
        { type: 'income', date: "2025-06-01T09:00:00Z", description: "Monthly Salary", amount: 8000000 },
        { type: 'income', date: "2025-05-20T11:00:00Z", description: "Stock Dividends", amount: 750000 },
        { type: 'income', date: "2025-05-01T09:00:00Z", description: "Monthly Salary", amount: 7500000 },
        { type: 'income', date: "2025-04-15T15:00:00Z", description: "Project Bonus", amount: 2500000 },
        { type: 'income', date: "2025-04-01T09:00:00Z", description: "Monthly Salary", amount: 7500000 },
    ];

    return (
        <div className="min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                <p className="text-md text-gray-600 dark:text-gray-400">Your financial summary at a glance.</p>
            </header>
            <main className="space-y-6">
                <BalanceOverview data={dummyTransactions} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-1">
                        <FinancialTrendChart data={dummyTransactions} />
                    </div>
                    <div className="lg:col-span-1">
                        <ExpenseDistribution />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TopSpendingCategories data={dummyTransactions} />
                    <RecentTransactions data={dummyTransactions} />
                    <NavigationCards onChange={onChange} />
                </div>
            </main >
        </div >
    );
}


export default HomeScreen;