import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ExpenseScreen from "./screens/ExpenseScreen";
import IncomeScreen from "./screens/IncomeScreen";
import "./App.css";

function App() {
  const [active, setActive] = useState("Expense");

  const renderScreen = () => {
    switch (active) {
      case "Expense":
        return <ExpenseScreen />;
      case "Income":
        return <IncomeScreen />;
      case "Category":
        return <div></div>;
      case "Settings":
        return <div></div>;
      case "Chat with AI":
        return <div></div>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900  overflow-auto">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
