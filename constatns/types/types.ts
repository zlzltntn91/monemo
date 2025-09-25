import {DateTime} from "luxon";
import React from "react";

export type TransactionT = {
    id: number,
    createAt: DateTime,
    type: 'income' | 'expense',
    currency: 'usd' | 'won',
    memo?: string,
    amount?: number,

    setId?: React.Dispatch<React.SetStateAction<number>>,
    setCreateAt?: React.Dispatch<React.SetStateAction<DateTime>>,
    setType?: React.Dispatch<React.SetStateAction<'income' | 'expense'>>,
    setCurrency?: React.Dispatch<React.SetStateAction<'usd' | 'won'>>,
    setMemo?: React.Dispatch<React.SetStateAction<string>>,
    setAmount?: React.Dispatch<React.SetStateAction<number>>,
}

export type SignUpForm = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
}