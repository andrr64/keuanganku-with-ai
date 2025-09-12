import ExpenseTable from "./components/ExpenseTable";

function ExpenseScreen() {
  return (
    <main className="p-4 min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Expense Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and track all your expenses easily on this page.</p>
      </header>
      <div className="flex gap-4">
        <div className="flex-1">
          <ExpenseTable />
        </div>
        <div className="flex-1">
        </div>
      </div>
    </main>
  );
}

export default ExpenseScreen;