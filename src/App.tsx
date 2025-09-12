import "./App.css";
import IncomeScreen from "./screens/IncomeScreen";
import ExpenseScreen from "./screens/ExpenseScreen";
import RootLayout from "./components/RootLayout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/expenses" replace />} />
          <Route path="/incomes" element={<IncomeScreen />} />
          <Route path="/expenses" element={<ExpenseScreen />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
