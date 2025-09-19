import {TransactionT} from "@/constatns/types/types";
import {createContext} from "react";
import {DateTime} from "luxon";

export const defaultContextValue: TransactionT = {
    id: 0,
    createAt: DateTime.local(),
    type: 'income',
    currency: 'won',
    memo: '',
    amount: 0,
    setId: (v) => {
    },
    setCreateAt: (v) => {
    },
    setType: (v) => {
    },
    setCurrency: (v) => {
    },
    setMemo: (v) => {
    },
    setAmount: (v) => {
    },
};

export const TransactionContext = createContext(defaultContextValue);
export default TransactionContext;