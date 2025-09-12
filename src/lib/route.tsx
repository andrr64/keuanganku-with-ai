import { CreditCard, DollarSign, FolderKanban, Settings } from "lucide-react";

export const ROUTES = {
  EXPENSE: {
    url: "/expenses",
    label: "Expense",
    icon: <CreditCard size={18} />,
  },
  INCOME: {
    url: "/incomes",
    label: "Income",
    icon: <DollarSign size={18} />,
  },
  CATEGORY: {
    url: "/category",
    label: "Category",
    icon: <FolderKanban size={18} />,
  },
  SETTINGS: {
    url: "/settings",
    label: "Settings",
    icon: <Settings size={18} />,
  },
};
