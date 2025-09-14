import { Plus } from "lucide-react";
import ExpenseDistribution from "./components/ExpenseDistributionChart";
import ExpenseSummary from "./components/ExpenseSummaryCard";
import ExpenseTable from "./components/ExpenseTable";
import WeeklyExpenseTrendChart from "./components/ExpenseWeeklyChart";

function HeaderComponent() {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          My Expenses
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Welcome to your financial dashboard.
        </p>
      </div>
      <button
        onClick={() => alert("Add new expense modal would open here.")}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 
                   text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 
                   shadow-md transition-colors"
      >
        <Plus size={20} />
        Add Expense
      </button>
    </header>
  );
}


function ExpenseScreen() {
  return (
    <div className="min-h-screen">
      <HeaderComponent />

      <main className="space-y-6">
        {/* Ringkasan di atas */}
        <ExpenseSummary />

        {/* Tabel & distribusi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <ExpenseTable />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            <div className="flex-1">
              <ExpenseDistribution />
            </div>
            <div className="flex-1">
              <WeeklyExpenseTrendChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ExpenseScreen;
