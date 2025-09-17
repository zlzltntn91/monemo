import {createContext} from "react";
import {MyCalendarT} from "@/src/calendar";
import {TransactionT} from "@/constatns/types/types";

// Context에서 사용할 데이터 타입 정의
export type CalendarDataContextType = {
    item: MyCalendarT;
    transactions: TransactionT[];
};

// 기본값 설정 (안전한 초기값)
const defaultCalendarData: CalendarDataContextType = {
    item: {
        year: 0,
        month: 0,
        day: [],
        startWeekOfFirstDay: 0,
        startWeekOfEndDay: 0
    },
    transactions: [],
};



export const CalendarDataContext = createContext<CalendarDataContextType>(defaultCalendarData);