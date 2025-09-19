import {TransactionT} from "@/constatns/types/types";
import {createContext} from "react";

type TransactionsContextT = {
    transactions: TransactionT[];
    setTransactions: React.Dispatch<React.SetStateAction<TransactionT[]>>;
}

const defaultContextValue: TransactionsContextT = {
    transactions: [],
    setTransactions: () => {
    }
};

export const TransactionsContext = createContext(defaultContextValue);

export default TransactionsContext;