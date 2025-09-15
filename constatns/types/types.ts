export type TransactionT = {
    id: number,
    createAt: Date,
    type: 'income' | 'expense',
    currency: 'usd' | 'won',
    memo?: string,
    amount?: number,
}