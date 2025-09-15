import React from "react";
import AccountCard, { Account } from "./AccountCard";
import { Plus } from "lucide-react";

type Props = {
    accounts?: Account[];
    onAccountAdd?: () => void;
    onAccountClick?: (accountId: number) => void;
};

const AccountList: React.FC<Props> = ({
    accounts,
    onAccountAdd,
    onAccountClick,
}) => {
    // fallback dummy data
    const fallback: Account[] = [
        { id: 1, name: "Dompet", description: "Uang tunai harian", balance: 462000 },
        { id: 2, name: "Rek BCA", description: "Gaji & tabungan", balance: 18500000 },
        { id: 3, name: "Rek Mandiri", description: "Dana darurat", balance: 7230550.5 },
        { id: 4, name: "OVO", description: "E-wallet", balance: 120000 },
    ];

    const list = accounts ?? fallback;

    return (
        <section>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Accounts
                </h2>

                {/* Tombol Add ala Add Expense */}
                <button
                    onClick={() => onAccountAdd && onAccountAdd()}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 
                     text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 
                     shadow-md transition-colors"
                >
                    <Plus size={18} />
                    Add Account
                </button>
            </div>

            {/* horizontal row; overflow-x-auto buat mobile */}
            <div className="flex space-x-4 overflow-x-auto py-2 px-1">
                {list.map((acc) => (
                    <AccountCard
                        key={acc.id}
                        account={acc}
                        onClick={onAccountClick}
                    />
                ))}
            </div>
        </section>
    );
};

export default AccountList;
