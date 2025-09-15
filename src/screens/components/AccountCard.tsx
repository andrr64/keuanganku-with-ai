import { Landmark, Wallet } from "lucide-react";

// --- TYPE DEFINITIONS ---
export type Account = {
    id: number;
    name: string;
    description?: string;
    balance: number;
};

const AccountCard = ({
    account,
    onClick,
}: {
    account: Account;
    onClick?: (accountId: number) => void;
}) => {
    // Fungsi untuk format mata uang agar lebih rapi
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);

    const Icon = account.name.toLowerCase().includes("rek") ? Landmark : Wallet;

    return (
        <div
            onClick={() => onClick?.(account.id)}
            className={`flex-shrink-0 w-64 h-40 p-5 rounded-2xl shadow-sm cursor-pointer
                        flex flex-col justify-between bg-white dark:bg-gray-800 transition-all 
                        duration-300 ease-in-out hover:scale-105 hover:shadow-xl`}
        >
            <div className="flex justify-between items-start">
                <span className="font-semibold text-gray-800 dark:text-gray-100">{account.name}</span>
                <Icon size={24} className="text-gray-400 dark:text-gray-500" />
            </div>
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{account.description || 'Total Saldo'}</p>
                <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {formatCurrency(account.balance)}
                </p>
            </div>
        </div>
    );
};


export default AccountCard;
