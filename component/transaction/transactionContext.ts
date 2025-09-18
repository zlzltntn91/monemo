import {TransactionT} from "@/constatns/types/types";
import {createContext} from "react";

type TransactionContextType = {
    transactions: TransactionT[];
    setTransactions: React.Dispatch<React.SetStateAction<TransactionT[]>>;
}

const defaultContextValue: TransactionContextType = {
    transactions: [],
    setTransactions: () => {
    }
};

export const TransactionContext = createContext(defaultContextValue);

export default TransactionContext;