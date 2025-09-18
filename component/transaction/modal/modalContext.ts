import {createContext} from 'react';
import {DateTime} from 'luxon';

interface ModalContextType {
    amount: string,
    setAmount: (v: string) => void,
    memo: string;
    setMemo: (v: string) => void,
    isVisible: boolean;
    setIsVisible: (v: boolean) => void;
    createAt: DateTime;
    setCreateAt: (date: DateTime) => void;
}

const ModalContext = createContext<ModalContextType>({
    amount: '',
    setAmount: (v) => {
    },
    memo: '',
    setMemo: (v) => {
    },
    createAt: DateTime.local(),
    setCreateAt: (v) => {
    },
    isVisible: false,
    setIsVisible: (v) => {
    },
});

export default ModalContext;