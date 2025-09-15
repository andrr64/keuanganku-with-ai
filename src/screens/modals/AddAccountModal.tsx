import React, { useState, useEffect } from "react";
import { X, Wallet } from "lucide-react";

export interface AccountFormData {
    name: string;
    description?: string;
    balance: number;
}

interface AddAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newAccount: AccountFormData) => void;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({
    isOpen,
    onClose,
    onSave,
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [balance, setBalance] = useState<number | "">("");

    const [visible, setVisible] = useState(false); // buat animasi

    useEffect(() => {
        if (isOpen) {
            setVisible(true); // buka
        } else {
            const timer = setTimeout(() => setVisible(false), 200); // delay biar animasi sempat jalan
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setName("");
            setDescription("");
            setBalance("");
        }
    }, [isOpen]);

    const handleSave = () => {
        if (!name || balance === "") {
            alert("Nama Akun dan Saldo Awal wajib diisi.");
            return;
        }
        onSave({
            name,
            description,
            balance: Number(balance),
        });
        onClose();
    };

    if (!isOpen && !visible) return null;

    return (
        <div className="fixed inset-0 z-40 flex justify-center items-center">
            {/* Backdrop dengan blur */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            {/* Konten Modal */}
            <div
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md m-4 transform transition-all duration-200
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Add New Account
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body Form */}
                <div className="p-6 space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Account Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Wallet size={18} className="text-gray-400" />
                            </span>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Rekening BCA, Dompet Digital"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Description (Optional)
                        </label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., Untuk gaji dan tabungan"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="balance"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Initial Balance
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                Rp
                            </span>
                            <input
                                type="number"
                                id="balance"
                                value={balance}
                                onChange={(e) => setBalance(Number(e.target.value))}
                                placeholder="0"
                                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end items-center p-5 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 mr-3 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Save Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAccountModal;
