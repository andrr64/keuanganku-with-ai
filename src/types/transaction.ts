export interface Transaction {
    type: 'income' | 'expense';
    date: string;
    description: string;
    amount: number;
    category?: string;
}